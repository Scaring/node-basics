const fs = require('fs');
const path = require('path');
const rootPath = __dirname;

const contactsPath = path.join(rootPath, '/db', '/contacts.json');

//Function returns array of objects from contacts.json
function listContacts() {
  const list = fs.readFileSync(contactsPath, 'utf-8');
  return JSON.parse(list);
}

//Function returns object of exect contact searched by id in contacts.json
function getContactById(contactId) {
  const contacts = listContacts();
  const searchedContact = contacts.find(contact => contact.id === contactId);
  return searchedContact;
}

//Function removes object of exect contact from contacts.json by id and return it
function removeContact(contactId) {
  const contacts = listContacts();
  const deletedContact = getContactById(contactId);
  const filteredContacts = contacts.filter(contact => contact.id !== contactId);
  fs.writeFileSync(contactsPath, JSON.stringify(filteredContacts));
  return deletedContact;
}

//Function add object of new contact to contacts.json and return it
function addContact(name, email, phone) {
  const contacts = listContacts();
  const lastContact = contacts[contacts.length - 1];
  const addContact = {
    id: lastContact.id + 1,
    name: name,
    email: email,
    phone: phone,
  };
  const updatedContacts = [...contacts, addContact];
  fs.writeFileSync(contactsPath, JSON.stringify(updatedContacts));
  return addContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
