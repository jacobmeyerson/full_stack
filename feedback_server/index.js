/*
* Questions:
* How to do multiple commands in connection.query? (Haven't been able to get that to work)
* What are credentials used for?
* Need to do error management?
*/

// TODO: how to logout

'use strict';

const Bcrypt = require('bcrypt');
const Hapi = require('hapi');
const mysql = require('mysql');
const request = require('request');

var locs = [];



const validate = async (_req, username, password) => {
  var authBuffer = new Buffer(username + ":" + password).toString("base64");
  var headers = {'Authorization': "Basic " + authBuffer};
 
  return new Promise(
    (res, _rej) => {
      var callback = (_error, response, _body) => {
        const data = JSON.parse(response.body);
        res({isValid: data.authenticated, credentials: {name: username}});
      }

      request(
        { method: 'GET',
          url: 'https://ngx.ampath.or.ke/test-amrs/ws/rest/v1/session/',
          headers: headers
        }, callback
      );
    });
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
  path: '/getLoc',
  handler: function(request, h) {   
    return new Promise(
      (res, rej) => {
        locs = [1,2,3];
        res(locs);
      }
    );
  }
});

server.route({
  method: 'GET',
  path: '/dispLoc',
  handler: function(request, h) {   
    return new Promise(
      (res, rej) => {
        res(locs);
      }
    );
  }
});


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

  // causes all routes to require authentication
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

