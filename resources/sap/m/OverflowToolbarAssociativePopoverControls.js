/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","./OverflowToolbarButton","./OverflowToolbarToggleButton","./ToggleButton","./Button","sap/m/library","sap/base/Log"],function(e,t,o,n,r,a,s){"use strict";var l=a.ButtonType;var p=e.extend("sap.m._overflowToolbarHelpers.OverflowToolbarAssociativePopoverControls",{constructor:function(){this._mControlsCache={}},getInterface:function(){return this}});p.prototype._preProcessSapMButton=function(e){var t=e.getType();this._mControlsCache[e.getId()]={buttonType:t};if(t===l.Default){e.setProperty("type",l.Transparent,true)}e.attachEvent("_change",this._onSapMButtonUpdated,this)};p.prototype._postProcessSapMButton=function(e){var t=this._mControlsCache[e.getId()];if(e.getType()!==t.buttonType){e.setProperty("type",t.buttonType,true)}e.detachEvent("_change",this._onSapMButtonUpdated,this)};p.prototype._onSapMButtonUpdated=function(e){var t=e.getParameter("name"),o=e.getSource(),n=o.getId();if(typeof this._mControlsCache[n]==="undefined"){return}if(t==="type"){this._mControlsCache[n]["buttonType"]=o.getType()}};p.prototype._preProcessSapMOverflowToolbarButton=function(e){this._preProcessSapMButton(e);e._bInOverflow=true};p.prototype._postProcessSapMOverflowToolbarButton=function(e){delete e._bInOverflow;this._postProcessSapMButton(e)};p.prototype._preProcessSapMToggleButton=function(e){this._preProcessSapMButton(e)};p.prototype._postProcessSapMToggleButton=function(e){this._postProcessSapMButton(e)};p.prototype._preProcessSapMOverflowToolbarToggleButton=function(e){this._preProcessSapMToggleButton(e);e._bInOverflow=true};p.prototype._postProcessSapMOverflowToolbarToggleButton=function(e){delete e._bInOverflow;this._postProcessSapMToggleButton(e)};p._mSupportedControls={"sap.m.Button":{canOverflow:true,listenForEvents:["press"],noInvalidationProps:["enabled","type"]},"sap.m.MenuButton":{canOverflow:true,listenForEvents:["defaultAction","_menuItemSelected"],noInvalidationProps:["enabled","text","icon"]},"sap.m.OverflowToolbarButton":{canOverflow:true,listenForEvents:["press"],noInvalidationProps:["enabled","type"]},"sap.m.OverflowToolbarToggleButton":{canOverflow:true,listenForEvents:["press"],noInvalidationProps:["enabled","type","pressed"]},"sap.m.CheckBox":{canOverflow:true,listenForEvents:["select"],noInvalidationProps:["enabled","selected"]},"sap.m.ToggleButton":{canOverflow:true,listenForEvents:["press"],noInvalidationProps:["enabled","pressed"]},"sap.m.ComboBox":{canOverflow:true,listenForEvents:[],noInvalidationProps:["enabled","value","selectedItemId","selectedKey"]},"sap.m.SearchField":{canOverflow:true,listenForEvents:["search"],noInvalidationProps:["enabled","value","selectOnFocus"]},"sap.m.Input":{canOverflow:true,listenForEvents:[],noInvalidationProps:["enabled","value"]},"sap.m.DateTimeInput":{canOverflow:true,listenForEvents:["change"],noInvalidationProps:["enabled","value","dateValue"]},"sap.m.DatePicker":{canOverflow:true,listenForEvents:["change"],noInvalidationProps:["enabled","value","dateValue","displayFormat","valueFormat","displayFormatType","secondaryCalendarType","minDate","maxDate"]},"sap.m.DateTimePicker":{canOverflow:true,listenForEvents:["change"],noInvalidationProps:["enabled","value","dateValue","displayFormat","valueFormat","displayFormatType","secondaryCalendarType","minDate","maxDate"]},"sap.m.TimePicker":{canOverflow:true,listenForEvents:["change"],noInvalidationProps:["enabled","value","dateValue","displayFormat","valueFormat"]},"sap.m.RadioButton":{canOverflow:false,listenForEvents:[],noInvalidationProps:["enabled","selected"]},"sap.m.Slider":{canOverflow:false,listenForEvents:[],noInvalidationProps:["enabled","value"]},"sap.m.IconTabHeader":{canOverflow:false,listenForEvents:[],noInvalidationProps:["selectedKey"]},"sap.ui.comp.smartfield.SmartField":{canOverflow:true,listenForEvents:["change"],noInvalidationProps:["enabled","value","valueState","showValueHelp","contextEditable","clientSideMandatoryCheck","mandatory","name","placeholder","showSuggestion","tooltipLabel"]},"sap.ui.comp.smartfield.SmartLabel":{canOverflow:true,listenForEvents:[],noInvalidationProps:["enabled"]}};p.getControlConfig=function(e){var t;if(e.getMetadata().getInterfaces().indexOf("sap.m.IOverflowToolbarContent")!==-1){if(typeof e.getOverflowToolbarConfig!=="function"){s.error("Required method getOverflowToolbarConfig not implemented by: "+e.getMetadata().getName());return}t=e.getOverflowToolbarConfig();if(typeof t!=="object"){s.error("Method getOverflowToolbarConfig implemented, but does not return an object in: "+e.getMetadata().getName());return}return{canOverflow:!!t.canOverflow,listenForEvents:Array.isArray(t.autoCloseEvents)?t.autoCloseEvents:[],noInvalidationProps:Array.isArray(t.propsUnrelatedToSize)?t.propsUnrelatedToSize:[],preProcess:t.onBeforeEnterOverflow,postProcess:t.onAfterExitOverflow}}var o=p.getControlClass(e);t=p._mSupportedControls[o];if(t===undefined){return}var n="_preProcess"+o.split(".").map(i).join("");if(typeof p.prototype[n]==="function"){t.preProcess=p.prototype[n]}var r="_postProcess"+o.split(".").map(i).join("");if(typeof p.prototype[r]==="function"){t.postProcess=p.prototype[r]}return t};p.supportsControl=function(e){var t=p.getControlConfig(e);return typeof t!=="undefined"&&t.canOverflow};p.getControlClass=function(e){if(e instanceof t){return"sap.m.OverflowToolbarButton"}else if(e instanceof o){return"sap.m.OverflowToolbarToggleButton"}else if(e instanceof n){return"sap.m.ToggleButton"}else if(e instanceof r){return"sap.m.Button"}return e.getMetadata().getName()};function i(e){return e.substring(0,1).toUpperCase()+e.substr(1)}return p});