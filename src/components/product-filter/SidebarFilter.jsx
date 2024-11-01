import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {ListGroup, Collapse, FormCheck} from 'react-bootstrap';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
const SidebarFilter = ({ categories, selectedCategories, onCategoryChange, priceRange, onPriceChange }) => {

    const [openDropdown, setOpenDropdown] = useState(null);
    // const [priceRange, setPriceRange] = useState([10000, 10000000]);
    const toggleDropdown = (id) => {
        setOpenDropdown(openDropdown === id ? null : id);
    };
    // const handlePriceChange = (value) => {
    //     setPriceRange(value);
    // };

    // const handleAfterChange = (value) => {
    //     onPriceChange(value); // Chỉ gọi API khi người dùng thả chuột
    // };
    return (
        <div className="sidebar">
            <h3 className="mb-3">Categories</h3>
            <ListGroup variant="flush">
                {categories.map((parentCategory) => (
                    <ListGroup.Item key={parentCategory.id}>
                        <div
                            onClick={() => toggleDropdown(parentCategory.id)}
                            aria-controls={`category-collapse-${parentCategory.id}`}
                            aria-expanded={openDropdown === parentCategory.id}
                            style={{ cursor: 'pointer', fontWeight: 'bold' }}
                            className="d-flex justify-content-between align-items-center"
                        >
                            {parentCategory.name}
                            <span>{openDropdown === parentCategory.id ? '▲' : '▼'}</span>
                        </div>
                        <Collapse in={openDropdown === parentCategory.id}>
                            <div id={`category-collapse-${parentCategory.id}`}>
                                <ListGroup variant="flush" className="ml-3">
                                    {parentCategory.categories.map((category) => (
                                        <ListGroup.Item key={category.id} className="border-0">
                                            <FormCheck
                                                type="checkbox"
                                                label={category.name}
                                                checked={selectedCategories.includes(category.id)}
                                                onChange={() => onCategoryChange(category.id)}
                                            />
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </div>
                        </Collapse>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            {/* Thêm thanh trượt giá */}
            <h3 className="mt-4">Price</h3>
            <Slider
                range
                min={10000}
                max={100000}
                step={10000}
                defaultValue={priceRange}
                value={priceRange}
                onChange={onPriceChange}
            />
            <div className="d-flex justify-content-between mt-2">
                <span>{priceRange[0].toLocaleString()}đ</span>
                <span>{priceRange[1].toLocaleString()}đ</span>
            </div>
        </div>
    );
}

export default SidebarFilter;
