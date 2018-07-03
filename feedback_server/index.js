/*
* Questions:
* When to disconnect? (connection.end())
* How to do multiple commands in connection.query? (Haven't been able to get that to work)
*/

'use strict';

const Hapi = require('hapi');
const mysql = require('mysql');

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

// server.route({
//   method: 'GET',
//   path: '/{name}',
//   handler: (request, h) => {
//     return new Promise(
//       (res, rej) => {
//         connection.query(
//           `INSERT INTO People VALUES(22, "${request.params.name}");`,
//           (e, r, f) => res('Added!')
//         );
//       }
//     );
//   }
// })

server.route({
	method: 'GET',
	path: '/{name}',
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
  method: 'POST',
  path: '/',
  handler: function(request, h) {
    var bob = "no";
    return new Promise(
      (res, rej) => {
        console.log(request.payload);
        connection.query(
          `UPDATE YesNo SET num_response = num_response + 1 WHERE type_response = "${request.payload}";`,//`INSERT INTO People VALUES(166, "${request.payload}");`,
          (e, r, f) => res('Success!')
        );
      }
    );
  }
})


const init = async () => {
  await server.start();
  console.log('Server is running');
}

init();
