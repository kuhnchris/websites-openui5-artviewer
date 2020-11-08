/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/date/UniversalDate","sap/ui/unified/CalendarAppointment","sap/ui/unified/CalendarLegendRenderer","sap/ui/Device","sap/ui/unified/library","sap/ui/core/InvisibleText","sap/base/Log"],function(e,t,a,n,r,i,s){"use strict";var l=r.CalendarDayType;var p=r.CalendarIntervalType;var o=r.CalendarAppointmentVisualization;var d={apiVersion:2};d.render=function(e,t){var a=t.getTooltip_AsString();var r=t.getAppointmentsVisualization();var i=this.getLegendItems(t);e.openStart("div",t);e.class("sapUiCalendarRow");if(!n.system.phone&&t.getAppointmentsReducedHeight()){e.class("sapUiCalendarRowAppsRedHeight")}if(r!=o.Standard){e.class("sapUiCalendarRowVis"+r)}if(a){e.attr("title",a)}var s=t.getWidth();if(s){e.style("width",s)}var l=t.getHeight();if(l){e.style("height",l)}e.accessibilityState(t);e.openEnd();this.renderAppointmentsRow(e,t,i);e.close("div")};d.renderAppointmentsRow=function(e,t,a){var n=t.getId();e.openStart("div",n+"-Apps");e.class("sapUiCalendarRowApps");e.openEnd();this.renderBeforeAppointments(e,t);this.renderAppointments(e,t,a);this.renderAfterAppointments(e,t);e.close("div")};d.renderBeforeAppointments=function(e,t){};d.renderAfterAppointments=function(e,t){};d.renderResizeHandle=function(e,t,a){};d.renderAppointments=function(t,a,n){var r=a._getVisibleAppointments();var i=a._getVisibleIntervalHeaders();var s=a._getStartDate();var l=[];var o=0;var d=0;var c=[];var g=0;var v=0;var f=a.getIntervals();var u=a.getIntervalType();var A=100/f;var C=0;var T=new e(s);var h=false;var I=false;switch(u){case p.Hour:l=a.getNonWorkingHours()||[];o=s.getUTCHours();d=24;break;case p.Day:case p.Week:case p.OneMonth:l=a._getNonWorkingDays();o=s.getUTCDay();d=7;c=a.getNonWorkingHours()||[];g=s.getUTCHours();v=24;break;case p.Month:c=a._getNonWorkingDays();g=s.getUTCDay();v=7;break;default:break}if(a._isOneMonthsRowOnSmallSizes()){this.renderSingleDayInterval(t,a,r,n,i,l,o,d,c,g,v,true,true)}else{for(C=0;C<f;C++){if(I){h=true}else{h=false}I=false;switch(u){case p.Hour:T.setUTCHours(T.getUTCHours()+1);if(T.getUTCHours()==0){I=true}break;case p.Day:case p.Week:case p.OneMonth:T.setUTCDate(T.getUTCDate()+1);if(T.getUTCDate()==1){I=true}break;case p.Month:T.setUTCMonth(T.getUTCMonth()+1);if(T.getUTCMonth()==0){I=true}break;default:break}this.renderInterval(t,a,C,A,i,l,o,d,c,g,v,h,I)}this.renderIntervalHeaders(t,a,A,i,f);t.openStart("div",a.getId()+"-Now");t.class("sapUiCalendarRowNow");t.openEnd();t.close("div");for(C=0;C<r.length;C++){var U=r[C];this.renderAppointment(t,a,U,n)}t.openStart("div",a.getId()+"-DummyApp");t.class("sapUiCalendarApp");t.class("sapUiCalendarAppTitleOnly");t.class("sapUiCalendarAppDummy");t.openEnd();t.close("div")}};d.writeCustomAttributes=function(e,t){};d.renderInterval=function(t,a,n,r,i,s,l,o,d,c,g,v,f,u){var A=a.getId()+"-AppsInt"+n;var C;var T=a.getShowIntervalHeaders()&&(a.getShowEmptyIntervalHeaders()||i.length>0);var h=a.getStartDate().getMonth();var I=new Date(a.getStartDate().getFullYear(),h+1,0).getDate();t.openStart("div",A);t.class("sapUiCalendarRowAppsInt");if(u){t.class(u)}t.style("width",r+"%");if(n>=I&&a.getIntervalType()===p.OneMonth){t.class("sapUiCalItemOtherMonth")}for(C=0;C<s.length;C++){if((n+l)%o==s[C]){t.class("sapUiCalendarRowAppsNoWork");break}}if(!T){t.class("sapUiCalendarRowAppsIntNoHead")}if(v){t.class("sapUiCalendarRowAppsIntFirst")}if(f){t.class("sapUiCalendarRowAppsIntLast")}this.writeCustomAttributes(t,a);t.openEnd();if(T){t.openStart("div");t.class("sapUiCalendarRowAppsIntHead");t.openEnd();t.close("div")}if(a.getShowSubIntervals()){var U=a.getIntervalType();var b=0;switch(U){case p.Hour:b=4;break;case p.Day:case p.Week:case p.OneMonth:b=24;break;case p.Month:var w=a._getStartDate();var S=new e(w);S.setUTCMonth(S.getUTCMonth()+n+1,0);b=S.getUTCDate();S.setUTCDate(1);l=S.getUTCDay();break;default:break}var m=100/b;for(C=0;C<b;C++){t.openStart("div");t.class("sapUiCalendarRowAppsSubInt");t.style("width",m+"%");for(var y=0;y<d.length;y++){if((C+c)%g==d[y]){t.class("sapUiCalendarRowAppsNoWork");break}}t.openEnd();t.close("div")}}t.close("div")};d.renderIntervalHeaders=function(e,t,a,n,r){var i=t.getShowIntervalHeaders()&&(t.getShowEmptyIntervalHeaders()||n.length>0);if(i){for(var s=0;s<n.length;s++){var l=n[s],p,o;if(t._bRTL){o=a*l.interval;p=a*(r-l.last-1)}else{p=a*l.interval;o=a*(r-l.last-1)}this.renderIntervalHeader(e,t,l,t._bRTL,p,o)}}};d.renderIntervalHeader=function(e,t,a,n,r,i){var s=a.appointment.getId();var p=t._calculateAppoitnmentVisualCue(a.appointment);e.openStart("div",a.appointment);e.class("sapUiCalendarRowAppsIntHead");if(r!==undefined){e.style("left",r+"%")}if(i!==undefined){e.style("right",i+"%")}e.class("sapUiCalendarRowAppsIntHeadFirst");if(a.appointment.getSelected()){e.class("sapUiCalendarRowAppsIntHeadSel")}if(a.appointment.getTentative()){e.class("sapUiCalendarRowAppsIntHeadTent")}var o=a.appointment.getTooltip_AsString();if(o){e.attr("title",o)}var d=a.appointment.getType();var c=a.appointment.getColor();if(!c&&d&&d!=l.None){e.class("sapUiCalendarRowAppsIntHead"+d)}if(c){if(n){e.style("border-right-color",c)}else{e.style("border-left-color",c)}}e.openEnd();e.openStart("div");e.class("sapUiCalendarIntervalHeaderCont");if(c){e.style("background-color",a.appointment._getCSSColorForBackground(c))}e.openEnd();if(p.appTimeUnitsDifRowStart>0){e.icon("sap-icon://arrow-left",["sapUiCalendarAppArrowIconLeft"],{title:null})}var g=a.appointment.getIcon();if(g){var v=["sapUiCalendarRowAppsIntHeadIcon"];var f={};f["id"]=s+"-Icon";f["title"]=null;e.icon(g,v,f)}var u=a.appointment.getTitle();if(u){e.openStart("span",s+"-Title");e.class("sapUiCalendarRowAppsIntHeadTitle");e.openEnd();e.text(u);e.close("span")}var A=a.appointment.getText();if(A){e.openStart("span",s+"-Text");e.class("sapUiCalendarRowAppsIntHeadText");e.openEnd();e.text(A);e.close("span")}if(p.appTimeUnitsDifRowEnd>0){e.icon("sap-icon://arrow-right",["sapUiCalendarAppArrowIconRight"],{title:null})}e.close("div");e.close("div")};d.renderAppointment=function(e,t,a,n,r){var s=a.appointment;var p=s.getTooltip_AsString();var d=s.getType();var c=s.getColor();var g=s.getTitle();var v=s.getText();var f=s.getIcon();var u=s.getId();var A={labelledby:{value:i.getStaticId("sap.ui.unified","APPOINTMENT")+" "+u+"-Descr",append:true},selected:null};var C=t.getAriaLabelledBy();var T=t._calculateAppoitnmentVisualCue(s);if(C.length>0){A["labelledby"].value=A["labelledby"].value+" "+C.join(" ")}if(g){A["labelledby"].value=A["labelledby"].value+" "+u+"-Title"}if(v){A["labelledby"].value=A["labelledby"].value+" "+u+"-Text"}e.openStart("div",s);e.class("sapUiCalendarApp");if(s.getSelected()){e.class("sapUiCalendarAppSel");A["labelledby"].value=A["labelledby"].value+" "+i.getStaticId("sap.ui.unified","APPOINTMENT_SELECTED")}if(s.getTentative()){e.class("sapUiCalendarAppTent");A["labelledby"].value=A["labelledby"].value+" "+i.getStaticId("sap.ui.unified","APPOINTMENT_TENTATIVE")}if(!v){e.class("sapUiCalendarAppTitleOnly")}if(f){e.class("sapUiCalendarAppWithIcon")}if(!r){if(t._bRTL){e.style("right",a.begin+"%");e.style("left",a.end+"%")}else{e.style("left",a.begin+"%");e.style("right",a.end+"%")}}e.attr("data-sap-level",a.level);if(t._sFocusedAppointmentId==u){e.attr("tabindex","0")}else{e.attr("tabindex","-1")}if(p){e.attr("title",p)}if(!c&&d&&d!=l.None){e.class("sapUiCalendarApp"+d)}if(c){if(t._bRTL){e.style("border-right-color",c)}else{e.style("border-left-color",c)}}e.accessibilityState(s,A);e.openEnd();e.openStart("div");e.class("sapUiCalendarAppCont");if(c&&t.getAppointmentsVisualization()===o.Filled){e.style("background-color",s._getCSSColorForBackground(c))}e.openEnd();if(T.appTimeUnitsDifRowStart>0){e.icon("sap-icon://arrow-left",["sapUiCalendarAppArrowIconLeft"],{title:null})}if(f){var h=["sapUiCalendarAppIcon"];var I={};I["id"]=u+"-Icon";I["title"]=null;e.icon(f,h,I)}e.openStart("div");e.class("sapUiCalendarAppTitleWrapper");e.openEnd();if(g){e.openStart("span",u+"-Title");e.class("sapUiCalendarAppTitle");e.openEnd();e.text(g);e.close("span")}if(v){e.openStart("span",u+"-Text");e.class("sapUiCalendarAppText");e.openEnd();e.text(v);e.close("span")}e.close("div");if(T.appTimeUnitsDifRowEnd>0){e.icon("sap-icon://arrow-right",["sapUiCalendarAppArrowIconRight"],{title:null})}var U=t._oRb.getText("CALENDAR_START_TIME")+": "+t._oFormatAria.format(s.getStartDate());U=U+"; "+t._oRb.getText("CALENDAR_END_TIME")+": "+t._oFormatAria.format(s.getEndDate());if(d&&d!=l.None){U=U+"; "+this.getAriaTextForType(d,n)}e.openStart("span",u+"-Descr");e.class("sapUiInvisibleText");e.openEnd();e.text(U);e.close("span");e.close("div");this.renderResizeHandle(e,t,s);e.close("div")};d.renderSingleDayInterval=function(a,n,r,i,s,l,o,d,c,g,v,f,u){var A=1,C=100,T=n.getId()+"-AppsInt"+A,h,I=n.getShowIntervalHeaders()&&(n.getShowEmptyIntervalHeaders()||s.length>0),U=n.getStartDate(),b=U.getMonth(),w=new Date(U.getFullYear(),b+1,0).getDate(),S,m=n._getPlanningCalendar(),y,R,D=[];U.setHours(0,0,0,0);y=r.concat(n.getIntervalHeaders().filter(function(e){var t=e.getStartDate().getTime(),a=e.getEndDate().getTime(),n=U.getTime(),r=n+1e3*60*60*24;return!(t>=r||a<=n)}).map(function(e){return{appointment:e,isHeader:true}})).sort(t._getComparer(U));if(m){D=m._getSelectedDates()}a.openStart("div",T);a.class("sapUiCalendarRowAppsInt");a.class("sapUiCalendarMonthRowAppsS");a.style("width",C+"%");if(A>=w&&n.getIntervalType()===p.OneMonth){a.class("sapUiCalItemOtherMonth")}for(h=0;h<l.length;h++){if((A+o)%d==l[h]){a.class("sapUiCalendarRowAppsNoWork");break}}if(!I){a.class("sapUiCalendarRowAppsIntNoHead")}if(f){a.class("sapUiCalendarRowAppsIntFirst")}if(u){a.class("sapUiCalendarRowAppsIntLast")}a.openEnd();if(I){a.openStart("div");a.class("sapUiCalendarRowAppsIntHead");a.openEnd();a.close("div")}if(D.length>0){var E=0,H=y.length;if(m.getRows()[0]._calculateVisibleAppointments){var _=m.getRows()[0]._calculateVisibleAppointments(D,y);E=_.iStart;H=_.iEnd}for(h=E;h<H;h++){R=y[h];a.openStart("div");a.class("sapUiCalendarAppContainer");a.openEnd();a.openStart("div");a.class("sapUiCalendarAppContainerLeft");a.openEnd();a.openStart("div");a.class("sapUiCalendarAppStart");a.openEnd();a.text(R.appointment._getDateRangeIntersectionText(U).start);a.close("div");a.openStart("div");a.class("sapUiCalendarAppEnd");a.openEnd();a.text(R.appointment._getDateRangeIntersectionText(U).end);a.close("div");a.close("div");a.openStart("div");a.class("sapUiCalendarAppContainerRight");a.openEnd();if(R.isHeader){this.renderIntervalHeader(a,n,R)}else{this.renderAppointment(a,n,R,i,true)}a.close("div");a.close("div")}}if(r.length===0||D.length===0){a.openStart("div");a.class("sapUiCalendarNoApps");a.openEnd();var k=sap.ui.getCore().byId(n.getAssociation("row"));S=k.getNoAppointmentsText()?k.getNoAppointmentsText():sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("PLANNINGCALENDAR_ROW_NO_APPOINTMENTS");a.text(S);a.close("div")}a.openStart("div",n.getId()+"-Now");a.class("sapUiCalendarRowNow");a.openEnd();a.close("div");a.openStart("div",n.getId()+"-DummyApp");a.class("sapUiCalendarApp");a.class("sapUiCalendarAppTitleOnly");a.class("sapUiCalendarAppDummy");a.style("margin","0");a.style("height","0px");a.openEnd();a.close("div");if(n.getShowSubIntervals()){var N=n.getIntervalType();var x=0;switch(N){case p.Hour:x=4;break;case p.Day:case p.Week:case p.OneMonth:x=24;break;case p.Month:var M=new e(U);M.setUTCMonth(M.getUTCMonth()+A+1,0);x=M.getUTCDate();M.setUTCDate(1);o=M.getUTCDay();break;default:break}var L=100/x;for(h=0;h<x;h++){a.openStart("div");a.class("sapUiCalendarRowAppsSubInt");a.style("width",L+"%");for(var O=0;O<c.length;O++){if((h+g)%v==c[O]){a.class("sapUiCalendarRowAppsNoWork");break}}a.openEnd();a.close("div")}}a.close("div")};d.getLegendItems=function(e){var t=[],a,n=e.getLegend();if(n){a=sap.ui.getCore().byId(n);if(a){t=a.getItems()}else{s.error("CalendarLegend with id '"+n+"' does not exist!",e)}}return t};d.getAriaTextForType=function(e,t){var n,r,i,s;if(t&&t.length){for(var s=0;s<t.length;s++){i=t[s];if(i.getType()===e){n=i.getText();break}}}if(!n){r=a.getTypeAriaText(e);if(r){n=r.getText()}}return n};return d},true);