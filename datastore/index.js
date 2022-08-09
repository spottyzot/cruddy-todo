const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');
const Promise = require('bluebird');
const readFilePromise = Promise.promisify(fs.readFile);

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
  //'should return an array with all saved todos'
  fs.readdir(exports.dataDir, (err, files) => {
    if (err) {
      throw ('error');
    }
    var result = files.map((file) => {
      let id = path.basename(file, '.txt');
      let filePath = path.join(exports.dataDir, file);

      return readFilePromise(filePath, 'utf8')
        .then(text => {
          return {id: id, text: text};
        });
    });

    Promise.all(result)
      .then((items) => {
        callback(null, items);
      })
      .catch((err) => {
        callback(err);
      });
  });
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


exports.delete = (id, callback) => {

  let filePath = path.join(exports.dataDir, `${id}.txt`);
  fs.unlink(filePath, (err) => {
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      callback(null);
    }
  });
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