
export class Auth {
    constructor(fullN, email, phone, password, confirmPassword, errorMessage) {
        this.fullN = fullN;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.errorMessage = errorMessage;
    }

    get validName() {
        let fullName1 = this.fullN.value.toLowerCase().trim();
        if (fullName1.length === 0) {
            this.errorMessage.textContent = "Please enter full name";
        } else {
            if (!fullName1.match(/^[a-zA-Z ]*$/)) {
                this.errorMessage.textContent = "Name should be in alphabets only";
            } else {
                return true;
            }
        }
    }


    validEmail() {
        let email1 = this.email.value.toLowerCase().trim();
        if (email1.length === 0) {
            this.errorMessage.textContent = "Please enter email";
        } else {
            if (!email1.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                this.errorMessage.textContent = "Please enter valid email id";
            } else {
                return true;
            }
        }
    }


    phoneInLocalStorage() {
        let localKeys = Object.keys(localStorage);
        for (let key of localKeys) {
            if (key === this.phone.value) {
                this.errorMessage.textContent = "Phone number already exist";
                return false;
            }
        }
        return true;
    }


    validPhone(mode) {
        let phone1 = this.phone.value;
        if (phone1.length === 0) {
            this.errorMessage.textContent = "Please enter phone number";
        } else {
            if (phone1.length !== 10) {
                this.errorMessage.textContent = "Phone number is not valid";
            } else {
                if (mode === "signup") {
                    if (this.phoneInLocalStorage()) {
                        return true;
                    } else {
                        return false;
                    }
                }
                return true;
            }
        }

    }

    validPassword(password) {
        let password1 = password.length;
        if (password1 === 0) {
            this.errorMessage.textContent = "Please enter password";
        } else {
            if (password1 <= 3) {
                this.errorMessage.textContent = "Password length should be more than 3";
            } else {
                return true;
            }
        }
    }



    checkPasswords() {

        if (this.password.value === this.confirmPassword.value) {
            return true;
        } else {
            this.errorMessage.textContent = "Passwords do not match";
        }
    }

}
