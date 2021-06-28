const axios = require('axios')
const baseUrl = "http://localhost:4001"
const Redis = require('ioredis')
const redis = new Redis()
class MoviesController {

  static findAll(req, res) {

    redis.get('movies')
      .then((result) => {
        if(!result) {
          axios({
            url: baseUrl+"/movies",
            method: 'GET'
          })
            .then(({ data })=>{
              redis.set('movies', JSON.stringify(data))
              res.status(200).json(data)
            })
            .catch((err)=>{
              res.status(err.response.status || 500).json({ message: err.response.data.message || "Internal Server Error" })
            })
        } else {
          const data = JSON.parse(result)
          res.status(200).json(data)
        }
      })
    
  }

  static findById(req, res) {
    axios({
      url: baseUrl+"/movies/"+req.params.id,
      method: 'GET',
    })
      .then(({ data })=>{
        res.status(200).json({movie: data.movie})
      })
      .catch((err)=>{
        res.status(err.response.status || 500).json({ message: err.response.data.message || "Internal Server Error" })
      })
  }

  static addMovie(req, res) {
    const { title, overview, poster_path, popularity, tags} = req.body
    axios({
      url: baseUrl+"/movies",
      method: 'POST',
      data: { title, overview, poster_path, popularity, tags}
    })
      .then(({ data })=>{
        redis.del('movies')
        res.status(201).json(data)
      })
      .catch((err)=>{
        res.status(err.response.status || 500).json({ message: err.response.data.message || "Internal Server Error" })
      })
  }

  static deleteMovie(req, res) {
    axios({
      url: baseUrl+"/movies/"+req.params.id,
      method: 'DELETE',
    })
      .then(({ data })=>{
        redis.del('movies')
        res.status(201).json({message: "delete Success"})
      })
      .catch((err)=>{
        res.status(err.response.status || 500).json({ message: err.response.data.message || "Internal Server Error" })
      })
  }
  static updateMovie(req, res) {
    const { title, overview, poster_path, popularity, tags} = req.body
    axios({
      url: baseUrl+"/movies/"+req.params.id,
      method: 'PUT',
      data: { title, overview, poster_path, popularity, tags}
    })
      .then(({ data })=>{
        redis.del('movies')
        res.status(201).json({message: "update Success"})
      })
      .catch((err)=>{
        res.status(err.response.status || 500).json({ message: err.response.data.message || "Internal Server Error" })
      })
  }
}

module.exports = MoviesController