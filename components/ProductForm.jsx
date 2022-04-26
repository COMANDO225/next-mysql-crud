import {useState, useEffect} from 'react';
import axios from "axios";
import { useRouter } from 'next/router';

const ProductForm =  () => {

    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: ''
    })

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            if(router.query.id) {
                await axios.put('/api/products/'+ router.query.id, product)
            } else {
                await axios.post('/api/products', product)
            }
            router.push('/')
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = ({target: {name, value}}) => {
        console.log(name, value);
        setProduct({...product, [name]: value})
    }

    useEffect(() => {

        const getProduct = async () => {
            const {data} = await axios.get('/api/products/'+ router.query.id)
            setProduct({name: data.name, description: data.description, price: data.price});
        }
        if(router.query.id){
            getProduct(router.query.id)
        }
    }, [router.query.id]);

    return (
        <form onSubmit={handleSubmit} className="bg-white transition-all ease-in shadow hover:shadow-md rounded px-8 pt-6 pb-8 mb-4 md:w-96 mx-auto flex flex-col">
            <label htmlFor="name">Name:</label>
            <input type="text" id='name' name="name" onChange={handleChange} value={product.name} className="border rounded border-blue-600 text-gray-700 py-1 px-2 mb-3"/>

            <label htmlFor="price">Price:</label>
            <input type="number" id='price' name="price" onChange={handleChange} value={product.price} className="border rounded border-blue-600 text-gray-700 py-1 px-2 mb-3"/>

            <label htmlFor="description">Desc:</label>
            <textarea name="description" id='description' rows="3" onChange={handleChange} value={product.description} className="border rounded border-blue-600 text-gray-700 py-1 px-2 mb-3"></textarea>

            <button className='bg-blue-600 rounded text-white uppercase font-bold py-2 hover:bg-blue-800 transition-all ease-linear'>
                {
                    router.query.id ?
                    <>Editar Producto</>
                    :
                    <>Registrar Producto</>
                }
            </button>
        </form>
    );
}

export default ProductForm;