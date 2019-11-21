The  apparel server service Dockerfile:

FROM node //the packages.
WORKDIR app //set the working DIR that the following is set in.
RUN npm install -g nodemon //install the nodemon package (globally) that enables the node server to restarts using newly created files, ie dynamically updates the server.
COPY package.json package.json //copy the dependencies to the container.
RUN npm install //install the node modules from the dependencies.
RUN mv /app/node_modules /node_modules //move the node modules DIR outside the app folder to the root to be accessed globally.
COPY . .  //copy the apparel root over to the container root.
EXPOSE 80  //Info to show which port is exposed.
CMD ["nodemon", "server.js"]  //default commands to run in the container.

The server.js file:

const express = require('express'); //load up express module by calling it
const { Pool } = require('pg'); //get a Pool object from the pg module
const HOST = '0.0.0.0'; //
const PORT = 80; //
const app = express(); //initialise express app by calling the express function using the parenthesis

//We first initialise the Pool object with some objects.  The Pool object above is a javascript class, so when we initialise an instance of the class to make a Pool object, we can give it some options to configure it: such as how pg can connect with the db!//

const pool = new ({ user: 'postgres', host: 'db' });  //make a new local pool constant that is set to the result of calling new Pool (class) {instance}, where we specify {in the instance} a user as Postgres, and the host is the address of our backend instance, which can also be the name of the db as defined in the docker-compose file//

app.get('/', (req, res) => {   //set up a get function at the root, with a request, response call back function using arrow func notation
    pool.query('SELECT * FROM apparel', (error, response) => {  // Within this we use a call to query the pool object, where the 1st argument is an SQL query, and then a callback we have an error and response object, with the response as a json object containing the rows from the table.
        res.json(response.rows);
    });
});

//We now check that the app is live by listening on the app port using the host port
app.listen(PORT, HOST);
//then call the log method on the console to write a message from the port to the host
console.log(`This is running on http://${HOST}:${PORT}`);

//Now set up the dependencies for express and pg modules in the package.json file (cannot comment it)