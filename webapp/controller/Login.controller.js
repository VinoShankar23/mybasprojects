sap.ui.define([
    "com/mit/mit/controller/BaseController"
],    
    function (BaseController) {
        "use strict";

        return BaseController.extend("com.mit.mit.controller.Login", {

            onLoginPress:function(oEvent){

                if (!this.sAdd) {
                    this.sAdd = sap.ui.xmlfragment(this.getView().getId(), "com.mit.mit.fragments.Login", this);
                    this.getView().addDependent(this.sAdd);
                }
                this.sAdd.open();
            

            },
            onLogin:function(){
                this.getRouter().navTo("RouteScan");
            },
            onCancelFrag: function(oEvent) {
                this.sAdd.close();
            }
            
        });
    });
