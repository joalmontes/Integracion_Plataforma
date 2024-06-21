// swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'My API',
        description: 'API Documentation',
    },
    host: '127.0.0.1:9092',
    schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.js']; // Puedes agregar otros archivos de rutas aquí

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./server'); // Tu archivo de inicio del servidor
});

// URL para ejecutar Swagger:
// http://localhost:9092/api-docs/#/