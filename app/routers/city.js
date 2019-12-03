const express = require('express')

const CityController = require('../controllers/city-controller')
const validate = require('../middleware/validate/validate');
const cityschems = require('../middleware/validate/city-validate');
const city_controller = new CityController()

const router = new express.Router()

router.post('/', validate(cityschems), city_controller.createCity)
router.get('/', city_controller.getCities)
router.delete('/', city_controller.deleteCities)
router.delete('/:id', city_controller.deleteCity)

module.exports = router