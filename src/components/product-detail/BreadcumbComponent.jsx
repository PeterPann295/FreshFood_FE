import React from 'react';
import { Breadcrumb } from 'react-bootstrap';

const BreadcrumbComponent=({product}) => {
    return (
        <Breadcrumb className={"mt-3 mb-4"}>
            <Breadcrumb.Item href="/">Trang Chủ</Breadcrumb.Item>
            <Breadcrumb.Item href="/bakery-biscuits">{product.category.name}</Breadcrumb.Item>
            <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
        </Breadcrumb>
    );
}

export default BreadcrumbComponent;
