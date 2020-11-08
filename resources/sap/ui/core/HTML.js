/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/base/Log","./Control","./RenderManager","./HTMLRenderer","sap/base/security/sanitizeHTML"],function(e,t,n,r,i,s){"use strict";var o=r.RenderPrefixes;var a=n.extend("sap.ui.core.HTML",{metadata:{library:"sap.ui.core",properties:{content:{type:"string",group:"Misc",defaultValue:null},preferDOM:{type:"boolean",group:"Misc",defaultValue:true},sanitizeContent:{type:"boolean",group:"Misc",defaultValue:false},visible:{type:"boolean",group:"Appearance",defaultValue:true}},events:{afterRendering:{parameters:{isPreservedDOM:{type:"boolean"}}}}}});a.prototype.getDomRef=function(e){var t=e?this.getId()+"-"+e:this.getId();return document.getElementById(o.Dummy+t)||document.getElementById(t)};a.prototype.setContent=function(n){function r(t){if(e.parseHTML){var n=e.parseHTML(t);if(n){var r=0,i=n.length;while(r<i&&n[r].nodeType!=1){r++}while(r<i&&n[i-1].nodeType!=1){i--}if(r>0||i<n.length){n=n.slice(r,i)}return e(n)}}return e(t)}if(this.getSanitizeContent()){t.trace("sanitizing HTML content for "+this);n=s(n)}this.setProperty("content",n,true);if(this.getDomRef()){var i=r(this.getContent());e(this.getDomRef()).replaceWith(i);this._postprocessNewContent(i)}else{this.invalidate()}return this};a.prototype.setSanitizeContent=function(e){this.setProperty("sanitizeContent",e,true);if(e){this.setContent(this.getContent())}return this};a.prototype.onBeforeRendering=function(){if(!this.getPreferDOM()){return}var e=this.getDomRef();if(e&&!r.isPreservedContent(e)){for(var t=e.id,n;e&&e.getAttribute("data-sap-ui-preserve")==t;e=n){n=e.nextElementSibling;r.preserveContent(e,true,false)}}};a.prototype.onAfterRendering=function(){if(!this.getVisible()){return}var t=e(document.getElementById(o.Dummy+this.getId()));var n=r.findPreservedContent(this.getId());var i;var s=false;if(!this.getPreferDOM()||n.length==0){n.remove();i=new e(this.getContent());t.replaceWith(i)}else if(n.length>0){t.replaceWith(n);i=n;s=true}else{t.remove()}this._postprocessNewContent(i);this.fireAfterRendering({isPreservedDOM:s})};a.prototype._postprocessNewContent=function(e){if(e&&e.length>0){if(e.length>1){t.warning("[Unsupported Feature]: "+this+" has rendered "+e.length+" root nodes!")}else{var n=e.attr("id");if(n&&n!=this.getId()){t.warning("[Unsupported Feature]: Id of HTML Control '"+this.getId()+"' does not match with content id '"+n+"'!")}}if(this.getPreferDOM()){r.markPreservableContent(e,this.getId())}if(e.find("#"+this.getId().replace(/(:|\.)/g,"\\$1")).length===0){e.filter(":not([id])").first().attr("id",this.getId())}}else{t.debug(""+this+" is empty after rendering, setting bOutput to false");this.bOutput=false}};a.prototype.setDOMContent=function(t){var n=e(t);if(this.getDomRef()){e(this.getDomRef()).replaceWith(n);this._postprocessNewContent(n)}else{n.appendTo(r.getPreserveAreaRef());if(this.getUIArea()){this.getUIArea().invalidate()}this._postprocessNewContent(n)}return this};a.prototype.setTooltip=function(){t.warning("The sap.ui.core.HTML control doesn't support tooltips. Add the tooltip to the HTML content instead.");return n.prototype.setTooltip.apply(this,arguments)};"hasStyleClass addStyleClass removeStyleClass toggleStyleClass".split(" ").forEach(function(e){a.prototype[e]=function(){t.warning("The sap.ui.core.HTML control doesn't support custom style classes. Manage custom CSS classes in the HTML content instead.");return n.prototype[e].apply(this,arguments)}});return a});