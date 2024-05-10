import React from 'react';
import { Container, Section, Button } from 'react-bulma-components'

const enviarCorreo = ({ onClick }) => {
    return (
        <Section>
            <Container>
                <div className='is-pulled-right'> 
                    <Button onClick={ onClick } color="primary" >Enviar Correo</Button>
                </div>
                
            </Container>
        </Section>
    )
}

export default enviarCorreo