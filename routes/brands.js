var express = require('express');
var router = express.Router();

var db = require('../database/db.js');

/* GET /brands listing. */
router.get('/', function(req, res, next) {
  console.log('brand listing requested');
  db.all("SELECT id, brand FROM brands", function(err, rows) {
    if (err) console.log(err);
    res.json(rows);
  });
});

/* POST /brands */
router.post('/', function(req, res, next) {
  console.log("brand received");
  db.run("INSERT INTO brands (brand) VALUES (?)", req.body.brand, function(err) {
    if(err) {
      console.log(err);
      res.status(500).end();
    } else {
      res.status(200).end();
    }
  });
});

/* GET /brands/id */
router.get('/:id', function(req, res, next) {
  console.log("brand with id " + req.params.id + " requested");
  db.all("SELECT id, brand FROM brands WHERE id=(?)", req.params.id, function(err, rows) {
    if (err) console.log(err);
    res.json(rows);
  });
});

/* PUT /brands/:id */
router.put('/:id', function(req, res, next) {
  db.run("UPDATE brands SET brand=(?) WHERE id=(?)",[req.body.id, req.body.brand], function(err) {
    if (err) {
      console.log(err);
      res.status(500).end();
    } else {
      console.log("brand with id " + req.body.id + " updated");
      res.status(200).end();
    }
  });
});

/* DELETE /brands/:id */
router.delete('/:id', function(req, res, next) {
  db.run("DELETE from brands where id=(?)", req.params.id, function(err) {
    if (err) {
      console.log(err);
      res.status(500).end();
    } else {
      console.log("brand with id " + req.params.id + " deleted");
      res.status(200).end();
    }
  });
});

module.exports = router;
