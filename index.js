const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const { PORT } = require('./app/config/appconfig');
const routers = require('./app/api-routes');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
const path = require('path');

class SERVER {
  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.start();
  }

  config() {
    this.app.use(express.json());
    this.app.use(morgan('dev'));
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use((req, res, next) => {
      req.header('Cache-Control', 'no-cache');
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Headers',
        'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
      );
      res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, DELETE'
      );
      res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
      next();
    });
  }

  routes() {
    this.app.get('/', (_, res) => {
      res.send('Is online :)');
    });
    this.app.use(routers);
    this.app.use(cors());
    this.app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));
  }

  start() {
    this.app.listen(PORT, () => {
      console.log('LIVE ON: ', 'http://localhost:' + PORT);
    });
    this.app.set('views', path.join(__dirname, 'views'));
    this.app.set('view engine', 'pug');
    this.app.use(express.static(path.join(__dirname, 'public')));
  }
}

const server = new SERVER();
module.exports = server.app;
