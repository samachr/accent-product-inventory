var express = require('express');
var router = express.Router();

var db = require('../database/db.js')
//db.close();
/* GET /transactions listing. */
router.get('/', function(req, res, next) {
  console.log('transaction listing requested');
  db.all("SELECT id, userid, count, price, timestamp FROM transactions", function(err, rows) {
    if (err) console.log(err);
    res.json(rows);
  });
});

/* POST /transactions */
router.post('/', function(req, res, next) {
  console.log("transaction received");
  db.run("INSERT INTO transactions (userid, count, price) VALUES (?, ?, ?)", [req.body.userid, req.body.count, req.body.price], function(err) {
    if(err) {
      console.log(err);
      res.status(500).end();
    } else {
      res.status(200).end();
    }
  });
});

/* GET /transactions/id */
router.get('/:id', function(req, res, next) {
  console.log("transaction with id " + req.params.id + " requested");
  db.all("SELECT id, userid, count, price, timestamp FROM transactions WHERE id=(?)", req.params.id, function(err, rows) {
    if (err) console.log(err);
    res.json(rows);
  });
});

/* PUT /transactions/:id */
router.put('/:id', function(req, res, next) {
  db.run("UPDATE transactions SET userid=?, count=?, price=? WHERE id=?",[req.body.userid, req.body.count, req.body.price], function(err) {
    if (err) {
      console.log(err);
      res.status(500).end();
    } else {
      console.log("transaction with id " + req.body.id + " updated");
      res.status(200).end();
    }
  });
});

/* DELETE /transactions/:id */
router.delete('/:id', function(req, res, next) {
  db.run("DELETE from transactions where id=(?)", req.params.id, function(err) {
    if (err) {
      console.log(err);
      res.status(500).end();
    } else {
      console.log("transaction with id " + req.params.id + " deleted");
      res.status(200).end();
    }
  });
});

module.exports = router;
