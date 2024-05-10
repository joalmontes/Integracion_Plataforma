const mongoose = require('mongoose');

async function connectDb({ host, port, dbName }) {
    try {
        const url = `mongodb://${host}:${port}/${dbName}`;
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Conexión exitosa a MongoDB');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        process.exit(0);
    }
}

module.exports = connectDb;