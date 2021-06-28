const express = require('express')
const router = express.Router()
const SeriesController = require('../controllers/SeriesController')

router.get('/', SeriesController.findAll)
router.post('/', SeriesController.addSerie)
router.get('/:id', SeriesController.findById)
router.delete('/:id', SeriesController.deleteSerie)
router.put('/:id', SeriesController.updateSerie)

module.exports = router