sap.ui.define([
  "sap/ui/core/UIComponent",
  "sap/ui/Device",
  "eu/kuhnchris/artviewer/artViewer/model/models"
], function(UIComponent, Device, models) {
  "use strict";

  return UIComponent.extend("eu.kuhnchris.artviewer.artViewer.Component", {

    metadata: {
      manifest: "json"
    },

    /**
     * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
     * @public
     * @override
     */
    init: function() {
      // call the base component's init function
      UIComponent.prototype.init.apply(this, arguments);

      // enable routing
      this.getRouter().initialize();

      // set the device model
      this.setModel(models.createDeviceModel(), "device");
      var rawListModel = new sap.ui.model.json.JSONModel();
      this.setModel(rawListModel, "rawList");
      rawListModel.loadData("/art/list.json", {}, false);
      this.setModel(new sap.ui.model.json.JSONModel({
        Filename: "",
        Name: "",
        URL: ""
       }), "selected");
    }
  });
});
