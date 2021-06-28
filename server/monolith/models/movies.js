const { getDatabase } = require('../config/mongodb')

class Movie {
  static find() {
    return getDatabase().collection('movies').find().toArray()
  }
  static async findById(id) {
    return getDatabase("movies").findOne({ _id: ObjectId(id) })
  }
  static addMovie(newMovie) {
    return getDatabase().collection('movies').insertOne(newMovie)
  }
  static deleteMovie(id) {
    return getDatabase().collection('movies').deleteOne(id)
  }
  static updateMovie(id, edited) {
    return getDatabase().collection('movies').updateOne(id, edited)
  }
}

module.exports = Movie