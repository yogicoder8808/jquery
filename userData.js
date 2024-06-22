// userData.js

$(document).ready(function() {
    class UserDataPage {
        constructor() {}

        static displayStoredData() {
            const storedData = JSON.parse(localStorage.getItem("registeredUsers")) || [];
            const $userDataElement = $("#userData");

            $userDataElement.html("");

            storedData.forEach((user, index) => {
                const row = $(`
                    <tr>
                        <td>${user.username}</td>
                        <td>${user.email}</td>
                        <td>${user.phone}</td>
                        <td>${user.password}</td>
                        <td>
                            <button class="edit-btn" onclick="UserDataPage.editRow(${index})">Edit</button>
                            <button class="delete-btn" onclick="UserDataPage.deleteRow(${index})">Delete</button>
                        </td>
                    </tr>
                `);
                $userDataElement.append(row);
            });
        }

        static editRow(index) {
            localStorage.setItem("editIndex", index);
            window.location.href = "editUser.html";
        }

        static deleteRow(index) {
            const storedData = JSON.parse(localStorage.getItem("registeredUsers")) || [];
            const user = storedData[index];
            const confirmation = window.confirm(`Are you sure you want to delete this user "${user.email}" ?`);

            if (confirmation) {
                storedData.splice(index, 1);
                localStorage.setItem("registeredUsers", JSON.stringify(storedData));
                UserDataPage.displayStoredData();
            }
        }

        static loadUserData() {
            const index = localStorage.getItem("editIndex");
            if (index !== null) {
                const storedData = JSON.parse(localStorage.getItem("registeredUsers")) || [];
                const user = storedData[index];

                if (user) {
                    $("#user-name").val(user.username);
                    $("#user-email").val(user.email);
                    $("#user-phone").val(user.phone);
                    $("#user-password").val(user.password);
                } else {
                    console.error("User not found for index:", index);
                }
            } else {
                console.error("No edit index found in localStorage");
            }
        }
    

        static saveEditedUser(event) {
            event.preventDefault();

            const index = localStorage.getItem("editIndex");
            if (index !== null) {
                const storedData = JSON.parse(localStorage.getItem("registeredUsers")) || [];
                const { userData: editedUser, isValid } = CommonFunctions.getUserFormData();

                if (!isValid) {
                    alert("Invalid input! Please enter valid data.");
                    return;
                }

                const originalUser = storedData[index];

                if (editedUser.username !== originalUser.username || editedUser.phone !== originalUser.phone || editedUser.password !== originalUser.password) {
                    storedData[index] = editedUser;
                    localStorage.setItem("registeredUsers", JSON.stringify(storedData));
                
                    if (editedUser.password !== originalUser.password) {
                        alert("Password has been updated. For security reasons, you will now be logged out.");
                        localStorage.removeItem("loggedInUser");
                        window.location.href = "form.html";
                    } else {
                        alert("User data has been successfully updated and saved.");
                        localStorage.removeItem("editIndex");
                        window.location.href = "userData.html";
                    }
                } else {
                    alert("No changes detected.");
                    return;
                }
                
            } else {
                console.error("No edit index found in localStorage");
            }
        }
        static cancelEdit() {
            localStorage.removeItem("editIndex");
            window.location.href = "userData.html";
        }

        static logout() {
            localStorage.removeItem("loggedIn");
            window.location.href = "form.html";
        }

        static navigateToAddUser() {
            window.location.href = "addUser.html";
        }

        static goBack() {
            window.location.href = "userData.html";
        }

        static addUser(event) {
            event.preventDefault();

            const { userData, isValid } = CommonFunctions.getUserFormData();

            if (isValid) {
                const storedData = JSON.parse(localStorage.getItem('registeredUsers')) || [];
                const isDuplicate = storedData.some(user => user.email === userData.email);

                if (isDuplicate) {
                    alert("Duplicate entry: A user with the same email already exists.");
                    return false;
                }

                storedData.push(userData);
                localStorage.setItem('registeredUsers', JSON.stringify(storedData));
                alert("User Registered Successfully");
                window.location.href = "userData.html";
            } else {
                alert("Invalid input");
                return false;
            }
        }
    }

    UserDataPage.displayStoredData();
    window.UserDataPage = UserDataPage;
});
