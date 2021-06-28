const { ObjectId } = require('bson')
const Serie = require('../models/series')

class SeriesController {

  static async findAll(req, res) {
    try {
      const series = await Serie.find()
      res.status(200).json(series)
    } catch (err) {
      res.status(err.code || 500).json({ msg: err.msg || "Internal Server Error" })
    }
  }

  static async findById(req, res,) {
    try {
      let serie = await Serie.findById(req.params.id)

      if(!serie) throw { code: 404, msg: "Serie Not Found" }
      res.status(200).json({ serie })

    } catch(err) {
      res.status(err.code || 500).json({ msg: err.msg || "Internal Server Error" })
    }
  }

  static async addSerie(req, res) {
    try {
      const newSerie = req.body
      const serie = await Serie.addSerie(newSerie)
      res.status(201).json(serie.ops[0])
    } catch (err) {
      res.status(err.code || 500).json({ msg: err.msg || "Internal Server Error" })
    }
  }

  static async deleteSerie(req, res) {
    try {
      const idSerie = {
        _id: ObjectId(req.params.id)
      }
      const serie = await Serie.deleteSerie(idSerie)
      res.status(201).json({message: "Success Delete"})
    } catch (err) {
      res.status(err.code || 500).json({ msg: err.msg || "Internal Server Error" })
    }
  }
  static async updateSerie(req, res) {
    try {
      const idSerie = {
        _id: ObjectId(req.params.id)
      }
      const dataSerie = { $set: req.body }

      const serie = await Serie.updateSerie(idSerie, dataSerie)
      res.status(201).json({ message: 'success update'})
    } catch (err) {
      res.status(err.code || 500).json({ msg: err.msg || "Internal Server Error" })
    }
  }
}

module.exports = SeriesController