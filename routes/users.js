var express = require('express');
var router = express.Router();

var db = require('../database/db.js');

/* GET /users listing. */
router.get('/', function(req, res, next) {
  console.log('user listing requested');
  db.all("SELECT id, name FROM users", function(err, rows) {
    if (err) console.log(err);
    res.json(rows);
  });
});

/* POST /users */
router.post('/', function(req, res, next) {
  console.log("user received");
  if(req.body.id) {
    db.run("INSERT INTO users (id, name) VALUES (?, ?)", [req.body.id, req.body.name], function(err) {
      if(err) {
        console.log(err);
        res.status(500).end();
      } else {
        res.status(200).end();
      }
    });
  } else {
    db.run("INSERT INTO users (name) VALUES (?)", req.body.name, function(err) {
      if(err) {
        console.log(err);
        res.status(500).end();
      } else {
        res.status(200).end();
      }
    });
  }

});

/* GET /users/id */
router.get('/:id', function(req, res, next) {
  console.log("user with id " + req.params.id + " requested");
  db.all("SELECT id, name FROM users WHERE id=(?)", req.params.id, function(err, rows) {
    if (err) console.log(err);
    res.json(rows);
  });
});

/* PUT /users/:id */
router.put('/:id', function(req, res, next) {
  db.run("UPDATE users SET name=(?) WHERE id=(?)",[req.body.name, req.body.id], function(err) {
    if (err) {
      console.log(err);
      res.status(500).end();
    } else {
      console.log("user with id " + req.body.id + " updated");
      res.status(200).end();
    }
  });
});

/* DELETE /users/:id */
router.delete('/:id', function(req, res, next) {
  db.run("DELETE from users where id=(?)", req.params.id, function(err) {
    if (err) {
      console.log(err);
      res.status(500).end();
    } else {
      console.log("user with id " + req.params.id + " deleted");
      res.status(200).end();
    }
  });
});

module.exports = router;
