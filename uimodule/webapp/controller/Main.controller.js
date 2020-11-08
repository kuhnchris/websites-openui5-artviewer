sap.ui.define([
  "eu/kuhnchris/artviewer/artViewer/controller/BaseController"
], function (Controller) {
  "use strict";

  return Controller.extend("eu.kuhnchris.artviewer.artViewer.controller.Main", {
    onInit: function () {
      var raw = this.getOwnerComponent().getModel("rawList");
      var rawArr = raw.getObject("/");
      var newJson = { "files": [] };
      rawArr.forEach(e => {
        var dStr = e.substr(3, 8);
        var dDate = new Date(dStr.substr(6, 2) + "." + dStr.substr(4, 2) + "." + dStr.substr(0, 4));
        newJson.files.push({ URL: "./art/" + e.substr(3), Filename: e.substr(3), Date: dDate, Name: "Art-Practice: "+dDate.toLocaleDateString() });
      });

      var m = new sap.ui.model.json.JSONModel(newJson);
      this.setModel(m);
      this.setModel(new sap.ui.model.json.JSONModel({ "layout": "OneColumn" }), "appView");
      this.getModel("appView").setProperty("/layout", "OneColumn");
    }

  });
});
