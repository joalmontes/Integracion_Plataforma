import React, { useState, useEffect } from 'react';
import { Card, Columns, Content, Heading } from 'react-bulma-components'
import { saveHistorial, enviarCorreo } from '../sevices'
import FormHistorial from './formHistorial';
import { Modal } from 'react-bulma-components'
import ButtonHistorial from './ButtonHistorial';
import EnviarCorreo from './EnviarCorreo';

const ListProduct = ({ products }) => {

    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [reloadPage, setReloadPage] = useState(false); 

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', };
        return date.toLocaleDateString('es-ES', options);
    };
    const formatDate2 = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return date.toLocaleDateString('es-ES', options);
    };

    const handleOpenModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen2(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen2(false);
        setReloadPage(true); 
    };

    const handleSubmit = async (data) =>{
        await saveHistorial(data)
        setIsModalOpen2(false)
    }

    const recivirCorreo = async(correo)=>{
        enviarCorreo(correo)
        console.log(correo)
    }

    useEffect(() => {
        if (reloadPage) {
            window.location.reload();
            setReloadPage(false); 
        }
    }, [reloadPage]);

    return (
        <Columns>
            {products.map(({ nombre_funcionario, aparato, numero, lugar_donde, fecha_entrega, _id, createdAt, correo }) => (
                <Columns.Column size={4} key={_id}>
                    <Card>
                        <Card.Content color='primary'>
                            <Content>
                                <Heading>{nombre_funcionario}</Heading>
                                <Heading subtitle size={6}> Aparato: {aparato} {numero}</Heading>
                                <Heading subtitle size={6}> Fecha de prestamo: {formatDate(createdAt)}</Heading>
                                <p>Fecha de entrega: {formatDate2(fecha_entrega)}</p>
                                <p>Lugar donde debe estar: {lugar_donde}</p>
                                <ButtonHistorial onClick={() => handleOpenModal({_id, aparato, createdAt})}/>
                                <EnviarCorreo onClick={()=>recivirCorreo({correo})} />
                            </Content>
                        </Card.Content>
                    </Card>
                </Columns.Column>
            ))}
            <Modal show={isModalOpen2} onClose={handleCloseModal}>
                <Modal.Content>
                    <Modal.Card>
                        <Modal.Card.Header showClose={false}>
                            <Modal.Card.Title >historial</Modal.Card.Title>
                        </Modal.Card.Header>
                        <Modal.Card.Body>
                            {selectedProduct && <FormHistorial product={selectedProduct} handleSubmit={handleSubmit} />}
                        </Modal.Card.Body>
                    </Modal.Card>
                </Modal.Content>
            </Modal>
        </Columns>
    );
}

export default ListProduct;


