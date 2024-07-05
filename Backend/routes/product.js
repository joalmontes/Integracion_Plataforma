const express = require('express');
const upload = require('../libs/storage');
const { addProduct, getProducts, deleteProduct, updateProduct } = require('../controllers/productControllers')
const router = express.Router();

/**
 * @swagger
 * /v1/products:
 *   post:
 *     summary: Add a new product
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: image
 *         type: file
 *         description: The image to upload
 *       - in: formData
 *         name: name
 *         type: string
 *         description: The name of the product
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/products', upload.single('image'), addProduct);

/**
 * @swagger
 * /v1/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Deleted
 */
router.delete('/products/:id', deleteProduct);
/**
 * @swagger
 * /v1/products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: The product ID
 *       - in: formData
 *         name: nombre_producto
 *         type: string
 *         description: The name of the product
 *       - in: formData
 *         name: precio
 *         type: number
 *         description: The price of the product
 *       - in: formData
 *         name: cantidad
 *         type: integer
 *         description: The quantity of the product
 *       - in: formData
 *         name: local
 *         type: string
 *         description: The location of the product
 *       - in: formData
 *         name: fecha_envio
 *         type: string
 *         format: date
 *         description: The shipping date of the product
 *     responses:
 *       200:
 *         description: Updated
 */
router.put('/products/:id', updateProduct);
/**
 * @swagger
 * /v1/products:
 *   get:
 *     summary: Get all products
 *     responses:
 *       200:
 *         description: A list of products
 */
router.get('/products', getProducts);

module.exports = router;
