import { IInputs } from "../generated/ManifestTypes";

export interface IAppConfig {
  readonly Context: ComponentFramework.Context<IInputs>;
  config: any;
}
