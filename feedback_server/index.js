/*
* Questions:
* When to disconnect? (connection.end())
*/

'use strict';

const Hapi = require('hapi');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
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
  path: '/{name}',
  handler: (request, h) => {
    return new Promise(
      (res, rej) => {
        connection.query(
          `INSERT INTO People VALUES(1, "${request.params.name}");`,
          (e, r, f) => res('Added!')
        );
      }
    );
  }
})

server.route({
	method: 'GET',
	path: '/',
	handler: function(request, h) {    
    return new Promise(
      (res, rej) => {
        connection.query(
          'SELECT * FROM People',
          (e, r, f) => res(r));
      }
    );
	}

});

const init = async () => {
  await server.start();
  console.log('Server is running');
}

init();