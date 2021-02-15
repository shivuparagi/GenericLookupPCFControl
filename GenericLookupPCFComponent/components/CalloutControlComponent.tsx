import * as React from "react";
import * as ReactDOM from "react-dom";
import { IInputs } from "../generated/ManifestTypes";
import iPropsInput from "../interfaces/iPropsInput";
import iCreateField from "../interfaces/iCreateField";
import GetSampleConfig from "../sampledata/config";
import iField from "../interfaces/iField";
import { ReactTabulator } from "react-tabulator";
import Loader from "react-loader-spinner";
import {
  Callout,
  getTheme,
  FontWeights,
  mergeStyleSets,
} from "office-ui-fabric-react";
import iView from "../interfaces/iView";

const theme = getTheme();
const styles: any = mergeStyleSets({
  buttonArea: {
    verticalAlign: "top",
    display: "inline-block",
    textAlign: "center",
    margin: "0 100px",
    minWidth: 130,
    height: 32,
  },
  gridDivLeft1: {
    float: "left",
    width: "100%",
  },
  gridDivRight1: {
    float: "right",
    width: "16px%",
    marginRight: "15px",
    marginTop: "5px",
  },

  callout: {
    maxWidth: 600,
  },
  header: {
    padding: "18px 24px 12px",
  },
  title: [
    theme.fonts.xLarge,
    {
      margin: 0,
      fontWeight: FontWeights.semilight,
    },
  ],
  inner: {
    height: "100%",
    padding: "0 24px 20px",
  },
  actions: {
    position: "relative",
    marginTop: 20,
    width: "100%",
    whiteSpace: "nowrap",
  },
  focusControl: {},
  focusControl1: {},
  focusControl2: {},
  focusControl3: {},
  focusControl4: {},
  focusControl5: {},
  focusControl6: {},
  focusControl7: {},
  subtext: [
    theme.fonts.small,
    {
      margin: 0,
      fontWeight: FontWeights.semilight,
    },
  ],
  link: [
    theme.fonts.medium,
    {
      color: theme.palette.neutralPrimary,
    },
  ],
});

class CalloutControlComponent extends React.Component<iPropsInput> {
  ref: any = null;
  _context: ComponentFramework.Context<IInputs>;
  _tmpField: iCreateField;
  _currentFocus = -1;
  _divSearchForm = "divSearchForm";

  _SearchText = "";
  _columns: any[] = [];
  _data: any[] = [];
  _recordsThreshHoldLimit: number = 0;

  _originalLookupId: string = "";
  _originalLookupText: string = "";
  _placeHolder: string = "Search in ";
  _entityId: string = "";
  _entityTypeName: string = "";

  _txtSearchId = "txtSearch";
  _divLookupId = "divLookup";
  _txtDummyId = "txtDummy";
  _ddlView = "ddlView";
  _divValidations = "divValidations";
  _linkLookupText = "linkLookupText";
  _divTextbox = "divTextbox";
  _entitySymbol = "";

  state = {
    expandValidations: false,
    isLookupOpen: false,
    lookupField: undefined,
    selectedLookupField: undefined,
    data: this._data,
    filterText: "",
    calloutVisible: false,
    lookupText: "",
    lookupId: "",
    selectedView: 0,
    showSpinner: false,
  };

