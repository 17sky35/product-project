import React, { useState } from "react";
import { call } from "../Service/ApiService";

function AddProduct(props){
    //상품의 정보를 저장할 수 있는 state
    const [product, setProduct] = useState({productName :"",productStock:0,productPrice:0});

    const {productName,productStock,productPrice} = product;

    let setItems = props.setItems;

    const onChange = (e) => {
        //이벤트가 일어난 대상에서 value와 name을 가져온다.
        const {name,value} = e.target;
        //기존의 input 객체를 복사한 뒤 name 키를 가진 value로 설정
        setProduct({...product,[name]:value})
    }

    {/* 등록버튼을 눌렀을 때 input태그에 들어있는 정보를 boot로 보낸다 */}
    const onButtonClick = () => {
        console.log("전송 정보 : " + product);
        call("/product","POST",product)
        .then(result => setItems(result.data))
        //입력필드 초기화
        //입력창 닫기
        props.setOpen(false);
    }


    return(
        <div>
            <div>
                <input style={{width: '98%'}} value={productName} onChange={onChange} name='productName' placeholder='상품이름'/>
            </div>
            <div>
                <input style={{width: '98%'}} value={productStock} onChange={onChange} name='productStock' placeholder='상품재고'/>
            </div>
            <div>
                <input style={{width: '98%'}} value={productPrice} onChange={onChange} name='productPrice' placeholder='상품가격'/>
            </div>
            <input type="button" value="등록" onClick={onButtonClick} style={{width:'100%'}} />
        </div>
    )
}

export default AddProduct;