module.exports = (app) => {
  const notes = require('../controller/note.controller.js')

  // Create a note
  app.post('/notes', notes.create)

  // read all notes
  app.get('/notes', notes.findAll)

  // read one note with noteId
  app.get('/notes/:noteId', notes.findOne)

  // update a note with noteId
  app.put('/notes/:noteId', notes.update)

  //  delete A note with noteId
  app.delete('/notes/:noteId', notes.delete)
}
