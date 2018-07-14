var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var items = require('../database-mongo/index.js');
var helper = require('../helperFunction/helper.js');
var app = express();
var port = 3000;
var count = 0;

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

app.get('/items', function (req, res) {
  console.log('this is happening in the server', req.query)
 var findNameInDatabase = (name, data) => {
   var answer = false;
   for(var i = 0; i < data.length; i++){
     if(name === data[i].artist){
       answer = data[i];
     }
   }
   return answer;
 };

  items.selectAll.selectAll(function(err, data) {
    console.log('this is the data from get requiest in server ',data);
    console.log('heres your req.query.input', req.query.input)
    if(err) {
      console.log('errrerrr');
      res.sendStatus(500);
    } else if(req.query.input === undefined){
      res.json(data);
    }else if(findNameInDatabase(req.query.input, data)){
      console.log('heres your query',req.query);
      var newData = findNameInDatabase(req.query.input, data);
      console.log('query was found in database', newData)
      res.json(newData);
    } else if(req.query.input && !findNameInDatabase(req.query.input, data)){
      console.log('new shiz');

        helper.requestSpotifyArtist(req.query.input, function(err, response, body){
          var newBody = JSON.parse(body)
          console.log('finally got data from server', newBody.query.search[0].title);
          res.send(newBody.query);
        });
    }
  });
});

app.post('/items', function(req, res){
  console.log('this is your req.body =',req.body)
  console.log('this is items',items.selectAll.save)
  items.selectAll.save(req.body);
  res.status(200).send(req.body);
});

app.delete('/items', function(req, res){
  console.log('got to server delete', req.query)
  items.selectAll.selectAll(function(err,data){
    console.log('heres your delete data', data)
    for(var i = 0; i < data.length; i++){
      if(req.query.name === data[i].name){
        console.log('got to deleter');
        items.selectAll.deleter(req.query.name);
      }
    }
  })
})




app.listen(port, function() {
  console.log('listening on port 3000!');
});
