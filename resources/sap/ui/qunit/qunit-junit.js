/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
(function(){"use strict";if(typeof QUnit==="undefined"){throw new Error("qunit-junit.js: QUnit is not loaded yet!")}var e=!(parseFloat(QUnit.version)>=2);var t=document.location.pathname.substr(1).replace(/\./g,"_").replace(/\//g,".")+document.location.search.replace(/\./g,"_");function n(e){return String(e||"default").replace(/\./g,"_")}QUnit.config.callbacks.begin.unshift(function(){var e=document.querySelector("#qunit");var t=document.querySelectorAll("#qunit-header,#qunit-banner,#qunit-userAgent,#qunit-testrunner-toolbar,#qunit-tests");var n=document.querySelector("#qunit-fixture");if(e==null&&t.length>0){e=document.createElement("DIV");e.id="qunit";t[0].parentNode.insertBefore(e,t[0]);for(var i=0;i<t.length;i++){e.appendChild(t[i])}}if(n==null&&e){n=document.createElement("DIV");n.id="qunit-fixture";e.parentNode.insertBefore(n,e.nextSibling)}});if(e){QUnit.equals=window.equals=window.equal;QUnit.raises=window.raises=window["throws"]}QUnit.moduleStart(function(e){e.name=t+"."+n(e.name)});QUnit.testStart(function(i){i.module=t+"."+n(i.module);if(e){window.assert=QUnit.config.current.assert}});if(e){QUnit.testDone(function(e){try{delete window.assert}catch(e){if(!window._$cleanupFailed){QUnit.test("A script loaded via script tag defines a global assert function!",function(t){t.ok(QUnit.config.ignoreCleanupFailure,e)});window._$cleanupFailed=true}}})}if(!QUnit.jUnitDone){var i=document.location.href.replace(/\?.*|#.*/g,""),r=document.getElementsByTagName("script"),u=null,o=null,a;for(var s=0;s<r.length;s++){var l=r[s].getAttribute("src");if(l){var d=l.match(/(.*)qunit\/qunit-junit\.js$/i);if(d&&d.length>1){u=d[1];break}}}if(u===null){if(typeof sap==="object"&&sap.ui&&sap.ui.require&&sap.ui.require.toUrl){o=sap.ui.require.toUrl("sap/ui/thirdparty/qunit-reporter-junit.js")}else if(typeof jQuery!=="undefined"&&jQuery.sap&&jQuery.sap.getResourcePath){o=jQuery.sap.getResourcePath("sap/ui/thirdparty/qunit-reporter-junit",".js")}else{throw new Error("qunit-junit.js: The script tag seems to be malformed!")}}else{o=u+"thirdparty/qunit-reporter-junit.js"}a=new XMLHttpRequest;a.open("GET",o,false);a.onreadystatechange=function(){if(a.readyState==4){var e=a.responseText;if(typeof URI!=="undefined"){e+="\n//# sourceURL="+URI(o).absoluteTo(i)}window.eval(e)}};a.send(null)}QUnit.jUnitDone(function(e){window._$jUnitReport.results=e.results;window._$jUnitReport.xml=e.xml});QUnit.log(function(e){window._$jUnitReport.tests=window._$jUnitReport.tests||[];var t=String(e.message)||(e.result?"okay":"failed");if(!e.result){if(e.expected!==undefined){t+="\nExpected: "+e.expected}if(e.actual!==undefined){t+="\nResult: "+e.actual}if(e.expected!==undefined&&e.actual!==undefined){t+="\nDiff: "+e.expected+" != "+e.actual}if(e.source){t+="\nSource: "+e.source}}window._$jUnitReport.tests.push({module:e.module,name:e.name,text:t,pass:e.result})});window._$jUnitReport={}})();