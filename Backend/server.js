require(`dotenv`).config()
const app = require('./app')
const connectDb = require('./db/mongodb')
const { appConfig, dbConfig } = require(`./config`)

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

async function initApp(appConfig, dbConfig){
    try{
        await connectDb(dbConfig)
        app.listen(appConfig.port, () => console.log(`listen on ${appConfig.port}`))
    
    }catch(e){
        console.error(e)
        process.exit(0)
    }
}

initApp(appConfig, dbConfig)