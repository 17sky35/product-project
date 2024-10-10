import React from "react";
import { useEffect, useState } from "react";
import { call } from "./Service/ApiService";
import './css/style.css'
import AddProduct from "./AddProduct";

function P_info(){
    //상품정보를 가지고있는 state
    const[items, setItems] = useState([]);
    const[open, setOpen] = useState(true);

    useEffect(() => {
        //백엔드에 요청해서 조회
        call('/product','GET')
        .then(result=>{setItems(result.data)})
    },[])

    //추가하기
    const addItem = (item) => {
        //벡엔드 연결
        call("/product","POST",item)
        .then(result => setItems(result.data))
      }

    let productItem = items.length > 0 &&(  
        <table border="1">
            <tr>
                <th>상품 번호</th>
                <th>상품 이름</th>
                <th>상품 재고</th>
                <th>상품 가격</th>
                <th>등록 날짜</th>
                <th>수정 날짜</th>
            </tr>
            {/* DB에서 넘어온 상품들을 출력 */}
            {items.map((item)=>(
                <tr>
                    <td>{item.productId}</td>
                    <td>{item.productName}</td>
                    <td>{item.productStock}</td>
                    <td>{item.productPrice}</td>
                    <td>{item.registerDate}</td>
                    <td>{item.upDateTime}</td>
                </tr>            
            ))}
            {/* DB에서 넘어온 상품들을 출력 */}
        </table>
    );

    const onButtonClick = () =>{
        setOpen(false);        
    }
    let addProduct = <button type="button" onClick={onButtonClick}>상품 추가</button>  
    let addProductOpen = <AddProduct />
    let button = addProduct;

    if(!open){
        button = addProductOpen;
    }

    return(
        <div className="container">
            {button}
            {productItem}
        </div>
    )
}

export default P_info;