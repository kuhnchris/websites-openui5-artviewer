/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/library","sap/m/HyphenationSupport"],function(e,t){"use strict";var a=e.TextAlign;var i=e.TitleLevel;var l={apiVersion:2};l.render=function(e,l){var s=l._getTitle(),r=(s?s.getLevel():l.getLevel())||i.Auto,n=r==i.Auto,p=n?"div":r.toLowerCase(),o=t.getTextForRender(l,"main");e.openStart(p,l);e.class("sapMTitle");e.class("sapMTitleStyle"+l.getTitleStyle());e.class(l.getWrapping()?"sapMTitleWrap":"sapMTitleNoWrap");e.class("sapUiSelectable");var g=l.getWidth();if(!g){e.class("sapMTitleMaxWidth")}else{e.style("width",g)}var T=l.getTextAlign();if(T&&T!=a.Initial){e.class("sapMTitleAlign"+T)}if(l.getParent()instanceof sap.m.Toolbar){e.class("sapMTitleTB")}var c=s?s.getTooltip_AsString():l.getTooltip_AsString();if(c){e.attr("title",c)}if(n){e.attr("role","heading");e.attr("aria-level",l._getAriaLevel())}t.writeHyphenationClass(e,l);e.openEnd();e.openStart("span",l.getId()+"-inner");e.openEnd();e.text(o);e.close("span");e.close(p)};return l},true);