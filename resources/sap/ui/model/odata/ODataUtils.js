/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/model/Sorter","sap/ui/model/FilterProcessor","sap/ui/core/format/DateFormat","sap/base/Log","sap/base/assert","sap/ui/thirdparty/jquery","sap/base/security/encodeURL","sap/ui/core/CalendarType"],function(e,r,t,n,a,i,s,u){"use strict";var o,f,l,c=/^([-+]?)0*(\d+)(\.\d+|)$/,d,m=/\.$/,g=/0+$/;function p(){if(!o){o=t.getDateInstance({pattern:"'datetime'''yyyy-MM-dd'T'HH:mm:ss''",calendarType:u.Gregorian});f=t.getDateInstance({pattern:"'datetime'''yyyy-MM-dd'T'HH:mm:ss.SSS''",calendarType:u.Gregorian});l=t.getDateInstance({pattern:"'datetimeoffset'''yyyy-MM-dd'T'HH:mm:ss'Z'''",calendarType:u.Gregorian});d=t.getTimeInstance({pattern:"'time''PT'HH'H'mm'M'ss'S'''",calendarType:u.Gregorian})}}var y=function(){};y.createSortParams=function(r){var t;if(!r||r.length==0){return}t="$orderby=";for(var a=0;a<r.length;a++){var i=r[a];if(i instanceof e){t+=i.sPath;t+=i.bDescending?"%20desc":"%20asc";t+=","}else{n.error("Trying to use "+i+" as a Sorter, but it is a "+typeof i)}}t=t.slice(0,-1);return t};function h(e){if(e&&typeof e.convert==="function"){e=e.convert()}return e}y.createFilterParams=function(e,t,n){var a;if(Array.isArray(e)){e=e.map(h);a=r.groupFilters(e)}else{a=h(e)}if(!a){return}return"$filter="+this._createFilterParams(a,t,n)};y._createFilterParams=function(e,t,n){var a=this,i=Array.isArray(e)?r.groupFilters(e):e;function s(e,r){e=h(e);if(e.aFilters){return u(e,r)}return a._createFilterSegment(e.sPath,t,n,e.sOperator,e.oValue1,e.oValue2,e.bCaseSensitive)}function u(e,r){var t=e.aFilters,n=!!e.bAnd,a="";if(t.length===0){return n?"true":"false"}if(t.length===1){if(t[0]._bMultiFilter){return s(t[0])}return s(t[0],true)}if(!r){a+="("}a+=s(t[0]);for(var i=1;i<t.length;i++){a+=n?"%20and%20":"%20or%20";a+=s(t[i])}if(!r){a+=")"}return a}if(!i){return}return s(i,true)};y._createUrlParamsArray=function(e){var r,t=i.type(e),n;if(t==="array"){return e}r=[];if(t==="object"){n=this._encodeURLParameters(e);if(n){r.push(n)}}else if(t==="string"){if(e){r.push(e)}}return r};y._encodeURLParameters=function(e){if(!e){return""}var r=[];i.each(e,function(e,t){if(i.type(t)==="string"){t=encodeURIComponent(t)}e=e.startsWith("$")?e:encodeURIComponent(e);r.push(e+"="+t)});return r.join("&")};y.setOrigin=function(e,r){var t,a,i;if(!e||!r||e.indexOf(";mo")>0){return e}if(typeof r=="string"){t=r}else{t=r.alias;if(!t){a=r.system;i=r.client;if(!a||!i){n.warning("ODataUtils.setOrigin: No Client or System ID given for Origin");return e}t="sid("+a+"."+i+")"}}var s=e.split("?");var u=s[0];var o=s[1]?"?"+s[1]:"";var f="";if(u[u.length-1]==="/"){u=u.substring(0,u.length-1);f="/"}var l=/(\/[^\/]+)$/g;var c=/(;o=[^\/;]+)/g;var d=u.match(l)[0];var m=d.match(c);var g=m?m[0]:null;if(g){if(r.force){var p=d.replace(g,";o="+t);u=u.replace(d,p);return u+f+o}return e}u=u+";o="+t+f;return u+o};y.setAnnotationOrigin=function(e,r){var t;var a=e.indexOf("/Annotations(");var i=r&&r.preOriginBaseUri?r.preOriginBaseUri.indexOf(".xsodata"):-1;if(a===-1){a=e.indexOf("/Annotations%28")}if(a>=0){if(e.indexOf("/$value",a)===-1){n.warning("ODataUtils.setAnnotationOrigin: Annotation url is missing $value segment.");t=e}else{var s=e.substring(0,a);var u=e.substring(a,e.length);var o=y.setOrigin(s,r);t=o+u}}else if(i>=0){t=y.setOrigin(e,r)}else{t=e.replace(r.preOriginBaseUri,r.postOriginBaseUri)}return t};y._resolveMultiFilter=function(e,r,t){var n=this,a=e.aFilters,s="";if(a){s+="(";i.each(a,function(i,u){if(u._bMultiFilter){s+=n._resolveMultiFilter(u,r,t)}else if(u.sPath){s+=n._createFilterSegment(u.sPath,r,t,u.sOperator,u.oValue1,u.oValue2,"",u.bCaseSensitive)}if(i<a.length-1){if(e.bAnd){s+="%20and%20"}else{s+="%20or%20"}}});s+=")"}return s};y._createFilterSegment=function(e,r,t,i,u,o,f){var l,c;if(f===undefined){f=true}if(t){l=r._getPropertyMetadata(t,e);c=l&&l.type;a(l,"PropertyType for property "+e+" of EntityType "+t.name+" not found!")}if(c){u=this.formatValue(u,c,f);o=o!=null?this.formatValue(o,c,f):null}else{a(null,"Type for filter property could not be found in metadata!")}if(u){u=s(String(u))}if(o){o=s(String(o))}if(!f&&c==="Edm.String"){e="toupper("+e+")"}switch(i){case"EQ":case"NE":case"GT":case"GE":case"LT":case"LE":return e+"%20"+i.toLowerCase()+"%20"+u;case"BT":return"("+e+"%20ge%20"+u+"%20and%20"+e+"%20le%20"+o+")";case"NB":return"not%20("+e+"%20ge%20"+u+"%20and%20"+e+"%20le%20"+o+")";case"Contains":return"substringof("+u+","+e+")";case"NotContains":return"not%20substringof("+u+","+e+")";case"StartsWith":return"startswith("+e+","+u+")";case"NotStartsWith":return"not%20startswith("+e+","+u+")";case"EndsWith":return"endswith("+e+","+u+")";case"NotEndsWith":return"not%20endswith("+e+","+u+")";default:n.error("ODataUtils :: Unknown filter operator "+i);return"true"}};y.formatValue=function(e,r,t){var n,a;if(t===undefined){t=true}if(e===null||e===undefined){return"null"}p();switch(r){case"Edm.String":e=t?e:e.toUpperCase();a="'"+String(e).replace(/'/g,"''")+"'";break;case"Edm.Time":if(typeof e==="object"){a=d.format(new Date(e.ms),true)}else{a="time'"+e+"'"}break;case"Edm.DateTime":n=e instanceof Date?e:new Date(e);if(n.getMilliseconds()>0){a=f.format(n,true)}else{a=o.format(n,true)}break;case"Edm.DateTimeOffset":n=e instanceof Date?e:new Date(e);a=l.format(n,true);break;case"Edm.Guid":a="guid'"+e+"'";break;case"Edm.Decimal":a=e+"m";break;case"Edm.Int64":a=e+"l";break;case"Edm.Double":a=e+"d";break;case"Edm.Float":case"Edm.Single":a=e+"f";break;case"Edm.Binary":a="binary'"+e+"'";break;default:a=String(e);break}return a};y.parseValue=function(e){var r=e[0],t=e[e.length-1];p();if(r==="'"){return e.slice(1,-1).replace(/''/g,"'")}else if(e.startsWith("time'")){return{__edmType:"Edm.Time",ms:d.parse(e,true).getTime()}}else if(e.startsWith("datetime'")){if(e.indexOf(".")===-1){return o.parse(e,true)}else{return f.parse(e,true)}}else if(e.startsWith("datetimeoffset'")){return l.parse(e,true)}else if(e.startsWith("guid'")){return e.slice(5,-1)}else if(e==="null"){return null}else if(t==="m"||t==="l"||t==="d"||t==="f"){return e.slice(0,-1)}else if(!isNaN(r)||r==="-"){return parseInt(e)}else if(e==="true"||e==="false"){return e==="true"}else if(e.startsWith("binary'")){return e.slice(7,-1)}throw new Error("Cannot parse value '"+e+"', no Edm type found")};function v(e,r){if(e===r){return 0}if(e===null||r===null||e===undefined||r===undefined){return NaN}return e>r?1:-1}function b(e){var r;if(typeof e!=="string"){return undefined}r=c.exec(e);if(!r){return undefined}return{sign:r[1]==="-"?-1:1,integerLength:r[2].length,abs:r[2]+r[3].replace(g,"").replace(m,"")}}function E(e,r){var t,n,a;if(e===r){return 0}t=b(e);n=b(r);if(!t||!n){return NaN}if(t.sign!==n.sign){return t.sign>n.sign?1:-1}a=v(t.integerLength,n.integerLength)||v(t.abs,n.abs);return t.sign*a}var T=/^PT(\d\d)H(\d\d)M(\d\d)S$/;function D(e){if(typeof e==="string"&&T.test(e)){e=parseInt(RegExp.$1)*36e5+parseInt(RegExp.$2)*6e4+parseInt(RegExp.$3)*1e3}if(e instanceof Date){return e.getTime()}if(e&&e.__edmType==="Edm.Time"){return e.ms}return e}y.compare=function(e,r,t){return t?E(e,r):v(D(e),D(r))};y.getComparator=function(e){switch(e){case"Edm.Date":case"Edm.DateTime":case"Edm.DateTimeOffset":case"Edm.Time":return y.compare;case"Edm.Decimal":case"Edm.Int64":return E;default:return v}};var O=/([(=,])('.*?')([,)])/g,S=/[MLDF](?=[,)](?:[^']*'[^']*')*[^']*$)/g,F=/([(=,])(X')/g,_=function(e,r,t,n){return r+encodeURIComponent(decodeURIComponent(t))+n},w=function(e){return e.toLowerCase()},U=function(e,r){return r+"binary'"};y._normalizeKey=function(e){return e.replace(O,_).replace(S,w).replace(F,U)};return y},true);