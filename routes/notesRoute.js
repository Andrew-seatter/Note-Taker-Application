const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// get call to pull info from database
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// post call to append notes to the db
notes.post('/', (req, res) => {
console.info(`${req.method} request recieved`);


const {title, text} = req.body;

if (title && text){
    const newPost = {
        title,
        text,
        id: uuid()
    };

    readAndAppend(newPost, './db/db.json');
} else {
    res.json('Error in posting');
}
});

notes.delete('/:id', (req, res) => {
    const id = req.params.id;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        //new array with everything except the target id of the delete request
      const result = json.filter((note) => note.id !== id);

      
      writeToFile('./db/db.json', result);

      
      res.json(`Item ${id} has been deleted`);
    });
});



module.exports = notes;