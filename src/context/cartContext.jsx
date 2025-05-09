import axios from "axios";
import { createContext, useState } from "react";


// هنعمل متغير الكل يشوفه جواه التوكن اللى متخزنة ف الاصل فى اللوكال ستورتج
let headers = {
    token: localStorage.getItem('userToken')
}


// eslint-disable-next-line react-refresh/only-export-components
export let cartContext = createContext();

export default function CartContextProvider(props) {
    let [cartNumber, setCartNumber] = useState(0)


    // section functions with numOfCartItems in addProductToCart()

    function addProductToCart(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
            {
                productId: productId
            },
            {
                headers: headers // هنتعامل معاه مع اكتر من end points (add/delete/update products) then create public variable 

            }
        ).then((response) => {
            console.log('response', response)
            setCartNumber(response.data.numOfCartItems) //cartNumber = 2
            return response
        })
            .catch((error) => error) // هذه الدالة فى كلا الحالتين بترجع قيمة انا عاوزة لما استخدمها فى مكان برا الصفحة دى يرجعلى قيمة الخرج بتاعتها فلازم نضع قبلها جملة ريترن
    }



    // here we will add numOfCartItems in getProductToCart()

    function getProductToCart() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,

            {
                headers: headers // هنتعامل معاه مع اكتر من end points (add/delete/update products) then create public variable 

            }
        ).then((response) => {
            setCartNumber(response.data.numOfCartItems) // cartNumber = 4
            return response
        })
            .catch((error) => error) // هذه الدالة فى كلا الحالتين بترجع قيمة انا عاوزة لما استخدمها فى مكان برا الصفحة دى يرجعلى قيمة الخرج بتاعتها فلازم نضع قبلها جملة ريترن
    }




    // here we will add numOfCartItems in deleteProductFromCart()

    function deleteProductFromCart(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,

            {
                headers: headers

            }
        ).then((response) => {
            // console.log('response' , response)
            setCartNumber(response.data.numOfCartItems)
            return response
        })
            .catch((error) => error)
    }


    return <cartContext.Provider value={{ addProductToCart, getProductToCart, deleteProductFromCart, cartNumber }}>
        {props.children}

    </cartContext.Provider>

}