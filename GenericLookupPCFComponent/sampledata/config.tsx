let GetSampleConfig = function () {
  return {
    config: {
      name: "msp_accountid",
      validation: {
        type: "Required",
        message: "Required fields must be filled in.",
      },
      // exterCall: {
      //   webResource: "new__LookupExternalAPI",
      // },
      focusControl: "focusControl1",
      openSearchPanelOnKeyDown: false,
      recordsThreshHoldLimit: 10,
      newRecordText: "Create New Account",
      lookUpCol: {
        entity: "account",
        schemaName: "msp_AccountId",
        pageUrl:
          "https://msxopportunity.crm.dynamics.com/main.aspx?appid=d94b8414-0def-e811-a84c-000d3a36bda1&forceUCI=1&pagetype=entityrecord&etn=account&cmdbar=false&navbar=off&id=",
        primaryKey: "accountid",
        primaryFeild: "name",
        fitlerTextFields: [
          { name: "name", displayText: "Name" },
          { name: "address1_city", displayText: "City" },
        ],
        fieldsToShow: [
          { name: "name", displayText: "Name" },
          { name: "msp_accountnumber", displayText: "GlobalCRMId" },
          { name: "address1_city", displayText: "City" },
        ],
        views: [
          {
            id: 0,
            name: "All Account",
          },
          {
            id: 1,
            name: "My Accounts",
            fetchXml:
              "<?xml version='1.0'?><fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'><entity name='account'><attribute name='name'/><attribute name='msp_accountnumber'/><attribute name='address1_city'/><order attribute='name' descending='false'/><filter type='and'><condition attribute='ownerid' operator='eq-userid'/><condition attribute='statecode' operator='eq' value='0'/><MORECONDITIONS/></filter></filter><link-entity name='territory' from='territoryid' to='territoryid' visible='false' link-type='outer' alias='a_dc1e371470094576a817a020427550c8'><attribute name='msp_accountteamunitname'/></link-entity></entity></fetch>",
          },
        ],
      },
    },
  };
};
export default GetSampleConfig;
