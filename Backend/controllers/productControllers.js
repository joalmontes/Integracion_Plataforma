const Product = require('../models/Product')

async function addProduct(req, res) {
    try {
        const {
            nombre_producto,
            precio,
            cantidad,
            local,
            fecha_envio,
        } = req.body

        const product = Product({
            nombre_producto,
            precio,
            cantidad,
            local,
            fecha_envio,
        })

        const productStored = await product.save()

        res.status(201).send({ productStored })
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
}

async function getProducts(req, res) {
    const products = await Product.find().lean().exec()
    res.status(200).send({ products })
}

async function deleteProduct(req, res) {
    const productId = req.params.id;

    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).send({ message: 'Producto no encontrado' });
        }

        res.status(200).send({ message: 'Producto eliminado correctamente', deletedProduct });
    } catch (error) {
        res.status(500).send({ message: 'Error al eliminar el producto', error });
    }
}



module.exports = {
    addProduct,
    getProducts,
    deleteProduct,
}