import mongoose from 'mongoose'


const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  score: { type: Number, default: 0 }
})

module.exports = mongoose.models.Team || mongoose.model('Team', TeamSchema)