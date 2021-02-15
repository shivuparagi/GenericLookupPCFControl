import iCreateValidation from "./iCreateValidation";
import iExternalCall from "./iExternalCall";
import iLookupFieldDefinition from "./iLookupFieldDefinition";

export default interface iCreateField {
  name?: string;
  displayText?: string;
  dataType?: string;
  validation?: iCreateValidation;
  lookUpCol?: iLookupFieldDefinition;
  exterCall?: iExternalCall;
  openSearchPanelOnKeyDown?: boolean;
  recordsThreshHoldLimit?: number;
  newRecordText?: string;
  focusControl?: string;
  entitySymbol?: string;
}
