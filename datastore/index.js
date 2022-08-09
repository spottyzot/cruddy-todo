const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

//fs.readfile
//fs.writefile
//fs.unlink
//all of these filesystem methods will interact w/ database

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => { //counter.getNextUniqueID(err, filename) exports.create('delete this repo'); todo=00001
//'should pass a todo object to the callback on success'
  counter.getNextUniqueId((err, id) => { //arguments are now (err: null, id = obj of data)
    console.log(path.join(exports.dataDir));


    fs.writeFile(path.join(exports.dataDir, `${id}.txt`), text, (err) => { //fs.writeFile( file, data, options, callback )
      if (err) { //checks for error
        throw ('error, could not create new file');
      } else { //issue callback with the new info, goes to line 15
        callback(null, {id: id, text: text});
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

    //reading directory of data
    // fs.readdir(path.join(exports.dataDir), (err, files) => {
    //   //for each of the files within directory
    //   var results = _.map(files, (file) => {
    //     console.log('done')
  //       //return all text data in array
  //   });
  // });
};

exports.readOne = (id, callback) => {
  //'should return an error for non-existant todo'
    //if the ID doesnt exist, throw err //fs.readFile(path[, options], callback)
    //think i need to parse
  fs.readFile(path.join(exports.dataDir, `${id}.txt`), 'utf8', (err, fileData) => {
    if (err) {
      callback(new Error(`No item with id:${id}` ));
    } else {
      callback(null, {id: id, text: fileData});
    }
  });
};

exports.update = (id, text, callback) => {
  //'should not change the counter'
  var pathway = path.join(exports.dataDir, `${id}.txt`);
//readfile -> err / success
  fs.readFile(pathway, 'utf8', (err, fileData) => {
    //on error
    if (err) {
      //throw error
      callback(new Error(`No item with id:${id}` ));
      //on success
    } else {
      //writefile ->
      fs.writeFile(pathway, text, (err) => {
        //on error
        if (err) {
          //throw error
          throw ('error, could not create new file');
          //on success
        } else {
          //callback()
          callback(null, {id: id, text: text});
        }
      });
    }
  });
};
  // console.log(`${exports.dataDir}`, 'this is dataDir');
  // fs.access((pathway, err) => {
  //   if (err) {
  //     throw ('could not find pathway');
  //   } else {
  //     fs.writeFile(pathway, text, (err) => {
  //       if (err) {
  //         throw ('could not update, error');
  //       } else {
  //         callback(null, {id, text});
  //       }
  //     });
  //     console.log(pathway, '\n\npathway after conditional');
  //   }
  // });
    //when writing file, should use same ID
  //'should update the todo text for existing todo'
    //should only change the text
  //'should not create a new todo for non-existant id'

  //fs.writeFile



  //find the item, what is it's directory/pathway X

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