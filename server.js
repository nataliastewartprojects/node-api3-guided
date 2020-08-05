const express = require("express"); // importing a CommonJS module

const hubsRouter = require("./hubs/hubs-router.js");
const morgan = require("morgan");
const helmet = require("helmet");

const server = express();

server.use(express.json()); //built-in middleware - no need to npm install it
server.use(morgan("dev"));
server.use("/api/hubs", morgan("short"), hubsRouter);

server.use(helmet()); //free extra security. always use it.

server.use(logger);

server.get("/", (req, res) => {
  res.status(200).json({ hello: req.name });
  // const nameInsert = req.name ? ` ${req.name}` : "";

  // // res.send(`
  // //   <h2>Lambda Hubs API</h2>
  // //   <p>Welcome${nameInsert} to the Lambda Hubs API</p>
  // //   `);
});

//req, res, next
function logger(req, res, next) {
  const name = req.headers.name;
  req.name = name;
  console.log(`a ${req.name} made a ${req.method} request to ${req.url}`);
  next();
}

module.exports = server;
