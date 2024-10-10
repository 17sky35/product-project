import React, { useState } from "react";

function AddProduct(props){

    const [product, setProduct] = useState({productName :"",productStock:0,productPrice:0});

    const {productName,productStock,productPrice} = product;

    let addItem = props.addItem;

    return(
        <div>
            <div>
                <input type="text" placeholder="상품 이름" />
            </div>
            <div>
                <input type="text" placeholder="상품 재고" />
            </div>
            <div>
                <input type="text" placeholder="상품 가격" />
            </div>
            <button type="button">등록</button>
        </div>
    )
}

export default AddProduct;