import React, {useState, useEffect} from 'react';
import "./product.css"
import axios from 'axios';
import ProductDetails from "./ProductDetails";
import ProductImageGallery from "./ProductImageGallery";
import ProductInfo from "./ProductInfo";
import BreadcrumbComponent from "./BreadcumbComponent";
import {useLoaderData, useNavigate} from "react-router-dom";


export async function LoadProduct({ params }) {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/product/${params.id}`, {
            headers: {
                'Cache-Control': 'no-cache',
            },
        });

        if (response.data.status === 200) {
            return response.data.data;  // Trả về dữ liệu sản phẩm
        } else {
            throw new Error('Failed to load product');
        }
    } catch (error) {
        console.error("There was an error fetching the product!", error);
        throw error;  // Ném lỗi để router xử lý
    }
}
const ProductDetailsMain = () => {
    const product = useLoaderData();
    return (
        <div className="container">

                <>
                    <BreadcrumbComponent product={product} />
                    <div className="row">
                        <div className="col-md-6">
                            <ProductImageGallery product={product} />
                        </div>
                        <div className="col-md-6">
                            <ProductInfo product={product} />
                        </div>
                    </div>
                    <ProductDetails product={product} />
                </>

        </div>
    );
}

export default ProductDetailsMain;
