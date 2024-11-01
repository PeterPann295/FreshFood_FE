import React from 'react';

const ProductDetails = ({product}) => {
    return (
        <div className="mt-5">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="details-tab" data-bs-toggle="tab" data-bs-target="#details" type="button" role="tab" aria-controls="details" aria-selected="true">Thông tin sản phẩm</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="reviews-tab" data-bs-toggle="tab" data-bs-target="#reviews" type="button" role="tab" aria-controls="reviews" aria-selected="false">Reviews</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="information-tab" data-bs-toggle="tab" data-bs-target="#information" type="button" role="tab" aria-controls="information" aria-selected="false">Storage Tips</button>
                </li>
            </ul>
            <div className="tab-content mt-3" id="myTabContent">
                <div className="tab-pane fade show active" id="details" role="tabpanel" aria-labelledby="details-tab">
                    <h5>{product.name}</h5>
                    <p className={"description"}>{product.description}</p>
                </div>
                <div className="tab-pane fade" id="information" role="tabpanel" aria-labelledby="information-tab">
                    <h5>Storage Tips</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                <div className="tab-pane fade" id="reviews" role="tabpanel" aria-labelledby="reviews-tab">
                    <h5>Reviews</h5>
                    <p>(30 reviews)</p>
                </div>
            </div>
        </div>
    );
}


export default ProductDetails;
