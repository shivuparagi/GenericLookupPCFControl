# Generic Lookup PCF Control
## Summary
Using this PCF (Power Component Framework) control, you can have customized Lookup Control in D365 Modern Apps. It is robust, configurable, and extendable. You can use the [managed](/GenericLookupPCFSolution/bin/Release/GenericLookupPCFSolution_managed.zip)  or the [unmanaged](/GenericLookupPCFSolution/bin/Release/GenericLookupPCFSolution.zip) solution files if you do not wish to compile control manually.

## Configuration
Since PCF on lookup control is not yet supported, we are achieving this by creating a dummy field (a type of SingleLine) and bind this PCF control to the dummy field. The lookup control will be configured under the configurations. Make sure to add the actual lookup field on the form and **hide** it. This PCF control will set its value as soon as a record is selected. You can use the same dummy field for any number of lookup fields on the form.

## Sample Screenshots
| Working Solution      | Configuration |
| :---        |    :----:   |
|[![Generic Lookup PCF Control](/src/RM.gif)](https://youtu.be/FrKFTgZWkkk "Generic Lookup PCF Control")   | <img src="src/FieldConfigurations.png">       |

## Sample Config

Find sample config files under [Sample Configurations](/GenericLookupPCFComponent/sampledata). 

Note: 
1. As of now, the configuration needs to be provided as part of the property **ConfigJSON**
2. You can also call external APIs and apply your business logic and return a valid result set. Attaching such sample config for your reference for (**PrimanySponson.json** and web resource **LookupExternalAPI.js**)
3. "fetchXml" is case sensitive. Keep it as "fetchXml" only.
4. Remove all comments from config json. Very important.

<img src="src/config.png">

## Work Around to increase the Text Area Max Length of ConfigJSON

1. Go to Developer Tools (F12 or Ctrl+Shift+J)
2. Inspect the **ConfigJSON** textbox and increase the max length of text area as shown below

<img src="src/WorkAroundToIncreaseSizeOfConfigTextArea.png">
