sap.ui.define([
            "sap/ui/core/mvc/Controller",
            "sap/m/Dialog",
            "sap/m/Button",
            "sap/m/Label",
            "sap/m/library",
            "sap/m/MessageToast",
            "sap/m/Text",
            "sap/m/TextArea"           
], function(Controller,Dialog,Button,Label,library,MessageToast,Text,TextArea){

    "use strict";
    var ButtonType = library.ButtonType;

	// shortcut for sap.m.DialogType
	var DialogType = library.DialogType;

    return Controller.extend("com.mit.mit.controller.BaseController",{

        getRouter: function(){
            return this.getOwnerComponent().getRouter();
        },
        
        onLogPress: function() {
                //this.getRouter().navTo("RouteLogin");
                if (this.onLogPress) {
                    this.onLogPress = new Dialog({
                        type: DialogType.Message,
                        title: "Confirmation",
                        content: new Text({ text: "Are you sure to Logout?" }),
                        beginButton: new Button({
                            type: ButtonType.Default,
                            text: "YES",
                            press: function () {
                                MessageToast.show("Successfully Logged out");
                                //location.reload();
                                this.getRouter().navTo("RouteLogin");
                                location.reload();
                            }.bind(this)
                        }),
                        endButton: new Button({
                            text: "NO",
                            press: function () {
                                this.onLogPress.close();
                            }.bind(this)
                        })
                    });
                }
    
                this.onLogPress.open();
            }
    });

});