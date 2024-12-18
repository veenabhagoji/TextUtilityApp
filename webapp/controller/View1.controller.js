sap.ui.define([
    "project1/controller/BaseController",
    "project1/model/models",
     "sap/ui/core/Fragment",
     "sap/m/Dialog",
      "sap/m/MessageToast"
], (BaseController, model, Fragment, Dialog, MessageToast) => {
    "use strict";

    return BaseController.extend("project1.controller.View1", {
        onInit() {
           
         var oModel =   model.createDeviceModel();
        // var oTable= this.getView().byId("idEmployeeTable");
            //oTable.setModel(oModel,"EmployeeModel");
            var oView = this.getView();
            oView.setModel(oModel, "EmployeeModel");
        },
        onSave: function () {
            // Get the current model
            var oModel = this.getView().getModel("EmployeeModel");
            var aData = oModel.getProperty("/employees") || [];
        
            // Collect data from your input fields
            var oNewData = {
                EmployeeId: this.byId("inputEmpId").getValue(),
                Name: this.byId("inputName").getValue(),
                Age: this.byId("inputAge").getValue(),
                EmployeeEmail: this.byId("inputEmail").getValue(),
                employeePhoneNo: this.byId("inputPhone").getValue()
            };
            console.log("Collected Data:", oNewData);
        
            // Check if the record already exists based on EmployeeId
            var bRecordExists = false;
            aData = aData.map(function (employee) {
                if (employee.EmployeeId === oNewData.EmployeeId) {
                    bRecordExists = true; // Mark that the record exists
                    return oNewData; // Replace the existing record with the updated data
                }
                return employee; // Return the existing record as is
            });
        
            // If the record does not exist, add it as a new entry
            if (!bRecordExists) {
                aData.push(oNewData);
            }
        
            console.log("Updated Array:", aData);
        
            // Set the updated data back to the model
            oModel.setProperty("/employees", aData);
            oModel.refresh();
        
            // Clear the input fields after saving
            this.byId("inputEmpId").setValue("");
            this.byId("inputName").setValue("");
            this.byId("inputAge").setValue("");
            this.byId("inputEmail").setValue("");
            this.byId("inputPhone").setValue("");
        
            sap.m.MessageToast.show(bRecordExists ? "Record updated successfully!" : "New record added successfully!");
        },
        
        onDelete: function () {
            // Get the model and current employees data
            const oModel = this.getView().getModel("EmployeeModel");
            const aEmployees = oModel.getProperty("/employees");
            var oTable = this.byId("idEmployeeTable"); // Replace with your table ID
            var aSelectedItems = oTable.getSelectedItems();

               // Check if at least one record is selected
            if (aSelectedItems.length === 0) {
            sap.m.MessageToast.show("Please select a record before opening the popup.");
            return;
          }
            var oSelectedItem = aSelectedItems[0]; // Get the first selected item
            //var oBindingContext = oSelectedItem.getBindingContext("EmployeeModel");
  
            
            var oData = oSelectedItem.getBindingContext('EmployeeModel').getObject(); // Re
            // Filter out rows where selected is true
            const aUpdatedEmployees = aEmployees.filter(employee => employee.EmployeeId !==oData.EmployeeId);

            // Update the model
            oModel.setProperty("/employees", aUpdatedEmployees);
            oModel.refresh();

            console.log("Deleted row. Updated employees:", aUpdatedEmployees);
        },

        onCancel: function () {
            var oDialog = this.byId("employeeDialog"); // Get dialog instance
            if (oDialog) {
              oDialog.close(); // Close the dialog
            }
          },
          onOpenDialog1: function()
          {
          {
            var oTable = this.byId("idEmployeeTable"); // Replace with your table ID
            var aSelectedItems = oTable.getSelectedItems();

               // Check if at least one record is selected
            if (aSelectedItems.length === 0) {
            sap.m.MessageToast.show("Please select a record before opening the popup.");
            return;
          }

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
                 this.getView().byId("idEmployeeTable");

             }.bind(this));
         }
         this.pDialog.then(function (oDialog) {
          // Open the dialog
          oDialog.open();
  
          // Optionally, set data into the form based on the selected row
          var oSelectedItem = aSelectedItems[0]; // Get the first selected item
          //var oBindingContext = oSelectedItem.getBindingContext("EmployeeModel");

          
          var oData = oSelectedItem.getBindingContext('EmployeeModel').getObject(); // Retrieve the data bound to the selected item
          console.log("Selected Data: ", oData);

          
          
          this.getView().byId("inputEmpId").setValue(oData.EmployeeId).setEditable(false);
          this.byId("inputName").setValue(oData.Name).setEditable(true);
          this.byId("inputAge").setValue(oData.Age).setEditable(true);
          this.byId("inputEmail").setValue(oData.EmployeeEmail).setEditable(true);
          this.byId("inputPhone").setValue(oData.employeePhoneNo).setEditable(true);
         
      }.bind(this));

    //   var oModel = this.getView().getModel("EmployeeModel"); // Ensure your model is named "EmployeeModel"
    //   var aEmployees = oModel.getProperty("/employees");  

    //  // var empCodeToDelete = this.byId("inputEmpId"); 
      
    //   var aUpdatedEmployees = aEmployees.filter(function(oData) {
    //     return oData.EmployeeId !==  oData.EmployeeId; // Exclude the employee to delete
    // });

    //    aUpdatedEmployees.push({
    //     "EmployeeId":oData.EmployeeId,
    //     "Name": oData.Name,
    //     "Age": oData.Age,
    //     "EmployeeEmail": oData.EmployeeEmail,
    //     "employeePhoneNo": oData.employeePhoneNo
    //  });
    
    // // Step 4: Update the model with the filtered array
    // oModel.setProperty("/employees", aUpdatedEmployees.sort()); // Set the updated array back to the model
    // oModel.refresh(); // Refresh the model to reflect changes in the view
    
    // console.log("Updated Employees List:", aUpdatedEmployees);


    }
      
     });

    
});
            