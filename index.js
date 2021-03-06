require('dotenv').config();
const PORT = 3000;
const express = require('express');
const server = express();
const { client } = require('./db');
client.connect();

const bodyParser = require('body-parser');
server.use(bodyParser.json());

const morgan = require('morgan');
server.use(morgan('dev'));

const apiRouter = require('./api');
server.use('/api', apiRouter);

server.get('/background/:color', (req, res, next) => {
  res.send(`
    <body style="background: ${ req.params.color };">
      <h1>Hello World</h1>
    </body>
  `);
});




server.listen(PORT, () => {
  console.log('The server is up on port', PORT)
});



// console.log(process.env.JWT_SECRET);
