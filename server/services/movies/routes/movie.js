const express = require('express')
const router = express.Router()
const MoviesController = require('../controllers/MoviesController')

router.get('/', MoviesController.findAll)
router.post('/', MoviesController.addMovie)
router.get('/:id', MoviesController.findById)
router.delete('/:id', MoviesController.deleteMovie)
router.put('/:id', MoviesController.updateMovie)

module.exports = router