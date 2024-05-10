const mongoose = require('mongoose')
const { appConfig } = require('../config')

const Schema = mongoose.Schema

const productSchema = Schema({
    nombre_producto: String,
    precio: Number,
    cantidad: Number,
    local: String,
    fecha_envio: Date,
}, {
    timestamps: true
})



module.exports = mongoose.model('products', productSchema)