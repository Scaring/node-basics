const allowedEmails = ['com', 'net', 'ua', 'uk', 'org', 'ca'];
const passwordPattern = new RegExp('^[a-zA-Z0-9]{3,30}$');

module.exports = {
  allowedEmails,
  passwordPattern,
};
