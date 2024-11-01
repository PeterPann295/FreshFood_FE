import React, { useState } from 'react';

const ProductImageGallery=({product}) => {
    const [mainImage, setMainImage] = useState(product.thumbnailUrl);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0); // Lưu chỉ số của ảnh được chọn
    var image = "http://res.cloudinary.com/digtjnoh3/image/upload/v1728028829/ohlh7elrwxokvmbbgozv.jpg";
    // const images = [
    //     "http://res.cloudinary.com/digtjnoh3/image/upload/v1728029275/kdqvqexr5vktgdnybwo6.jpg",
    //     image,
    //     image,
    //     image,
    //     image
    // ];
    console.log(product.productImages)
    const images = product.productImages.map(item =>({
        imageUrl: item.imageUrl,
    }));
    images.unshift({ imageUrl: product.thumbnailUrl });
    console.log(images)
    const handleImageClick = (img, index) => {
        setMainImage(img);
        setSelectedImageIndex(index); // Cập nhật chỉ số của ảnh được chọn
    };
    return (
        <div>
            <img src={mainImage} alt="Product" className="img-fluid mb-3" />
            <div className="d-flex">
                {images.map((img, index) => (
                    <img key={index}
                         src={img.imageUrl}
                         alt="Thumbnail"
                         className={`img-thumbnail mx-1 ${index === selectedImageIndex ? 'border border-success' : ''}`} // Thêm border khi ảnh được chọn
                         onClick={() => handleImageClick(img.imageUrl, index)}
                         style={{width: '80px', height: '80px', cursor: 'pointer'}}/>
                ))}
            </div>
        </div>
    );
}

export default ProductImageGallery;
