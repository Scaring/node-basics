const contacts = require('./contacts');
const argv = require('yargs').argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      console.log('Contacts list:');
      console.table(contacts.listContacts());
      break;

    case 'get':
      console.log('Searched contact:');
      console.log(contacts.getContactById(id));
      break;

    case 'add':
      console.log('Added contact:');
      console.log(contacts.addContact(name, email, phone));
      console.log('Contacts list:');
      console.table(contacts.listContacts());
      break;

    case 'remove':
      console.log('Deleted contact:');
      console.log(contacts.removeContact(id));
      console.log('Contacts list:');
      console.table(contacts.listContacts());
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
