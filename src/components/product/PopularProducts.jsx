// ProductList.js
import React, {useState, useEffect} from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';
// const products = [
//     {
//         name: "Haldiram's Sev Bhujia",
//         category: 'Snack & Munchies',
//         imageUrl: 'http://res.cloudinary.com/digtjnoh3/image/upload/v1727594040/xmg1s2bqbwptrl76vxga.png', // Cập nhật đúng đường dẫn hình ảnh
//         rating: 4.5,
//         reviews: 149,
//         newPrice: 18,
//         oldPrice: 24,
//         sale: true,
//         saleText: 'Sale',
//     },
//     {
//         name: 'NutriChoice Digestive',
//         category: 'Bakery & Biscuits',
//         imageUrl: 'http://res.cloudinary.com/digtjnoh3/image/upload/v1727594040/xmg1s2bqbwptrl76vxga.png',
//         rating: 4.5,
//         reviews: 25,
//         newPrice: 24,
//         sale: true,
//         saleText: '14%',
//     },
//     // Thêm các sản phẩm khác
// ];

const PopularProducts = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/product/list`).then(
            response =>{
                if(response.data.status === 200){
                    const items = response.data.data.items.map(item => ({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        thumbnail: item.thumbnailUrl,
                        category: item.category,
                        promotion: item.promotion,
                    }))
                    console.log(items);
                    setProducts(items);

                }
            }
        ).catch(error => {
            console.error("There was an error fetching the products!", error);
        })
    },[])
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

export default PopularProducts;
