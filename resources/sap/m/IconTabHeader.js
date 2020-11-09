/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Core","sap/ui/core/Control","sap/ui/core/EnabledPropagator","sap/ui/core/delegate/ItemNavigation","sap/ui/core/InvisibleText","sap/ui/core/ResizeHandler","sap/m/Button","sap/m/IconTabFilter","sap/m/IconTabSeparator","sap/m/IconTabBarDragAndDropUtil","sap/ui/core/dnd/DropPosition","sap/m/IconTabHeaderRenderer","sap/ui/thirdparty/jquery","sap/base/Log","sap/ui/events/KeyCodes"],function(e,t,i,s,o,a,r,n,l,p,h,d,g,c,f,u){"use strict";var m=e.BackgroundDesign;var I=e.IconTabHeaderMode;var y=e.IconTabDensityMode;var _=i.extend("sap.m.IconTabHeader",{metadata:{library:"sap.m",properties:{showSelection:{type:"boolean",group:"Misc",defaultValue:true,deprecated:true},selectedKey:{type:"string",group:"Data",defaultValue:null},visible:{type:"boolean",group:"Behavior",defaultValue:true},mode:{type:"sap.m.IconTabHeaderMode",group:"Appearance",defaultValue:I.Standard},showOverflowSelectList:{type:"boolean",group:"Appearance",defaultValue:false,deprecated:true},backgroundDesign:{type:"sap.m.BackgroundDesign",group:"Appearance",defaultValue:m.Solid},enableTabReordering:{type:"boolean",group:"Behavior",defaultValue:false},maxNestingLevel:{type:"int",group:"Behavior",defaultValue:0},tabDensityMode:{type:"sap.m.IconTabDensityMode",group:"Appearance",defaultValue:y.Cozy},ariaTexts:{type:"object",group:"Accessibility",defaultValue:null}},aggregations:{items:{type:"sap.m.IconTab",multiple:true,singularName:"item",dnd:{draggable:true,droppable:true,layout:"Horizontal"}},_overflow:{type:"sap.m.IconTabFilter",multiple:false,visibility:"hidden"}},events:{select:{parameters:{item:{type:"sap.m.IconTabFilter"},key:{type:"string"}}}}}});var v=t.getLibraryResourceBundle("sap.m");s.apply(_.prototype,[true]);_.prototype.init=function(){this._aTabKeys=[];this._oAriaHeadText=null};_.prototype.exit=function(){if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();delete this._oItemNavigation}if(this._sResizeListenerId){r.deregister(this._sResizeListenerId);this._sResizeListenerId=null}if(this._aTabKeys){this._aTabKeys=null}if(this._oPopover){this._oPopover.destroy();this._oPopover=null}if(this.getAggregation("_overflow")){this._getOverflow().removeEventDelegate(this._oOverflowEventDelegate);this._oOverflowEventDelegate=null}if(this._oAriaHeadText){this._oAriaHeadText.destroy();this._oAriaHeadText=null}this._bRtl=null};_.prototype.onBeforeRendering=function(){this._bRtl=t.getConfiguration().getRTL();if(this._sResizeListenerId){r.deregister(this._sResizeListenerId);this._sResizeListenerId=null}this._updateSelection();this.destroyDragDropConfig();this._setsDragAndDropConfigurations()};_.prototype.onAfterRendering=function(){this._applyTabDensityMode();if(this.oSelectedItem){this._applySelectionToFilters()}if(t.isThemeApplied()){this._setItemsForStrip()}else{t.attachThemeChanged(this._handleThemeLoad,this)}this._initItemNavigation();this._sResizeListenerId=r.register(this.getDomRef(),c.proxy(this._fnResize,this))};_.prototype._getSelectList=function(){return this._getOverflow()._getSelectList()};_.prototype._getOverflow=function(){var e=this.getAggregation("_overflow");if(!e){e=new l({id:this.getId()+"-overflow",text:v.getText("ICONTABHEADER_OVERFLOW_MORE")});e._bIsOverflow=true;e.addEventDelegate({onsapnext:e.onsapdown},e);e.addEventDelegate({onlongdragover:e._handleOnLongDragOver},e);this.setAggregation("_overflow",e)}return e};_.prototype._getInvisibleHeadText=function(){var e=this.getAriaTexts()||{};if(!this._oAriaHeadText){this._oAriaHeadText=new a({id:this.getId()+"-ariaHeadText"})}this._oAriaHeadText.setText(e.headerDescription);return this._oAriaHeadText};_.prototype._onItemNavigationFocusLeave=function(){if(!this.oSelectedItem){return}var e=this.getItems();var t=-1;var i;for(var s=0;s<e.length;s++){i=e[s];if(i instanceof l==false){continue}t++;if((this.oSelectedItem._getRootTab()||this.oSelectedItem)===i){break}}this._oItemNavigation.setFocusedIndex(t)};_.prototype.getTabFilters=function(){var e=[];this.getItems().forEach(function(t){if(t instanceof l){e.push(t)}});return e};_.prototype._setsDragAndDropConfigurations=function(){if(this.getEnableTabReordering()&&!this.getDragDropConfig().length){h.setDragDropAggregations(this,"Horizontal",this._getDropPosition())}};_.prototype._getDropPosition=function(){return this.getMaxNestingLevel()===0?d.Between:d.OnOrBetween};_.prototype.setSelectedKey=function(e){var t=this.getTabFilters(),i=this._isInsideIconTabBar(),s;if(t.length>0){e=e||t[0]._getNonEmptyKey()}if(this.$().length){for(var o=0;o<t.length;o++){if(t[o]._getNonEmptyKey()===e){this.setSelectedItem(t[o],true);s=true;break}}if(!s&&!i&&e){this.setSelectedItem(null)}}this.setProperty("selectedKey",e,true);return this};_.prototype.setSelectedItem=function(e,t){if(!e){if(this.oSelectedItem){this._removeSelectionFromFilters();this.oSelectedItem=null}return this}if(this._isUnselectable(e)){return this}var i=this.getParent();var s=this._isInsideIconTabBar();var o=false;if(e.getContent().length===0&&this.oSelectedItem&&this.oSelectedItem.getContent().length===0){o=true}if(this.oSelectedItem&&this.oSelectedItem.getVisible()&&(!t&&s&&i.getExpandable()||this.oSelectedItem!==e)){this._removeSelectionFromFilters()}if(e.getVisible()){if(this.oSelectedItem===e){if(!t&&s&&i.getExpandable()){i._toggleExpandCollapse()}}else{if(s){i.$("content").attr("aria-labelledby",e.sId)}this.oSelectedItem=e;this._applySelectionToFilters();this.setProperty("selectedKey",this.oSelectedItem._getNonEmptyKey(),true);if(s&&(i.getExpandable()||i.getExpanded())){var a=this.oSelectedItem.getContent();if(a.length>0){i._rerenderContent(a)}else{if(!o){i._rerenderContent(i.getContent())}}if(!t&&i.getExpandable()&&!i.getExpanded()){i._toggleExpandCollapse(true)}}}}this.oSelectedItem=e;var r=this.oSelectedItem._getNonEmptyKey();this.setProperty("selectedKey",r,true);if(s){i.setProperty("selectedKey",r,true)}if(!t){if(s){i.fireSelect({selectedItem:this.oSelectedItem,selectedKey:r,item:this.oSelectedItem,key:r})}else{this.fireSelect({selectedItem:this.oSelectedItem,selectedKey:r,item:this.oSelectedItem,key:r})}}this._setItemsForStrip();return this};_.prototype.getVisibleTabFilters=function(){return this.getTabFilters().filter(function(e){return e.getVisible()})};_.prototype._initItemNavigation=function(){var e=[],t=-1,i=this.oSelectedItem&&this.oSelectedItem._getRootTab();this.getTabFilters().forEach(function(s){var o=this.getFocusDomRef(s);if(!o){return}o.setAttribute("tabindex","-1");e.push(o);if(s===i||s===this.oSelectedItem){t=e.indexOf(o)}}.bind(this));if(this.$().hasClass("sapMITHOverflowList")){var s=this._getOverflow().getFocusDomRef();s.setAttribute("tabindex","-1");e.push(s)}if(!this._oItemNavigation){this._oItemNavigation=(new o).setCycling(false).attachEvent(o.Events.FocusLeave,this._onItemNavigationFocusLeave,this).setDisabledModifiers({sapnext:["alt","meta"],sapprevious:["alt","meta"]});this.addDelegate(this._oItemNavigation)}this._oItemNavigation.setRootDomRef(this.getDomRef()).setItemDomRefs(e).setPageSize(e.length).setSelectedIndex(t)};_.prototype.onThemeChanged=function(){this._applyTabDensityMode()};_.prototype._applyTabDensityMode=function(){var e=this.getTabDensityMode();this.$().removeClass("sapUiSizeCompact");switch(e){case y.Compact:this.$().addClass("sapUiSizeCompact");break;case y.Inherit:if(this.$().closest(".sapUiSizeCompact").length){this.$().addClass("sapUiSizeCompact")}break}};_.prototype._handleThemeLoad=function(){setTimeout(this._setItemsForStrip.bind(this),350);t.detachThemeChanged(this._handleThemeLoad,this)};_.prototype.destroyItems=function(){this.oSelectedItem=null;this._aTabKeys=[];this.destroyAggregation("items");return this};_.prototype.addItem=function(e){if(!(e instanceof p)){var t=e.getKey();if(this._aTabKeys.indexOf(t)!==-1){f.warning("sap.m.IconTabHeader: duplicate key '"+t+"' inside the IconTabFilter. Please use unique keys.")}this._aTabKeys.push(t)}this.addAggregation("items",e);this._invalidateParentIconTabBar()};_.prototype.insertItem=function(e,t){if(!(e instanceof p)){var i=e.getKey();if(this._aTabKeys.indexOf(i)!==-1){f.warning("sap.m.IconTabHeader: duplicate key '"+i+"' inside the IconTabFilter. Please use unique keys.")}this._aTabKeys.push(i)}this.insertAggregation("items",e,t);this._invalidateParentIconTabBar()};_.prototype.removeAllItems=function(){var e=this.removeAllAggregation("items");this._aTabKeys=[];this.oSelectedItem=null;this._invalidateParentIconTabBar();return e};_.prototype.removeItem=function(e){e=this.removeAggregation("items",e);if(e&&!(e instanceof p)){var t=e.getKey();this._aTabKeys.splice(this._aTabKeys.indexOf(t),1)}if(this.oSelectedItem===e){this.oSelectedItem=null}this._invalidateParentIconTabBar();return e};_.prototype.updateAggregation=function(){this.oSelectedItem=null;i.prototype.updateAggregation.apply(this,arguments);this.invalidate()};_.prototype.removeAggregation=function(e,t,s){var o=this.getTabFilters();var a=i.prototype.removeAggregation.apply(this,arguments);if(s){return a}if(a&&a==this.oSelectedItem&&e=="items"){var r=o?Array.prototype.indexOf.call(o,a):-1;o=this.getTabFilters();r=Math.max(0,Math.min(r,o.length-1));var n=o[r];if(n){this.setSelectedItem(n,true)}else{var l=this.getParent();if(this._isInsideIconTabBar()&&l.getExpanded()){l.$("content").children().remove()}}}return a};_.prototype.removeAllAggregation=function(e,t){if(e=="items"){var s=this.getParent();if(this._isInsideIconTabBar()&&s.getExpanded()){s.$("content").children().remove()}}return i.prototype.removeAllAggregation.apply(this,arguments)};_.prototype._getDisplayText=function(e){var t=e.getText();if(this.isInlineMode()){var i=e.getCount();if(i){if(this._bRtl){t="("+i+") "+t}else{t+=" ("+i+")"}}}return t};_.prototype.isInlineMode=function(){return this._bTextOnly&&this.getMode()==I.Inline};_.prototype._checkTextOnly=function(){this._bTextOnly=this.getItems().every(function(e){return e instanceof p||!e.getIcon()});return this._bTextOnly};_.prototype._checkNoText=function(e){if(e.length>0){for(var t=0;t<e.length;t++){if(!(e[t]instanceof p)){if(e[t].getText().length>0){return false}}}}return true};_.prototype._checkInLine=function(e){var t;if(e.length>0){for(var i=0;i<e.length;i++){t=e[i];if(!(t instanceof p)){if(t.getIcon()||t.getCount()){this._bInLine=false;return false}}}}this._bInLine=true;return true};_.prototype._getItemsInStrip=function(){return this.getItems().filter(function(e){var t=e.getDomRef();return t&&!t.classList.contains("sapMITBFilterHidden")})};_.prototype._setItemsForStrip=function(){var e=this.getVisibleTabFilters();if(!t.isThemeApplied()||!e.length){return}var i=this.getDomRef("head"),s=this.oSelectedItem&&this.oSelectedItem.getVisible()?this.oSelectedItem:e[0];if(!i){return}if(this._oPopover){this._oPopover.close()}var o=i.offsetWidth,a,r,n=(s._getRootTab()||s).getDomRef(),l=this.getItems().filter(function(e){return e.getDomRef()}).map(function(e){return e.getDomRef()});if(!l.length||!n){return}l.forEach(function(e){e.style.width="";e.classList.remove("sapMITBFilterHidden")});n.classList.remove("sapMITBFilterTruncated");var p=window.getComputedStyle(n);var h=n.offsetWidth+Number.parseInt(p.marginLeft)+Number.parseInt(p.marginRight);l.splice(l.indexOf(n),1);if(o<h){n.style.width=o-20+"px";n.classList.add("sapMITBFilterTruncated")}var d=-1;for(r=0;r<l.length;r++){a=l[r];var g=window.getComputedStyle(a);var c=a.offsetWidth+Number.parseInt(g.marginLeft)+Number.parseInt(g.marginRight);if(o>h+c){h+=c;d=r}else{break}}for(r=d+1;r<l.length;r++){a=l[r];a.classList.add("sapMITBFilterHidden")}this._getOverflow().$().toggleClass("sapMITHOverflowVisible",d+1!==l.length);this.$().toggleClass("sapMITHOverflowList",d+1!==l.length)};_.prototype._handleActivation=function(e){var i=e.target.id,s=e.srcControl,o,a=c(e.target);if(s instanceof n){return}var r=c(document.getElementById(i));if(r.parents()&&Array.prototype.indexOf.call(r.parents(),this.$("content")[0])>-1){}else{if(i){e.preventDefault();if(a.hasClass("sapMITBFilterIcon")||a.hasClass("sapMITBCount")||a.hasClass("sapMITBText")||a.hasClass("sapMITBTab")||a.hasClass("sapMITBContentArrow")||a.hasClass("sapMITBSep")||a.hasClass("sapMITBSepIcon")){o=e.srcControl.getId().replace(/-icon$/,"");s=t.byId(o);if(s.getMetadata().isInstanceOf("sap.m.IconTab")&&!(s instanceof p)){if(this._isUnselectable(s)){if(s.getItems().length||s._bIsOverflow){s._expandButtonPress()}return}if(s===this._getOverflow()){s._expandButtonPress();return}this.setSelectedItem(s)}}else if(s.getMetadata().isInstanceOf("sap.m.IconTab")&&!(s instanceof p)){if(this._isUnselectable(s)){if(s.getItems().length||s._bIsOverflow){s._expandButtonPress()}return}if(s===this._getOverflow()){s._expandButtonPress();return}this.setSelectedItem(s)}}else{if(s.getMetadata().isInstanceOf("sap.m.IconTab")&&!(s instanceof p)){if(this._isUnselectable(s)){if(s.getItems().length||s._bIsOverflow){s._expandButtonPress()}return}if(s===this._getOverflow()){s._expandButtonPress();return}this.setSelectedItem(s)}}}};_.prototype._fnResize=function(){if(this._getOverflow()._oPopover){this._getOverflow()._oPopover.close()}this._setItemsForStrip();this._initItemNavigation()};_.prototype._isUnselectable=function(e){var t=e._getRealTab();return!t.getEnabled()||this._isInsideIconTabBar()&&!this.getParent().getContent().length&&t._getNestedLevel()===1&&t.getItems().length&&!t.getContent().length||t._bIsOverflow};_.prototype._isInsideIconTabBar=function(){var e=this.getParent();return e instanceof i&&e.isA("sap.m.IconTabBar")};_.prototype._invalidateParentIconTabBar=function(){if(this._isInsideIconTabBar()){this.getParent().invalidate()}};_.prototype.getFocusDomRef=function(e){var t=e||this.oSelectedItem;if(!t){return null}return t.getDomRef()};_.prototype.applyFocusInfo=function(e){if(e.focusDomRef){c(e.focusDomRef).trigger("focus")}};_.prototype._updateSelection=function(){var e=this.getItems(),t=this.getSelectedKey(),i=0,s=this.getParent(),o=this._isInsideIconTabBar(),a=s&&s.isA("sap.tnt.ToolHeader");if(!e.length){return}if(!this.oSelectedItem||t&&t!==this.oSelectedItem._getNonEmptyKey()){if(t){this.oSelectedItem=this._findItemByKey(t)}if(!this.oSelectedItem&&(o||!t)){for(i=0;i<e.length;i++){if(!(e[i]instanceof p)&&e[i].getVisible()){this.oSelectedItem=e[i];break}}}}if(!a&&this.oSelectedItem&&!this.oSelectedItem.getVisible()){for(i=0;i<e.length;i++){if(!(e[i]instanceof p)&&e[i].getVisible()){this.oSelectedItem=e[i];break}}}if(!this.oSelectedItem){return}if(this._isUnselectable(this.oSelectedItem)){this.setSelectedItem(this.oSelectedItem._getFirstAvailableSubFilter(),true);return}this.setProperty("selectedKey",this.oSelectedItem._getNonEmptyKey(),true)};_.prototype._findItemByKey=function(e){var t=this.getTabFilters(),i;for(var s=0;s<t.length;s++){if(t[s]._getNonEmptyKey()===e){return t[s]}i=t[s]._getAllSubFilters();for(var o=0;o<i.length;o++){if(i[o]._getNonEmptyKey()===e){return i[o]}}}};_.prototype._applySelectionToFilters=function(){if(this._isInsideIconTabBar()&&!this.getParent().getExpanded()){return}this.oSelectedItem.$().addClass("sapMITBSelected").attr({"aria-selected":true});if(this.oSelectedItem._getNestedLevel()!==1){var e=this.oSelectedItem._getRootTab();e.$().addClass("sapMITBSelected").attr({"aria-selected":true})}};_.prototype._removeSelectionFromFilters=function(){this.oSelectedItem.$().removeClass("sapMITBSelected").attr({"aria-selected":false});if(this.oSelectedItem._getNestedLevel()!==1){var e=this.oSelectedItem._getRootTab();e.$().removeClass("sapMITBSelected").attr({"aria-selected":false})}};_.prototype.ontouchstart=function(e){var t=e.targetTouches[0];this._iActiveTouch=t.identifier};_.prototype.ontouchend=function(e){if(this._iActiveTouch===undefined){return}var t=0;var i=1;var s;if(e.which===s||e.which===t||e.which===i){this._handleActivation(e)}this._iActiveTouch=undefined};_.prototype.ontouchcancel=_.prototype.ontouchend;_.prototype.onkeydown=function(e){switch(e.which){case u.ENTER:this._handleActivation(e);e.preventDefault();break;case u.SPACE:this._handleActivation(e);e.preventDefault();break}};_.prototype._handleDragAndDrop=function(e){var t=e.getParameter("dropPosition"),i=e.getParameter("draggedControl"),s=e.getParameter("droppedControl"),o=this,a=this.getMaxNestingLevel();if(t===d.On){o=s._getRealTab()}h.handleDrop(o,t,i._getRealTab(),s,false,a);if(i._getNestedLevel()>1){i._getRootTab()._closePopover()}this._setItemsForStrip();this._initItemNavigation();this._getOverflow()._setSelectListItems();this._getSelectList()._initItemNavigation();i._getRealTab().$().trigger("focus");if(t===d.On){s._getRealTab().$().trigger("focus")}};_.prototype._moveTab=function(e,t,i){h.moveItem.call(this,e,t,i);this._setItemsForStrip();this._initItemNavigation()};_.prototype.ondragrearranging=function(e){if(!this.getEnableTabReordering()){return}var t=e.srcControl,i=this.indexOfItem(this._getItemsInStrip().pop());this._moveTab(t,e.keyCode,i);t.$().trigger("focus")};_.prototype.onsaphomemodifiers=_.prototype.ondragrearranging;_.prototype.onsapendmodifiers=_.prototype.ondragrearranging;_.prototype.onsapincreasemodifiers=_.prototype.ondragrearranging;_.prototype.onsapdecreasemodifiers=_.prototype.ondragrearranging;return _});