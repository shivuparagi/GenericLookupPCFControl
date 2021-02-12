# Generic Lookup PCF Control
## Summary
Using this PCF (Power Component Framework) control, you can have customized Lookup Control in D365 Modern Apps. It is robust, configurable and extendable. You can use the managed or the unmanaged solution files if you do not wish to compile control manaully.

## Configuration
Since PCF on lookup control is not yet supported, we are acheiving this by creating dummy field (type of SingleLine) and bind this PCF control to the dummy field. The lookup control will be configured under the configurations. Make sure to add the actual lookup field on the form and **hide** it. This PCF control will set its value as soon as record is selected.

![alt text](src/GenericLookupPCF.gif)
