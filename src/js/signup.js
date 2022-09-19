import { Auth } from "../modules/authModule.js";


let fullName = document.getElementById("fullName");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirmPassword");
let loginBtn = document.getElementById("loginBtn");
let errorMessage = document.getElementById("errorMessage");


let signUp = new Auth(fullName, email, phone, password, confirmPassword, errorMessage);


function insertIntoLocalStorage() {
    localStorage.setItem(phone.value, JSON.stringify({ "name": fullName.value.trim(), "email": email.value.trim(), "password": password.value.trim(), "arr": [] }));
    console.log("User is Successfully saved");
}


loginBtn.addEventListener("click", (e) => {

    if (signUp.validName && signUp.validEmail() && signUp.validPhone("signup") && signUp.validPassword(password.value.trim()) && signUp.validPassword(confirmPassword.value.trim()) && signUp.checkPasswords()) {
        insertIntoLocalStorage();

        window.location = "./login.html";
    }

    e.preventDefault();
})