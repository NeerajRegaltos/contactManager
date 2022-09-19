
import { Auth } from "./src/modules/authModule.js";

// if (sessionStorage.getItem("login") == "false" || sessionStorage.getItem("login") == null) {
//   window.location = "./login.html";
// }
// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let myBtn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
myBtn.onclick = function () {
  modal.style.display = "block";


  document.getElementById("addContactHeading").textContent = "Add new Contact";
  addContact.textContent = "Add contact";
  fullName.value = "";
  phone.value = "";
  email.value = "";
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



let fullName = document.getElementById("newName");
let email = document.getElementById("newEmail");
let phone = document.getElementById("newPhone");
let addContact = document.getElementById("addContact");
let errorMessage = document.getElementById("errorMessage");




let saveNewContact = new Auth(fullName, email, phone, "", "", errorMessage);

let key = sessionStorage.getItem("phone");
let localKeys = JSON.parse(localStorage.getItem(key));

const objectsArray = localKeys.arr;

let cardContainer = document.querySelector("#cardContainer");
let editIcon = document.getElementsByClassName("editIcon");
let deleteIcon = document.getElementsByClassName("deleteIcon");



display(objectsArray);








function display(objectsArray) {

  cardContainer.innerHTML = "";
  let idNum = 0;
  for (let contact of objectsArray) {
    cardContainer.innerHTML += contact;
    editIcon[idNum].setAttribute("id", idNum);
    idNum++;
  }

  editTheContact();

}



function deleteContact() {


  for (let i = 0; i < objectsArray.length; i++) {
    deleteIcon[i].addEventListener("click", () => {
      objectsArray.splice(i, 1);



      let key = sessionStorage.getItem("phone");

      let localKeys = JSON.parse(localStorage.getItem(key));


      localStorage.setItem(key, JSON.stringify({ "name": localKeys.name, "email": localKeys.email, "password": localKeys.password, "arr": objectsArray }));

      display(objectsArray);

    })
  }

}


deleteContact();



function editTheContact() {

  for (let i = 0; i < objectsArray.length; i++) {
    editIcon[i].addEventListener("click", () => {
      let id = editIcon[i].getAttribute("id");

      let n = document.getElementById(id).nextElementSibling.lastElementChild.textContent;
      let p = document.getElementById(id).nextElementSibling.nextElementSibling.lastElementChild.textContent;
      let e = document.getElementById(id).nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.lastElementChild.textContent;

      for (let j of editIcon[i].classList) {

        if (j === "editIcon") {
          modal.style.display = "block";
          document.getElementById("addContactHeading").textContent = "Edit the Contact";
          addContact.textContent = "Edit contact";
          fullName.value = n;
          phone.value = p;
          email.value = e;
          errorMessage.textContent = "";
          addContact.setAttribute("class", "editClass");
        }
      }


      document.querySelector(".editClass").addEventListener("click", () => {


        objectsArray[i] = ` <div class="card"  > 
        <i class="fa-solid fa-pencil editIcon"></i>
        <li id="contactNames"> Name  : <span>${fullName.value}</span></li>
        <li id="contactPhones">Phone : <span>${phone.value}</span></li>
        <i class="fa-regular fa-trash-can deleteIcon"></i>
        <li id="contactEmails">Email : <span>${email.value}</span></li>

      </div>`;

        fullName.value = "";
        phone.value = "";
        email.value = "";
        errorMessage.textContent = "Edited Successfully";

        let key = sessionStorage.getItem("phone");

        let localKeys = JSON.parse(localStorage.getItem(key));


        localStorage.setItem(key, JSON.stringify({ "name": localKeys.name, "email": localKeys.email, "password": localKeys.password, "arr": objectsArray }));


        display(objectsArray);

      })

    })



  }
}









addContact.addEventListener("click", () => {

  if (addContact.textContent === "Add contact") {

    if (saveNewContact.validName && saveNewContact.validEmail() && saveNewContact.validPhone("signup")) {
      let newContact = {
        name: fullName.value.trim(),
        phone: phone.value,
        email: email.value.trim()
      }

      newContact = ` <div class="card"  > 
    <i class="fa-solid fa-pencil editIcon"></i>
    <li id="contactNames"> Name  : <span>${newContact.name}</span></li>
    <li id="contactPhones">Phone : <span>${newContact.phone}</span></li>
    <i class="fa-regular fa-trash-can deleteIcon"></i>
    <li id="contactEmails">Email : <span>${newContact.email}</span></li>
 
  </div>`

      objectsArray.push(newContact);
      errorMessage.textContent = "Successfully saved";
      fullName.value = "";
      phone.value = "";
      email.value = "";

      let key = sessionStorage.getItem("phone");
      let localKeys = JSON.parse(localStorage.getItem(key));


      localStorage.setItem(key, JSON.stringify({ "name": localKeys.name, "email": localKeys.email, "password": localKeys.password, "arr": [...objectsArray] }));
      display(objectsArray);
    }

  } else {

    editTheContact();

  }



})





let navLogout = document.getElementById("navLogout");
navLogout.addEventListener("click", () => {
  sessionStorage.setItem("login", "false");
  window.location = "./login.html";

});

