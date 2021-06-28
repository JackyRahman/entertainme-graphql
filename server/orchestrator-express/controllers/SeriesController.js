const axios = require('axios')
const baseUrl = "http://localhost:4002"
const Redis = require('ioredis')
const redis = new Redis()

class SeriesController {

  static findAll(req, res) {
    redis.get('tvSeries')
    .then((result) =>{
      if(!result) {
        axios({
          url: baseUrl+"/tv",
          method: 'GET'
        })
          .then(({ data })=>{
            redis.set('tvSeries', JSON.stringify(data))
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
      url: baseUrl+"/tv/"+req.params.id,
      method: 'GET',
    })
      .then(({ data })=>{
        res.status(200).json({serie: data.serie})
      })
      .catch((err)=>{
        res.status(err.response.status || 500).json({ message: err.response.data.message || "Internal Server Error" })
      })
  }

  static addSerie(req, res) {
    const { title, overview, poster_path, popularity, tags} = req.body
    axios({
      url: baseUrl+"/tv",
      method: 'POST',
      data: { title, overview, poster_path, popularity, tags}
    })
      .then(({ data })=>{
        redis.del('tvSeries')
        res.status(201).json(data)
      })
      .catch((err)=>{
        res.status(err.response.status || 500).json({ message: err.response.data.message || "Internal Server Error" })
      })
  }

  static deleteSerie(req, res) {
    axios({
      url: baseUrl+"/tv/"+req.params.id,
      method: 'DELETE',
    })
      .then(({ data })=>{
        redis.del('tvSeries')
        res.status(201).json({message: "delete Success"})
      })
      .catch((err)=>{
        res.status(err.response.status || 500).json({ message: err.response.data.message || "Internal Server Error" })
      })
  }
  static updateSerie(req, res) {
    const { title, overview, poster_path, popularity, tags} = req.body
    axios({
      url: baseUrl+"/tv/"+req.params.id,
      method: 'PUT',
      data: { title, overview, poster_path, popularity, tags}
    })
      .then(({ data })=>{
        redis.del('tvSeries')
        res.status(201).json({message: "update Success"})
      })
      .catch((err)=>{
        res.status(err.response.status || 500).json({ message: err.response.data.message || "Internal Server Error" })
      })
  }
}

module.exports = SeriesController