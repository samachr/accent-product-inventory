var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
//var logger = require('morgan');
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// var routes = require('./routes/index');
// var todos = require('./routes/todos');
// var about = require('./routes/about');


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/inventory-item', require('./routes/inventory-item'));
app.use('/brands', require('./routes/brands'));
app.use('/transactions', require('./routes/transactions'));
app.use('/users', require('./routes/users'));

//image file uploads
var db = require('./database/db.js')

var multer = require('multer');
app.use(multer({
  dest: './public/images/',
  rename: function(fieldname, filename, req, res) {
    var newName = filename;
    return newName;
  },
  onFileUploadStart: function(file) {
    console.log(file.originalname + ' is starting ...')
  },
  onFileUploadComplete: function(file) {
    console.log(file.fieldname + ' uploaded to  ' + file.path);
    db.run("INSERT INTO images (filename) VALUES (?)", file.name);
    done = true;
  }
}));

app.post('/images', function(req, res) {
  if (done == true) {
    var url = "/admin/#images";
    if (req.accepts('html')) {
      body = '<p> <script>window.location = "'+url+'"</script>Success. Redirecting to <a href="' + url + '">' + url + '</a></p>';
      res.header('Content-Type', 'text/html');
    } else {
      body = 'Sucess. Redirecting to ' + url;
      res.header('Content-Type', 'text/plain');
    }

    // Respond
    res.statusCode = 200;
    res.header('Location', url);
    res.end(body);
  }
});

app.get('/images', function(req, res) {
  console.log(req.connection.remoteAddress, ': images listing requested');
  db.all("SELECT filename FROM images", function(err, rows) {
    if (err) console.log(err);
    res.json(rows);
  });
});

//end image file uploads

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500).send("<h3>Sorry, there has been an error </h3>" + err.message);
});


module.exports = app;
