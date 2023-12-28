import {useState} from "react";
import Header from "./components/header.tsx";
import Cart from "./components/cart.tsx";
import ProductList from "./components/product-list.tsx";
import Footer from "./components/footer.tsx";

function App() {
    const [viewCart, setViewCart] = useState<boolean>(false);
    const pageContent = viewCart ? <Cart /> : <ProductList />

    return (
        <>
            <Header viewCart={viewCart} setViewCart={setViewCart}/>
            {pageContent}
            <Footer viewCart={viewCart}/>
        </>
    )
}

export default App
