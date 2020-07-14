const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HandphoneSchema = new Schema({
  merkHp: {
    type: String
  },
  harga: {
    type: Number
  },
  deskripsi: {
    type: String
  },
  image: {
    type: String
  }
})

module.exports = mongoose.model('handphone', HandphoneSchema)