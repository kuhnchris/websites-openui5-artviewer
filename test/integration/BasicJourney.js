sap.ui.define(["sap/ui/test/opaQunit","eu/kuhnchris/artviewer/artViewer/test/integration/pages/Main"],function(e){"use strict";e("should show correct number of nested pages",function(e,t,i){e.iStartMyApp();i.onTheAppPage.iShouldSeePageCount(1);i.iTeardownMyApp()})});