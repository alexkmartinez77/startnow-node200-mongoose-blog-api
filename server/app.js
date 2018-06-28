const express = require('express');
const mongoose = require('mongoose'); //package used to work with MongoDb
const morgan = require('morgan');
const bodyParser = require('body-parser'); //a library that allows us to get the body of the request back (req.body), supports JSON, URL-encoded bodies
const app = express(); //An object that is created by creating express top-level function express();

mongoose.connect('mongodb://localhost/my-blog'); //instruct mongoose to connect to your local MongoDB instance
mongoose.Promise = Promise; //enable promises for mongoose for easier async operations

app.use(morgan('dev')); // dev is the format for the output in the consult
app.use(bodyParser.json());
//routes which should handle requests
app.use('/api/users', require('./routes/users'));
app.use('/api/blogs', require('./routes/blogs'));
app.use((req, res, next) => { //middleware to handle errors if the above two routes cannot handle request
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 404);
    res.json({
        error:{
            message: error.message
        }
    });
});

app.get('/', (req, res, next) => { //routes HTTP get requests to the specified path in first argument and then implements a callback function
    res.status(200).send('This is the root of server!');
});

module.exports = app;