const express = require ('express')
const upload = require ('../libs/storage')
const { addProduct, getProducts, deleteProduct } = require('../controllers/productControllers')
const path = require('path')

const api = express.Router()

api.post('/products', upload.single('image'), addProduct)

api.delete('/products/:id', deleteProduct)

api.get('/products', getProducts)

module.exports = api