const express = require('express')

const auth = require('../middleware/auth')

const UserController = require('../controllers/user-controller')
const validate = require("../middleware/validate/validate");
const schemaUser = require('../middleware/validate/user-validate');
const user_controller = new UserController()

const router = new express.Router()

/**
 * @swagger
 * /users/:
 *  post:
 *    description: Add user
 *    produces:
 *    - application/json
 *    - application/xml
 *    parameters: 
 *    - name: body
 *      in : body
 *      description: Created user object
 *      required: true
 *      schema:
 *           type: object
 *           properties:
 *             login:
 *               type: string
 *             name:
 *               type: string
 *             surname:
 *               type: string
 *             password:
 *               type: string
 *             cityId:
 *               type: string
 *    responses:
 *       201: 
 *         description: Ok
 *       405:
 *         description: Invalid input
 */
router.post('/', validate(schemaUser), user_controller.createUser)

/**
 * @swagger
 * /users/login/:
 *  post:
 *    description: Login
 *    produces:
 *    - application/json
 *    - application/xml
 *    parameters: 
 *    - name: body
 *      in : body
 *      description: Login
 *      required: true
 *      schema:
 *           type: object
 *           properties:
 *             login:
 *               type: string
 *             password:
 *               type: string
 *    responses:
 *       201: 
 *         description: Ok
 *       405:
 *         description: Invalid input
 */
router.post('/login', user_controller.login)

/**
 * @swagger
 * /users/logout/:
 *  post:
 *    description: Logout
 *    parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *    responses:
 *      '201':
 *        description: A successful loguot
 */
router.post('/logout',auth, user_controller.logout)

/**
 * @swagger
 * /users/:
 *  get:
 *    description: Get all users
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/', user_controller.getUsers)

/**
 * @swagger
 * /users/{id}:
 *  get:
 *    description: Get by id
 *    produces:
 *    - application/json
 *    - application/xml
 *    parameters: 
 *    - name: id
 *      in : path
 *      description: User id
 *      required: true
 *      type: string
 *    responses:
 *      '400':
 *        description: Invalid username supplied
 *      '404' : 
 *        description: Invalid username supplied 
 */
router.get('/:id', user_controller.getUser)

/**
 * @swagger
 * /users/{id}:
 *  put:
 *    description: Update about user
 *    produces:
 *    - application/json
 *    - application/xml
 *    parameters: 
 *    - name: id
 *      in : path
 *      description: User id
 *      required: true
 *      type: string
 *    - in : body
 *      description: Created user object
 *      required: true
 *      schema:
 *           type: object
 *           properties:
 *             login:
 *               type: string
 *             name:
 *               type: string
 *             surname:
 *               type: string
 *             password:
 *               type: string
 *             cityId:
 *               type: string
 *    responses:
 *      '400':
 *        description: Invalid username supplied
 *      '404' : 
 *        description: Invalid username supplied 
 */
router.put('/:id',validate(schemaUser), user_controller.updateUser)

/**
 * @swagger
 * /users/{id}:
 *  delete:
 *    description: Delete user
 *    operationId: deleteUser
 *    produces:
 *    - application/json
 *    - application/xml
 *    parameters: 
 *    - name: id
 *      in : path
 *      description: User id
 *      required: true
 *      type: string
 *    responses:
 *      '400':
 *        description: Invalid username supplied
 *      '404' : 
 *        description: Invalid username supplied 
 */
router.delete('/:id', user_controller.deleteUser)

module.exports = router