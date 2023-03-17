sap.ui.define([
    "com/mit/mit/controller/BaseController"
],
    function (BaseController) {
        "use strict";
       var a;
        return BaseController.extend("com.mit.mit.controller.Scan", {
            onScanSuccess: function(oEvent) {
                if(oEvent.getParameter("text")){
                    a = oEvent.getParameter("text");
                    var b = this.getView().byId("getvalue");
                    b.setValue(a)
                }
                else{
                    MessageToast.show("no Barcode Scanned" + oEvent, { duration:1000 });
                }
            },
            onScanError:function(){
                MessageToast.show("Scan failed: " + oEvent, { duration:1000 });
            },
            onSearch: function(){
                this.getRouter().navTo("RouteMaster");
            }

        });
    });

