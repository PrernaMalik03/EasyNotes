const mongoose = require('mongoose')

const NoteSchema = mongoose.Schema({
  title: String,
  content: String
},
{ timeStamp: true
})

module.exports = mongoose.model('Note', NoteSchema)
