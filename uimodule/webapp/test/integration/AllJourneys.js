sap.ui.define([
  "sap/ui/test/Opa5",
  "eu/kuhnchris/artviewer/artViewer/test/integration/arrangements/Startup",
  "eu/kuhnchris/artviewer/artViewer/test/integration/BasicJourney"
], function(Opa5, Startup) {
  "use strict";

  Opa5.extendConfig({
    arrangements: new Startup(),
    pollingInterval: 1
  });

});
