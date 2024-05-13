const express = require ('express')
const upload = require ('../libs/storage')
const { addProduct, getProducts, deleteProduct } = require('../controllers/productControllers')
const path = require('path')

const api = express.Router()

api.post('/products', upload.single('image'), addProduct)

api.delete('/products/:id', deleteProduct)

api.get('/products', getProducts)

api.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, '..', 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

module.exports = api