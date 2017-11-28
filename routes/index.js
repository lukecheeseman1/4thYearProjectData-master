var express = require('express'); // bring in express
var router = express.Router();

router.get('/', function(req, res, next) { //request respose next
    res.render('index.html'); //route for the home page get request, call back function
});

module.exports = router; //export this to access again from other files