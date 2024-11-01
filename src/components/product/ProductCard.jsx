// ProductCard.js
import React from 'react';
import './ProductCard.css'; // Các style tùy chỉnh của bạn
import {Link} from 'react-router-dom';
import RefreshToken from "../common/refresh-token/RefreshToken";
const addToCart = async (product, quantity, navigate) => {
    try {
        let accessToken = localStorage.getItem('access_token');
        const cartId = localStorage.getItem('cartId');

        if (!accessToken) {
            navigate('/login');
            return;
        }

        const bodyData = {
            cartId: cartId ? parseInt(cartId) : 0,  // Lấy `cartId` từ localStorage nếu có, nếu không thì mặc định là 0
            productId: product.id,
            quantity: quantity
        };

        const response = await fetch(`${process.env.REACT_APP_API_URL}/cart-item/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(bodyData)  // Truyền JSON body với cartId, productId và quantity
        });

        if (response.ok) {
            console.log("Product added to cart successfully!");
        } else if (response.status === 401) {
            console.log("Token expiration!");

            // Token hết hạn hoặc không hợp lệ, gọi hàm refresh token
            accessToken = await RefreshToken(navigate);
            if (accessToken) {
                // Thử lại sau khi refresh token
                await addToCart(product, quantity, navigate);
            }
        } else {
            const errorData = await response.json();
            console.error("Failed to add product to cart:", errorData.message);
        }
    } catch (error) {
        console.error("Error adding product to cart:", error);
    }
};

const ProductCard = ({ product, navigate }) => {
    const handleAddToCart = () => {
        const quantity = 1;  // Giả sử muốn thêm 1 sản phẩm vào giỏ hàng
        addToCart(product, quantity, navigate);
    };

    return (
        <div className="col-md-3 col-sm-6 mb-4">
            <div className="card h-100 text-center">
                <Link to={`/product/${product.id}`}>
                    <img src={product.thumbnail} className="card-img-top" alt={product.name} style={{ height: '150px', objectFit: 'contain' }} />
                </Link>
                <div className="card-body">
                    <p className="text-muted mb-1">{product.category.name}</p>
                    <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                        <h5 className="card-title product-name">{product.name}</h5>
                    </Link>
                    <div className="d-flex justify-content-center mb-2">
                        <div className="rating">
                            {'⭐'.repeat(Math.floor(5))} <span className="text-muted">(245)</span>
                        </div>
                    </div>
                    <div className="price-section mb-3">
                        <span className="fw-bold text-success">${product.price}</span>{' '}
                        {product.price && <span className="text-muted text-decoration-line-through">${product.price}</span>}
                    </div>

                    <button
                        className="btn btn-success w-100"
                        onClick={handleAddToCart}  // Gọi hàm thêm sản phẩm vào giỏ hàng
                    >
                        + Add
                    </button>
                </div>
            </div>
        </div>
    );
};


export default ProductCard;
