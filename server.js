const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

const PORT = 3001;

const app = express();

//middleware for parsing json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use(express.static(path.join(__dirname, 'public')));

// GET Route for index
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

//get route for pulling up notes.html
app.get('/notes', (req, res) => {
    console.info(`${req.method} sucessful`);
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
