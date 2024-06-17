import React, { useState, useEffect } from 'react';
import { Card, Columns, Content, Heading } from 'react-bulma-components';
import { deleteProduct } from '../sevices';
import DeleteButton from './Eliminar.js'

const ListProduct = ({ products }) => {

    
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

    const Delete = async (_id) => {
        await deleteProduct(_id);
        setReloadPage(true); 
    };
    const cardStyle = {
        '--background': 'linear-gradient(to right, #74ebd5 0%, #acb6e5 100%)',
        width: '200px',
        height: '300px',
        padding: '5px',
        borderRadius: '1rem',
        overflow: 'visible',
        background: '#74ebd5',
        background: 'var(--background)',
        position: 'relative',
        zIndex: '1',
        margin: '10px', 
      };
      
      const cardContentStyle = {
        '--color': '#292b2c',
        background: 'var(--color)',
        color: 'var(--color)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        overflow: 'visible',
        borderRadius: '0.7rem',
        position: 'relative',
        zIndex: '2',
      };
    const headingStyle = {
        fontSize: '1.2rem', 
        marginBottom: '0.5rem', 
    };
    
    const subtitleStyle = {
        fontSize: '0.9rem', 
        marginBottom: '0.3rem', 
    };
    
    const paragraphStyle = {
        fontSize: '0.8rem', 
        margin: '0',
    };
    
    return (
        <Columns>
            {products.map(({ nombre_producto, precio, cantidad, local, _id, createdAt }) => (
                <Columns.Column size={4} key={_id}>
                    <Card style={cardStyle}>
                        <Card.Content style={cardContentStyle}>
                            <Content>
                                <Heading style={headingStyle}>{nombre_producto}</Heading>
                                <Heading subtitle size={6} style={subtitleStyle}> presio: ${precio}</Heading>
                                <Heading subtitle size={6} style={subtitleStyle}> Fecha de emision: {formatDate(createdAt)}</Heading>
                                <p style={paragraphStyle}>Local: {local}</p>
                                <p style={paragraphStyle}>cantidad: {cantidad}</p>
                                
                                <DeleteButton onClick={() => Delete(_id)} />
                            </Content>
        
                        </Card.Content>
                    </Card>
                </Columns.Column>
            ))}
        </Columns>
    );
}

export default ListProduct;