import React, { useState , useEffect } from 'react';
import {fetchCartById} from "../../api/cartAPI";
import { Table, Button, InputGroup, FormControl } from 'react-bootstrap';
const cartItems = [
    {
        id: 1,
        name: 'Ram Laptop DDR4 PC4 4GB / 8GB / 16GB Bus 2133 / 2400 / 3200 Samsung',
        image: 'https://th.bing.com/th/id/OIP.WhLtv3q2XHIcQtlRgsRzywHaFj?w=240&h=180&c=7&r=0&o=5&dpr=1.6&pid=1.7',  // Placeholder image URL
        originalPrice: 570000, // Original price in VND
        discountedPrice: 470000, // Discounted price in VND
        discount: 17, // Discount percentage
        quantity: 1,
        options: {
            type: '8GB, 3200 Samsung',
        },
    },
    {
        id: 2,
        name: 'SSD 240GB Kingston A400',
        image: 'https://th.bing.com/th/id/OIP.WhLtv3q2XHIcQtlRgsRzywHaFj?w=240&h=180&c=7&r=0&o=5&dpr=1.6&pid=1.7',  // Placeholder image URL
        originalPrice: 700000,
        discountedPrice: 620000,
        discount: 11,
        quantity: 1,
        options: {
            type: '240GB',
        },
    },
    {
        id: 3,
        name: 'External Hard Drive 1TB Seagate',
        image: 'https://th.bing.com/th/id/OIP.WhLtv3q2XHIcQtlRgsRzywHaFj?w=240&h=180&c=7&r=0&o=5&dpr=1.6&pid=1.7',  // Placeholder image URL
        originalPrice: 1200000,
        discountedPrice: 1100000,
        discount: 8,
        quantity: 1,
        options: {
            type: '1TB, USB 3.0',
        },
    }
];

function CartItem({ item, onQuantityChange, onRemove }) {



    return (
        <tr>
            <td>
                <img src={item.product.thumbnail} alt={item.product.name} style={{ width: '50px' }} />
                {item.product.name}
            </td>
            <td>
                {/*<span style={{ textDecoration: 'line-through' }}>{item.originalPrice}</span>*/}
                {/*<br />*/}
                {item.product.price}
            </td>
            <td>
                <InputGroup>
                    <Button onClick={() => onQuantityChange(item, -1)}>-</Button>
                    <FormControl size={"sm"} value={item.quantity} readOnly
                                 style={{ width: '20px', textAlign: 'center' }}
                    />
                    <Button onClick={() => onQuantityChange(item, 1)}>+</Button>
                </InputGroup>
            </td>
            <td>{item.quantity * item.product.price}</td>
            <td>
                <Button variant="danger" onClick={() => onRemove(item)}>Xóa</Button>
            </td>
        </tr>
    );
}

function Cart() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCart = async () => {
            try {
                const response = await fetchCartById();
                console.log(response)
                if(response.data.status === 200){
                    const items = response.data.data.cartItem.map(item => ({
                        id: item.id,
                        quantity: item.quantity,
                        product:{
                            id: item.productDTO.id,
                            name: item.productDTO.name,
                            thumbnail: item.productDTO.thumbnailUrl,
                            price: item.productDTO.price,

                        }
                    }))
                    console.log(items);
                    setItems(items);
                }
            } catch (error) {
                console.error('Failed to fetch cart:', error);
                setError('Failed to load cart.');
            } finally {
                setLoading(false);
            }
        };

        loadCart();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const handleQuantityChange = (item, change) => {
        setItems(items.map(i =>
            i.id === item.id ? { ...i, quantity: Math.max(i.quantity + change, 1) } : i
        ));
    };

    const handleRemoveItem = (item) => {
        setItems(items.filter(i => i.id !== item.id));
    };

    return (
        <Table bordered>
            <thead>
            <tr>
                <th>Sản Phẩm</th>
                <th>Đơn Giá</th>
                <th>Số Lượng</th>
                <th>Số Tiền</th>
                <th>Thao Tác</th>
            </tr>
            </thead>
            <tbody>
            {items.map(item => (
                <CartItem
                    key={item.id}
                    item={item}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemoveItem}
                />
            ))}
            </tbody>
        </Table>
    );
}

export default Cart;
