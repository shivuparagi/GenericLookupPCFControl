let GetSampleConfig = function () {
  return {
    config: {
      name: "accountid",
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
        pageUrl:"",
        primaryKey: "accountid",
        primaryFeild: "name",
        fitlerTextFields: [
          { name: "name", displayText: "Name" },
          { name: "address1_city", displayText: "City" },
        ],
        fieldsToShow: [
          { name: "name", displayText: "Name" },
          { name: "accountnumber", displayText: "CRMNumber" },
          { name: "address1_city", displayText: "City" },
        ],
        views: [
          {
            id: 0,
            name: "All Account",
          },
        ],
      },
    },
  };
};
export default GetSampleConfig;
