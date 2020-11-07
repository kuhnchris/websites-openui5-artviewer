sap.ui.define([
  "eu/kuhnchris/artviewer/artViewer/controller/BaseController"
], function(Controller) {
  "use strict";

  return Controller.extend("eu.kuhnchris.artviewer.artViewer.controller.Main", {
    onInit: function(){
      var m = new sap.ui.model.json.JSONModel({
       "files": [
         {
         Filename: "20200711.jpg",
         Name: "Art @ 11.Aug 2020",
         URL: "./20200711.jpg"
        }
       ]
      });
      this.setModel(m);
      this.byId("selectedGrid").setVisible(false);
      this.setModel(new sap.ui.model.json.JSONModel({layout: ""}), "appview");
      this.getModel("appView").setProperty("/layout", "OneColumn");
    }

  });
});
