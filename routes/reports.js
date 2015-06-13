var express = require('express');
var router = express.Router();

var db = require('../database/db.js');

/* GET /users listing. */

router.get('/sales/all', function(req, res, next) {
  console.log(req.connection.remoteAddress, ":", 'reports');
  // db.all("SELECT name, transactions.id as id, userid, count, price, timestamp FROM transactions INNER JOIN users on transactions.userid = users.id", function(err, rows) {
  db.all("SELECT name, count, price FROM transactions INNER JOIN users on transactions.userid = users.id", function(err, rows) {
    if (err) console.log(req.connection.remoteAddress, ":", err);

    var report = {};

    if(rows.length) {
      report.totalProductsSold = rows.map(function(row){
        return row.count;
      }).reduce(function(prev, next) {
        return prev + next;
      });

      report.totalIncomeFromSales = rows.map(function(row){
        return row.price;
      }).reduce(function(prev, next) {
        return prev + next;
      });
    }

    res.json(report);
  });
});

/* GET /users/id */
router.get('/sales/:id', function(req, res, next) {
  console.log(req.connection.remoteAddress, ":", "report for user with id " + req.params.id + " requested");
  db.all("SELECT name, transactions.id as id, userid, count, price, timestamp FROM transactions INNER JOIN users on transactions.userid = users.id WHERE userid=(?)", req.params.id, function(err, rows) {
    if (err) console.log(req.connection.remoteAddress, ":", err);

    var report = {};

    if (rows.length) {
      report.name = rows[0].name;

      report.totalProductsSold = rows.map(function(row){
        return row.count;
      }).reduce(function(prev, next) {
        return prev + next;
      });

      report.totalIncomeFromSales = rows.map(function(row){
        return row.price;
      }).reduce(function(prev, next) {
        return prev + next;
      });
    }
    res.json(report);
  });
});

module.exports = router;
