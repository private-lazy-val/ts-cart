import React, {ChangeEvent, memo, ReactElement} from "react"
import {CartItemType, ReducerAction, ReducerActionType} from "../context/cart-provider.tsx"


type PropsType = {
    item: CartItemType,
    dispatch: React.Dispatch<ReducerAction>,
    REDUCER_ACTIONS: ReducerActionType,
}

const CartItem = ({item, dispatch, REDUCER_ACTIONS}: PropsType) => {

    const img: string = new URL(`../images/${item.sku}.jpg`, import.meta.url).href

    const itemTotal: number = (item.qty * item.price)

    const highestQty: number = 20 > item.qty ? 20 : item.qty

    const optionValues: number[] = [...Array(highestQty).keys()].map(i => i + 1)

    const options: ReactElement[] = optionValues.map(val => {
        return <option key={`opt${val}`} value={val}>{val}</option>
    })

    const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch({
            type: REDUCER_ACTIONS.QUANTITY,
            payload: {...item, qty: Number(e.target.value)}
        })
    }

    const onRemoveFromCart = () =>
        dispatch({
            type: REDUCER_ACTIONS.REMOVE,
            payload: item,
        })

    return (
        <li className="cart__item">
            <img src={img} alt={item.name} className="cart__img"/>
            <div aria-label="Item Name">{item.name}</div>
            <div aria-label="Price Per Item">{new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            }).format(item.price)}</div>

            <label htmlFor="itemQty" className="offscreen">
                Item Quantity
            </label>
            <select
                name="itemQty"
                id="itemQty"
                className="cart__select"
                value={item.qty}
                aria-label="Item Quantity"
                onChange={onChangeQty}
            >{options}</select>

            <div className="cart__item-subtotal" aria-label="Line Item Subtotal">
                {new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(itemTotal)}
            </div>

            <button
                className="cart__button"
                aria-label="Remove Item From Cart"
                title="Remove Item From Cart"
                onClick={onRemoveFromCart}
            >
                ❌
            </button>
        </li>
    )
}

// This function is used to determine if the CartItem component needs to re-render.
// If the item hasn't changed, React can skip re-rendering this component, improving performance.
function areItemsEqual({item: prevItem}: PropsType, {item: nextItem}: PropsType) {
    return Object.keys(prevItem).every(key => {
        return prevItem[key as keyof CartItemType] === nextItem[key as keyof CartItemType]
    })
}

const MemoizedCartItem = memo<typeof CartItem>(CartItem, areItemsEqual)

export default MemoizedCartItem