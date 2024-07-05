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

        res.status(201).json({ productStored })
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

async function getProducts(req, res) {
    const products = await Product.find().lean().exec()
    res.status(200).json({ products })
}

async function deleteProduct(req, res) {
    const productId = req.params.id;

    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(200).json({ message: 'Producto eliminado correctamente', deletedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });  // Ajuste aquí
    }
}
async function updateProduct(req, res) {
    const productId = req.params.id;
    const {
        nombre_producto,
        precio,
        cantidad,
        local,
        fecha_envio,
    } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            {
                nombre_producto,
                precio,
                cantidad,
                local,
                fecha_envio,
            },
            { new: true } 
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(200).json({ message: 'Producto actualizado correctamente', updatedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
    }
}

module.exports = {
    addProduct,
    getProducts,
    deleteProduct,
    updateProduct,
}