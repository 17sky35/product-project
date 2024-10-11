import React from "react";
import { useEffect, useState } from "react";
import { call } from "../Service/ApiService";
import '../css/style.css'
import AddProduct from "./AddProduct";

function P_info(){
    //상품정보를 가지고있는 state
    const[items, setItems] = useState([]);
    //상품추가 컴포넌트를 렌더링하기 위한 state
    const[open, setOpen] = useState(false);
    //내가 클릭한 라디오버튼의 인덱스를 저장하기 위한 state
    const[selectedIndex,setSelectedIndex] = useState(null);
    //주문개수를 저장하는 state
    const[orderCount,setOrderCount] = useState('');

    //조회하기
    useEffect(() => {
        //백엔드에 요청해서 조회
        call('/product','GET')
        //items배열에 얻어온 데이터를 추가
        .then(result=>{setItems(result.data)})
    },[])

    //클릭한 라디오버튼의 index를 저장하는 함수
    const handleRadioChange = (index) => {
        console.log("클릭한 index : " + index);
        setSelectedIndex(index);//state에 저장
        setOrderCount('');//라디오 버튼 선택시 주문 개수를 초기화
    }
    //주문개수의 값이 변할 때마다 state를 저장한느 함수
    const handleOrderCountchange = (event) => {
        setOrderCount(event.target.value);
    }
    //주문하기
    const orderProduct = () => {
        //주문하기 전에 유효성검사를 수행
        if(selectedIndex && orderCount > 0 &&items[selectedIndex-1]){
            const orderData = {
                productId : items[selectedIndex-1].productId,
                productCount : parseInt(orderCount)
            }
            //DB에 추가 요청을 보내기
            call("/orders","POST",orderData)
            //items에 다시 반영
            .then(result => {setItems(result.data)})
        }else{
            alert("상품을 선택하고 개수를 입력해주세요");
        }
    }

    let productItem = items.length > 0 &&(  
        <div>
            <table border="1">
                <tr>
                    <th>단일 선택</th>
                    <th>주문 개수</th>
                    <th>상품 번호</th>
                    <th>상품 이름</th>
                    <th>상품 재고</th>
                    <th>상품 가격</th>
                    <th>등록 날짜</th>
                    <th>수정 날짜</th>
                </tr>
                {/* DB에서 넘어온 상품들을 출력 */}
                {/* map함수의 특징 index를 설정할 수 있다. */}
                {items.map((item,index)=>(
                <tr>
                    <td><input type="radio" onChange={() => handleRadioChange(index+1)} name="productId"/></td>
                    <td><input onChange={handleOrderCountchange} value={selectedIndex === index+1 ? orderCount : ''} readOnly={selectedIndex !== index+1} /></td>
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
            <button onClick={orderProduct}>주문완료</button>
            <button>주문내역</button>
        </div>
    );

    //상품추가 창을 여는 함수
    const onButtonClick = () =>{
        setOpen(true);        
    }
    //상품추가 버튼
    let addProductButton = <button type="button" onClick={onButtonClick}>상품 추가</button>
    let addProduct = addProductButton;

    if(open){
        addProduct = <AddProduct setItems={setItems} setOpen={setOpen} />
    }

    return(
        <div className="container">
            {addProduct}
            {productItem}
        </div>
    )
}

export default P_info;