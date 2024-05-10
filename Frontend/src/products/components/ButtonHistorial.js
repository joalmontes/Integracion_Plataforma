import React from 'react';
import { Container, Section, Button } from 'react-bulma-components'

const ButtonHistorial = ({ onClick }) => {
    return (
        <Section>
            <Container>
                <div className='is-pulled-right'> 
                    <Button onClick={ onClick } color="primary" >entregar</Button>
                </div>
                
            </Container>
        </Section>
    )
}

export default ButtonHistorial