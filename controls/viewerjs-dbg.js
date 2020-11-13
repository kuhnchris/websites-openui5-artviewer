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
                this.loadPromise = new Promise((res, rej) => {
                    jQuery.sap.includeScript(basePath + "/libs/viewer.js", "viewerJSLoader", () => { res(); }, () => { rej(); });
                });
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
                        oControl.loadPromise.then(() => {
                            oControl.viewer = new Viewer(oControl.getDomRef(), {
                                inline: false, container: oControl.getParent().getDomRef(), url: () => {
                                    return oControl.getUrl();
                                }
                            });
                            if (oControl.shouldShow !== undefined && oControl.shouldShow) {
                                oControl.viewer.show();
                                oControl.shouldShow = false;
                            }
                        });

                }
                if (oControl.viewer !== undefined) {
                    if (oControl.shouldShow !== undefined && oControl.shouldShow) {
                        oControl.viewer.show();
                        oControl.shouldShow = false;
                    } else {
                        oControl.shouldShow = false;
                    }
                }
            },
            onAfterRendering: function () {
                if (sap.ui.core.Control.prototype.onAfterRendering) {
                    sap.ui.core.Control.prototype.onAfterRendering.apply(this, arguments); //run the super class's method first
                }
            },
            show: function () {
                if (this.viewer === undefined || this.viewer === null)
                    this.shouldShow = true;
                else
                    this.viewer.show();
            }
        });
    }
);

