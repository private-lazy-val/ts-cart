import useCart from "../hooks/use-cart.ts"
import {useState} from "react"
import CartItem from "./cart-item.tsx"

const Cart = () => {
    const [confirm, setConfirm] = useState<boolean>(false)
    const { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart } = useCart()

    const onSubmitOrder = () => {
        dispatch({ type: REDUCER_ACTIONS.SUBMIT })
        setConfirm(true)
    }

    const pageContent = confirm
        ? <h2>Thank you for your order.</h2>
        : <>
            <h2 className="offscreen">Cart</h2>
            <ul className="cart">
                {cart.map(item => {
                    return (
                        <CartItem
                            key={item.sku}
                            item={item}
                            dispatch={dispatch}
                            REDUCER_ACTIONS={REDUCER_ACTIONS}
                        />
                    )
                })}
            </ul>
            <div className="cart__totals">
                <p>Total Items: {totalItems}</p>
                <p>Total Price: {totalPrice}</p>
                <button className="cart__submit" disabled={!totalItems} onClick={onSubmitOrder}>
                    Place Order
                </button>
            </div>
        </>

    return (
        <main className="main main--cart">
            {pageContent}
        </main>
    )
}
export default Cart