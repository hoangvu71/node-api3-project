const express = require('express')
const cors = require("cors")
const morgan = require("morgan")

const userDb = require("./users/userDb")
const logger = require('./middlewares/logger')
const userRouter = require("./users/userRouter")
const postRouter = require("./posts/postRouter")
const server = express();

const port = 5000;

server.use(express.json())
server.use(cors())


server.use("/users", userRouter)
server.use("/posts", postRouter)

server.use(logger)

server.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})