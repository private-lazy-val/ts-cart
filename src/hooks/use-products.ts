import { useContext } from "react"
import ProductsContext, {UseProductsContextType} from "../context/products-provider"

const useProducts = (): UseProductsContextType => {
    return useContext(ProductsContext)
}

export default useProducts