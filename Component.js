sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","eu/kuhnchris/artviewer/artViewer/model/models"],function(e,t,i){"use strict";return e.extend("eu.kuhnchris.artviewer.artViewer.Component",{metadata:{manifest:"json"},init:function(){e.prototype.init.apply(this,arguments);this.getRouter().initialize();this.setModel(i.createDeviceModel(),"device");var t=new sap.ui.model.json.JSONModel;this.setModel(t,"rawList");t.loadData("./art/list.json",{},false);this.setModel(new sap.ui.model.json.JSONModel({Filename:"",Name:"",URL:""}),"selected")}})});