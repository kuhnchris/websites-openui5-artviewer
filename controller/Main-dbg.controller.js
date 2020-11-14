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
        var dStr = e.substr(0, 8);
        var dDate = new Date(dStr.substr(4, 2) + "." + dStr.substr(6, 2) + "." + dStr.substr(0, 4));
        var nameOut = dDate.toLocaleDateString();
        if (nameOut === "Invalid Date")
          nameOut = e.substr(0, e.length-0-4);
        else
          nameOut = "Art-Practice: "+ nameOut;
        var thumb = "/art/"+e.substr(0, e.length-4)+"_thumb.png";

        newJson.files.push({ URL: "/art/" + e, Filename: e, Date: dDate, Name: nameOut, Thumbnail: thumb});
      });

      this._oViewer = this.byId("viewerJSObj");
      var ownerSelect = this.getOwnerComponent().getModel("selected");
      this.setModel(ownerSelect, "selected");
      var m = new sap.ui.model.json.JSONModel(newJson);
      this.setModel(m);

      this.getRouter().getRoute("ToImage").attachPatternMatched(this._onNavToImage, this);
    },
    _onNavToImage: function(oEvent){
      var objParam = oEvent.getParameter("arguments").name;
      this.pageParam = objParam;
    },
    onAfterRendering: function(){
      if (this.pageParam !== undefined)
      {
        var bObj = this.getModel().getObject("/");
        bObj.files.forEach((v)=>{
          if (v.Filename === this.pageParam+".png"){
            this.getModel("selected").setData(v);
            this._oViewer.show();
          }
        });
      }
    },
    showArt: function(oEvent){
      this.getModel("selected").setData(oEvent.getParameter("listItem").getBindingContext().getObject());
      this._oViewer.show();
    }
  });
});
