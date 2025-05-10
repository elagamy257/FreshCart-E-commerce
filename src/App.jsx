import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './component/Layout/Layout'
import Products from './component/Products/Products'
import Login from './component/Login/Login'
import Register from './component/Register/Register'
import Brands from './component/Brands/Brands'
import Carts from './component/Carts/Carts'
import Allorders from './component/Allorders/Allorders'
import Checkout from './component/Checkout/Checkout'
import Notfound from './component/Notfound/Notfound'
import UserContextProvider from './context/userContext'
import ProductedRoutes from './component/ProductedRoutes/ProductedRoutes'
import ProductDetails from './component/ProductDetails/ProductDetails'
import CartContextProvider from './context/cartContext'
import { Toaster } from 'react-hot-toast'
import BrandsDetails from './component/BrandsDetails/BrandsDetails.jsx'
import Categories from './component/Categories/Categories.jsx'
import CategoryDetails from './component/CategoryDetails/CategoryDetails.jsx'
import Home from './component/Home/Home.jsx'
import ForgetPassword from './component/ForgetPassword/ForgetPassword.jsx'
import ResetPassword from './component/ResetPassword/ResetPassword.jsx'
import NewPassword from './component/NewPassword/NewPassword.jsx'
import ProtectedAuthRoute from './component/ProtectedAuthRoute/ProtectedAuthRoute.jsx'




let routers = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { index: true, element: <ProductedRoutes><Home /></ProductedRoutes> },
      { path: 'products', element: <ProductedRoutes><Products/> </ProductedRoutes>},
      { path: 'login', element: <ProtectedAuthRoute><Login /> </ProtectedAuthRoute>},
      { path: "forgetPassword", element: <ProtectedAuthRoute><ForgetPassword /></ProtectedAuthRoute> },
      { path: "ResetPassword", element: <ProtectedAuthRoute><ResetPassword /></ProtectedAuthRoute> },
      { path: "newPassword", element: <ProtectedAuthRoute><NewPassword /></ProtectedAuthRoute> },
      { path: 'register', element: <ProtectedAuthRoute><Register /></ProtectedAuthRoute> },
      { path: "category", element: <ProductedRoutes><Categories /></ProductedRoutes> },
      { path: "category-details/:id", element: <ProductedRoutes><CategoryDetails /></ProductedRoutes> },
      { path: 'brands', element: <ProductedRoutes><Brands /></ProductedRoutes> },
      { path: "brand-details/:id", element: <ProductedRoutes><BrandsDetails /></ProductedRoutes> },
      { path: 'checkout/:cartId', element: <ProductedRoutes><Checkout/></ProductedRoutes> },
      { path: 'allorders', element: <ProductedRoutes><Allorders/></ProductedRoutes> },
      { path: 'carts', element: <ProductedRoutes><Carts /></ProductedRoutes> },
      { path: 'productDetails/:id', element: <ProductDetails /> },
      { path: '*', element: <Notfound /> }
    ]
  }
])



function App() {

  return (
    <>
      <CartContextProvider>
        <UserContextProvider>

          <RouterProvider router={routers}></RouterProvider>
          <Toaster />

        </UserContextProvider>
      </CartContextProvider>


    </>
  )
}

export default App




