var express = require('express');
var router = express.Router();

var db = require('../database/db.js')
//db.close();

//db.run("CREATE TABLE IF NOT EXISTS productInventory (price INT, picture INT, name TEXT, stock INT, brand text)");

/* GET /product-inventory listing. */
router.get('/', function(req, res, next) {
  console.log(req.connection.remoteAddress, ":", 'items');
  db.all("SELECT id, price, picture, name, stock, brand FROM productInventory", function(err, rows) {
    if (err) console.log(req.connection.remoteAddress, ":", err);
    res.json(rows);
  });
});

/* POST /product-inventory */
router.post('/', function(req, res, next) {
  console.log(req.connection.remoteAddress, ":", "item received");
  db.run("INSERT INTO productInventory (price, picture, name, stock, brand) VALUES (?, ?, ?, ?, ?)", [req.body.price, req.body.picture, req.body.name, req.body.stock, req.body.brand], function(err) {
    if(err) {
      res.status(500).end();
    } else {
      res.status(200).end();
    }
  });
});

/* GET /product-inventory/id */
router.get('/:id', function(req, res, next) {
  console.log(req.connection.remoteAddress, ":", "item with id " + req.params.id + " requested");
  db.all("SELECT id, price, name, picture, stock, brand FROM productInventory WHERE id=(?)", req.params.id, function(err, rows) {
    if (err) console.log(req.connection.remoteAddress, ":", err);
    res.json(rows);
  });
});

/* PUT /product-inventory/:id */
router.put('/:id', function(req, res, next) {
  db.run("UPDATE productInventory SET price=?, picture=?, name=?, stock=?, brand=? WHERE id=?",[req.body.price, req.body.picture, req.body.name, req.body.stock, req.body.brand, req.body.id], function(err) {
    if (err) {
      console.log(req.connection.remoteAddress, ":", err);
      res.status(500).end();
    } else {
      console.log(req.connection.remoteAddress, ":", "item with id " + req.body.id + " updated");
      res.status(200).end();
    }
  });
});

/* DELETE /product-inventory/:id */
router.delete('/:id', function(req, res, next) {
  db.run("DELETE from productInventory where id=(?)", req.params.id, function(err) {
    if (err) {
      console.log(req.connection.remoteAddress, ":", err);
      res.status(500).end();
    } else {
      console.log(req.connection.remoteAddress, ":", "item with id " + req.params.id + " deleted");
      res.status(200).end();
    }
  });
});

module.exports = router;
