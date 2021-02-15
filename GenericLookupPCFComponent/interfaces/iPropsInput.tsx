import { IInputs } from "../generated/ManifestTypes";
export default interface iPropsInput {
  context: ComponentFramework.Context<IInputs>;
  optionSets: any[];
  gridConfig: any;
  hygiene?: any;
}
