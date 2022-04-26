import {useState,useEffect} from 'react';

import Link from 'next/link'
import { useRouter } from 'next/dist/client/router';

const Navbar = () => {

    const [nuevoPage, setNuevoPage] = useState(false);

    const router = useRouter()

    useEffect(() => {
        switch (router.pathname) {
            case '/new':
                setNuevoPage(true)
                break;
            case '/products/edit/[id]':
                setNuevoPage(true)
                break;
            default:
                setNuevoPage(false)
                break;
        }
    }, [router.pathname]);


    return (
        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
            <Link href="/">
                <a className='flex items-center'>
                    <span className="self-center text-xl font-bold whitespace-nowrap">NextApp</span>
                </a>
            </Link>
            {
                nuevoPage ?
                    <button aria-disabled className="text-white bg-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center md:mr-0 cursor-auto">
                        Nuevo Producto
                    </button>
                :
                <Link href="/new">
                    <a className="text-white bg-green-500 hover:bg-green-600 transition-all ease-in focus:ring-4 focus:outline-none focus:ring-green-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center md:mr-0">
                        Nuevo Producto
                    </a>
                </Link>
            }
        </div>
        </nav>
    );
}

export default Navbar;