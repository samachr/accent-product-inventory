var express = require('express');
var router = express.Router();

var request = require("request");
 
 //post request
// request({
//   uri: "http://www.cjihrig.com/development/php/hello_form.php",
//   method: "POST",
//   form: {
//     name: "Bob"
//   }
// }, function(error, response, body) {
//   console.log(body);
// });
 
/* GET home page. */
router.get('/', function(req, res) {
  request("http://localhost:3000/todos", function(error, response, body) {
    var todoResults = JSON.parse(body);
    //console.log("testing api: " + todoResults);
    res.render('pages/index', { todoResults: todoResults });
  });
});

module.exports = router;
