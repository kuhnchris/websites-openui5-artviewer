/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Bar","./InstanceManager","./AssociativeOverflowToolbar","./ToolbarSpacer","./Title","./library","./TitleAlignmentMixin","sap/m/Image","sap/ui/core/Control","sap/ui/core/IconPool","sap/ui/core/Popup","sap/ui/core/delegate/ScrollEnablement","sap/ui/core/RenderManager","sap/ui/core/InvisibleText","sap/ui/core/ResizeHandler","sap/ui/core/util/ResponsivePaddingsEnablement","sap/ui/Device","sap/ui/base/ManagedObject","sap/ui/core/library","sap/ui/events/KeyCodes","./TitlePropagationSupport","./DialogRenderer","sap/base/Log","sap/ui/thirdparty/jquery","sap/ui/core/Core","sap/ui/core/Configuration","sap/ui/dom/jquery/control","sap/ui/dom/jquery/Focusable"],function(t,e,i,o,s,n,a,r,l,h,u,p,g,c,d,f,_,y,m,S,b,v,C,I,B,T){"use strict";var A=m.OpenState;var D=n.DialogType;var R=n.DialogRoleType;var M=m.ValueState;var P=n.TitleAlignment;var H=B.getConfiguration().getAnimationMode();var w=H!==T.AnimationMode.none&&H!==T.AnimationMode.minimal;var z=w?300:10;var E=17;var O=l.extend("sap.m.Dialog",{metadata:{interfaces:["sap.ui.core.PopupInterface"],library:"sap.m",properties:{icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},title:{type:"string",group:"Appearance",defaultValue:null},showHeader:{type:"boolean",group:"Appearance",defaultValue:true},type:{type:"sap.m.DialogType",group:"Appearance",defaultValue:D.Standard},state:{type:"sap.ui.core.ValueState",group:"Appearance",defaultValue:M.None},stretchOnPhone:{type:"boolean",group:"Appearance",defaultValue:false,deprecated:true},stretch:{type:"boolean",group:"Appearance",defaultValue:false},contentWidth:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},contentHeight:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},horizontalScrolling:{type:"boolean",group:"Behavior",defaultValue:true},verticalScrolling:{type:"boolean",group:"Behavior",defaultValue:true},resizable:{type:"boolean",group:"Behavior",defaultValue:false},draggable:{type:"boolean",group:"Behavior",defaultValue:false},escapeHandler:{type:"any",group:"Behavior",defaultValue:null},role:{type:"sap.m.DialogRoleType",group:"Data",defaultValue:R.Dialog,visibility:"hidden"},closeOnNavigation:{type:"boolean",group:"Behavior",defaultValue:true},titleAlignment:{type:"sap.m.TitleAlignment",group:"Misc",defaultValue:P.Auto}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"},subHeader:{type:"sap.m.IBar",multiple:false},customHeader:{type:"sap.m.IBar",multiple:false},beginButton:{type:"sap.m.Button",multiple:false},endButton:{type:"sap.m.Button",multiple:false},buttons:{type:"sap.m.Button",multiple:true,singularName:"button"},_header:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_icon:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_toolbar:{type:"sap.m.OverflowToolbar",multiple:false,visibility:"hidden"},_valueState:{type:"sap.ui.core.InvisibleText",multiple:false,visibility:"hidden"}},associations:{leftButton:{type:"sap.m.Button",multiple:false,deprecated:true},rightButton:{type:"sap.m.Button",multiple:false,deprecated:true},initialFocus:{type:"sap.ui.core.Control",multiple:false},ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{beforeOpen:{},afterOpen:{},beforeClose:{parameters:{origin:{type:"sap.m.Button"}}},afterClose:{parameters:{origin:{type:"sap.m.Button"}}}},designtime:"sap/m/designtime/Dialog.designtime"}});f.call(O.prototype,{header:{suffix:"header"},subHeader:{selector:".sapMDialogSubHeader .sapMIBar"},content:{selector:".sapMDialogScrollCont"},footer:{suffix:"footer"}});b.call(O.prototype,"content",function(){return this._headerTitle?this._headerTitle.getId():false});O._bPaddingByDefault=sap.ui.getCore().getConfiguration().getCompatibilityVersion("sapMDialogWithPadding").compareTo("1.16")<0;O._mIcons={};O._mIcons[M.Success]=h.getIconURI("message-success");O._mIcons[M.Warning]=h.getIconURI("message-warning");O._mIcons[M.Error]=h.getIconURI("message-error");O._mIcons[M.Information]=h.getIconURI("hint");O.prototype.init=function(){var t=this;this._oManuallySetSize=null;this._oManuallySetPosition=null;this._bRTL=sap.ui.getCore().getConfiguration().getRTL();this._scrollContentList=["sap.m.NavContainer","sap.m.Page","sap.m.ScrollContainer","sap.m.SplitContainer","sap.m.MultiInput","sap.m.SimpleFixFlex"];this.oPopup=new u;this.oPopup.setShadow(true);this.oPopup.setNavigationMode("SCOPE");this.oPopup.setModal(true);this.oPopup.setAnimations(I.proxy(this._openAnimation,this),I.proxy(this._closeAnimation,this));this.oPopup._applyPosition=function(e,i){t._setDimensions();t._adjustScrollingPane();if(t._oManuallySetPosition){e.at={left:t._oManuallySetPosition.x,top:t._oManuallySetPosition.y}}else{e.at=t._calcCenter()}t._deregisterContentResizeHandler();u.prototype._applyPosition.call(this,e);t._registerContentResizeHandler()};if(O._bPaddingByDefault){this.addStyleClass("sapUiPopupWithPadding")}this._initTitlePropagationSupport();this._initResponsivePaddingsEnablement()};O.prototype.onBeforeRendering=function(){if(this._hasSingleScrollableContent()){this.setVerticalScrolling(false);this.setHorizontalScrolling(false);C.info("VerticalScrolling and horizontalScrolling in sap.m.Dialog with ID "+this.getId()+" has been disabled because there's scrollable content inside")}else if(!this._oScroller){this._oScroller=new p(this,this.getId()+"-scroll",{horizontal:this.getHorizontalScrolling(),vertical:this.getVerticalScrolling()})}if(this._oScroller){this._oScroller.setVertical(this.getVerticalScrolling());this._oScroller.setHorizontal(this.getHorizontalScrolling())}this._createToolbarButtons();if(sap.ui.getCore().getConfiguration().getAccessibility()&&this.getState()!=M.None){var t=new c({text:this.getValueStateString(this.getState())});this.setAggregation("_valueState",t);this.addAriaLabelledBy(t.getId())}};O.prototype.onAfterRendering=function(){this._$scrollPane=this.$("scroll");this._$content=this.$("cont");this._$dialog=this.$();if(this.isOpen()){this._setInitialFocus()}};O.prototype.exit=function(){e.removeDialogInstance(this);this._deregisterContentResizeHandler();this._deregisterResizeHandler();if(this.oPopup){this.oPopup.detachOpened(this._handleOpened,this);this.oPopup.detachClosed(this._handleClosed,this);this.oPopup.destroy();this.oPopup=null}if(this._oScroller){this._oScroller.destroy();this._oScroller=null}if(this._header){this._header.destroy();this._header=null}if(this._headerTitle){this._headerTitle.destroy();this._headerTitle=null}if(this._iconImage){this._iconImage.destroy();this._iconImage=null}if(this._toolbarSpacer){this._toolbarSpacer.destroy();this._toolbarSpacer=null}};O.prototype.open=function(){var t=this.oPopup;t.setInitialFocusId(this.getId());var i=t.getOpenState();switch(i){case A.OPEN:case A.OPENING:return this;case A.CLOSING:this._bOpenAfterClose=true;break;default:}this._oCloseTrigger=null;this.fireBeforeOpen();t.attachOpened(this._handleOpened,this);this._iLastWidthAndHeightWithScroll=null;t.setContent(this);t.open();this._registerResizeHandler();e.addDialogInstance(this);return this};O.prototype.close=function(){this._bOpenAfterClose=false;this.$().removeClass("sapDialogDisableTransition");this._deregisterResizeHandler();var t=this.oPopup;var e=this.oPopup.getOpenState();if(!(e===A.CLOSED||e===A.CLOSING)){n.closeKeyboard();this.fireBeforeClose({origin:this._oCloseTrigger});t.attachClosed(this._handleClosed,this);this._bDisableRepositioning=false;this._oManuallySetPosition=null;this._oManuallySetSize=null;t.close();this._deregisterContentResizeHandler()}return this};O.prototype.isOpen=function(){return!!this.oPopup&&this.oPopup.isOpen()};O.prototype.setIcon=function(t){this._bHasCustomIcon=true;return this.setProperty("icon",t)};O.prototype.setState=function(t){var e;this.setProperty("state",t);if(this._bHasCustomIcon){return this}if(t===M.None){e=""}else{e=O._mIcons[t]}this.setProperty("icon",e);return this};O.prototype._handleOpened=function(){this.oPopup.detachOpened(this._handleOpened,this);this._setInitialFocus();this.fireAfterOpen()};O.prototype._handleClosed=function(){if(!this.oPopup){return}this.oPopup.detachClosed(this._handleClosed,this);if(this.getDomRef()){g.preserveContent(this.getDomRef());this.$().remove()}e.removeDialogInstance(this);this.fireAfterClose({origin:this._oCloseTrigger});if(this._bOpenAfterClose){this._bOpenAfterClose=false;this.open()}};O.prototype.onfocusin=function(t){var e=t.target;if(e.id===this.getId()+"-firstfe"){var i=this.$("footer").lastFocusableDomRef()||this.$("cont").lastFocusableDomRef()||this.getSubHeader()&&this.getSubHeader().$().firstFocusableDomRef()||this._getAnyHeader()&&this._getAnyHeader().$().lastFocusableDomRef();if(i){i.focus()}}else if(e.id===this.getId()+"-lastfe"){var o=this._getAnyHeader()&&this._getAnyHeader().$().firstFocusableDomRef()||this.getSubHeader()&&this.getSubHeader().$().firstFocusableDomRef()||this.$("cont").firstFocusableDomRef()||this.$("footer").firstFocusableDomRef();if(o){o.focus()}}};O.prototype._getPromiseWrapper=function(){var t=this;return{reject:function(){t.currentPromise.reject()},resolve:function(){t.currentPromise.resolve()}}};O.prototype.onsapescape=function(t){var e=this.getEscapeHandler(),i={},o=this;if(this._isSpaceOrEnterPressed){return}if(t.originalEvent&&t.originalEvent._sapui_handledByControl){return}this._oCloseTrigger=null;if(typeof e==="function"){new window.Promise(function(t,s){i.resolve=t;i.reject=s;o.currentPromise=i;e(o._getPromiseWrapper())}).then(function(t){o.close()}).catch(function(){C.info("Disallow dialog closing")})}else{this.close()}t.stopPropagation()};O.prototype.onkeyup=function(t){if(this._isSpaceOrEnter(t)){this._isSpaceOrEnterPressed=false}};O.prototype.onkeydown=function(t){if(this._isSpaceOrEnter(t)){this._isSpaceOrEnterPressed=true}};O.prototype._isSpaceOrEnter=function(t){var e=t.which||t.keyCode;return e==S.SPACE||e==S.ENTER};O.prototype._openAnimation=function(t,e,i){t.addClass("sapMDialogOpen");t.css("display","block");setTimeout(i,z)};O.prototype._closeAnimation=function(t,e,i){t.removeClass("sapMDialogOpen");setTimeout(i,z)};O.prototype._setDimensions=function(){var t=this.$(),e=this.getStretch(),i=this.getStretchOnPhone()&&_.system.phone,o=this.getType()===D.Message,s={};if(!e){if(!this._oManuallySetSize){s.width=this.getContentWidth()||undefined;s.height=this.getContentHeight()||undefined}else{s.width=this._oManuallySetSize.width;s.height=this._oManuallySetSize.height}}if(s.width=="auto"){s.width=undefined}if(s.height=="auto"){s.height=undefined}if(e&&!o||i){this.$().addClass("sapMDialogStretched")}t.css(s);if(!e&&!this._oManuallySetSize&&!this._bDisableRepositioning){this._centerDialog()}if(window.navigator.userAgent.toLowerCase().indexOf("chrome")!==-1&&this.getStretch()){t.find("> footer").css({bottom:"0.001px"})}};O.prototype._adjustScrollingPane=function(){if(this._oScroller){this._oScroller.refresh()}};O.prototype._reposition=function(){};O.prototype._repositionAfterOpen=function(){};O.prototype._reapplyPosition=function(){this._adjustScrollingPane()};O.prototype._onResize=function(){var t=this.$(),e=this.$("cont"),i,o=this.getContentHeight(),s=this.getContentWidth(),n,a=Math.floor(window.innerWidth*.9),r=2,l=_.browser,h=0;if(this._oManuallySetSize){e.css({width:"auto"});return}if(!o||o=="auto"){i=e.scrollTop();e.css({height:"auto"});t.children().each(function(){h+=I(this).outerHeight(true)});if(this.getStretch()||h>t.innerHeight()){n=parseFloat(t.height())+r;e.height(Math.round(n))}e.scrollTop(i)}if(_.system.desktop&&!l.chrome){var u=e.width()+"x"+e.height(),p=t.css("min-width")!==t.css("width");if(u!==this._iLastWidthAndHeightWithScroll&&p){if(this._hasVerticalScrollbar()&&(!s||s=="auto")&&!this.getStretch()&&e.width()<a){t.addClass("sapMDialogVerticalScrollIncluded");e.css({"padding-right":E});this._iLastWidthAndHeightWithScroll=u}else{t.removeClass("sapMDialogVerticalScrollIncluded");e.css({"padding-right":""});this._iLastWidthAndHeightWithScroll=null}}}if(!this.getStretch()&&!this._oManuallySetSize&&!this._bDisableRepositioning){this._centerDialog()}};O.prototype._hasVerticalScrollbar=function(){var t=this.$("cont");if(_.browser.msie){return t[0].clientWidth<t.outerWidth()}return t[0].clientHeight<t[0].scrollHeight};O.prototype._centerDialog=function(){this.$().css(this._calcCenter())};O.prototype._calcCenter=function(){var t=window.innerWidth,e=window.innerHeight,i=this.$(),o=i.outerWidth(),s=i.outerHeight();return{left:Math.round((t-o)/2),top:Math.round((e-s)/2)}};O.prototype._createHeader=function(){if(!this._header){this._header=new t(this.getId()+"-header");this._header._setRootAccessibilityRole("heading");this._header._setRootAriaLevel("2");this._setupBarTitleAlignment(this._header,this.getId()+"_header");this.setAggregation("_header",this._header)}};O.prototype._applyTitleToHeader=function(){var t=this.getProperty("title");if(this._headerTitle){this._headerTitle.setText(t)}else{this._headerTitle=new s(this.getId()+"-title",{text:t,level:"H2"}).addStyleClass("sapMDialogTitle");this._header.addContentMiddle(this._headerTitle)}};O.prototype._hasSingleScrollableContent=function(){var t=this.getContent();while(t.length===1&&t[0]instanceof l&&t[0].isA("sap.ui.core.mvc.View")){t=t[0].getContent()}if(t.length===1&&t[0]instanceof l&&t[0].isA(this._scrollContentList)){return true}return false};O.prototype._getFocusId=function(){return this.getInitialFocus()||this._getFirstFocusableContentSubHeader()||this._getFirstFocusableContentElementId()||this._getFirstVisibleButtonId()||this.getId()};O.prototype._getFirstVisibleButtonId=function(){var t=this.getBeginButton(),e=this.getEndButton(),i=this.getButtons(),o="";if(t&&t.getVisible()){o=t.getId()}else if(e&&e.getVisible()){o=e.getId()}else if(i&&i.length>0){for(var s=0;s<i.length;s++){if(i[s].getVisible()){o=i[s].getId();break}}}return o};O.prototype._getFirstFocusableContentSubHeader=function(){var t=this.$().find(".sapMDialogSubHeader");var e;var i=t.firstFocusableDomRef();if(i){e=i.id}return e};O.prototype._getFirstFocusableContentElementId=function(){var t="";var e=this.$("cont");var i=e.firstFocusableDomRef();if(i){t=i.id}return t};O.prototype._setInitialFocus=function(){var t=this._getFocusId();var e=sap.ui.getCore().byId(t);var i;if(e){if(e.getVisible&&!e.getVisible()){this.focus();return}i=e.getFocusDomRef()}i=i||(t?window.document.getElementById(t):null);if(!i){this.setInitialFocus("");i=sap.ui.getCore().byId(this._getFocusId())}if(!this.getInitialFocus()){this.setAssociation("initialFocus",i?i.id:this.getId(),true)}if(_.system.desktop||i&&!/input|textarea|select/i.test(i.tagName)){if(i){i.focus()}}else{this.focus()}};O.prototype.getScrollDelegate=function(){return this._oScroller};O.prototype._composeAggreNameInHeader=function(t){var e;if(t==="Begin"){e="contentLeft"}else if(t==="End"){e="contentRight"}else{e="content"+t}return e};O.prototype._isToolbarEmpty=function(){var t=this._oToolbar.getContent().filter(function(t){return t.getMetadata().getName()!=="sap.m.ToolbarSpacer"});return t.length===0};O.prototype._setButton=function(t,e,i){return this};O.prototype._getButton=function(t){var e=t.toLowerCase()+"Button",i="_o"+this._firstLetterUpperCase(t)+"Button";if(_.system.phone){return this.getAggregation(e,null,true)}else{return this[i]}};O.prototype._getButtonFromHeader=function(t){if(this._header){var e=this._composeAggreNameInHeader(this._firstLetterUpperCase(t)),i=this._header.getAggregation(e);return i&&i[0]}else{return null}};O.prototype._firstLetterUpperCase=function(t){return t.charAt(0).toUpperCase()+t.slice(1)};O.prototype._getAnyHeader=function(){var t=this.getCustomHeader();if(t){t._setRootAriaLevel("2");return t._setRootAccessibilityRole("heading")}else{var e=this.getShowHeader();if(!e){return null}this._createHeader();this._applyTitleToHeader();this._applyIconToHeader();return this._header}};O.prototype._deregisterResizeHandler=function(){if(this._resizeListenerId){d.deregister(this._resizeListenerId);this._resizeListenerId=null}_.resize.detachHandler(this._onResize,this)};O.prototype._registerResizeHandler=function(){var t=this.$("scroll");this._resizeListenerId=d.register(t.get(0),I.proxy(this._onResize,this));_.resize.attachHandler(this._onResize,this);this._onResize()};O.prototype._deregisterContentResizeHandler=function(){if(this._sContentResizeListenerId){d.deregister(this._sContentResizeListenerId);this._sContentResizeListenerId=null}};O.prototype._registerContentResizeHandler=function(){if(!this._sContentResizeListenerId){this._sContentResizeListenerId=d.register(this.getDomRef("scrollCont"),I.proxy(this._onResize,this))}this._onResize()};O.prototype._attachHandler=function(t){var e=this;if(!this._oButtonDelegate){this._oButtonDelegate={ontap:function(){e._oCloseTrigger=this},onkeyup:function(){e._oCloseTrigger=this},onkeydown:function(){e._oCloseTrigger=this}}}if(t){t.addDelegate(this._oButtonDelegate,true,t)}};O.prototype._createToolbarButtons=function(){var t=this._getToolbar();var e=this.getButtons();var i=this.getBeginButton();var s=this.getEndButton(),n=this,a=[i,s];a.forEach(function(t){if(t&&n._oButtonDelegate){t.removeDelegate(n._oButtonDelegate)}});t.removeAllContent();if(!("_toolbarSpacer"in this)){this._toolbarSpacer=new o}t.addContent(this._toolbarSpacer);a.forEach(function(t){n._attachHandler(t)});if(e&&e.length){e.forEach(function(e){t.addContent(e)})}else{if(i){t.addContent(i)}if(s){t.addContent(s)}}};O.prototype._getToolbar=function(){if(!this._oToolbar){this._oToolbar=new i(this.getId()+"-footer").addStyleClass("sapMTBNoBorders");this._oToolbar.addDelegate({onAfterRendering:function(){if(this.getType()===D.Message){this.$("footer").removeClass("sapContrast sapContrastPlus")}}},false,this);this.setAggregation("_toolbar",this._oToolbar)}return this._oToolbar};O.prototype.getValueStateString=function(t){var e=sap.ui.getCore().getLibraryResourceBundle("sap.m");switch(t){case M.Success:return e.getText("LIST_ITEM_STATE_SUCCESS");case M.Warning:return e.getText("LIST_ITEM_STATE_WARNING");case M.Error:return e.getText("LIST_ITEM_STATE_ERROR");case M.Information:return e.getText("LIST_ITEM_STATE_INFORMATION");default:return""}};O.prototype.setSubHeader=function(t){this.setAggregation("subHeader",t);if(t){t.setVisible=function(e){t.setProperty("visible",e);this.invalidate()}.bind(this)}return this};O.prototype.setLeftButton=function(t){if(typeof t==="string"){t=sap.ui.getCore().byId(t)}this.setBeginButton(t);return this.setAssociation("leftButton",t)};O.prototype.setRightButton=function(t){if(typeof t==="string"){t=sap.ui.getCore().byId(t)}this.setEndButton(t);return this.setAssociation("rightButton",t)};O.prototype.getLeftButton=function(){var t=this.getBeginButton();return t?t.getId():null};O.prototype.getRightButton=function(){var t=this.getEndButton();return t?t.getId():null};O.prototype.setBeginButton=function(t){if(t&&t.isA("sap.m.Button")){t.addStyleClass("sapMDialogBeginButton")}return this.setAggregation("beginButton",t)};O.prototype.setEndButton=function(t){if(t&&t.isA("sap.m.Button")){t.addStyleClass("sapMDialogEndButton")}return this.setAggregation("endButton",t)};O.prototype.getAggregation=function(t,e,i){var o=l.prototype.getAggregation.apply(this,Array.prototype.slice.call(arguments,0,2));if(t==="buttons"&&o&&o.length===0){this.getBeginButton()&&o.push(this.getBeginButton());this.getEndButton()&&o.push(this.getEndButton())}return o};O.prototype.getAriaLabelledBy=function(){var t=this._getAnyHeader(),e=this.getAssociation("ariaLabelledBy",[]).slice();var i=this.getSubHeader();if(i){e.unshift(i.getId())}if(t){var o=t.findAggregatedObjects(true,function(t){return t.isA("sap.m.Title")});if(o.length){e=o.map(function(t){return t.getId()}).concat(e)}else{e.unshift(t.getId())}}return e};O.prototype._applyIconToHeader=function(){var t=this.getIcon();if(!t){if(this._iconImage){this._iconImage.destroy();this._iconImage=null}return}if(!this._iconImage){this._iconImage=h.createControlByURI({id:this.getId()+"-icon",src:t,useIconTooltip:false},r).addStyleClass("sapMDialogIcon");this._header.insertAggregation("contentMiddle",this._iconImage,0)}this._iconImage.setSrc(t)};O.prototype.setInitialFocus=function(t){return this.setAssociation("initialFocus",t,true)};O.prototype.forceInvalidate=l.prototype.invalidate;O.prototype.invalidate=function(t){if(this.isOpen()){this.forceInvalidate(t)}};function x(t){var e=I(t);var i=e.control(0);if(e.parents(".sapMDialogSection").length){return false}if(!i||i.getMetadata().getInterfaces().indexOf("sap.m.IBar")>-1){return true}return e.hasClass("sapMDialogTitle")}if(_.system.desktop){O.prototype.ondblclick=function(t){if(x(t.target)){var e=this.$("cont");this._bDisableRepositioning=false;this._oManuallySetPosition=null;this._oManuallySetSize=null;this.oPopup&&this.oPopup._applyPosition(this.oPopup._oLastPosition,true);e.css({height:"100%"})}};O.prototype.onmousedown=function(t){if(t.which===3){return}if(this.getStretch()||!this.getDraggable()&&!this.getResizable()){return}var e;var i=this;var o=I(document);var s=I(t.target);var n=s.hasClass("sapMDialogResizeHandler")&&this.getResizable();var a=function(t){e=e?clearTimeout(e):setTimeout(function(){t()},0)};var r=window.innerWidth;var l=window.innerHeight;var h={x:t.pageX,y:t.pageY,width:i._$dialog.width(),height:i._$dialog.height(),outerHeight:i._$dialog.outerHeight(),offset:{x:t.offsetX?t.offsetX:t.originalEvent.layerX,y:t.offsetY?t.offsetY:t.originalEvent.layerY},position:{x:i._$dialog.offset().left,y:i._$dialog.offset().top}};var u;function p(){var t=i.$(),e=i.$("cont"),s,a;o.off("mouseup",p);o.off("mousemove",u);if(n){i._$dialog.removeClass("sapMDialogResizing");s=parseInt(t[0].style.height)||parseInt(t.height());a=parseInt(t.css("border-top-width"))+parseInt(t.css("border-bottom-width"));e.height(s+a)}}if(x(t.target)&&this.getDraggable()||n){i._bDisableRepositioning=true;i._$dialog.addClass("sapDialogDisableTransition");i._oManuallySetPosition={x:h.position.x,y:h.position.y};i._$dialog.css({left:Math.min(Math.max(0,i._oManuallySetPosition.x),r-h.width),top:Math.min(Math.max(0,i._oManuallySetPosition.y),l-h.height),width:h.width})}if(x(t.target)&&this.getDraggable()){u=function(e){if(e.buttons===0){p();return}a(function(){i._bDisableRepositioning=true;i._oManuallySetPosition={x:e.pageX-t.pageX+h.position.x,y:e.pageY-t.pageY+h.position.y};i._$dialog.css({left:Math.min(Math.max(0,i._oManuallySetPosition.x),r-h.width),top:Math.min(Math.max(0,i._oManuallySetPosition.y),l-h.outerHeight)})})};o.on("mousemove",u)}else if(n){i._$dialog.addClass("sapMDialogResizing");var g={};var c=parseInt(i._$dialog.css("min-width"));var d=h.x+h.width-c;var f=s.width()-t.offsetX;var _=s.height()-t.offsetY;u=function(t){a(function(){i._bDisableRepositioning=true;i.$("cont").height("").width("");if(t.pageY+_>l){t.pageY=l-_}if(t.pageX+f>r){t.pageX=r-f}i._oManuallySetSize={width:h.width+t.pageX-h.x,height:h.height+t.pageY-h.y};if(i._bRTL){g.left=Math.min(Math.max(t.pageX,0),d);i._oManuallySetSize.width=h.width+h.x-Math.max(t.pageX,0)}g.width=i._oManuallySetSize.width;g.height=i._oManuallySetSize.height;i._$dialog.css(g)})};o.on("mousemove",u)}else{return}o.on("mouseup",p);t.preventDefault();t.stopPropagation()}}O.prototype._applyContextualSettings=function(){y.prototype._applyContextualSettings.call(this,y._defaultContextualSettings)};a.mixInto(O.prototype);return O});