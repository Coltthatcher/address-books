// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] != undefined) {
    return this.contacts[id];
  }
  return false;
};

AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, homeAddress, homeEmail, workAddress, workEmail, workPhone) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  
  this.address = {};
  this.address.homeEmail = homeEmail; 
  this.address.homeAddress = homeAddress;
  this.address.workEmail = workEmail;
  this.address.workAddress = workAddress;
  this.address.workPhone = workPhone;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

// User Interface Logic ---------
let addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  Object.keys(addressBookToDisplay.contacts).forEach(function(key) {
    const contact = addressBookToDisplay.findContact(key);
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
}

function showContact(contactId) {
  const contact = addressBook.findContact(contactId);
  $("#show-contact").show();

  if(contact.firstName === ""){
    $('#first').remove();
  }
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".home-address").html(contact.address.homeAddress);
  $(".home-email").html(contact.address.homeEmail);
  $(".work-address").html(contact.address.workAddress);
  $(".work-email").html(contact.address.workEmail);
  $(".work-phone").html(contact.address.workPhone);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
}

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();
    const inputtedHomeAddress = $("input#new-home-address").val();
    const inputtedHomeEmail = $("input#new-home-email").val();
    const inputtedworkAddress = $("input#new-work-address").val();
    const inputtedworkEmail = $("input#new-work-email").val();
    const inputtedworkPhone =$("input#new-work-phone").val();
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-home-address").val("");
    $("input#new-home-email").val("");
    $("input#new-work-address").val("");
    $("input#new-work-email").val("");
    $("input#new-work-phone").val("");
    const newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedHomeAddress, inputtedHomeEmail, inputtedworkAddress, inputtedworkEmail, inputtedworkPhone);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  });
});