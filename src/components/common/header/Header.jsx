import React, {useState, useContext, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { FaShoppingCart, FaUser, FaHeart } from 'react-icons/fa';
import './header.css'
import {toast} from "react-toastify";
import RefreshToken from "../refresh-token/RefreshToken";
import {UserContext} from "../../../contexts/UserContext";
import axios from 'axios';
const Header = () => {
    const navigate = useNavigate();
    const { isLoggedIn, cartUpdated } = useContext(UserContext);
    const [quantityCart, setQuantityCart] = useState(0);
    console.log("Da dang nhap " + isLoggedIn)
    const  getQuantityCart  = async () => {
        try {
            let accessToken = localStorage.getItem('access_token');
            const cartId = localStorage.getItem('cartId');
            console.log("access_token" + accessToken);
            if (!accessToken) {
                navigate('/login');
                return;
            }
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/cart/get-quantity/${cartId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            if (response.status === 200) {
                setQuantityCart(response.data.data); // Lấy giá trị quantity từ data
            } else {
                console.error("Failed to get quantity");
            }
            // if (response.ok) {
            //     setQuantityCart(response.data.data)
            //     console.log("Data lay duoc:" + response.data.data)
            // } else if (response.status === 401) {
            //     console.log("Token expiration!");
            //
            //     // Token hết hạn hoặc không hợp lệ, gọi hàm refresh token
            //     accessToken = await RefreshToken(navigate);
            //     if (accessToken) {
            //         // Thử lại sau khi refresh token
            //         await getQuantityCart(navigate);
            //     }
            // } else {
            //     const errorData = await response.json();
            //     console.error("Failed to load quantity cart:", errorData.message);
            //
            // }
        } catch (error) {
            console.error("Error adding product to cart:", error);
        }
    };
    useEffect(() => {
        if (isLoggedIn) {
            getQuantityCart();
        }
    }, [isLoggedIn, cartUpdated]);  //

    return (
        <header>
            {/* Top bar with coupon and language */}
            <div className="bg-light py-1 text-center small">
                Super Value Deals - Save more with coupons
                <div className="float-end pe-3">
                    <NavDropdown title={<span><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_Kingdom.svg/32px-Flag_of_the_United_Kingdom.svg.png" alt="flag" width="20" /> English</span>} id="language-dropdown">
                        <NavDropdown.Item href="#action/3.1">Vietnamese</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">French</NavDropdown.Item>
                    </NavDropdown>
                </div>
            </div>

            {/* Main header section */}
            <Navbar bg="white" expand="lg" className="py-3">
                <Container fluid>
                    {/* Logo */}
                    <Navbar.Brand href="/">
                        <img src="https://via.placeholder.com/150x50?text=FreshCart" alt="FreshCart Logo" />
                    </Navbar.Brand>

                    {/* Search Bar */}
                    <Form className="d-flex mx-auto">
                        <FormControl
                            type="search"
                            placeholder="Search for products"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success"><i className="fas fa-search"></i></Button>
                    </Form>

                    {/* Location Button */}
                    <Button variant="outline-secondary" className="mx-2">
                        Location
                    </Button>

                    {/* Icons: Wishlist, User, Cart */}
                    <Nav>
                        <Nav.Link href="/wishlist">
                            <FaHeart /> <span className="badge bg-success">5</span>
                        </Nav.Link>
                        <Nav.Link href="/account">
                            <FaUser />
                        </Nav.Link>
                        <Nav.Link href="/cart">
                            <FaShoppingCart /> <span className="badge bg-success">{quantityCart}</span>
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            {/* Secondary navigation menu */}
            <Navbar bg="light" expand="lg" className="py-2">
                <Container>
                    <Button variant="success" className="me-2">
                        <i className="fas fa-th-large"></i> All Departments
                    </Button>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown title="Home" id="home-dropdown">
                                <NavDropdown.Item href="/">Home 1</NavDropdown.Item>
                                <NavDropdown.Item href="/">Home 2</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Shop" id="shop-dropdown">
                                <NavDropdown.Item href="/">Shop 1</NavDropdown.Item>
                                <NavDropdown.Item href="/">Shop 2</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Stores" id="stores-dropdown">
                                <NavDropdown.Item href="/">Store 1</NavDropdown.Item>
                                <NavDropdown.Item href="/">Store 2</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Mega menu" id="mega-dropdown">
                                <NavDropdown.Item href="/">Mega Item 1</NavDropdown.Item>
                                <NavDropdown.Item href="/">Mega Item 2</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Pages" id="pages-dropdown">
                                <NavDropdown.Item href="/">Page 1</NavDropdown.Item>
                                <NavDropdown.Item href="/">Page 2</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Account" id="account-dropdown">
                                <NavDropdown.Item href="/">Profile</NavDropdown.Item>
                                <NavDropdown.Item href="/">Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
