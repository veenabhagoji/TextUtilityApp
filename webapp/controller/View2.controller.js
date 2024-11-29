sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], (Controller) => {
    "use strict";

    return Controller.extend("project3.controller.View2", {
        onInit() {
        },
        onShowAlert: function (oevent) {
            // Get the input field value
            var oInput = this.byId("myInput");
            var sValue = oInput.getValue();
            console.log(oevent);

            // Show the value in an alert popup
            if (sValue.trim()) {
               sap.m.MessageBox.alert("You entered: " + sValue);
            } else {
                MessageBox.alert("Input field is empty. Please enter some text.");
            }
        }
    });
    });