  constructor(props: iPropsInput) {
    super(props);
    this._context = props.context;
    this._tmpField = JSON.parse(this._context.parameters.ConfigJSON.raw ?? "");
    this._entityId = (this._context as any)?.page?.entityId ?? "";
    this._entityTypeName = (this._context as any)?.page?.entityTypeName ?? "";
    this._recordsThreshHoldLimit = this._tmpField.recordsThreshHoldLimit ?? 0;

    this._txtSearchId = "txtSearch" + this._tmpField.name;
    this._divLookupId = "divLookup" + this._tmpField.name;
    this._txtDummyId = "txtDummy" + this._tmpField.name;
    this._ddlView = "ddlView" + this._tmpField.name;
    this._divValidations = "divValidations" + this._tmpField.name;
    this._linkLookupText = "linkLookupText" + this._tmpField.name;
    this._divTextbox = "divTextbox" + this._tmpField.name;
    this._entitySymbol =
      "crmSymbolFont entity-symbol " + this._tmpField.entitySymbol ?? "Account";

    this.LoadColumns();
    this._tmpField.lookUpCol?.fitlerTextFields?.forEach(
      (tmpField: iField, index) => {
        this._placeHolder = this._placeHolder + tmpField.displayText;
        if (
          index <
          (this._tmpField.lookUpCol?.fitlerTextFields?.length ?? 0) - 1
        ) {
          this._placeHolder = this._placeHolder + ", ";
        }
      }
    );
  }

  LoadInitialData = () => {
    let thisRef = this;

    this._context.webAPI
      .retrieveRecord(
        this._entityTypeName,
        this._entityId,
        "?$select=_" + this._tmpField.name + "_value"
      )
      .then(
        function success(result) {
          let tmpLookupId = result["_" + thisRef._tmpField.name + "_value"];
          let tmpLookupText =
            result[
              "_" +
                thisRef._tmpField.name +
                "_value@OData.Community.Display.V1.FormattedValue"
            ];

          thisRef.setState({
            lookupId: tmpLookupId,
            lookupText: tmpLookupText,
          });
        },
        function (error) {
          console.log(error.message);
        }
      );
    this.LoadData(0);
  };
  /* istanbul ignore next */
  OnFilterTextChange = (event: any) => {
    this.setState({ filterText: event.target.value });
  };
  OnLookupUpClick = (event: any, tmpField: iCreateField) => {
    this.OpenLookupDialog(tmpField);
  };
  OpenLookupDialog = (tmpColDef?: iCreateField) => {
    this.setState({
      isLookupOpen: true,
      lookupField: tmpColDef?.lookUpCol,
      selectedLookupField: tmpColDef?.name,
    });
  };
  CloseLookupDialog = (lookupObj: any) => {
    this.setState({
      isLookupOpen: false,
      selectedLookupField: "unknown",
    });
  };

  GetLookupText = (tmpField: iCreateField) => {
    return "---";
  };

  LoadColumns = () => {
    this._columns.push({
      formatter: (cell: any) => this.SelectFormatter(cell),
      align: "center",
      headerSort: false,
      width: 80,
      field: "select",
    });

    this._tmpField.lookUpCol?.fieldsToShow?.forEach((tmp: iField) => {
      let tmpCol = {
        title: tmp.displayText,
        field: tmp.name,
        headerFilter: "input",
      };
      this._columns.push(tmpCol);
    });
  };
  SelectFormatter = (cell: any) => {
    let thisRef = this;
    let tmpAnchor = document.createElement("a");
    tmpAnchor.href = "#";
    tmpAnchor.id = "lnk" + cell.getRow().getPosition(true);
    tmpAnchor.tabIndex = -1;
    tmpAnchor.innerText = "Select";
    tmpAnchor.className = "editable_grid_title_link";
    tmpAnchor.setAttribute("aria-label", "Select Record");
    tmpAnchor.onclick = (e) => {
      e.preventDefault();
      let tmpSelectedItem = cell.getRow().getData()[
        this._tmpField.lookUpCol?.primaryFeild ?? ""
      ];
      let tmpSelectedItemId = cell.getRow().getData()[
        this._tmpField.lookUpCol?.primaryKey ?? ""
      ];

      thisRef.setState({
        lookupText: tmpSelectedItem,
        lookupId: tmpSelectedItemId,
      });

      var lookupValue = new Array();
      lookupValue[0] = new Object();
      lookupValue[0].id = tmpSelectedItemId;
      lookupValue[0].name = tmpSelectedItem;
      lookupValue[0].entityType = thisRef._tmpField.lookUpCol?.entity;

      // @ts-ignore
      let tmpLookupField = Xrm.Page.getAttribute(thisRef._tmpField.name);
      tmpLookupField.setValue(lookupValue);

      thisRef.SetEditability(false);
      thisRef.SetLookupText();
      thisRef.CloseCallOut();
    };
    return tmpAnchor;
  };
  LoadData = (selectedViewId: number) => {
    let thisRef = this;
    this._SearchText =
      (document.getElementById(this._txtSearchId) as HTMLInputElement).value ??
      "";
    if (this._tmpField.exterCall) {
      this._context.webAPI
        .retrieveMultipleRecords(
          "webresource",
          "?$filter=name eq '" +
            this._tmpField.exterCall.webResource +
            "'&$top=1"
        )
        .then(
          function success(result) {
            if (result.entities.length > 0) {
              var config = result.entities[0];
              let copyFunction = new Function(
                "return " + atob(config.content)
              )();
              copyFunction(thisRef);
            } else {
            }
          },
          function (error) {
            console.log(error);
          }
        );
    } else {
      if (this._tmpField?.lookUpCol?.views) {
        let tmpView = this._tmpField?.lookUpCol?.views[selectedViewId];
        if (tmpView.fetchXml) this.LoadDataFromFetchXML(selectedViewId);
        else this.LoadDataFromNonFetchXML();
      }
    }
  };

