import * as React from "react";
import * as ReactDOM from "react-dom";
import iMessage from "../interfaces/iMessage";
import iMessages from "../interfaces/iMessages";

class ValidationMessages extends React.Component<iMessages> {
  state = {
    expandValidations: false,
  };
  expandValidationSection = (e: any) => {
    if (e.keyCode === undefined || e.keyCode === 13)
      this.setState({ expandValidations: !this.state.expandValidations });
  };
  render() {
    return (
      <div>
        <div
          className={`SaveStatusBarDiv btn-toolbar ${
            this.props.validations.length > 0 ? "ShowElement" : "HideElement"
          }`}
        >
          <div
            tabIndex={0}
            className="SaveFailure ErrorMessageHeader"
            onClick={this.expandValidationSection}
            onKeyDown={this.expandValidationSection}
          >
            <div className="errorIcon"></div>
            <div role="alert" aria-live="assertive">
              You have {this.props.validations.length} notifications. Select to
              view.
            </div>
          </div>
          <div
            tabIndex={0}
            className={`${
              this.state.expandValidations ? "ShowElementBlock" : "HideElement"
            }`}
          >
            <div>
              {this.props.validations.map((e: iMessage) => (
                <div className="ErrorMessagesDiv">
                  <div className="errorIcon"></div>
                  <div role="alert" aria-live="assertive">
                    {e.message}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`SaveStatusBarDiv btn-toolbar ${
            this.props.warnings.length > 0 ? "ShowElement" : "HideElement"
          }`}
        >
          <div
            tabIndex={0}
            className="SaveWarning ErrorMessageHeader"
            onClick={this.expandValidationSection}
            onKeyDown={this.expandValidationSection}
          >
            <div className="warningIcon"></div>
            <div role="alert" aria-live="assertive">
              You have {this.props.warnings.length} notifications. Select to
              view.
            </div>
          </div>
          <div
            tabIndex={0}
            className={`${
              this.state.expandValidations ? "ShowElementBlock" : "HideElement"
            }`}
          >
            <div>
              {this.props.warnings.map((e: iMessage) => (
                <div className="ErrorMessagesDiv">
                  <div className="warningIcon"></div>
                  <div role="alert" aria-live="assertive">
                    {e.message}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ValidationMessages;
