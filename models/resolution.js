const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ResolutionSchema = new Schema({
    title: String,
    author: String,
    body: String,
    date: { type: Date, default: Date.now }
})

const Resolution = mongoose.model('resolution', ResolutionSchema)

module.exports = Resolution