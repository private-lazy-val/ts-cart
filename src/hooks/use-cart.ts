import { useContext } from "react"
import CartContext, {UseCartContextType} from "../context/cart-provider.tsx"

const useCart = (): UseCartContextType => {
    return useContext(CartContext)
}

export default useCart