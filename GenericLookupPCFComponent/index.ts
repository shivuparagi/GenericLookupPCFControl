import { IInputs, IOutputs } from "./generated/ManifestTypes";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;
import * as React from "react";
import * as ReactDOM from "react-dom";
import iPropsInput from "./interfaces/iPropsInput";
import CalloutControlComponent from "./components/CalloutControlComponent";

export class GenericLookupPCFComponent implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private _container: HTMLDivElement;
	private _context: ComponentFramework.Context<IInputs>;
	private _optionSets: any[];
	private _config: any;
  
	private props: iPropsInput = {
	  context: this._context,
	  optionSets: this._optionSets,
	  gridConfig: this._config,
	};
	constructor() {}
  
	public init(
	  context: ComponentFramework.Context<IInputs>,
	  notifyOutputChanged: () => void,
	  state: ComponentFramework.Dictionary,
	  container: HTMLDivElement
	) {
	  this._container = container;
	  this._context = context;
	}
  
	public async updateView(context: ComponentFramework.Context<IInputs>) {
	  this._context = context;
	  this.props.context = this._context;
	  ReactDOM.render(React.createElement(CalloutControlComponent, this.props),this._container);
	}
  
	/**
	 * It is called by the framework prior to a control receiving new data.
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs {
	  return {};
	}
  
	/**
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void {
	  // Add code to cleanup control if necessary
	}
}