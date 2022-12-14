
import { Auth } from "./src/modules/authModule.js";

if (sessionStorage.getItem("login") == "false" || sessionStorage.getItem("login") == null) {
  window.location = "./login.html";
}


let fullName = document.getElementById("newName");
let email = document.getElementById("newEmail");
let phone = document.getElementById("newPhone");
let addContact = document.getElementById("addContact");
let errorMessage = document.getElementById("errorMessage");



// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let myBtn = document.getElementById("myBtn");


// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
myBtn.onclick = function () {
  modal.style.display = "block";
  errorMessage.textContent = "";
}



// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// -------------------------------------------------------------------------



let saveNewContact = new Auth(fullName, email, phone, "", "", errorMessage);


let key = sessionStorage.getItem("phone");
let localKeys = JSON.parse(localStorage.getItem(key));

const objectsArray = localKeys.arr;

let cardContainer = document.querySelector("#cardContainer");



//insert contacts into local storage
function insertContactIntoLocalStorage() {

  console.log("INSERTING INTO LOCAL STORAGE");

  let key = sessionStorage.getItem("phone");
  let localKeys = JSON.parse(localStorage.getItem(key));
  localStorage.setItem(key, JSON.stringify({ "name": localKeys.name, "email": localKeys.email, "password": localKeys.password, "arr": [...objectsArray] }));

}


//display contacts on the html page
function display() {

  console.log("DISPLAYING ...")

  cardContainer.innerHTML = "";

  for (let i = 0; i < objectsArray.length; i++) {
    cardContainer.innerHTML += objectsArray[i];
    document.getElementsByClassName("getId")[i].setAttribute("id", i);
    document.getElementsByClassName("giveMeIdOfEdit")[i].setAttribute("id", i);

  }

  reloadFunctionForDelete();
  reloadFunctionForEdit();
}

display();






//adding new contact
addContact.addEventListener("click", () => {

  if (saveNewContact.validName && saveNewContact.validEmail() && saveNewContact.validPhone("signup")) {
    console.log("ADDING NEW CONTACT");

    //created new template of contact here 
    let newContact = ` <div class="card"  > 
                            <i class="fa-solid fa-pencil editIcon giveMeIdOfEdit myBtn2"></i>
                            <li id="contactNames"> Name  : <span>${fullName.value.trim()}</span></li>
                            <li id="contactPhones">Phone : <span>${phone.value}</span></li>
                            <i class="fa-regular fa-trash-can deleteIcon getId" ></i>
                            <li id="contactEmails">Email : <span>${email.value.trim()}</span></li>
                      </div> `

    //pushed this contact into objectArray
    objectsArray.push(newContact);

    //showing messages and making input field empty
    errorMessage.textContent = "Successfully saved";
    fullName.value = "";
    phone.value = "";
    email.value = "";

    //insert this contact into localStorage
    insertContactIntoLocalStorage();

    //displaying contacts
    display();

  }

});


//deleteing contact
function reloadFunctionForDelete() {
  for (let i = 0; i < objectsArray.length; i++) {

    document.getElementsByClassName("getId")[i].onclick = function (clickedId) {
      console.log("DELETING Contact");

      let contactId = clickedId.target.id;

      objectsArray.splice(contactId, 1);

      insertContactIntoLocalStorage();
      display();

    }
  }
}


function reloadFunctionForEdit() {
  for (let i = 0; i < objectsArray.length; i++) {
    let modal2 = document.getElementById("myModal2");

    document.getElementsByClassName("giveMeIdOfEdit")[i].onclick = function (clickedId) {


      let contact = clickedId.target;
      let n = contact.nextElementSibling.firstElementChild.textContent;
      let p = contact.nextElementSibling.nextElementSibling.firstElementChild.textContent;
      let e = contact.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.textContent;
      console.log("Edit button CLICKED");

      modal2.innerHTML = `<div class="modal-content">
                            <span class="close close2">&times;</span>
                            <h2 id="addContactHeading">Edit Contact </h2>
                            <p id="errorMessage" class="errorMessage"></p>
                            <br><br>
                            <input type="text" id="newName" class="editedName" placeholder="Edit name" value="${n.trim()}" required autofocus autocomplete="off">
                            <br><br>
                            <input type="email" id="newEmail" class="editedEmail" placeholder="Edit email" value=${e.trim()} required autocomplete="off">
                            <br><br>
                            <input type="number" id="newPhone" class="editedPhone" placeholder="Edit phone number" value=${p} required autocomplete="off">
                            <br> <br>
                            <button id="addContact" class="editContact">Edit Contact</button>
                          </div>`;


      modal2.style.display = "block";

      document.getElementsByClassName("close2")[0].onclick = function () {
        modal2.style.display = "none";
      }

      window.onclick = function (e) {
        if (e.target == modal2) {
          modal2.style.display = "none";
        }
      }


      document.getElementsByClassName("editContact")[0].addEventListener("click", () => {


        let editedName = document.getElementsByClassName("editedName")[0];
        let editedEmail = document.getElementsByClassName("editedEmail")[0];
        let editedPhone = document.getElementsByClassName("editedPhone")[0];
        let errorMessage = document.getElementsByClassName("errorMessage")[0];

        let editedContact = new Auth(editedName, editedEmail, editedPhone, "", "", errorMessage);

        if (editedContact.validName && editedContact.validEmail() && editedContact.validPhone("signup")) {
          console.log("EDITING CONTACT");


          //Edit and Save it into template of contact here 
          let editContact = `<div class="card"  > 
                                <i class="fa-solid fa-pencil editIcon giveMeIdOfEdit"></i>
                                <li id="contactNames"> Name  : <span>${editedName.value.trim()}</span></li>
                                <li id="contactPhones">Phone : <span>${editedPhone.value}</span></li>
                                <i class="fa-regular fa-trash-can deleteIcon getId" ></i>
                                <li id="contactEmails">Email : <span>${editedEmail.value.trim()}</span></li>
                              </div>`;


          objectsArray[i] = editContact;

          // showing messages and making input field empty
          errorMessage.textContent = "Successfully Edited";
          fullName.value = "";
          phone.value = "";
          email.value = "";


          //insert this contact into localStorage
          insertContactIntoLocalStorage();

          //displaying contacts
          display();

        }
      })

    }

  }

}






let navLogout = document.getElementById("navLogout");
navLogout.addEventListener("click", () => {
  sessionStorage.setItem("login", "false");
  window.location = "./login.html";

});

