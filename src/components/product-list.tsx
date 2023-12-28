import useCart from "../hooks/use-cart"
import useProducts from "../hooks/use-products"
import {ReactElement} from "react"
import Product from "./product"

const ProductList = () => {
    const { dispatch, REDUCER_ACTIONS, cart } = useCart()
    const { products } = useProducts()

    let pageContent: ReactElement | ReactElement[] = <p>Loading...</p>

    if (products?.length) {
        pageContent = products.map(product => {
            const inCart: boolean = cart.some(item => item.sku === product.sku)

            return (
                <Product
                    key={product.sku}
                    product={product}
                    dispatch={dispatch}
                    REDUCER_ACTIONS={REDUCER_ACTIONS}
                    inCart={inCart}
                />
            )
        })
    }

    return (
        <main className="main main--products">
            {pageContent}
        </main>
    )
}
export default ProductList