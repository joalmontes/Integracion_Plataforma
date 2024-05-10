import  axios  from 'axios';


const baseUrl = process.env.REACT_APP_BASE_URL


export async function saveHistorial(historialData){
    try {
        const response = await axios.post(`${baseUrl}/historial`, historialData);
        return response;
    } catch (e) {
        console.error('Error al guardar historial:', e);
        throw e; 
    }
}

export async function saveProduct(productData){
    try {
        const formData = new FormData()

        formData.append('nombre_funcionario', productData.nombre_funcionario )
        formData.append('correo', productData.correo)
        formData.append('aparato', productData.aparato )
        formData.append('numero', productData.numero )
        formData.append('lugar_donde', productData.lugar_donde )
        formData.append('fecha_entrega', productData.fecha_entrega )

        const response = await axios({
            url: `${baseUrl}/products`,
            method:'post', 
            data: formData
        })
        return response
    } catch (e) {
        console.log(e)
    }
}

export async function saveFuncionario(funcionarioData){
    try {
        const response = await axios.post(`${baseUrl}/funcionario`, funcionarioData);
        return response;
    } catch (error) {
        console.error('Error al guardar funcionario:', error);
        throw error; 
    }
}

export async function saveAparato(aparatoData){
    try {
        const response = await axios.post(`${baseUrl}/aparato`, aparatoData);
        return response;
    } catch (error) {
        console.error('Error al guardar funcionario:', error);
        throw error; 
    }
}
 
export async function enviarCorreo(correo){
    console.log(correo)
    try {
        const response = await axios.post(`${baseUrl}/api/sendemail`,correo);
        return response;
    } catch (error) {
        console.error('no se envio el correo a su destinatario', error);
        throw error; 
    }
}

export async function deleteProduct(_id){
    try {
        const response = await axios({
            url: `${baseUrl}/products/${_id}`,
            method:'delete', 
        })
        return response
        
    } catch (error) {
        console.log(error)
    }
}


export async function getFuncionario(){
    try {
        const response = await axios({
            url: `${baseUrl}/funcionario`,
            method:'get'
        })

        return response
    } catch (e) {
        console.log(e)
    }
}

export async function getHistorial(){
    try {
        const response = await axios({
            url: `${baseUrl}/Historial`,
            method:'get'
        })

        return response
    } catch (e) {
        console.log(e)
    }
}

export async function getProducts(){
    try {
        const response = await axios({
            url: `${baseUrl}/products`,
            method:'get'
        })

        return response
    } catch (e) {
        console.log(e)
    }
}

export async function getAparato(){
    try {
        const response = await axios({
            url: `${baseUrl}/aparato`,
            method:'get'
        })

        return response
    } catch (e) {
        console.log(e)
    }
}
