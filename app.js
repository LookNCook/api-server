/* OpenAPI Spec Start */
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'LooknCook API',
      description: "This is the API Description of the Look'n'Cook Project",
      version: '0.0.1',
    },
  },
  apis: ['./routes/*.js'], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);
/* OpenAPI Spec Finish */

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//const axios = require('axios');

const swaggerUi = require('swagger-ui-express');

app.use(bodyParser.json())

var orderStore = require('./orders.json')
var chefsStore = require('./chefs.json')
var dishStore = require('./dishes.json')

const order = require('./routes/order.js');
order.setup(app, orderStore, dishStore, chefsStore, chefsStore);

const chefs = require('./routes/chefs.js');
chefs.setup(app, chefsStore);

const dishes = require('./routes/dishes.js');
dishes.setup(app, dishStore);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

const port = 3000;
app.listen(port, () => {
  console.log(`LooknCook api server listening on port ${port}`)
})