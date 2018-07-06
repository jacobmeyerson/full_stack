/*
* Questions:
* How to do multiple commands in connection.query? (Haven't been able to get that to work)
*/

'use strict';

const Bcrypt = require('bcrypt');
const Hapi = require('hapi');
const mysql = require('mysql');
const request = require('request');

// ---------------------------------------------------


// var authBuffer = new Buffer('jmeyerson' + ":" + 'Ampath123').toString("base64");
// var headers = {'Authorization': "Basic " + authBuffer
// };

// var callback = (error, response, body) => {
//   const data = JSON.parse(response.body);
//   console.log(data.authenticated);
// }

// request(
//   { method: 'GET',
//     url: 'https://ngx.ampath.or.ke/test-amrs/ws/rest/v1/session/',
//     headers: headers
//   }, callback
// );


// request('http://www.google.com', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });


// ---------------------------------------------------


// const users = {
//     jacob: {
//         username: 'jon',
//         password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm',   // 'secret'
//         name: 'John Doe',
//         id: '233d32a'
//     }
// };

const validate = async (req, username, password) => {
  var authBuffer = new Buffer('jmeyerson' + ":" + 'Ampath123').toString("base64");
  var headers = {'Authorization': "Basic " + authBuffer
  };

  var parse = (callback) => {
    // (error, response, body) => {
    //   console.log('callback');
    //   const data = JSON.parse(response.body);
    //   isValid = true;
    //   callback({isValid: true, credentials: { id: 1, name: 'Bob' }});
    // }
    callback({isValid: false, credentials: { id: 1, name: 'Bob' }});

  }

  var callOpenMrs = (callback) => 
    parse(callback);
  //{
    // request(
    //   { method: 'GET',
    //     url: 'https://ngx.ampath.or.ke/test-amrs/ws/rest/v1/session/',
    //     headers: headers
    //   }, parse(callback)
    // );
  // };

// TODO: try doing promise in helper file, with an async function, 
// and altering a field, and seeing if it works out
  // const isValid = true;

  return new Promise(
    (res, rej) => {
        callOpenMrs(res);
    }
  );

  // return({isValid, credentials});
  // h.authenticated({ isValid, credentials });
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

  server.auth.default('simple');

  await server.start();
  console.log('Server is running');
}

init();

// Upon ctrl-c, mysql connection is closed, and server is shut down.
process.on('SIGINT', () => {
  connection.end();
  process.exit();
});

