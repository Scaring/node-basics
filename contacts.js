const fs = require('fs');
const path = require('path');
const rootPath = __dirname;

const contactsPath = path.join(rootPath, '/db', '/contacts.json');

function listContacts() {
  const list = fs.readFileSync(contactsPath, 'utf-8');
  return JSON.parse(list);
}

function getContactById(contactId) {
  const contacts = listContacts();
  const searchedContact = contacts.find(contact => contact.id === contactId);
  return searchedContact;
}

function removeContact(contactId) {
  const contacts = listContacts();
  const deletedContact = getContactById(contactId);
  const filteredContacts = contacts.filter(contact => contact.id !== contactId);
  fs.writeFileSync(contactsPath, JSON.stringify(filteredContacts));
  return deletedContact;
}

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
