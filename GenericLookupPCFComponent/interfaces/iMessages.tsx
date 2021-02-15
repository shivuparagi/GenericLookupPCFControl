import iValidationError from "./iMessage";
import iMessage from "./iMessage";

export default interface iMessages {
  validations: iMessage[];
  warnings: iMessage[];
}
