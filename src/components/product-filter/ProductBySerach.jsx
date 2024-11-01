import React, {useEffect, useState} from "react";
import axios from "axios";
import ProductCard from "../product/ProductCard";

const ProductBySerach = ({products}) => {

    return (
        <div className="container">
            <h2 className="my-4">Popular Products</h2>
            <div className="row">
                {products.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>
        </div>
    );
};
export default ProductBySerach