import mongoose from 'mongoose'

const TournirSchema = new mongoose.Schema({
  name: { type: String, required: true },
  teams: { type: Array, required: true },
  date: { type: Date, default: Date.now },
  games: { type: Object, default: {} }
})

module.exports = mongoose.models.Tournirm || mongoose.model('Tournirm', TournirSchema)