import axios from "axios";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";

const ProductView = ({product}) => {

    const router = useRouter()

    const handleDelete = async (id) => {
        await axios.delete(`/api/products/`+id)
        router.push('/')
        console.log(product);
    }

    return (
        <Layout>
            <h1 className="text-xl font-extrabold text-blue-600 uppercase mb-2">{product.name}</h1>
            <span className="text-xs text-gray-400 font-semibold">Descripción:</span>
            <p className="mb-2 text-sm">{product.description}</p>
            <span className="text-xs text-gray-400 font-semibold">Desde:</span>
            <p className="font-bold text-2xl text-gray-700 mb-3">S/.{product.price}</p>
            <div className="flex gap-2">
                <button 
                    onClick={()=> router.push("/products/edit/"+product.id)}
                    className='bg-amber-500 rounded text-white  font-medium py-1 px-3 hover:bg-amber-600 transition-all ease-linear'>Editar</button>
                <button 
                    onClick={()=> handleDelete(product.id)}
                    className='bg-red-600 rounded text-white  font-medium py-1 px-3 hover:bg-red-700 transition-all ease-linear'>Eliminar</button>
            </div>
        </Layout>
    );
}

export const getServerSideProps = async context => {

    const {data: product} = await axios.get('http://localhost:3000/api/products/'+ context.query.id)

    return {
        props: {
            product
        }
    }
}

export default ProductView;