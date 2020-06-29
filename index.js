const contacts = require('./contacts');
const argv = require('yargs').argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const list = await contacts.listContacts();
      console.log('Contacts list:');
      console.table(list);
      break;

    case 'get':
      const searchedContact = await contacts.getContactById(id);
      console.log('Searched contact:');
      console.log(searchedContact);
      break;

    case 'add':
      const addedContact = await contacts.addContact(name, email, phone);
      const listWithAddedContact = await contacts.listContacts();

      console.log('Added contact:');
      console.log(addedContact);
      console.log('Contacts list:');
      console.table(listWithAddedContact);
      break;

    case 'remove':
      const removedContact = await contacts.removeContact(id);
      const listWithoutRemovedContact = await contacts.listContacts();

      console.log('Deleted contact:');
      console.log(removedContact);
      console.log('Contacts list:');
      console.table(listWithoutRemovedContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
