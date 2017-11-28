//Luke Cheeseman
var express = require('express'); //variable to bring express in from node module folder
var path = require('path'); //variable to bring path in 
var bodyParser = require('body-parser'); //variable to bring body parser in from node module folder

var index = require('./routes/index'); // home page
var tasks = require('./routes/tasks'); // Api that works with mongo db

var port = 3000;

var app = express(); // main app variable 

//view engine

app.set('views', path.join(__dirname, 'views')); //views in the views folder
app.set('view engine', 'ejs'); // specify engine and tell it what to use (ejs)
app.engine('html', require('ejs').renderFile); // render files with html extention


// Folder for angular
app.use(express.static(path.join(__dirname, 'client'))); //client folder Angular

//Body Parser middle ware body-parser extract the entire body portion of an incoming request stream and exposes it on req.body .
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index); // index file route
app.use('/api', tasks); // url

app.listen(port, function() {
    console.log('Server started on port ' + port);
}); // call back function