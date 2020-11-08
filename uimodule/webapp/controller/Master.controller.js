sap.ui.define([
  "eu/kuhnchris/artviewer/artViewer/controller/BaseController"
], function(Controller) {
  "use strict";

  return Controller.extend("eu.kuhnchris.artviewer.artViewer.controller.Master", {
    onInit: function(){
    },
    showArt: function(oEvent){
      // set the layout property of FCL control to show two columns
      var a1 = oEvent.getParameter("listItem").getBindingContext().getObject();
      var ownerSelect = this.getOwnerComponent().getModel("selected");

      this.getModel("appView").setProperty("/layout", "TwoColumnsMidExpanded");
      ownerSelect.setData(a1);

			this.getRouter().navTo("object", {
				key: a1.Filename
			}, true);
    }

  });
});
