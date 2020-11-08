/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/ui/performance/trace/Passport","sap/base/Log"],function(e,t,s){"use strict";var i=function(){var i=/sap-ui-xx-e2e-trace-level=(low|medium|high)/.exec(location.search);var r;if(i&&i.length>=2){r=i[1]}else{r="medium"}var n="/sap/bc/sdf/E2E_Trace_upl";var a;var o=false;var d=function(e){this.idx=e.xidx;this.dsrGuid=e.xDsrGuid;this.method=e.xmethod;this.url=e.xurl;this.reqHeader=e.xRequestHeaders;this.respHeader=e.getAllResponseHeaders();this.statusCode=e.status;this.status=e.statusText;this.startTimestamp=e.xstartTimestamp;this.firstByteSent=e.xfirstByteSent?e.xfirstByteSent:e.xstartTimestamp;this.lastByteSent=this.firstByteSent;this.firstByteReceived=e.xfirstByteReceived?e.xfirstByteReceived:e.xlastByteReceived;this.lastByteReceived=e.xlastByteReceived;this.sentBytes=0;this.receivedBytes=e.responseText.length;this.getDuration=function(){return this.lastByteReceived-this.startTimestamp};this.getRequestLine=function(){return this.method+" "+this.url+" HTTP/?.?"};this.getRequestHeader=function(){var e=this.getRequestLine()+"\r\n";for(var t=0,s=this.reqHeader?this.reqHeader.length:0;t<s;t+=1){e+=this.reqHeader[t][0]+": "+this.reqHeader[t][1]+"\r\n"}e+="\r\n";return e};this.getResponseHeader=function(){var e="HTTP?/? "+this.statusCode+" "+this.status+"\r\n";e+=this.respHeader;e+="\r\n";return e}};var u=function(e,t,i,r){this.busTrx=e;this.trxStepIdx=t;this.name="Step-"+(t+1);this.date=i;this.trcLvl=r;this.messages=[];this.msgIdx=-1;this.pendingMessages=0;this.transactionStepTimeoutId=null;this.messageStarted=function(){this.msgIdx+=1;this.pendingMessages+=1;return this.msgIdx};this.onMessageFinished=function(e,t){if(e.xurl===n){return}s.info(t+", "+this.xidx+": MessageFinished");e.xlastByteReceived=t;this.messages.push(new d(e));this.pendingMessages-=1;if(this.pendingMessages===0){if(this.transactionStepTimeoutId){clearTimeout(this.transactionStepTimeoutId)}this.transactionStepTimeoutId=setTimeout(h,3e3)}};this.getId=function(){return this.busTrx.id+"-"+this.trxStepIdx};this.getTraceFlagsAsString=function(){return this.trcLvl[1].toString(16)+this.trcLvl[0].toString(16)}};var c=function(e,t,s,i){this.id=e;this.date=t;this.trcLvl=s;this.trxSteps=[];this.fnCallback=i;this.createTransactionStep=function(){var e=new u(this,this.trxSteps.length,new Date,this.trcLvl);this.trxSteps.push(e)};this.getCurrentTransactionStep=function(){return this.trxSteps[this.trxSteps.length-1]};this.getBusinessTransactionXml=function(){var e='<?xml version="1.0" encoding="UTF-8"?><BusinessTransaction id="'+this.id+'" time="'+p(this.date)+'" name="'+(window.document.title||"SAPUI5 Business Transaction")+'">';for(var t=0,s=this.trxSteps.length;t<s;t+=1){var i=this.trxSteps[t];e+='<TransactionStep id="'+i.getId()+'" time="'+p(i.date)+'" name="'+i.name+'" traceflags="'+i.getTraceFlagsAsString()+'">';var r=i.messages;for(var n=0,a=r.length;n<a;n+=1){var o=r[n];e+='<Message id="'+o.idx+'" dsrGuid="'+o.dsrGuid+'">';e+="<x-timestamp>"+p(new Date(o.startTimestamp))+"</x-timestamp>";e+="<duration>"+Math.ceil(o.getDuration())+"</duration>";e+="<returnCode>"+o.statusCode+"</returnCode>";e+="<sent>"+o.sentBytes+"</sent>";e+="<rcvd>"+o.receivedBytes+"</rcvd>";if(o.firstByteSent&&o.lastByteReceived){e+="<firstByteSent>"+p(new Date(o.firstByteSent))+"</firstByteSent>";e+="<lastByteSent>"+p(new Date(o.lastByteSent))+"</lastByteSent>";e+="<firstByteReceived>"+p(new Date(o.firstByteReceived))+"</firstByteReceived>";e+="<lastByteReceived>"+p(new Date(o.lastByteReceived))+"</lastByteReceived>"}e+="<requestLine><![CDATA["+o.getRequestLine()+"]]></requestLine>";e+="<requestHeader><![CDATA["+o.getRequestHeader()+"]]></requestHeader>";e+="<responseHeader><![CDATA["+o.getResponseHeader()+"]]></responseHeader>";e+="</Message>"}e+="</TransactionStep>"}e+="</BusinessTransaction>";return e}};var h=function(){if(a.getCurrentTransactionStep().pendingMessages===0&&a.getCurrentTransactionStep().messages.length>0){var e=confirm("End of transaction step detected.\nNumber of new message(s): "+a.getCurrentTransactionStep().messages.length+"\n\nDo you like to record another transaction step?");if(e){a.createTransactionStep()}else{var t=a.getBusinessTransactionXml();if(a.fnCallback&&typeof a.fnCallback==="function"){a.fnCallback(t)}var i="----------ieoau._._+2_8_GoodLuck8.3-ds0d0J0S0Kl234324jfLdsjfdAuaoei-----";var r=i+"\r\nContent-Disposition: form-data\r\nContent-Type: application/xml\r\n"+t+"\r\n"+i;var d=new window.XMLHttpRequest;d.open("HEAD",n,false);d.send();if(d.status==200){var u=new window.XMLHttpRequest;u.open("POST",n,false);u.setRequestHeader("Content-type",'multipart/form-data; boundary="'+i+'"');u.send(r);alert(u.responseText)}else{try{var c=true;while(c){var h=window.prompt("Please enter a valid URL for the store server","http://<host>:<port>");if(h===""||h===null){break}var p=new RegExp("(https?://(?:www.|(?!www))[^s.]+.[^s]{2,}|www.[^s]+.[^s]{2,})");var f=p.test(h);if(f){var u=new window.XMLHttpRequest;u.open("POST",h+"/E2EClientTraceUploadW/UploadForm.jsp",false);u.setRequestHeader("Content-type",'multipart/form-data; boundary="'+i+'"');u.send(r);break}}}catch(e){s.error(e.name+": "+e.message,"","sap.ui.core.support.trace.E2eTraceLib")}}a=null;o=false}}};var p=function(e){var t="";t+=e.getUTCDate()<10?"0"+e.getUTCDate():e.getUTCDate();t+="."+(e.getUTCMonth()<9?"0"+(e.getUTCMonth()+1):e.getUTCMonth()+1);t+="."+e.getUTCFullYear();t+=" "+(e.getUTCHours()<10?"0"+e.getUTCHours():e.getUTCHours());t+=":"+(e.getUTCMinutes()<10?"0"+e.getUTCMinutes():e.getUTCMinutes());t+=":"+(e.getUTCSeconds()<10?"0"+e.getUTCSeconds():e.getUTCSeconds());t+="."+(e.getUTCMilliseconds()<100?e.getUTCMilliseconds()<10?"00"+e.getUTCMilliseconds():"0"+e.getUTCMilliseconds():e.getUTCMilliseconds());t+=" UTC";return t};(function(){var i,r;var n=function(e){s.info(e,"","E2ETraceLibIE");return e};if(window.performance&&performance.timing&&performance.timing.navigationStart){if(e.browser.chrome&&e.browser.version>=49){n=function(e){s.info(e,"","E2ETraceLibCR");return performance.timing.navigationStart+e}}else if(e.browser.firefox&&e.browser.version>=48){n=function(e){s.info(e,"","E2ETraceLibFF");return performance.timing.navigationStart+e}}}function d(e){s.info(n(e.timeStamp)+", "+this.xidx+": loadstart");this.xfirstByteSent=n(e.timeStamp)}function u(e){s.info(n(e.timeStamp)+", "+this.xidx+": progress");if(e.loaded>0){if(!this.xfirstByteReceived){this.xfirstByteReceived=n(e.timeStamp)}this.xlastByteReceived=n(e.timeStamp)}}function c(e){var t=n(e.timeStamp);s.info(t+", "+this.xidx+": error");a.getCurrentTransactionStep().onMessageFinished(this,t)}function h(e){var t=n(e.timeStamp);s.info(t+", "+this.xidx+": abort");a.getCurrentTransactionStep().onMessageFinished(this,t)}function p(e){var t=n(e.timeStamp);s.info(t+", "+this.xidx+": load");a.getCurrentTransactionStep().onMessageFinished(this,t)}t.setActive(true);i=window.XMLHttpRequest.prototype.open;r=window.XMLHttpRequest.prototype.setRequestHeader;window.XMLHttpRequest.prototype.setRequestHeader=function(){r.apply(this,arguments);if(o){if(!this.xRequestHeaders){this.xRequestHeaders=[]}this.xRequestHeaders.push(arguments)}};window.XMLHttpRequest.prototype.open=function(){i.apply(this,arguments);if(o){var e=a.getCurrentTransactionStep().messageStarted();this.xidx=e;if(window.performance&&performance.timing.navigationStart&&performance.now!==undefined){this.xstartTimestamp=performance.timing.navigationStart+performance.now()}else{this.xstartTimestamp=Date.now()}this.xmethod=arguments[0];this.xurl=arguments[1];this.xDsrGuid=t.getTransactionId();this.setRequestHeader("X-CorrelationID",a.getCurrentTransactionStep().getId()+"-"+e);this.addEventListener("loadstart",d,false);this.addEventListener("progress",u,false);this.addEventListener("error",c,false);this.addEventListener("abort",h,false);this.addEventListener("load",p,false);e+=1}}})();var f={start:function(e,s){if(!o){if(!e){e=r}a=new c(t.getRootId(),new Date,t.traceFlags(e),s);a.createTransactionStep();o=true}},isStarted:function(){return o}};if(/sap-ui-xx-e2e-trace=(true|x|X)/.test(location.search)){f.start()}return f}();return i},true);