const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

//fs.readfile
//fs.writefile
//fs.unlink
//all of these filesystem methods will interact w/ database

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => { //counter.getNextUniqueID(err, filename)
  //'should create a new file for each todo'
    //maybe using fs.writefile to create a new file and assign name?
    //fs.writeFile(fileName, dataInside[options? like headers], callback (error or success))
  //'should use the generated unique id as the filename'
    //using our counter.getNextUniqueID(need to fix)
  //'should only save todo text contents in file'
  //'should pass a todo object to the callback on success'
    //on success, should provid object from file to write in
  counter.getNextUniqueID((err, todo) => {
    fs.writeFile(path.join(exports.dataDir, `${todo}.txt`), text, (err) => {
      if (err) {
        throw ('error, could not create new file')
      } else {
        callback(null, {id: todo, text: text});
      }
    });
  });
};

exports.readAll = (callback) => {
  //'should return an empty array when there are no todos' using readfile?
    //readfile(path (filename[options (headers?)], callback)
  //'should return an array with all saved todos'
    //means we should save our todos within an array? where is our file system located? and how are they stored?
  //'should find a todo by id'
    //id is filename
  var data = _.map(items, (text, id) => {
    return { id, text };
  });
  callback(null, data);
};

exports.readOne = (id, callback) => {
  //'should return an error for non-existant todo'
    //if the ID doesnt exist, throw err
  var text = items[id];
  if (!text) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback(null, { id, text });
  }
};

exports.update = (id, text, callback) => {
  //'should not change the counter'
    //when writing file, should use same ID
  //'should update the todo text for existing todo'
    //should only change the text
  //'should not create a new todo for non-existant id'
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  //should not change the counter
  //should delete todo file by id'
  //'should return an error for non-existant id'
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');
//

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};



//callback questions