import React from "react";

const FormatCurrency = ({ amount }) => {
    // Định dạng tiền tệ
    const formattedAmount = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(amount);

    return <span>{formattedAmount}</span>; // Trả về JSX
}

export default FormatCurrency;
