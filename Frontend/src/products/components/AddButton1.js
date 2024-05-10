import React from 'react';
import { Container, Section, Button } from 'react-bulma-components'

const AddButton1 = ({ onClick }) => {
    return (
        <Section>
            <Container>
                <div className='is-pulled-right'> 
                    <Button onClick={ onClick } color="primary" >agregar funcionario</Button>
                </div>
                
            </Container>
        </Section>
    )
}

export default AddButton1