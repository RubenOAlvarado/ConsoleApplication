const express = require('express'),
    app = express(),
    port = 3001,
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    Data = require('./api/models/Model'),
    logger = require('morgan');

// this is our MongoDB database
const dbRoute =
    'mongodb+srv://Munditoro:munditoro@crudtest-h3y3e.mongodb.net/ConsoleApplication?retryWrites=true&w=majority';


// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//Las rutas que va a usra la aplicación para recibir las peticiones
const routes = require('./api/routes/Routes');
routes(app);

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));


app.listen(port);

console.log('API server started on: ' + port);