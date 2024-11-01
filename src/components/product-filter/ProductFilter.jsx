import React, {useState, useEffect} from "react";
import SidebarFilter from "./SidebarFilter";
import PopularProducts  from "../product/PopularProducts";
import axios from "axios";
import ProductBySerach from "./ProductBySerach";
const ProductFilter = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceRange, setPriceRange] = useState([10000, 100000]);
    useEffect(() => {
        // Fetch parent categories from the API
        axios.get(`${process.env.REACT_APP_API_URL}/parent-category/list`) // Replace with your API endpoint
            .then(response => {
                if (response.data.status === 200) {
                    setCategories(response.data.data.items);
                }
            })
            .catch(error => console.error("Error fetching categories:", error));
    }, []);
    useEffect(() => {
        console.log(priceRange);
        const params = {
            ...(selectedCategories.length > 0 && {
                category: selectedCategories.map((id) => `id:${id}`).join(',')
            }),
            ...(priceRange && {
                product: `price>${priceRange[0]}, price<${priceRange[1]}`
            })
        };
        console.log(params);
        axios.get(`${process.env.REACT_APP_API_URL}/product/list-with-search`, {
        params}).then(
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
    },[selectedCategories, priceRange])
    const handleCategoryChange = (categoryId) => {
        setSelectedCategories((prevSelected) =>
            prevSelected.includes(categoryId)
                ? prevSelected.filter((id) => id !== categoryId)
                : [...prevSelected, categoryId]
        );
    };
    const handlePriceChange = (value) => {
        setPriceRange(value);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-3">
                    <SidebarFilter
                        categories={categories}
                        selectedCategories={selectedCategories}
                        onCategoryChange={handleCategoryChange}
                        priceRange={priceRange}
                        onPriceChange={handlePriceChange}
                    />
                </div>

                <div className="col-9">
                    <ProductBySerach products={products}/>
                </div>
            </div>
        </div>
    )
}
export default ProductFilter;