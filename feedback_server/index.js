/*
* Questions:
* How to do multiple commands in connection.query? (Haven't been able to get that to work)
* What are credentials used for?
* Need to do error management?

TODO:
  Error management (I think)
*/

// TODO: how to logout

'use strict';

const Bcrypt = require('bcrypt');
const Hapi = require('hapi');
const mysql = require('mysql');
const request = require('request');

// local storage of fetched locations and programs
var locations = [];
var programs = [];


// mock locations and programs for use in development
const mock_locations = [{uuid:"08feae7c-1352-11df-a1f1-0026b9348838", name:"Location-1"},
                        {uuid:"00b47ef5-a29b-40a2-a7f4-6851df8d6532", name:"Location-2"},
                        {uuid:"79fcf21c-8a00-44ba-9555-dde4dd877c4a", name:"Location-3"},
                        {uuid:"6cd0b441-d644-487c-8466-5820a73f9ce5", name:"Location-4"}];
const mock_programs = [{department:"CDM", programs:[{uuid:"2b0419c2-275f-4354-8b49-4c97d033ecbb", name:"CDM-Prog-1"},
                                                    {uuid:"01c73fdc-65ce-4349-abdf-bbc554178b47", name:"CDM-Prog-2"}]},
                       {department:"HIV", programs:[{uuid:"b5d03983-f24e-4fdc-9ff5-33fc87dee02b", name:"HIV-Prog-1"},
                                                    {uuid:"8f537fab-0b7f-4b72-a462-042eefad058c", name:"HIV-Prog-2"}]},
                       {department:"ONCO", programs:[{uuid:"8ce15cad-c7ff-41d9-b55c-5230116c3bf7", name:"ONCO-Prog-1"},
                                                    {uuid:"27edd245-5205-4e66-82bd-d314c547d16b", name:"ONCO-Prog-2"}]}];




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
        locations = mock_locations; // TODO: for production, fetch from OpenMRS
        programs = mock_programs; // TODO: for production, fetch from ETL
        res({locations, programs});
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

