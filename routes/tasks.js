var express = require('express'); // bring in express
var router = express.Router();
var mongojs = require('mongojs'); //connects mongo
var db = mongojs('mongodb://LUKECHEESEMAN:Orang3isr3d123@ds117956.mlab.com:17956/project4th', ['tasks']) //pass in db information, change name and pw


//get all tasks
router.get('/tasks', function(req, res, next) { //request respose next
    db.tasks.find(function(err, tasks) {
        if (err) {
            res.send(err); //if there is an error
        }
        res.json(tasks); //if there isnt
    });
});

// get single task

router.get('/tasks/:id', function(req, res, next) { //id sets a parameter,
    db.tasks.findOne({ _id: mongojs.ObjectId(req.params.id) }, function(err, task) { //creates parameter for calling upon single task
        if (err) {
            res.send(err); //if there is an error
        }
        res.json(task); //if there isnt
    });
});

//To save a task using POST
router.post('/task', function(req, res, next) {
    var task = req.body; //get task from form
    if (!task.title || (task.isDone + '')) { //if not task title or 
        res.status(400); //error status
        res.json({
            "error": "Bad Data" //message
        });
    } else {

        db.tasks.save(task, function(err, task) {
            if (err) {
                res.send(err);
            }
            res.json(task);

        })
    }

});

//delete a task
router.delete('/tasks/:id', function(req, res, next) { //id sets a parameter,
    db.tasks.remove({ _id: mongojs.ObjectId(req.params.id) }, function(err, task) { //same as single task change to remove
        if (err) {
            res.send(err); //if there is an error
        }
        res.json(task); //if there isnt
    });
});

//update tasks
router.put('/tasks/:id', function(req, res, next) { //put request , id sets a parameter
    var task = req.bosy;
    var updateTask = {};

    if (task.isDone) {
        updateTask.isDone = task.isDone;
    }
    if (task.title) {
        updateTask.title = task.title;
    }
    if (!updateTask) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.tasks.update({ _id: mongojs.ObjectId(req.params.id) }, updateTask, {}, function(err, task) { // insert param updateTask, an empty and function
            if (err) {
                res.send(err); //if there is an error
            }
            res.json(task); //if there isnt
        });
    }

});



module.exports = router; //export this to access again from other files