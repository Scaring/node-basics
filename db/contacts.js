const fs = require('fs').promises;
const path = require('path');
const rootPath = __dirname;

const contactsPath = path.join(rootPath, '/contacts.json');

//Function returns array of objects from contacts.json
const listContacts = async () => {
  const list = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(list);
};

//Function returns object of exect contact searched by id in contacts.json
const getContactById = async contactId => {
  const contacts = await listContacts();
  const searchedContact = contacts.find(contact => contact.id === contactId);
  return searchedContact;
};

//Function removes object of exect contact from contacts.json by id and return it
const removeContact = async contactId => {
  const deletedContact = await getContactById(contactId);
  const contacts = await listContacts();
  const filteredContacts = contacts.filter(contact => contact.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
  return deletedContact;
};

//Function add object of new contact to contacts.json and return it
const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const lastContact = contacts[contacts.length - 1];
  const addContact = {
    id: lastContact.id + 1,
    name: name,
    email: email,
    phone: phone,
  };
  const updatedContacts = [...contacts, addContact];
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
  return addContact;
};

//Function updates object of existing contact in contacts.json and returns new one
const updateContact = async (contactId, data) => {
  const updatedContact = await getContactById(contactId);
  if (!updatedContact) return;
  const mergedContact = { ...updatedContact, ...data };
  const contacts = await listContacts();
  const contactsAfterMerge = contacts.map(contact => {
    if (contact.id !== contactId) return contact;
    return mergedContact;
  });
  await fs.writeFile(contactsPath, JSON.stringify(contactsAfterMerge));
  return mergedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
