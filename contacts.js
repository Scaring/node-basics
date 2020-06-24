// contacts.js
const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.format({
  root: 'D:/code/node-basics/db',
  base: '/contacts.json',
  ext: 'ignored',
});

// TODO: задокументировать каждую функцию
const getListContacts = async () => {
  const list = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(list);
};

const getContactById = async contactId => {
  const contacts = await getListContacts();
  const searchedContact = await contacts.find(contact => {
    if (contact.id === contactId) return contact;
  });
  return searchedContact;
};

// function removeContact(contactId) {
//   // ...твой код
// }

// function addContact(name, email, phone) {
//   // ...твой код
// }

module.exports = getListContacts;
// module.exports = getContactById;
