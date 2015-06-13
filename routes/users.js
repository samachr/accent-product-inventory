var express = require('express');
var router = express.Router();

var db = require('../database/db.js');

/* GET /users listing. */
router.get('/', function(req, res, next) {
  console.log(req.connection.remoteAddress, ":", 'users');
  db.all("SELECT id, name, commissionrate FROM users", function(err, rows) {
    if (err) console.log(req.connection.remoteAddress, ":", err);
    res.json(rows);
  });
});

/* POST /users */
router.post('/', function(req, res, next) {
  console.log(req.connection.remoteAddress, ":", "user received");
  if(req.body.id) {
    db.run("INSERT INTO users (id, name, commissionrate) VALUES (?, ?, ?)", [req.body.id, req.body.name, req.body.commissionrate], function(err) {
      if(err) {
        console.log(req.connection.remoteAddress, ":", err);
        res.status(500).end();
      } else {
        res.status(200).end();
      }
    });
  } else {
    db.run("INSERT INTO users (name, commissionrate) VALUES (?, ?)", [req.body.name, req.body.commissionrate], function(err) {
      if(err) {
        console.log(req.connection.remoteAddress, ":", err);
        res.status(500).end();
      } else {
        res.status(200).end();
      }
    });
  }

});

/* GET /users/id */
router.get('/:id', function(req, res, next) {
  console.log(req.connection.remoteAddress, ":", "user with id " + req.params.id + " requested");
  db.all("SELECT id, name, commissionrate FROM users WHERE id=(?)", req.params.id, function(err, rows) {
    if (err) console.log(req.connection.remoteAddress, ":", err);
    res.json(rows);
  });
});

/* PUT /users/:id */
router.put('/:id', function(req, res, next) {
  db.run("UPDATE users SET name=(?), commissionrate=(?)  WHERE id=(?)",[req.body.name, req.body.commissionrate, req.body.id], function(err) {
    if (err) {
      console.log(req.connection.remoteAddress, ":", err);
      res.status(500).end();
    } else {
      console.log(req.connection.remoteAddress, ":", "user with id " + req.body.id + " updated");
      res.status(200).end();
    }
  });
});

/* DELETE /users/:id */
router.delete('/:id', function(req, res, next) {
  db.run("DELETE from users where id=(?)", req.params.id, function(err) {
    if (err) {
      console.log(req.connection.remoteAddress, ":", err);
      res.status(500).end();
    } else {
      console.log(req.connection.remoteAddress, ":", "user with id " + req.params.id + " deleted");
      res.status(200).end();
    }
  });
});

module.exports = router;
