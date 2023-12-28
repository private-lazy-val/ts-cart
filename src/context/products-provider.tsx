import {createContext, ReactElement, useState} from "react";

export type ProductType = {
    sku: string;
    name: string;
    price: number;
}

const initState: ProductType[] = [
    {
        "sku": "item0001",
        "name": "Bulldog Red Jacket",
        "price": 20.99
    },
    {
        "sku": "item0002",
        "name": "Bulldog Green Jacket",
        "price": 20.99
    },
    {
        "sku": "item0003",
        "name": "Bulldog Brown Jacket",
        "price": 20.99
    }
]

// const initProductsState: ProductType[] = [];

export type UseProductsContextType = {
    products: ProductType[];
}

const initContextState: UseProductsContextType = {
    products: []
}

const ProductsContext = createContext<UseProductsContextType>(initContextState);

type ChildrenType = {
    children?: ReactElement | ReactElement[]
}

export const ProductsProvider = ({children}: ChildrenType): ReactElement => {
    // const [products, setProducts] = useState<ProductType[]>(initProductsState);
    const [products, setProducts] = useState<ProductType[]>(initState);

    // useEffect(() => {
    //     const fetchProducts = async (): Promise<void> => {
    //         try {
    //             const response = await fetch('http://localhost:3500/products');
    //             const data: ProductType[] = await response.json();
    //             setProducts(data);
    //         } catch (err) {
    //             if(err instanceof Error) {
    //                 console.error(err.message);
    //             }
    //         }
    //     }
    //     fetchProducts();
    // }, [])

    return (
        <ProductsContext.Provider value={{products}}>
            {children}
        </ProductsContext.Provider>
    )
}

export default ProductsContext;

