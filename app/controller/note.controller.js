const Note = require('../models/note.model.js')

// Create and Save a new Note
exports.create = (req, res) => {
  //  validate request
  if (!req.body.content) {
    return res.status(400).send({
      message: 'Cannot create a note without content'
    })
  }
  //  create a note
  const note = new Note({
    title: req.body.title || 'Untitled Note',
    content: req.body.content
  })

  // Save Note in the database
  note.save()
    .then(data => {
      res.status(200).send(res)
    }).catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occured while creating the Note'
      })
    })
}

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
  Note.find()
    .then(notes => {
      res.send(notes)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retreiving Notes'
      })
    })
}

// Find a single note with a noteId
exports.findOne = (req, res) => {
  Note.findById(req.params.noteId)
    .then(note => {
      if (!note) {
        res.status(404).send({
          message: 'Note with id ' + req.params.noteId + ' not found in database'
        })
      }
      res.send(res)
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        res.status(404).send({
          message: err.message || 'Note with id ' + req.params.noteId + ' not found'
        })
      }
      res.status(500).send({
        message: err.message || 'Note not found'
      })
    })
}

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
  //  validate request
  if (!req.params.noteId) {
    return res.status(400).send({
      message: 'Note content can not be empty'
    })
  }
  // Find note and update it with the request body
  Note.findByIdAndUpdate(req.params.noteId, {
    title: req.body.title || 'Untitled Note',
    content: req.body.content
  }, { new: true }) //  this is used to return the modified document to the then() function instead of the original.
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: 'Note with id ' + req.params.noteId + ' not found'
        })
      }
      res.send(note)
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: err.message || 'Note with id ' + req.params.noteId + ' not found'
        })
      } res.status(500).send({
        message: 'Error updating note with id ' + req.params.noteId
      })
    })
}

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
  Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: 'Note with id ' + req.params.noteId + 'not found'
        })
      }
      res.send('Note deleted successfully')
    })
    .catch(err => {
      if (err.kind === 'ObjetcId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: 'Note with id ' + req.params.noteId + ' not found'
        })
      }
      return res.status(500).send({
        message: 'Could not delete the note. Please try again later.'
      })
    })
}
