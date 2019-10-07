const mongoose = require('mongoose')

const VoterSchema = mongoose.Schema({
  surname: {
    type: String,
    required: true
  },

  voterId: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('VoterModel', VoterSchema);