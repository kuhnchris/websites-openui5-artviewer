sap.ui.define(["sap/ui/core/Control"],function(e){return e.extend("eu.kuhnchris.artviewer.artViewer.controls.viewerjs",{metadata:{properties:{url:{type:"string",defaultValue:""}},aggregations:{}},init:function(){var e=jQuery.sap.getModulePath("eu.kuhnchris.artviewer.artViewer.controls");this.loadPromise=new Promise((i,r)=>{jQuery.sap.includeScript(e+"/libs/viewer.js","viewerJSLoader",()=>{i()},()=>{r()})});jQuery.sap.includeStyleSheet(e+"/libs/viewer.css");jQuery.sap.includeStyleSheet(e+"/viewerjs.css")},renderer:function(e,i){e.write("<img");e.writeControlData(i);e.writeAttribute("src",i.getUrl());e.addClass("viewerjs_img_elem");e.writeClasses(i);e.write(">");if(i.getDomRef()!==null){if(i.viewer===undefined)i.loadPromise.then(()=>{i.viewer=new Viewer(i.getDomRef(),{inline:false,container:i.getParent().getDomRef(),url:()=>i.getUrl()});if(i.shouldShow!==undefined&&i.shouldShow){i.viewer.show();i.shouldShow=false}})}if(i.viewer!==undefined){if(i.shouldShow!==undefined&&i.shouldShow){i.viewer.show();i.shouldShow=false}else{i.shouldShow=false}}},onAfterRendering:function(){if(sap.ui.core.Control.prototype.onAfterRendering){sap.ui.core.Control.prototype.onAfterRendering.apply(this,arguments)}},show:function(){if(this.viewer===undefined||this.viewer===null)this.shouldShow=true;else this.viewer.show()}})});