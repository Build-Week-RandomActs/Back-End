//server to routes
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const actsRouter = require("../acts/acts-router.js");
const authRouter = require("../authentication/auth-router.js");
const contactsRouter = require("../contacts/contacts-router.js");
const usersRouter = require("../users/users-router.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/acts", actsRouter);
server.use("/api/auth", authRouter);
server.use("/api/contacts", contactsRouter);
server.use("/api/users", usersRouter);

server.get("/", (req, res) => {
  res.send("Welcome!");
});

module.exports = server;
