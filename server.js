const express = require ("express");
const fs = require ("fs");
const path = require ("path");
const { uuid } = require('uuidv4');

const PORT = process.env.port || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));


// HTML ROUTES
app.get('/', (req, res) => { 
  res.sendFile(path.join(__dirname, './public/index.html'))

});

app.get('/notes', (req, res) => { 
  res.sendFile(path.join(__dirname, './public/notes.html'))

});

// API ROUTES
app.get('/api/notes', (req, res) => {
  let notes = JSON.parse (fs.readFileSync('./db/db.json', 'utf-8'));
  res.json(notes)
})

app.post('/api/notes/', (req, res) => {
  // Get all currrent notes
  let notes = JSON.parse (fs.readFileSync('./db/db.json', 'utf-8'));
  // Get new note
  let newNote = req.body;
  // Give new note an ID
  newNote.id = uuid();
  // Add new note to array of old notes
  notes.push(newNote)
  // Rewrite db.json file
  fs.writeFileSync('./db/db.json', JSON.stringify(notes));
  // Display updated notes on website
  res.json(notes)
})

// Delete let idOfNoteToDelete = req.params.id

app.delete('/api/notes/:id', (req, res) => {
  var id = req.params.id;
  app.disable('/api/notes').remove ({
    id: id
  });
  return res.status(201).end();
 




  //idOfNoteToDelete = idOfNoteToDelete.filter (({ id }) => id !== req.params.id);
  //fs.writeFileSync('./db/db.json', JSON.stringify(notes));
  //res.json(notes);
  

  //idOfNoteToDelete = idOfNoteToDelete.filter (({id}) => id !== req.params.id);
  //fs.writeFileSync('./db/db.json', JSON.stringify(notes));
  //res.json(notes);

//})

// CATCHALL HTML ROUTE
app.get('*', (req, res) => { 
  res.sendFile(path.join(__dirname, './public/index.html'))

});

app.listen(PORT, ()=>
  console.log(`App listening at http://localhost:${PORT}`))
})
