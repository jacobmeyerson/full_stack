/*
* Questions:
* How to do multiple commands in connection.query? (Haven't been able to get that to work)
*/

'use strict';

const Bcrypt = require('bcrypt');
const Hapi = require('hapi');
const mysql = require('mysql');

const users = {
    john: {
        username: 'john',
        password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm',   // 'secret'
        name: 'John Doe',
        id: '2133d32a'
    }
};

const validate = async (request, username, password) => {

    const user = users[username];
    if (!user) {
        return { credentials: null, isValid: false };
    }

    const isValid = await Bcrypt.compare(password, user.password);
    const credentials = { id: user.id, name: user.name };

    return { isValid, credentials };
};


const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'jacob922',
  database : 'hapi'
});

const server = Hapi.Server({
  port: 3000,
  host: 'localhost',
  routes: {
    cors: true
  }
});

connection.connect();

server.route({
	method: 'GET',
	path: '/yes_no/{name}',
	handler: function(request, h) {    
    return new Promise(
      (res, rej) => {
        connection.query(
          `SELECT * FROM YesNo WHERE type_response="${request.params.name}";`,
          (e, r, f) => res(r[0]));
      }
    );
	}
});

server.route({
  method: 'GET',
  path: '/reset',
  handler: function(request, h) {    
    return new Promise(
      (res, rej) => {
        connection.query(
          `UPDATE YesNo SET num_response = 0`,
          (e, r, f) => res('Success!'));
      }
    );
  }
});

server.route({
  method: 'POST',
  path: '/',
  handler: function(request, h) {
    return new Promise(
      (res, rej) => {
        connection.query(
          `UPDATE YesNo SET num_response = num_response + 1 WHERE type_response = "${request.payload}";`,
          (e, r, f) => res('Success!'));
      }
    );
  }
});


const init = async () => {

  await server.register({
    plugin: require('hapi-auth-basic')
  });

  server.auth.strategy('simple', 'basic', { validate });

  server.route({
      method: 'GET',
      path: '/',
      options: {
          auth: 'simple'
      },
      handler: function (request, h) {

          return 'welcome';
      }
  });

  await server.start();
  console.log('Server is running');
}

init();

// Upon ctrl-c, mysql connection is closed, and server is shut down.
process.on('SIGINT', () => {
  connection.end();
  process.exit();
});

