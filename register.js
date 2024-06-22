//register.js

$(document).ready(function() {
    class RegisterPage {
        constructor() {}

        register() {
            $("#login-form").css("left", "-410px");
            $("#register-form").css("left", "30px");
            $("#btn").css("left", "110px");
        }

        // Method to handle form submission
        registerForm(event) {
            event.preventDefault();

            const $submitError = $("#submit-error");
            const { userData, isValid } = CommonFunctions.getUserFormData();
            const $checkbox = $("#checkbox-term");

            if (!isValid) {
                $submitError.show().html("Please correct the errors to submit the form.");
                setTimeout(() => {
                    $submitError.hide();
                }, 3000);
                return false;
            } else if (!$checkbox.is(":checked")) {
                $submitError.show().html("Please accept the terms and conditions to submit the form.");
                setTimeout(() => {
                    $submitError.hide();
                }, 3000);
                return false;
            } else {
                const storedData = JSON.parse(localStorage.getItem("registeredUsers")) || [];
                const isDuplicate = storedData.some((user) => user.email === userData.email);

                if (isDuplicate) {
                    alert("Duplicate entry: A user with the same email already exists.");
                    return false;
                }

                storedData.push(userData);
                localStorage.setItem("registeredUsers", JSON.stringify(storedData));
                alert("User Registered Successfully");
                window.location.href = "form.html";
                return true;
            }
        }
    }

    window.registerPageInstance = new RegisterPage();
});
