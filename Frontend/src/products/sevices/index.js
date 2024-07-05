import  axios  from 'axios';


const baseUrl = process.env.REACT_APP_BASE_URL

export async function saveProduct(productData){
    try {
        const formData = new FormData()

        formData.append('nombre_producto', productData.nombre_producto )
        formData.append('precio', productData.precio)
        formData.append('cantidad', productData.cantidad )
        formData.append('local', productData.local )
        formData.append('fecha_envio', productData.fecha_envio )

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
export async function updateProduct(_id, productData) {
    try {
        const response = await axios({
            url: `${baseUrl}/products/${_id}`,
            method: 'put',
            data: productData
        });
        return response.data; 
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        throw error; 
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
