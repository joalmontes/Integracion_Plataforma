import React, { useState, useEffect } from 'react';
import { Card, Columns, Content, Heading } from 'react-bulma-components';
import { Modal } from 'react-bulma-components';

const ListProduct = ({ products }) => {

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

    return (
        <Columns>
            {products.map(({ nombre_producto, precio, cantidad, local, fecha_envio, _id, createdAt }) => (
                <Columns.Column size={4} key={_id}>
                    <Card>
                        <Card.Content color='primary'>
                            <Content>
                                <Heading>{nombre_producto}</Heading>
                                <Heading subtitle size={6}> presio: ${precio}</Heading>
                                <Heading subtitle size={6}> Fecha de emision: {formatDate(createdAt)}</Heading>
                                <p>Fecha de entrega: {formatDate(fecha_envio)}</p>
                                <p>Local: {local}</p>
                                <p>cantidad: {cantidad}</p>
    
                    
                            </Content>
                        </Card.Content>
                    </Card>
                </Columns.Column>
            ))}
        </Columns>
    );
}

export default ListProduct;


