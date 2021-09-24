const morgan = require('morgan');
const express = require('express')
const mysql = require('promise-mysql')
const config = require('./assets/config.json');
const {success, error, checkAndChange} = require('./assets/functions');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./assets/swagger.json');

mysql.createConnection({
    host: config.db.host,
    database: config.db.name,
    user: config.db.user,
    password: config.db.password
}).then(db => {
    const Members = require('./assets/classes/MembersClasses')(db, config)

    const app = express()
    app.use(express.json()) // for parsing application/json
    app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
    app.use(morgan('dev')) //log infos

    //swagger api docs
    app.use(config.routeApi+ 'api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    // Members Routes
    let MembersRouter = express.Router()
    MembersRouter.route('/')

        /**
         * get all Members
         */
        .get( async (req,res) => {
            const allMembers = await Members.getAll(req.query.max)
            res.json(checkAndChange(allMembers))
        })

        /**
         * Add Member to list
         */
        .post( async (req,res,next) => {
            const add = await Members.add(req.body.name)
            res.json(checkAndChange(add))
        })

    MembersRouter.route('/:id')

        /**
         * get Member data
         */
        .get(async (req,res) => {
            const member = await Members.getById(req.params.id)
            res.json(checkAndChange(member))
        })

        /**
         * Update Member data
         */
        .put(async (req,res) => {
            const updateMember = await Members.update(req.params.id, req.body.name)
            res.json(checkAndChange(updateMember))
        })

        /**
         * Remove Member data
         */
        .delete(async (req,res) => {
            const deleteMember = await Members.delete(req.params.id)
            res.json(checkAndChange(deleteMember))
        })
    app.use(config.routeApi + 'members', MembersRouter)

    app.listen(config.port, ()=> console.log(`start on http://localhost:${config.port}`))


}).catch(err => console.error('Error during database connection.', err.message))