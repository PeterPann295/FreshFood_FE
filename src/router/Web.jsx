import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../page/Home";
import ProductDetailsMain, {LoadProduct} from "../components/product-detail/ProductDetailsMain";
import Register from "../components/register-account/Register";
import Login from "../components/login-account/Login";
import RefreshToken from "../components/common/refresh-token/RefreshToken";
import TestRefreshToken from "../components/common/refresh-token/TestRefreshToken";
import ProductFilter from "../components/product-filter/ProductFilter";
export const Router = createBrowserRouter([
    {

        path: '/',
        element: <App/>,
        children: [
            {
                index: true,
                element: <Home/>,
            },
            {
                path: "product/:id",
                element: <ProductDetailsMain/>,
                loader: LoadProduct,
            },{
                path: "register",
                element: <Register/>,
            },{
                path: "login",
                element: <Login/>
            }
            ,{
                path: "refresh-token",
                element: <TestRefreshToken/>
            }
            ,{
                path: "product-filter",
                element: <ProductFilter/>
            }

        ]
    }
    ]

)
export default Router;