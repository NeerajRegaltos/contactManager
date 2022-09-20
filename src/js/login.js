import { Auth } from "../modules/authModule.js";


let phone = document.getElementById("phone");
let password = document.getElementById("password");
let loginBtn = document.getElementById("loginBtn");
let errorMessage = document.getElementById("errorMessage");



let login = new Auth("", "", phone, password, "", errorMessage);


loginBtn.addEventListener("click", (e) => {

    if (login.validPhone("login") && login.validPassword(password.value.trim())) {

        let localKeys = Object.keys(localStorage);
        let flag = false;
        for (let key of localKeys) {
            if (key !== phone.value) {
                errorMessage.textContent = "Phone number does not exist";
            } else {
                flag = true;
            }
        }
        if (flag) {
            const localItem = JSON.parse(localStorage.getItem(phone.value));

            if (password.value.trim() === localItem.password) {
                sessionStorage.setItem("phone", phone.value);
                sessionStorage.setItem("login", "true");
                window.location = "./index.html";
            } else {
                errorMessage.textContent = "Wrong password";
            }
        }
    }

    e.preventDefault();
})