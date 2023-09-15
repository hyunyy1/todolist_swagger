const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const pkg = require('./package.json');
require('dotenv').config();

const swaggerDefinition = {
  info: {
    title: 'TodoList API', 
    version: pkg.version, 
    description: 'This is the REST API document and test suite for todoList.', 
    contact: {
      email: 'hyunseo@cyrexpay.com'
    }
  },
  externalDocs: {
    description: 'Find out more about Swagger',
    url: process.env.API_URL
  },
  host: process.env.API_HOST,
  basePath: '/',
  schemes: [process.env.SCHEMES]
};

const options = {
  swaggerDefinition,
  apis: ['./resource/*.yaml']
};

const swaggerSpec = swaggerJSDoc(options);

const uiOptions = {
  explorer: false,
  swaggerOptions: {
    docExpansion: 'list',
    displayOperationId: true,
    filter: true
  }
}

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec, uiOptions));
app.listen(process.env.PORT)
