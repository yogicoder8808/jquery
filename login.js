//login.js

$(document).ready(function() {
    class LoginPage {
        constructor() {
            this.$loginEmailError = $("#login-email-error");
            this.$loginPasswordError = $("#login-password-error");
            this.$inputEmail = $("#login-email");
            this.$inputPassword = $("#login-password");
            this.$loginSubmitError = $("#login-submit-error");
        }

        login() {
            $("#login-form").css("left", "40px");
            $("#register-form").css("left", "450px");
            $("#btn").css("left", "0");
        }

        validateLoginEmail() {
            if (this.$inputEmail.val() === '') {
                this.$loginEmailError.html('Please provide your email address');
                return false;
            } else if (!this.$inputEmail[0].checkValidity()) {
                this.$loginEmailError.html('Please enter a valid email address');
                return false;
            } else {
                this.$loginEmailError.html('<i class="fa fa-check-circle"></i>');
                return true;
            }
        }

        validateLoginPassword() {
            if (this.$inputPassword.val() === '') {
                this.$loginPasswordError.html('Please provide your password');
                return false;
            }
            if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(this.$inputPassword.val())) {
                this.$loginPasswordError.html('<i class="fa fa-info-circle" onclick="CommonFunctions.showPasswordRequirements()"></i>');
                return false;
            }
            this.$loginPasswordError.html('<i class="fa fa-check-circle"></i>');
            return true;
        }

        loginForm(event) {
            event.preventDefault();
            if (!this.validateLoginEmail() || !this.validateLoginPassword()) {
                this.$loginSubmitError.show();
                this.$loginSubmitError.html("Please correct the errors to login.");
                setTimeout(() => {
                    this.$loginSubmitError.hide();
                }, 3000);
                return false;
            } else {
                const storedData = JSON.parse(localStorage.getItem('registeredUsers')) || [];
                const user = storedData.find(user => {
                    return user.email === this.$inputEmail.val() && user.password === this.$inputPassword.val();
                });

                if (!user) {
                    alert("Invalid email or password. Please verify your credentials.");
                    return false;
                } else {
                    alert("User logged in Successfully");
                    window.location.href = "userData.html";
                    return true;
                }
            }
        }
    }

    window.loginPageInstance = new LoginPage();
});
