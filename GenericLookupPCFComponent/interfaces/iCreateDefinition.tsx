import { IInputs } from "../generated/ManifestTypes";
import iLookupFieldDefinition from "./iLookupFieldDefinition";

export default interface iCreateDefinition {
  lookupField?: iLookupFieldDefinition;
  context?: ComponentFramework.Context<IInputs>;
  optionSets: any[];
  gridConfig: any;
}
