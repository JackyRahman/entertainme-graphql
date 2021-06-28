const { ObjectId } = require('bson')
const Movie = require('../models/movies')

class MoviesController {

  static async findAll(req, res) {
    try {
      const movies = await Movie.find()
      res.status(200).json(movies)
    } catch (err) {
      res.status(err.code || 500).json({ message: err.message || "Internal Server Error" })
    }
  }

  static async findById(req, res,) {
    try {
      const idMovie = {
        _id: ObjectId(req.params.id)
      }
      let movie = await Movie.findById(idMovie)

      if(!movie) throw { code: 404, message: "Movie Not Found" }
      res.status(200).json({ movie })

    } catch(err) {
      res.status(err.code || 500).json({ message: err.message || "Internal Server Error" })
    }
  }

  static async addMovie(req, res) {
    try {
      const newMovie = req.body
      const movie = await Movie.addMovie(newMovie)
      res.status(201).json(movie.ops[0])
    } catch (err) {
      res.status(err.code || 500).json({ message: err.message || "Internal Server Error" })
    }
  }

  static async deleteMovie(req, res) {
    try {
      const idMovie = {
        _id: ObjectId(req.params.id)
      }
      const movie = await Movie.deleteMovie(idMovie)
      res.status(201).json({message: "Success Delete"})
    } catch (err) {
      res.status(err.code || 500).json({ message: err.message || "Internal Server Error" })
    }
  }
  static async updateMovie(req, res) {
    try {
      const idMovie = {
        _id: ObjectId(req.params.id)
      }
      const dataMovie = { $set: req.body }

      const movie = await Movie.updateMovie(idMovie, dataMovie)
      res.status(201).json({ message: 'success update'})
    } catch (err) {
      res.status(err.code || 500).json({ message: err.message || "Internal Server Error" })
    }
  }
}

module.exports = MoviesController