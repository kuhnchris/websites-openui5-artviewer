sap.ui.define([
  "sap/ui/test/Opa5"
], function(Opa5) {
  "use strict";

  return Opa5.extend("eu.kuhnchris.artviewer.artViewer.test.integration.arrangements.Startup", {

    iStartMyApp: function () {
      this.iStartMyUIComponent({
        componentConfig: {
          name: "eu.kuhnchris.artviewer.artViewer",
          async: true,
          manifest: true
        }
      });
    }

  });
});
