sap.ui.define([
  "eu/kuhnchris/artviewer/artViewer/controller/BaseController"
], function(Controller) {
  "use strict";

  return Controller.extend("eu.kuhnchris.artviewer.artViewer.controller.Master", {
    onInit: function(){
      var ownerSelect = this.getOwnerComponent().getModel("selected");
      this.setModel(ownerSelect);


    }

  });
});
