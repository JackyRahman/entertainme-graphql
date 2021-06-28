const { getDatabase } = require('../config/mongodb')

class Serie {
  static find() {
    return getDatabase().collection('tvSeries').find().toArray()
  }
  static addSerie(newSerie) {
    return getDatabase().collection('tvSeries').insertOne(newSerie)
  }
  static async findById(id) {
    return getDatabase().collection("tvSeries").findOne(id)
  }
  static deleteSerie(id) {
    return getDatabase().collection('tvSeries').deleteOne(id)
  }
  static updateSerie(id, edited) {
    return getDatabase().collection('tvSeries').updateOne(id, edited)
  }
}

module.exports = Serie