  LoadDataFromFetchXML = (selectedViewId: number) => {
    let thisref = this;
    if (this._tmpField?.lookUpCol?.views) {
      let fetchXml =
        this._tmpField?.lookUpCol?.views[selectedViewId]?.fetchXml ?? "";
      let tmpConditions = "";
      if (this._SearchText) {
        let tmpSearchVals = this._SearchText.split(",");
        this._tmpField.lookUpCol.fitlerTextFields?.forEach(
          (tmpField: iField, index) => {
            let tmpSearchVal = "";
            if (tmpSearchVals.length > index)
              tmpSearchVal = tmpSearchVals[index]?.trim();
            if (tmpSearchVal?.trim().length > 0) {
              tmpConditions =
                tmpConditions +
                "<condition attribute='" +
                tmpField.name +
                "' operator='like' value='%" +
                tmpSearchVal +
                "%' />";
            }
          }
        );
      }
      fetchXml = fetchXml.replace("<MORECONDITIONS/>", tmpConditions);
      fetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);
      this._context.webAPI.retrieveMultipleRecords("account", fetchXml).then(
        function success(result) {
          thisref.PopulateData(result);
        },
        function (error) {
          console.log(error.message);
        }
      );
    }
  };
  LoadDataFromNonFetchXML = () => {
    let tmpSearchText =
      (document.getElementById(this._txtSearchId) as HTMLInputElement).value ??
      "";

    let tmpSelect = "?$select=";
    this._tmpField.lookUpCol?.fieldsToShow?.forEach((tmp: iField) => {
      tmpSelect = tmpSelect + tmp.name + ",";
    });
    tmpSelect = tmpSelect + this._tmpField.lookUpCol?.primaryKey;
    let tmpQueryFilter = "";
    let tmpFilters: string[] = [];
    if (tmpSearchText.length > 0) {
      tmpQueryFilter = "&$filter=";
      let tmpSearchVals = tmpSearchText.split(",");
      this._tmpField?.lookUpCol?.fitlerTextFields?.forEach(
        (tmpField: iField, index) => {
          let tmpSearchVal = "";
          if (tmpSearchVals.length > index)
            tmpSearchVal = tmpSearchVals[index]?.trim();
          if (tmpSearchVal?.trim().length > 0) {
            tmpFilters.push(
              "contains(" + tmpField.name + ", '" + tmpSearchVal + "')"
            );
          }
        }
      );
    }

    tmpFilters.forEach((tmpstr: string, index) => {
      tmpQueryFilter = tmpQueryFilter + tmpstr;
      if (index < tmpFilters.length - 1) {
        tmpQueryFilter = tmpQueryFilter + " and ";
      }
    });

    let thisRef = this;

    let tmpOptions = tmpSelect;
    if (tmpQueryFilter) tmpOptions = tmpOptions + tmpQueryFilter;

    this._context.webAPI
      .retrieveMultipleRecords(
        this._tmpField.lookUpCol?.entity ?? "",
        tmpOptions
      )
      .then(
        function success(result) {
          thisRef.PopulateData(result);
        },
        function (error) {
          console.log(error.message);
        }
      );
  };

  PopulateData = (result: any) => {
    let tmpData = [];
    for (var i = 0; i < result.entities.length; i++) {
      let tmpItem: any = {};
      tmpItem["select"] = "select";
      tmpItem[this._tmpField.lookUpCol?.primaryKey ?? ""] =
        result.entities[i][this._tmpField.lookUpCol?.primaryKey ?? ""];
      this._tmpField.lookUpCol?.fieldsToShow?.forEach((tmp: iField) => {
        if (tmp.name) {
          tmpItem[tmp.name] = result.entities[i][tmp.name];
        }
      });
      tmpData.push(tmpItem);
    }
    this.setState({ data: tmpData, showSpinner: false });
  };

  OpenCallOut = () => {
    this.setState({ calloutVisible: true });
  };
  CloseCallOut = () => {
    this.setState({ calloutVisible: false });
  };
  componentDidMount = () => {
    let thisref = this;
    if (this._tmpField.openSearchPanelOnKeyDown) {
      let txtSearchBox = document.getElementById(this._txtSearchId);

      txtSearchBox?.addEventListener("input", function (e) {
        txtSearchBox?.focus();
        thisref.OpenCallOut();
        thisref.SetFilter();
      });
    }
    this.LoadInitialData();
  };

  componentDidUpdate = () => {
    this.SetLookupText();
  };

  SetFilter = () => {
    let tmpSearchText =
      (document.getElementById(this._txtSearchId) as HTMLInputElement).value ??
      "";

    if (tmpSearchText) {
      let tmpFinalFilters: any = [];
      tmpFinalFilters.push({ field: "select", type: "=", value: "select" });

      let tmpFilters: any = [];

      this._tmpField.lookUpCol?.fieldsToShow?.forEach((tmp: iField) => {
        let tmpFilter: any = {};
        tmpFilter["field"] = tmp.name;
        tmpFilter["type"] = "like";
        tmpFilter["value"] = tmpSearchText;

        tmpFilters.push(tmpFilter);
      });
      tmpFinalFilters.push(tmpFilters);
      this.ref.table?.setFilter(tmpFinalFilters);
    } else {
      this.ref.table?.clearFilter();
    }
  };

  OnSearchClick = () => {
    this.setState({ data: [], showSpinner: true });
    this.OpenCallOut();
    let ddlView = document.getElementById(this._ddlView) as HTMLSelectElement;
    this.LoadData(this.state.selectedView);
  };

  SetEditability = (boolEditable: boolean) => {
    let divLookup = document.getElementById(this._divLookupId);
    let divTextbox = document.getElementById(this._divTextbox);
    let divValidations = document.getElementById(this._divValidations);

    if (boolEditable) {
      divLookup?.style.setProperty("display", "none");
      divTextbox?.style.setProperty("display", "inline");
      if (this._tmpField.validation?.type === "Required") {
        divValidations?.classList.remove("egmtValidationDivHide");
        divValidations?.classList.add("egmtValidationDiv");
      }
    } else {
      divLookup?.style.setProperty("display", "inline");
      divTextbox?.style.setProperty("display", "none");
      divValidations?.classList.remove("egmtValidationDiv");
      divValidations?.classList.add("egmtValidationDivHide");
    }
  };

  SetLookupText = () => {
    let linkLookupText = document.getElementById(this._linkLookupText);
    if (linkLookupText) linkLookupText.innerText = this.state.lookupText ?? "";
  };
  OnViewChange = () => {
    this.setState({ data: [], showSpinner: true });
    let ddlView = document.getElementById(this._ddlView) as HTMLSelectElement;
    this.setState({ selectedView: Number.parseInt(ddlView.value) });
    this.LoadData(Number.parseInt(ddlView.value));
  };
  OnNewClick = () => {
    let thisRef = this;
    this._context.navigation
      .openForm({
        entityName: this._tmpField.lookUpCol?.entity ?? "",
        useQuickCreateForm: true,
      })
      .then(
        function (success) {
          var lookupValue = new Array();
          lookupValue[0] = new Object();
          lookupValue[0].id = success.savedEntityReference[0].id;
          lookupValue[0].name = success.savedEntityReference[0].name;
          lookupValue[0].entityType = (success
            .savedEntityReference[0] as any).entityType;

          // @ts-ignore
          let tmpLookupField = Xrm.Page.getAttribute(thisRef._tmpField.name);
          tmpLookupField.setValue(lookupValue);

          thisRef.setState({
            lookupText: success.savedEntityReference[0].name,
            lookupId: success.savedEntityReference[0].id,
          });

          thisRef.SetEditability(false);
          thisRef.SetLookupText();
        },
        function (error) {
          console.log(error);
        }
      );
  };

  public render() {
    const options = {
      layoutColumnsOnNewData: true,
      tooltips: true, //show tool tips on cells
      addRowPos: "top", //when adding a new row, add it to the top of the table
      history: true, //allow undo and redo actions on the table
      resizableRows: true, //allow row order to be changed
      height: 590,
      pagination: "local",
      paginationSize: 10,
      placeholder: "No Data Available",
    };
    return (
      <div>
        <div>
          <div className="egmtCreateDivMain" id="divCreateDetail">
            <div className="egmtCreateDivWrapper">
              <div role="presentation" className="egmtCreateDiv">
                <div role="presentation" className="egmtCreateDiv2">
                  <div role="presentation" className="egmtCreateDiv9">
                    <div
                      className={
                        styles[this._tmpField?.focusControl ?? "focusControl"]
                      }
                    >
                      <span className="gridLookupContainer">
                        <div>
                          <div
                            className="glAutocomplete"
                            style={{ width: "100%" }}
                          >
                            <div className="glDisplayFlex">
                              <div
                                className="gridDivLeft"
                                id={this._divLookupId}
                              >
                                <div
                                  style={{ display: "inline" }}
                                  id="divMapped"
                                  className="glDivMapped"
                                >
                                  <ul className="glUL">
                                    <li className="glLi">
                                      <div role="link" className="glLinkLiv">
                                        <div>
                                          <span
                                            className={this._entitySymbol}
                                          ></span>
                                        </div>
                                        <div className="glText">
                                          <a
                                            className="glLink"
                                            id={this._linkLookupText}
                                            href="#"
                                          >
                                            {this.state.lookupText}
                                          </a>
                                        </div>
                                      </div>
                                      <button
                                        type="button"
                                        className="gl_button_close"
                                        onClick={() => {
                                          this.SetEditability(true);
                                        }}
                                      >
                                        <span className="gl_span">
                                          <span className="gl_span_span">
                                            <span className="gl_span_span_icon symbolFont Cancel-symbol"></span>
                                          </span>
                                        </span>
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div
                                className="gridDivLeft"
                                id={this._divTextbox}
                                style={{ display: "none" }}
                              >
                                <input
                                  id={this._txtSearchId}
                                  type="text"
                                  className="glInput"
                                  name={this._txtSearchId}
                                  autoComplete="off"
                                  placeholder={this._placeHolder}
                                  title={this._placeHolder}
                                ></input>
                              </div>
                              <div className="gridDivRight">
                                <button
                                  id="btnSearch"
                                  className="gl_button"
                                  onClick={() => {
                                    this.OnSearchClick();
                                  }}
                                >
                                  <span className="gl_span">
                                    <span className="gl_span_span">
                                      <span className="gl_span_span_icon symbolFont SearchButton-symbol"></span>
                                    </span>
                                  </span>
                                </button>
                              </div>
                            </div>

                            <div>
                              <div>
                                {this.state.calloutVisible && (
                                  <Callout
                                    className={styles.callout}
                                    ariaLabelledBy="callout-label"
                                    ariaDescribedBy="callout-description"
                                    role="alertdialog"
                                    gapSpace={0}
                                    target={`.${
                                      styles[
                                        this._tmpField.focusControl ??
                                          "focusControl"
                                      ]
                                    }`}
                                    onDismiss={this.CloseCallOut}
                                    setInitialFocus
                                  >
                                    <table className="glTable">
                                      <thead className="glThead">
                                        <td colSpan={2}>
                                          <table>
                                            <tr>
                                              <td>
                                                {this._tmpField
                                                  .openSearchPanelOnKeyDown && (
                                                  <input
                                                    className="glDummyTextBox"
                                                    id={this._txtDummyId}
                                                    onFocus={() => {
                                                      document
                                                        .getElementById(
                                                          this._txtSearchId
                                                        )
                                                        ?.focus();
                                                    }}
                                                  ></input>
                                                )}
                                              </td>
                                              <td>
                                                {this._recordsThreshHoldLimit >
                                                  0 &&
                                                  this.state.data.length >=
                                                    this
                                                      ._recordsThreshHoldLimit && (
                                                    <div className="WarningToopBarDiv">
                                                      <div className="warningIcon"></div>
                                                      <div>
                                                        More than
                                                        {this._tmpField.recordsThreshHoldLimit?.toString()}{" "}
                                                        records found. If you do
                                                        not find desired result,
                                                        narrow down your search.
                                                      </div>
                                                    </div>
                                                  )}
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </thead>

                                      {this.state.showSpinner && (
                                        <tr>
                                          <td
                                            colSpan={2}
                                            align="center"
                                            className="tdSpinner"
                                          >
                                            <Loader
                                              type="Bars"
                                              color="#00BFFF"
                                              height={40}
                                              width={40}
                                            />
                                          </td>
                                        </tr>
                                      )}

                                      <tr>
                                        <td colSpan={2} className="tdGrid">
                                          {!this.state.showSpinner && (
                                            <ReactTabulator
                                              options={options}
                                              ref={(ref) => (this.ref = ref)}
                                              columns={this._columns}
                                              data={this.state.data}
                                              data-custom-attr="test-custom-attribute"
                                              className="custom-css-class-lookup"
                                            />
                                          )}
                                        </td>
                                      </tr>

                                      <tr className="glFooter">
                                        <td align="left">
                                          <button
                                            id="btnSearch"
                                            className="gl_button_new"
                                            onClick={() => {
                                              this.OnNewClick();
                                            }}
                                          >
                                            <span className="gl_span">
                                              <span className="gl_span_span">
                                                <span className="glNewFont glFont600 gl_span_span_icon symbolFont New-symbol"></span>
                                              </span>
                                              <span className="glFont600 editable_grid_actions_span_span_label">
                                                {this._tmpField.newRecordText ??
                                                  "New"}
                                              </span>
                                            </span>
                                          </button>
                                        </td>
                                        <td align="right">
                                          <select
                                            className="glViewSelectList"
                                            id={this._ddlView}
                                            onChange={() => {
                                              this.OnViewChange();
                                            }}
                                          >
                                            {this._tmpField.lookUpCol?.views?.map(
                                              (view: iView) => (
                                                <option
                                                  value={view.id}
                                                  selected={view.isDefault}
                                                >
                                                  {view.name}
                                                </option>
                                              )
                                            )}
                                          </select>
                                        </td>
                                      </tr>
                                    </table>
                                  </Callout>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="egmtValidationDivHide" id={this._divValidations}>
            <div className="errorIcon"></div>
            <span className="egmtValidationMsg">
              {this._tmpField.validation?.message}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
export default CalloutControlComponent;
