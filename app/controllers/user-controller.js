const service = require('../services/user-service')

class Controller {
    constructor() {
    }    

    createUser = async (req, res) => {
        try {
            const result = await service.add(req.body)
            res.status(201).send(result)
        } catch (e) {
            res.status(400).send({error:e.message})
        }
    }

    login = async (req, res) => {      
        try {
            const result = await service.login(req)
            res.status(201).send(result)
        } catch (e) {
            res.status(400).send({error:e.message})
        }
    }

    logout =  async (req, res) => {
        try {
            await service.logout(req)
            res.send({responce: "successfully logout"})
        } catch (e) {
            res.status(400).send({error:e.message})
        }
    }

    getUsers = async (req, res) => {
        try {
            const result = await service.get()
            res.status(200).send(result)
        } catch (e) {
            res.status(400).send({error: e.message})
        }
    }

    getUser = async (req, res) => {
        try {
            const result = await service.getUser(req.params.id)
            res.status(200).send(result)
        } catch (e) {
            res.status(400).send({error: e.message})
        }
    }

    updateUser = async (req, res) => {
        try {
            const id = req.params.id;
            const userData = req.body;
            const result = await service.update(id, userData)
            res.status(204).send(result)
        } catch (e) {
            res.status(400).send({error: e.message})
        }
    }

    deleteUser = async (req, res) => {
        try {
            const result = await service.del(req.params.id)
            res.status(204).send(result)
        } catch (e) {
            res.status(400).send({error: e.message})
        }
    }
}

module.exports = Controller;