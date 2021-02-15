import { IInputs } from "../generated/ManifestTypes";
import iField from "./iField";
import iView from "./iView";
export default interface iLookupFieldDefinition {
  entity?: string;
  primaryKey?: string;
  primaryFeild?: string;
  pageUrl?: string;
  fitlerTextFields?: iField[];
  fieldsToShow?: iField[];
  views?: iView[];
}
