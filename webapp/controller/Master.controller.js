sap.ui.define([
    "com/mit/mit/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/library",
    "sap/m/MessageToast",
    "sap/m/Text"
    
],
    function (BaseController,JSONModel,Fragment,Dialog,Button,library,MessageToast,Text) {
        "use strict";
        var ButtonType = library.ButtonType;
	    var DialogType = library.DialogType;
    
        return BaseController.extend("com.mit.mit.controller.Master", {
            
            onInit: function () {
                       
                /* load images json structure using jQuery modulepath */
                var oModel = new JSONModel(jQuery.sap.getModulePath("com.mit.mit", "/model/images.json"));
                this.getView().setModel(oModel, "imagesModel");
            },
            
            
            onNavBack: function(){       
				this.getRouter().navTo("RouteScan");					
            },

            onListItemPress: function(oEvent){
                if (!this.sAdd) {
                    this.sAdd = sap.ui.xmlfragment(this.getView().getId(), "com.mit.mit.fragments.History", this);
                    this.getView().addDependent(this.sAdd);
                }
                this.sAdd.open();
            },
            
            onCancelFrag: function(oEvent) {
                this.sAdd.close();
            },

            // handleUploadComplete: function(oEvent) {
            //     var sResponse = oEvent.getParameter("response"),
            //         iHttpStatusCode = parseInt(/\d{3}/.exec(sResponse)[0]),
            //         sMessage;
    
            //     if (sResponse) {
            //         sMessage = iHttpStatusCode === 200 ? sResponse + " (Upload Success)" : sResponse + " (Upload Error)";
            //         MessageToast.show(sMessage);
            //     }

            // },
    
            onUploadPress: function(oEvent) {
                // var oFileUploader = this.byId("fileUploader");
                // oFileUploader.checkFileReadable().then(function() 
                // {
                //     oFileUploader.upload();
                // }, 
                // function(error) {
                //     MessageToast.show("The file cannot be read. It may have changed.");
                // })
                // .then(function() {
                //     oFileUploader.clear();
                // });
               // var oFileUploader = this.byId("fileUploader");
                var oModel = this.getView().getModel("imagesModel");
			    var oData = oModel.getData();
				var f = oEvent.oSource.oFileUpload.files[0];
				var Path = URL.createObjectURL(f); 
				var obj = {
					"Name": f.name,
					"Pic": Path
				};
				oData.Images.push(obj);
				oModel.setData(oData);
               
            },

            handleSave:function(){
                if (this.handleSave) {
                    this.handleSave = new Dialog({
                        type: DialogType.Message,
                        title: "Confirmation",
                        content: new Text({ text: "Machine Inspection report will be saved and corresponding report will be raised." }),
                        beginButton: new Button({
                            type: ButtonType.Accept,
                            text: "Save",
                            press: function () {
                                MessageToast.show("Ticket Raised Successfully");
                                //location.reload();
                                this.getRouter().navTo("RouteScan");
                                location.reload();
                            }.bind(this)
                        }),
                        endButton: new Button({
                            text: "Cancel",
                            type: ButtonType.Reject,
                            press: function () {
                                this.handleSave.close();
                            }.bind(this)
                        })
                    });
                }
    
                this.handleSave.open();
            }
        });
});