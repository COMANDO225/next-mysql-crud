import Navbar from "./Navbar";

const Layout = ({children}) => {
    return (
        <div className="min-h-screen bg-slate-100">
            <Navbar/>
            <div className="p-5">
                <div className="container mx-auto h-full">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Layout;