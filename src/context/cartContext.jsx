import axios from "axios";
import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export let cartContext = createContext();

export default function CartContextProvider(props) {
    const [cartNumber, setCartNumber] = useState(0);

    // Dynamically get the token for each request
    const getHeaders = () => ({
        token: localStorage.getItem("userToken"),
    });

    async function addProductToCart(productId) {
        try {
            const response = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/cart`,
                { productId },
                { headers: getHeaders() }
            );
            setCartNumber(response.data.numOfCartItems);
            return response;
        } catch (error) {
            console.error("Error adding product to cart:", error);
            throw error; // Throw the error to be handled by the calling component
        }
    }

    async function getProductToCart() {
        try {
            const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
                headers: getHeaders(),
            });
            setCartNumber(response.data.numOfCartItems);
            return response;
        } catch (error) {
            console.error("Error fetching cart:", error);
            throw error;
        }
    }

    async function deleteProductFromCart(productId) {
        try {
            const response = await axios.delete(
                `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                { headers: getHeaders() }
            );
            setCartNumber(response.data.numOfCartItems);
            return response;
        } catch (error) {
            console.error("Error deleting product from cart:", error);
            throw error;
        }
    }

    return (
        <cartContext.Provider
            value={{ addProductToCart, getProductToCart, deleteProductFromCart, cartNumber }}
        >
            {props.children}
        </cartContext.Provider>
    );
}