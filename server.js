var express = require('express');
var app = express();
var cors = require('cors')
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongodbUri = 'mongodb://usertwo:apple@ds119682.mlab.com:19682/payapp';

var MongoClient = require('mongodb').MongoClient;
var {ObjectId} = require('mongodb');
var dbConnection;
MongoClient.connect(mongodbUri, function (err, db) {
  if (err) throw err
  dbConnection = db;
})

app.use(morgan('dev'));
app.use(cors())
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());
app.use(express.static('dist'))

app.get('/', function (req, res) {
  res.sendfile('./dist/index.html');
});

// get all cards
app.get('/cards', function (req, res) {
  dbConnection.collection('cards').find().toArray(function (err, result) {
    if (err) res.send(err);

    res.json(result);

  })
});

// create card or update card and send back all cards after creation
app.post('/api/cards', function (req, res) {
  req.body._id = ObjectId(req.body._id)

  dbConnection.collection('cards').save(req.body, function (err, r) {
    dbConnection.collection('cards').find().toArray(function (err, result) {
      if (err) res.send(err);

      res.json(result);
    })

  });
});

// delete a card return entire card array
app.delete(`/api/cards/:card_id`, function (req, res) {
  dbConnection.collection('cards').deleteOne({ '_id': ObjectId(req.params.card_id) }, function (err, r) {
    dbConnection.collection('cards').find().toArray(function (err, result) {
      if (err) res.send(err);
      res.json(result);
    })
  });
});

// listen (start app with node server.js) ======================================
app.listen(8080, function () {
  console.log('CORS-enabled web server listening on port 8080')
})


