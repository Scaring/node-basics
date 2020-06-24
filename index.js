const process = require('process');

const getListContacts = require('./contacts');
// const getContactById = require('./contacts');

const list = async () => {
  const list = await getListContacts();
  console.table(list);
};

// const searchedId = Number(process.argv[3].split('=')[1]);
// const get = async id => {
//   const contact = await getContactById(id);
//   console.log(contact);
// };

list();
// get(searchedId);
