//common.js

$(document).ready(function() {
    class CommonFunctions {
        constructor() {}

        static showPasswordRequirements() {
            alert("Your password must be:\n- At least 8 characters long\n- Contain at least one uppercase and one lowercase letter\n- Contain at least one number\n- Contain at least one special character\n- Should not contain any spaces");
        }

        // Prevent Browser Navigation
        static preventBack() {
            window.history.forward();
        }

        static init() {
            setTimeout(CommonFunctions.preventBack, 0);
            $(window).on('popstate', function() {
                null;
            });
        }

        // Toggle password
        static togglePassword(id) {
            const $passwordField = $(`#${id}`);
            $passwordField.attr('type', $passwordField.attr('type') === "password" ? "text" : "password");
        }

        // Validation functions
        static validateName($nameInput) {
            const name = $nameInput.value.trim();
            const $nameError = $('#name-error');
            const nameParts = name.split(" ");
            if (name === "") {
                $nameError.html("Please provide your name");
                return false;
            }
            if (nameParts.length < 2) {
                $nameError.html("Please enter your full name");
                return false;
            }
            $nameError.html('<i class="fa fa-check-circle"></i>');
            return true;
        }

        static validateEmail($emailInput) {
            const email = $emailInput.value.trim();
            const $emailError = $('#email-error');
            if (email === "") {
                $emailError.html("Please provide your email address");
                return false;
            } else if (!$emailInput.checkValidity()) {
                $emailError.html("Please enter a valid email address");
                return false;
            } else {
                $emailError.html('<i class="fa fa-check-circle"></i>');
                return true;
            }
        }

        static validatePhone($phoneInput) {
            const phone = $phoneInput.value.trim();
            const $phoneError = $('#phone-error');
            if (phone.length === 0) {
                $phoneError.html("Please provide your phone number");
                return false;
            }
            if (isNaN(phone)) {
                $phoneError.html("Please enter only digits for the phone number");
                return false;
            }
            if (phone.length !== 10) {
                $phoneError.html("Please enter a 10-digit phone number");
                return false;
            }
            $phoneError.html('<i class="fa fa-check-circle"></i>');
            return true;
        }

        static validatePassword($passwordInput) {
            const password = $passwordInput.value.trim();
            const $passwordError = $('#password-error');
            if (password.length === 0) {
                $passwordError.html("Please provide your password");
                return false;
            } else if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
                $passwordError.html('<i class="fa fa-info-circle" onclick="CommonFunctions.showPasswordRequirements()"></i>');
                return false;
            } else {
                $passwordError.html('<i class="fa fa-check-circle"></i>');
                return true;
            }
        }

        static validateConfirmPassword($confirmPasswordInput) {
            const password = $('#user-password')[0].value.trim();
            const confirmPassword = $confirmPasswordInput.value.trim();
            const $confirmPasswordError = $('#confirm-password-error');
            if (confirmPassword === "") {
                $confirmPasswordError.html("Please confirm your password");
                return false;
            } else if (confirmPassword !== password) {
                $confirmPasswordError.html("Confirm password does not match the original password");
                return false;
            } else {
                $confirmPasswordError.html('<i class="fa fa-check-circle"></i>');
                return true;
            }
        }

        static getUserFormData() {
            const $usernameInput = $("#user-name")[0];
            const $emailInput = $("#user-email")[0];
            const $phoneInput = $("#user-phone")[0];
            const $passwordInput = $("#user-password")[0];

            const userData = {
                username: $usernameInput.value.trim(),
                email: $emailInput.value,
                phone: $phoneInput.value.trim(),
                password: $passwordInput.value.trim(),
            };

            const isNameValid = CommonFunctions.validateName($usernameInput);
            const isEmailValid = CommonFunctions.validateEmail($emailInput);
            const isPhoneValid = CommonFunctions.validatePhone($phoneInput);
            const isPasswordValid = CommonFunctions.validatePassword($passwordInput);

            const isValid = isNameValid && isEmailValid && isPhoneValid && isPasswordValid;

            return { userData, isValid };
        }
    }

    CommonFunctions.init();
    window.CommonFunctions = CommonFunctions;
});

