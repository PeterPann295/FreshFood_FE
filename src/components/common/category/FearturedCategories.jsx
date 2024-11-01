import React, {useState, useEffect} from 'react';
import './FeaturedCatrgories.css'; // Tạo file CSS tùy chỉnh nếu cần
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const FeaturedCategories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Gọi API từ localhost
        axios.get(`${process.env.REACT_APP_API_URL}/parent-category/list`)
            .then(response => {
                if (response.data.status === 200) {
                    const items = response.data.data.items.map(item => ({
                        imgSrc: item.imageUrl,
                        title: item.name,
                    }));
                    console.log(items);
                    setCategories(items); // Cập nhật state với dữ liệu từ API
                }
            })
            .catch(error => {
                console.error("There was an error fetching the categories!", error);
            });
    }, []);

    // Cấu hình của slider
    const settings = {
        dots: true, // Hiển thị các chấm trượt
        infinite: true, // Cho phép trượt vô hạn
        speed: 500,
        slidesToShow: 5, // Số lượng item hiển thị
        slidesToScroll: 1, // Số lượng item di chuyển khi lướt
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="container">
            <h2 className="my-4">Featured Categories</h2>
            <Slider {...settings}>
                {categories.map((category, index) => (
                    <div key={index} className="p-3">
                        <div className="card h-70 text-center w-80">
                            <img src={category.imgSrc} className="card-img-top" alt={category.title} />
                            <div className="card-body">
                                <h5 className="card-title">{category.title}</h5>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default FeaturedCategories;