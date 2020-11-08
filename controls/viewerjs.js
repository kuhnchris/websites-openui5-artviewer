sap.ui.define(["sap/ui/core/Control"],function(e){return e.extend("eu.kuhnchris.artviewer.artViewer.controls.viewerjs",{metadata:{properties:{url:{type:"string",defaultValue:""}},aggregations:{}},init:function(){var e=jQuery.sap.getModulePath("eu.kuhnchris.artviewer.artViewer.controls");jQuery.sap.includeScript(e+"/libs/viewer.js");jQuery.sap.includeStyleSheet(e+"/libs/viewer.css");jQuery.sap.includeStyleSheet(e+"/viewerjs.css")},renderer:function(e,r){e.write("<img");e.writeControlData(r);e.writeAttribute("src",r.getUrl());e.addClass("viewerjs_img_elem");e.writeClasses(r);e.write(">");if(r.getDomRef()!==null){if(r.viewer===undefined)r.viewer=new Viewer(r.getDomRef(),{inline:false,container:r.getParent().getDomRef(),url:()=>r.getUrl()})}if(r.shouldShow!==undefined&&r.shouldShow){r.viewer.show();r.shouldShow=false}else{r.shouldShow=false}},onAfterRendering:function(){if(sap.ui.core.Control.prototype.onAfterRendering){sap.ui.core.Control.prototype.onAfterRendering.apply(this,arguments)}},show:function(){if(this.viewer===undefined||this.viewer===null)this.shouldShow=true;else this.viewer.show()}})});