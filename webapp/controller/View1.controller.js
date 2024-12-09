sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "project1/model/models",
     "sap/ui/core/Fragment",
     "sap/m/Dialog"
], (Controller, model, Fragment, Dialog) => {
    "use strict";

    return Controller.extend("project1.controller.View1", {
        onInit() {
           
         var oModel =   model.createDeviceModel();
        // var oTable= this.getView().byId("idEmployeeTable");
            //oTable.setModel(oModel,"EmployeeModel");
            var oView = this.getView();
            oView.setModel(oModel, "EmployeeModel");
        },
        onOpenDialog: function () {
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
        },

        onSave: function () {
             
      // Get the current model
      var oModel = this.getView().getModel("EmployeeModel");
      var aData = oModel.getProperty("/employees") || [];

      // Collect data from your input fields (assuming you have input fields for each row)
      var oNewData = {
        EmployeeId: this.byId("inputEmpId").getValue(),
        Name: this.byId("inputName").getValue(),
        Age: this.byId("inputAge").getValue(), 
        EmployeeEmail: this.byId("inputEmail").getValue(),
        employeePhoneNo: this.byId("inputPhone").getValue()
    };
      console.log("Collected Data:", oNewData);
      // Add the new data to the existing table data
      aData.push(oNewData);
      console.log("Updated Array:", aData);
     

      // Set the updated data back to the model
      oModel.setProperty("/employees", aData);
      oModel.refresh(); 

      // Optionally, you can clear the input fields after saving
      this.byId("inputEmpId").setValue("");
      this.byId("inputName").setValue("");
      this.byId("inputAge").setValue("");
      this.byId("inputEmail").setValue("");
      this.byId("inputPhone").setValue("");
      
     
    
            
        },
        onCancel: function () {
            var oDialog = this.byId("employeeDialog"); // Get dialog instance
            if (oDialog) {
              oDialog.close(); // Close the dialog
            }
          }
        

        
    });
});