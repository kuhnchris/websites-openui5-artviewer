/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/IconPool","sap/m/TextArea","sap/m/Button","./FeedInputRenderer","sap/ui/thirdparty/jquery","sap/base/security/URLWhitelist","sap/base/security/sanitizeHTML"],function(e,t,s,r,o,i,a,n,u){"use strict";var l=e.ButtonType;var p=15,h=2,g=0;var c=t.extend("sap.m.FeedInput",{metadata:{library:"sap.m",designtime:"sap/m/designtime/FeedInput.designtime",properties:{enabled:{type:"boolean",group:"Behavior",defaultValue:true},rows:{type:"int",group:"Appearance",defaultValue:2},showExceededText:{type:"boolean",group:"Behavior",defaultValue:false},maxLength:{type:"int",group:"Behavior",defaultValue:0},growing:{type:"boolean",group:"Behavior",defaultValue:false},growingMaxLines:{type:"int",group:"Behavior",defaultValue:0},placeholder:{type:"string",group:"Appearance",defaultValue:"Post something here"},value:{type:"string",group:"Data",defaultValue:null},icon:{type:"sap.ui.core.URI",group:"Data",defaultValue:null},showIcon:{type:"boolean",group:"Behavior",defaultValue:true},iconDensityAware:{type:"boolean",group:"Appearance",defaultValue:true},buttonTooltip:{type:"sap.ui.core.TooltipBase",group:"Accessibility",defaultValue:"Submit"},ariaLabelForPicture:{type:"string",group:"Accessibility",defaultValue:null}},events:{post:{parameters:{value:{type:"string"}}}}}});var d={ATTRIBS:{style:1,class:1,"a::href":1,"a::target":1},ELEMENTS:{a:{cssClass:"sapMLnk"},abbr:1,blockquote:1,br:1,cite:1,code:1,em:1,h1:{cssClass:"sapMTitle sapMTitleStyleH1"},h2:{cssClass:"sapMTitle sapMTitleStyleH2"},h3:{cssClass:"sapMTitle sapMTitleStyleH3"},h4:{cssClass:"sapMTitle sapMTitleStyleH4"},h5:{cssClass:"sapMTitle sapMTitleStyleH5"},h6:{cssClass:"sapMTitle sapMTitleStyleH6"},p:1,pre:1,strong:1,span:1,u:1,dl:1,dt:1,dd:1,ol:1,ul:1,li:1}};c.prototype._renderingRules=d;function y(e,t){var s,r,o=e==="a";var i=this._renderingRules.ELEMENTS[e].cssClass||"";for(var a=0;a<t.length;a+=2){s=t[a];r=t[a+1];if(!this._renderingRules.ATTRIBS[s]&&!this._renderingRules.ATTRIBS[e+"::"+s]){t[a+1]=null;continue}if(s=="href"){if(!n.validate(r)){t[a+1]="#";o=false}}if(s=="target"){o=false}if(i&&s.toLowerCase()=="class"){t[a+1]=i+" "+r;i=""}}if(o){t.push("target");t.push("_blank")}if(i){t.push("class");t.push(i)}return t}function f(e,t){return y.call(this,e,t)}c.prototype._sanitizeHTML=function(e){return u(e,{tagPolicy:f.bind(this),uriRewriter:function(e){if(n.validate(e)){return e}}})};c.prototype.init=function(){var e=sap.ui.getCore().getLibraryResourceBundle("sap.m");this.setProperty("placeholder",e.getText("FEEDINPUT_PLACEHOLDER"),true);this.setProperty("buttonTooltip",e.getText("FEEDINPUT_SUBMIT"),true)};c.prototype.exit=function(){if(this._oTextArea){this._oTextArea.destroy()}if(this._oButton){this._oButton.destroy()}if(this._oImageControl){this._oImageControl.destroy()}};c.prototype.setIconDensityAware=function(e){this.setProperty("iconDensityAware",e,true);var t=sap.ui.require("sap/m/Image");if(this._getImageControl()instanceof t){this._getImageControl().setDensityAware(e)}return this};c.prototype.setRows=function(e){var t=this.getProperty("growingMaxLines");if(e>p){e=p}else if(e<h){e=h}if(e>t&&t!==0){this.setProperty("growingMaxLines",e,true);this._getTextArea().setGrowingMaxLines(e)}this.setProperty("rows",e,true);this._getTextArea().setRows(e);return this};c.prototype.setShowExceededText=function(e){this.setProperty("showExceededText",e,true);this._getTextArea().setShowExceededText(e);return this};c.prototype.setMaxLength=function(e){this.setProperty("maxLength",e,true);this._getTextArea().setMaxLength(e);return this};c.prototype.setGrowing=function(e){this.setProperty("growing",e,true);this._getTextArea().setGrowing(e);return this};c.prototype.setGrowingMaxLines=function(e){var t=this.getProperty("rows");if(e!==g){if(e<t){e=t}else if(e>p){e=p}}this.setProperty("growingMaxLines",e,true);this._getTextArea().setGrowingMaxLines(e);return this};c.prototype.setValue=function(e){this.setProperty("value",e,true);this._getTextArea().setValue(e);this._enablePostButton();return this};c.prototype.setPlaceholder=function(e){this.setProperty("placeholder",e,true);this._getTextArea().setPlaceholder(e);return this};c.prototype.setEnabled=function(e){this.setProperty("enabled",e,true);if(this.getDomRef("outerContainer")){if(e){this.getDomRef("outerContainer").classList.remove("sapMFeedInDisabled")}else{this.getDomRef("outerContainer").classList.add("sapMFeedInDisabled")}}this._getTextArea().setEnabled(e);this._enablePostButton();return this};c.prototype.setButtonTooltip=function(e){this.setProperty("buttonTooltip",e,true);this._getPostButton().setTooltip(e);return this};c.prototype._getTextArea=function(){var e=this;if(!this._oTextArea){this._oTextArea=new r(this.getId()+"-textArea",{value:this.getValue(),maxLength:this.getMaxLength(),placeholder:this.getPlaceholder(),growing:this.getGrowing(),growingMaxLines:this.getGrowingMaxLines(),showExceededText:this.getShowExceededText(),rows:this.getRows(),liveChange:a.proxy(function(e){var t=e.getParameter("value");this.setProperty("value",t,true);this._enablePostButton()},this)});this._oTextArea.setParent(this);this._oTextArea.addEventDelegate({onAfterRendering:function(){e.$("counterContainer").empty();e.$("counterContainer").html(e._oTextArea.getAggregation("_counter").$())}})}return this._oTextArea};c.prototype._getPostButton=function(){if(!this._oButton){this._oButton=new o(this.getId()+"-button",{enabled:false,type:l.Default,icon:"sap-icon://feeder-arrow",tooltip:this.getButtonTooltip(),press:a.proxy(function(){this._oTextArea.focus();this.firePost({value:this._sanitizeHTML(this.getValue())});this.setValue(null)},this)});this._oButton.setParent(this)}return this._oButton};c.prototype._enablePostButton=function(){var e=this._isControlEnabled();var t=this._getPostButton();t.setEnabled(e)};c.prototype._isControlEnabled=function(){var e=this.getValue();return this.getEnabled()&&a.type(e)==="string"&&e.trim().length>0};c.prototype._getImageControl=function(){var t=this.getIcon()||s.getIconURI("person-placeholder"),r=this.getId()+"-icon",o={src:t,alt:this.getAriaLabelForPicture(),densityAware:this.getIconDensityAware(),decorative:false,useIconTooltip:false},i=["sapMFeedInImage"];this._oImageControl=e.ImageHelper.getImageControl(r,this._oImageControl,this,o,i);return this._oImageControl};return c});