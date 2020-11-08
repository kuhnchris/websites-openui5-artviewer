sap.ui.define(
    ["sap/ui/core/Control"],
    function (Control) {
        return Control.extend("eu.kuhnchris.artviewer.artViewer.controls.viewerjs", {
            metadata: {
                properties: {
                    url: {
                        type: "string",
                        defaultValue: ""
                    }
                },
                aggregations: {},
            },
            init: function () {
                var basePath = jQuery.sap.getModulePath("eu.kuhnchris.artviewer.artViewer.controls");
                jQuery.sap.includeScript(basePath + "/libs/viewer.js");
                jQuery.sap.includeStyleSheet(basePath + "/libs/viewer.css");
                jQuery.sap.includeStyleSheet(basePath + "/viewerjs.css");
            },
            renderer: function (oRm, oControl) {
                oRm.write("<img");
                oRm.writeControlData(oControl);
                oRm.writeAttribute("src", oControl.getUrl());
                oRm.addClass("viewerjs_img_elem");
                oRm.writeClasses(oControl);
                oRm.write(">");
                if (oControl.getDomRef() !== null) {
                    if (oControl.viewer === undefined)
                        oControl.viewer = new Viewer(oControl.getDomRef(), {
                            inline: false, container: oControl.getParent().getDomRef(), url: () => {
                                return oControl.getUrl();
                            }
                        });

                }
                //oRm.write("<span>HELLO WORLD</span>"); //output some html so we can see the control is working!
            },
            onAfterRendering: function () {
                //if I need to do any post render actions, it will happen here
                if (sap.ui.core.Control.prototype.onAfterRendering) {
                    sap.ui.core.Control.prototype.onAfterRendering.apply(this, arguments); //run the super class's method first
                }
            },
            show: function(){
                this.viewer.show();
            }
        });
    }
);

