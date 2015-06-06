var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
//var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
// var todos = require('./routes/todos');
var about = require('./routes/about');
var inventoryItem = require('./routes/inventory-item');
var brands = require('./routes/brands');
var transactions = require('./routes/transactions');
var users = require('./routes/users');

var app = express();

//image file uploads
var db = require('./database/db.js')

var multer = require('multer');
app.use(multer({
  dest: './public/images/',
  rename: function(fieldname, filename, req, res) {
    var newName = filename; // + filename.substr(filename.lastIndexOf('.'));
    return newName;
  },
  onFileUploadStart: function(file) {
    console.log(file.originalname + ' is starting ...')
  },
  onFileUploadComplete: function(file) {
    // console.log(file);
    console.log(file.fieldname + ' uploaded to  ' + file.path);
    db.run("INSERT INTO images (filename) VALUES (?)", file.name);
    // console.log("put", file.name, "into the database");
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
  console.log('images listing requested');
  db.all("SELECT filename FROM images", function(err, rows) {
    if (err) console.log(err);
    res.json(rows);
  });
});

//end image file uploads



var db = require('./database/db.js');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/about', about);
// app.use('/todos', todos);
app.use('/inventory-item', inventoryItem);
app.use('/brands', brands);
app.use('/transactions', transactions);
app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
