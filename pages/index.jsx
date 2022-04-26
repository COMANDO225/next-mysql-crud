import axios from "axios";
import Layout from "../components/Layout";
import Link from 'next/link'


const HomePage = ({products}) => {

    return (
        <Layout>
            <div className="grid sm:grid-cols-2 gap-4 lg:grid-cols-3 2xl:grid-cols-4">
                {
                    products.map((product,i) => (
                        <Link key={product.id} href={`/products/${product.id}`} >
                            <a 
                                className="rounded border-gray-200 bg-white p-3 relative shadow-sm hover:shadow-md transition-all ease-in"
                            >
                                <div className="flex justify-between">
                                    <h1 className="text-xl font-extrabold text-blue-600 uppercase mb-2">{product.name}</h1>
                                    <span className="bg-blue-200 span text-blue-500 font-medium">{i+1}</span>
                                </div>
                                <span className="text-xs text-gray-400 font-semibold">Descripción:</span>
                                <p className="mb-2 text-sm">{product.description}</p>
                                <span className="text-xs text-gray-400 font-semibold">Desde:</span>
                                <p className="font-bold text-2xl text-gray-700">S/.{product.price}</p>
                            </a>
                        </Link>
                    ))
                }
            </div>
        </Layout>
    );
}

export const getServerSideProps = async context => {
    
    const {data: products} = await axios.get('http://localhost:3000/api/products')

    return {
        props: {
            products
        }
    }
}

export default HomePage;