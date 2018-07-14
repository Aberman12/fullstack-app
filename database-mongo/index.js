var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/newDatabase8');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var songsSchema = mongoose.Schema({
  name: {
    type:String,
    require: true
  },
  snippet: {
    type: String,
    require: true
  },
  url: {
    type:String,
    require:true
  }
});

var Item = mongoose.model('Item', songsSchema);

var save = function(item){
  console.log('here is the item you saved', item)
  new Item({name: item.name, snippet: item.snippet, url:item.url})
  .save(function(err){
    if(err){
      console.log('save err', err);
    } else {
      console.log('you saved yo shit!');
    }
  })
}

var selectAll = function(callback) {
  console.log('select all went off right hereerr')
  Item.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

var deleter = function(item){
  console.log('now in deleter database', item);
  Item.deleteOne({ name: item }, function (err) {
    if (err) return handleError('delete error ',err);
    // deleted at most one tank document
  });
}


module.exports.selectAll = {
  selectAll, Item, save, deleter
};
