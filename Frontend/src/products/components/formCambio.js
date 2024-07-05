import React, { useState, useEffect } from 'react';
import { updateProduct } from '../sevices';

const Formcambio = ({ product, closeModal }) => {
    const [formData, setFormData] = useState({
        nombre_producto: '',
        precio: '',
        cantidad: '',
        local: '',
    });

    useEffect(() => {
        if (product) {
            setFormData({
                nombre_producto: product.nombre_producto,
                precio: product.precio,
                cantidad: product.cantidad,
                local: product.local,
            });
        }
    }, [product]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { _id } = product;
            await updateProduct(_id, formData);
            closeModal(); 
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="field">
                <label className="label">Nombre del Producto</label>
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        name="nombre_producto"
                        value={formData.nombre_producto}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="field">
                <label className="label">Precio</label>
                <div className="control">
                    <input
                        className="input"
                        type="number"
                        name="precio"
                        value={formData.precio}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="field">
                <label className="label">Cantidad</label>
                <div className="control">
                    <input
                        className="input"
                        type="number"
                        name="cantidad"
                        value={formData.cantidad}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="field">
                <label className="label">Local</label>
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        name="local"
                        value={formData.local}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <button className="button is-primary" type="submit">
                        Guardar cambios
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Formcambio;

