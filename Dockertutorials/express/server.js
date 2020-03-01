const express = require('express');  //make variable called express which is the result of requiring the module express.
const app = express(); //make another variable called app which is set to the result of calling the express function.
const HOST = '0.0.0.0';
const PORT = 80;

    //use the app variable to make a get and point, with two parameters: a string where we expose end point, which is the root of the project here; and a callback function in arrow function format of javascript.  Two parameters are within the parenthesis- request, and a response (send back a "Hello Worrld!" string).

app.get('/', (req, res) => {
    res.send('Hello World! Put your message HERE!');
});

app.listen(PORT, HOST);  //make the app live by getting the app to listen on the PORT defined above, and to listen on the HOST defined above.
console.log(`Running on http://${HOST}:${PORT}`);  //give a message to our user.