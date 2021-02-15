import { IAppConfig } from "./appConfig.types";
import { IInputs } from "../generated/ManifestTypes";
export namespace AppConfig {
  export var Configuration: IAppConfig;
  /* istanbul ignore next */
  export async function intialize(
    context: ComponentFramework.Context<IInputs>
  ) {
    var webresourceName = context.parameters.ConfigFileName.raw
      ? context.parameters.ConfigFileName.raw.toString()
      : "msp_editable_grid_config";

    var jsonConfig: any = {};
    if (webresourceName) {
      var webResources = await context.webAPI
        .retrieveMultipleRecords(
          "webresource",
          "?$filter=name eq '" + webresourceName + "'&$top=1"
        )
        .catch((error) => {
          console.error(
            "Not able to read editable grid configuration from file: " +
              webresourceName +
              ", Error : " +
              error.message
          );
        });
      if (webResources && webResources.entities && webResources.entities[0]) {
        var config = webResources.entities[0];
        jsonConfig = JSON.parse(atob(config.content));
      }
    }

    Configuration = {
      Context: context,
      config: jsonConfig,
    };
  }
}
