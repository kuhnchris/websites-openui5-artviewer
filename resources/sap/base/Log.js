/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/now"],function(e){"use strict";var n={};n.Level={NONE:-1,FATAL:0,ERROR:1,WARNING:2,INFO:3,DEBUG:4,TRACE:5,ALL:5+1};var t,o=[],i={"":n.Level.ERROR},r=3e3,s=null,l=false;function c(e,n){return("000"+String(e)).slice(-n)}function f(e){return!e||isNaN(i[e])?i[""]:i[e]}function a(){var e=o.length;if(e){var n=Math.min(e,Math.floor(r*.7));if(s){s.onDiscardLogEntries(o.slice(0,e-n))}if(n){o=o.slice(-n,e)}else{o=[]}}}function u(){if(!s){s={listeners:[],onLogEntry:function(e){for(var n=0;n<s.listeners.length;n++){if(s.listeners[n].onLogEntry){s.listeners[n].onLogEntry(e)}}},onDiscardLogEntries:function(e){for(var n=0;n<s.listeners.length;n++){if(s.listeners[n].onDiscardLogEntries){s.listeners[n].onDiscardLogEntries(e)}}},attach:function(e,n){if(n){s.listeners.push(n);if(n.onAttachToLog){n.onAttachToLog(e)}}},detach:function(e,n){for(var t=0;t<s.listeners.length;t++){if(s.listeners[t]===n){if(n.onDetachFromLog){n.onDetachFromLog(e)}s.listeners.splice(t,1);return}}}}}return s}n.fatal=function(e,t,o,i){g(n.Level.FATAL,e,t,o,i)};n.error=function(e,t,o,i){g(n.Level.ERROR,e,t,o,i)};n.warning=function(e,t,o,i){g(n.Level.WARNING,e,t,o,i)};n.info=function(e,t,o,i){g(n.Level.INFO,e,t,o,i)};n.debug=function(e,t,o,i){g(n.Level.DEBUG,e,t,o,i)};n.trace=function(e,t,o,i){g(n.Level.TRACE,e,t,o,i)};n.setLevel=function(e,o,r){o=o||t||"";if(!r||i[o]==null){i[o]=e;var s;Object.keys(n.Level).forEach(function(t){if(n.Level[t]===e){s=t}});g(n.Level.INFO,"Changing log level "+(o?"for '"+o+"' ":"")+"to "+s,"","sap.base.log")}};n.getLevel=function(e){return f(e||t)};n.isLoggable=function(e,o){return(e==null?n.Level.DEBUG:e)<=f(o||t)};n.logSupportInfo=function(e){l=e};function g(i,u,g,L,h){if(!h&&!L&&typeof g==="function"){h=g;g=""}if(!h&&typeof L==="function"){h=L;L=""}L=L||t;if(i<=f(L)){var v=e(),E=new Date(v),d=Math.floor((v-Math.floor(v))*1e3),p={time:c(E.getHours(),2)+":"+c(E.getMinutes(),2)+":"+c(E.getSeconds(),2)+"."+c(E.getMilliseconds(),3)+c(d,3),date:c(E.getFullYear(),4)+"-"+c(E.getMonth()+1,2)+"-"+c(E.getDate(),2),timestamp:v,level:i,message:String(u||""),details:String(g||""),component:String(L||"")};if(l&&typeof h==="function"){p.supportInfo=h()}if(r){if(o.length>=r){a()}o.push(p)}if(s){s.onLogEntry(p)}if(console){var b=g instanceof Error,R=p.date+" "+p.time+" "+p.message+" - "+p.details+" "+p.component;switch(i){case n.Level.FATAL:case n.Level.ERROR:b?console.error(R,"\n",g):console.error(R);break;case n.Level.WARNING:b?console.warn(R,"\n",g):console.warn(R);break;case n.Level.INFO:if(console.info){b?console.info(R,"\n",g):console.info(R)}else{b?console.log(R,"\n",g):console.log(R)}break;case n.Level.DEBUG:if(console.debug){b?console.debug(R,"\n",g):console.debug(R)}else{b?console.log(R,"\n",g):console.log(R)}break;case n.Level.TRACE:if(console.trace){b?console.trace(R,"\n",g):console.trace(R)}else{b?console.log(R,"\n",g):console.log(R)}break}if(console.info&&p.supportInfo){console.info(p.supportInfo)}}return p}}n.getLogEntries=function(){return o.slice()};n.getLogEntriesLimit=function(){return r};n.setLogEntriesLimit=function(e){if(e<0){throw new Error("The log entries limit needs to be greater than or equal to 0!")}r=e;if(o.length>=r){a()}};n.addLogListener=function(e){u().attach(this,e)};n.removeLogListener=function(e){u().detach(this,e)};function L(e){this.fatal=function(t,o,i,r){n.fatal(t,o,i||e,r);return this};this.error=function(t,o,i,r){n.error(t,o,i||e,r);return this};this.warning=function(t,o,i,r){n.warning(t,o,i||e,r);return this};this.info=function(t,o,i,r){n.info(t,o,i||e,r);return this};this.debug=function(t,o,i,r){n.debug(t,o,i||e,r);return this};this.trace=function(t,o,i,r){n.trace(t,o,i||e,r);return this};this.setLevel=function(t,o){n.setLevel(t,o||e);return this};this.getLevel=function(t){return n.getLevel(t||e)};this.isLoggable=function(t,o){return n.isLoggable(t,o||e)}}n.getLogger=function(e,n){if(!isNaN(n)&&i[e]==null){i[e]=n}return new L(e)};return n});