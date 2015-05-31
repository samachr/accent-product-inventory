var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3').verbose();
//var db = new sqlite3.Database('todo.db');

var db = new sqlite3.Database(':memory:');

db.serialize(function() {
  db.run("CREATE TABLE lorem (info TEXT)");

  var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
  }
  stmt.finalize();

  var sql = "SELECT id, info FROM lorem";

   // Print the records as JSON
    db.all(sql, function(err, rows) {
      //console.log(JSON.stringify(rows));
    });

});

//db.close();

/* GET /todos listing. */
router.get('/', function(req, res, next) {
  db.all("SELECT id, info FROM lorem", function(err, rows) {
    res.json(rows);
  });
  // Todo.find(function (err, todos) {
  //   if (err) return next(err);
  //   res.json(todos);
  // });
});

/* POST /todos */
router.post('/', function(req, res, next) {
  console.log(req.body.id);
  var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  stmt.run(req.body.id);
  stmt.finalize();
  res.send('<script>window.location = "/";</script>');

  // Todo.create(req.body, function (err, post) {
  //   if (err) return next(err);
  //   res.json(post);
  // });
});

/* GET /todos/id */
router.get('/:id', function(req, res, next) {
  db.all("SELECT id, info FROM lorem WHERE id=" + req.params.id, function(err, rows) {
    res.json(rows);
  });
  // Todo.findById(req.params.id, function (err, post) {
  //   if (err) return next(err);
  //   res.json(post);
  // });
});

/* PUT /todos/:id */
// router.put('/:id', function(req, res, next) {
//   Todo.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

/* DELETE /todos/:id */
// router.delete('/:id', function(req, res, next) {
//   Todo.findByIdAndRemove(req.params.id, req.body, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

module.exports = router;
