sap.ui.define([
    "sap/ui/core/mvc/Controller",
    
    "sap/ui/core/Fragment",
    "sap/m/Dialog"
  ], (Controller, Fragment, Dialog) => {
    "use strict";
  
    return Controller.extend("project1.BaseController", {
        
        
        
            onOpenDialog: function()
             {
                // Load and open the dialog fragment
                if (!this.pDialog) {
                    this.pDialog = Fragment.load({
                        id: this.getView().getId(),
                       
                        name: "project1.Fragments.empDetails",
                        controller: this
                    }).then(function (oDialog) {
                        this.getView().addDependent(oDialog);
                       
                        return oDialog;
                    }.bind(this));
                }
                this.pDialog.then(function (oDialog) {
                    oDialog.open();
                });
            }
        });

       
    
    });
  