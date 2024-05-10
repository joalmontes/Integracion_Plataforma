import React, { useState, useEffect } from "react";
import { Modal, Container } from 'react-bulma-components'
import Header from './Header'
import AddButton from "./AddButton";
import AddButton1 from "./AddButton1";
import AddButton2 from "./AddButton2";
import ListProduct from "./ListProducts";
import Form from "./form";
import FormFuncionario from "./formFuncionarios";
import FormAparto from "./formAparatos";
import { saveProduct, getProducts, saveFuncionario, getFuncionario, getHistorial, getAparato, saveAparato } from "../sevices"
import Loading from './Loading';


const ProductLayout = () =>{
    const [isModalOpen , SetIsModalOpen] = useState(false)
    const [isModalOpen1, SetIsModalOpen1] = useState(false)
    const [isModalOpen2, SetIsModalOpen2] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [products, setProducts] = useState([])
    const [funcionarios, setFuncionarios]= useState([])
    const [historial, setHistorial] = useState([])
    const [aparato, setAparatos] = useState([]) 

    console.log(funcionarios)
    console.log(products)
    console.log(historial)
    console.log(aparato)

    async function loadHistorial(){
        const response = await getHistorial()
        if(response.status === 200){
            setHistorial(response.data.historial)
        }
    }

    function countByAparato(aparato) {
        return historial.filter(item => item.aparato === aparato).length;
    }

    async function loadProduct() {
        const response = await getProducts()

        if (response.status === 200) {
            setProducts(response.data.products)
        }

        setIsLoading(false)
    }
    
    async function loadFuncionario(){
        const response = await getFuncionario()

        if (response.status === 200) {
            setFuncionarios(response.data.funcionarios)
        }
    }

    async function loadAparatos(){
        const response = await getAparato()

        if (response.status === 200) {
            setAparatos(response.data.aparato)
        }
        setIsLoading(false)
    }


    useEffect(() => {
        loadFuncionario()
        loadProduct()
        loadHistorial()
        loadAparatos()
    }, [])
    
    const handleSubmit = async (data) =>{
        await saveProduct(data)
        loadProduct()
        SetIsModalOpen(false)
    }
    
    const handleSubmit1 = async (data) =>{
        console.log(data)
        await saveFuncionario(data)
        loadFuncionario()
        SetIsModalOpen1(false)
    }

    const handleSubmit2 = async (data) =>{
        console.log(data)
        await saveAparato(data)
        loadAparatos()
        SetIsModalOpen2(false)
    }
    return(
        <Container>
            <Header title="PRESTAMOS"/>
            
            <div style={{ display: 'flex', gap: '10px' }}>
                <AddButton onClick={() =>SetIsModalOpen(true)} />
                <AddButton1 onClick={() =>SetIsModalOpen1(true)} />
                <AddButton2 onClick={() =>SetIsModalOpen2(true)} />
            </div>
            {
                isLoading &&  <Loading />
            }
            {
                !isLoading && !products.length && (<h2 className='titles has-text-centered'>no hay productos disponible</h2>)         
            }
            {
                !isLoading && products.length>0 && (<ListProduct products={products} /> )
                
            }
            <h3>Total de elementos en historial: {historial.length}</h3>

            <div>
                <h3>total de paratos prestados en el año:</h3>
                {Array.from(new Set(historial.map(item => item.aparato))).map(aparato => (
                    <p key={aparato}>{aparato}: {countByAparato(aparato)}</p>
                ))}
            </div>

            <Modal show={isModalOpen} onClose={() => SetIsModalOpen(false) }>
                <Modal.Content>
                    <Modal.Card>
                        <Modal.Card.Header showClose={false}>
                            <Modal.Card.Title >
                                agregar productos
                            </Modal.Card.Title>
                        </Modal.Card.Header>
                        <Modal.Card.Body>
                            <Form handleSubmit ={handleSubmit} /> 
                        </Modal.Card.Body>    
                    </Modal.Card>
                </Modal.Content>    
            </Modal>

            <Modal show={isModalOpen1} onClose={() => SetIsModalOpen1(false) }>
                <Modal.Content>
                    <Modal.Card>
                        <Modal.Card.Header showClose={false}>
                            <Modal.Card.Title >
                                funcionario
                            </Modal.Card.Title>
                        </Modal.Card.Header>
                        <Modal.Card.Body>
                            <FormFuncionario handleSubmit1 ={handleSubmit1} /> 
                        </Modal.Card.Body>    
                    </Modal.Card>
                </Modal.Content>    
            </Modal>
            <Modal show={isModalOpen2} onClose={() => SetIsModalOpen2(false) }>
                <Modal.Content>
                    <Modal.Card>
                        <Modal.Card.Header showClose={false}>
                            <Modal.Card.Title >
                                funcionario
                            </Modal.Card.Title>
                        </Modal.Card.Header>
                        <Modal.Card.Body>
                            <FormAparto handleSubmit2 ={handleSubmit2} /> 
                        </Modal.Card.Body>    
                    </Modal.Card>
                </Modal.Content>    
            </Modal>

        </Container>
        
    )  
}

export default ProductLayout