import React from "react";
import { call } from "../Service/ApiService";
import { useEffect , useState } from "react";

function OrderInfo(){

    //주문내역들을 저장할 state
    const [orderList,setOrderList] = useState([]);

  
    //DB에서 주문내역을 가져오기 위한 hook
    useEffect(() => {
        //백엔드에 요청해서 조회
        call('/orders/total','GET')
        //items배열에 얻어온 데이터를 추가
        .then(result=>{setOrderList(result.data)})
    },[])

    return (
        <div>
            <table border="1">
                <tr>
                    <th>상품 이름</th>
                    <th>상품 가격</th>
                    <th>주문 개수</th>
                    <th>결제 금액</th>
                    <th>주문 날짜</th>
                </tr>
                {orderList.map((order)=>(
                <tr>
                    <td>{order.productName}</td>
                    <td>{order.productPrice}</td>
                    <td>{order.productCount}</td>
                    <td>{order.totalPrice}</td>
                    <td>{order.orderDate}</td>
                </tr>
                ))}
            </table>
        </div>
    )
}

export default OrderInfo;