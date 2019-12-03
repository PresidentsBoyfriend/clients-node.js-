const service = require('../services/city-service')

class Controller {
    constructor() {
    }    

    createCity = async (req, res) => {
        try {
            const result = await service.add(req.body)
            res.status(201).send(result)
        } catch (e) {
            res.status(400).send({error:e.message})
        }
    }

    getCities = async (req, res) => {
        try {
            const result = await service.get()
            res.status(200).send(result)
        } catch (e) {
            res.status(400).send({error: e.message})
        }
    }

    deleteCities = async (req, res) => {
        try {
            const result = await service.delAll()
            res.status(204).send(result)
        } catch (e) {
            res.status(400).send({error: e.message})
        }
    }

    deleteCity = async (req, res) => {
        try {
            const result = await service.del(req.params.id)
            res.status(204).send(result)
        } catch (e) {
            res.status(400).send({error: e.message})
        }
    }
}

module.exports = Controller;