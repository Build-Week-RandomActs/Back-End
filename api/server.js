//server to routes
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const actsRouter = require('../acts/acts-router.js')
const authenticate = require('../authentication/restricted-middleware.js')
const authRouter = require('../authentication/auth-router.js')
const contactsRouter = require('../contacts/contacts-router.js')

const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())

server.use('/api/acts', authenticate, actsRouter)
server.use('/api/auth', authenticate, authRouter)
server.use('/api/contacts', authenticate, contactsRouter)

module.exports = server