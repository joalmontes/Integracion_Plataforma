import React, { useState, useEffect } from 'react';
import { Card, Columns, Content, Heading, Modal } from 'react-bulma-components';
import { deleteProduct } from '../sevices';
import DeleteButton from './Eliminar.js';
import EditarButton from './EditarButton.js';
import Formcambio from './formCambio.js';

const ListProduct = ({ products }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [reloadPage, setReloadPage] = useState(false);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return date.toLocaleDateString('es-ES', options);
    };

    useEffect(() => {
        if (reloadPage) {
            window.location.reload();
            setReloadPage(false);
        }
    }, [reloadPage]);

    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleDeleteClick = async (_id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            await deleteProduct(_id);
            setReloadPage(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setReloadPage(true); 
    };

    return (
        <Columns>
            {products.map(({ nombre_producto, precio, cantidad, local, _id, createdAt }) => (
                <Columns.Column size={4} key={_id}>
                    <Card>
                        <Card.Content>
                            <Content>
                                <Heading>{nombre_producto}</Heading>
                                <Heading subtitle size={6}>Precio: ${precio}</Heading>
                                <Heading subtitle size={6}>Fecha de emisión: {formatDate(createdAt)}</Heading>
                                <p>Local: {local}</p>
                                <p>Cantidad: {cantidad}</p>
                                <EditarButton onClick={() => handleEditClick({ _id, nombre_producto, precio, cantidad, local })} />
                                <DeleteButton onClick={() => handleDeleteClick(_id)} />
                            </Content>
                        </Card.Content>
                    </Card>
                </Columns.Column>
            ))}
            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Modal.Content>
                    <Modal.Card>
                        <Modal.Card.Header showClose={false}>
                            <Modal.Card.Title>Editar Producto</Modal.Card.Title>
                        </Modal.Card.Header>
                        <Modal.Card.Body>
                            {isModalOpen && <Formcambio product={selectedProduct} closeModal={closeModal} />}
                        </Modal.Card.Body>
                    </Modal.Card>
                </Modal.Content>
            </Modal>
        </Columns>
    );
};

export default ListProduct;

