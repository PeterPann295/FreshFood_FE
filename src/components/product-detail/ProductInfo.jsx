import React from 'react';
import FormatCurrency from "../common/format-currency/FormatCurrency";

const ProductInfo = ({product}) => {
    return (
        <div className={"ms-5"}>
            <p className={"text-success"}> {product.category.name} </p>
            <h3>{product.name}</h3>
            <div className="d-flex align-items-center">
                {'⭐'.repeat(Math.floor(5))} <span className="text-success">(245 reviews)</span>
            </div>
            <h4 className="mt-3 mb-4">
                <FormatCurrency amount={product.price} /> <small className="text-muted">
                <del>{product.price + 10000}</del>
            </small> <span className="text-success">26% Off</span>
            </h4>
            <hr/>

            <div className="mt-4">
                <div className="input-group" style={{width: '120px'}}>
                    <button className="btn btn-outline-secondary">-</button>
                    <input type="number" className="form-control" value="1" min={1}/>
                    <button className="btn btn-outline-secondary">+</button>
                </div>
            </div>

            <button className="btn btn-success mt-3">Add to Cart</button>
            <hr/>
            <table className={"table"}>
                <tr className={"custom-lineheight"}>
                    <td> Mã sản phẩm</td>
                    <td> SP0012</td>
                </tr>
                <tr className={"custom-lineheight"}>
                    <td> Trạng thai </td>
                    <td> Còn hàng </td>
                </tr>
                <tr className={"custom-lineheight"}>
                    <td> Type </td>
                    <td> Thịt </td>
                </tr>
                <tr className={"custom-lineheight"}>
                    <td> Vận chuyển </td>
                    <td> Vận chuyển trong vòng 24h </td>
                </tr>
            </table>

        </div>
    );
}

export default ProductInfo;
