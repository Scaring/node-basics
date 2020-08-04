const EventEmmiter = require('events');

const emmiter = new EventEmmiter();

emmiter.on('dataBastConnection', () =>
  console.log('Database connection successful'),
);

emmiter.on('serverStart', () =>
  console.log('Server is listening on port: 3000'),
);

module.exports = emmiter;
