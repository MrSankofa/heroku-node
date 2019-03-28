var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var db = require('./db/pricesDB');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

// set the home page route
app.get('/',function(req,res){
  res.send('server created');
})

app.get('/price',function(req,res){

  db.getPriceFromDB(null, function(result){
    console.log('this is the result from the server',result)
    res.json(result);
  });
})

app.get('/price/:priceId',function(req,res){

  db.byIdgetPriceFromDB(null, req.params.priceId, function(result){
    console.log('this is the result from the server',result)
    res.json(result);
  });
})

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));



app.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});