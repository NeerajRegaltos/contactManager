import { Auth } from "../modules/authModule.js";


let phone = document.getElementById("phone");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirmPassword");
let loginBtn = document.getElementById("loginBtn");
let errorMessage = document.getElementById("errorMessage");


let forgotPassword = new Auth("", "", phone, password, confirmPassword, errorMessage);


function insertIntoLocalStorage() {
    const localItem = JSON.parse(localStorage.getItem(phone.value));

    localStorage.setItem(phone.value, JSON.stringify({ name: localItem.name, email: localItem.email, password: password.value, arr : localItem.arr}));
    console.log("Password changed  Successfully");
}


loginBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (forgotPassword.validPhone("login")) {
        let localKeys = Object.keys(localStorage);
        for (let key of localKeys) {
            if (key === phone.value) {
                console.log(key, phone.value);
                if (forgotPassword.validPassword(password.value) && forgotPassword.validPassword(confirmPassword.value) && forgotPassword.checkPasswords()) {
                    insertIntoLocalStorage();
                    window.location = "./login.html";
                } else {
                    break;
                }

            } else {
                errorMessage.textContent = "Phone number is not registered";
            }
        }

    }


});