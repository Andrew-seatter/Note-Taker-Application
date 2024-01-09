const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const path = require('path');

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

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
      // Make a new array of all tips except the one with the ID provided in the URL
      const result = json.filter((note) => note.id !== id);

      // Save that array to the filesystem
      writeToFile('./db/db.json', result);

      // Respond to the DELETE request
      res.json(`Item ${id} has been deleted`);
    });
});



module.exports = notes;