package com.korea.product.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@Table(name = "product")
@NoArgsConstructor
@AllArgsConstructor
public class ProductEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int productId;		//상품ID
	private String productName;//상품이름
	private int productStock;	//상품재고
	private int productPrice;	//상품가격
	
	@CreationTimestamp	//Insert쿼리가 발생할 때 시간 값을 적용시켜준다.
	private LocalDateTime registerDate;//등록날짜
	
	@UpdateTimestamp	//Update쿼리가 발생할 때 시간 값을 적용시켜준다.
	//LocalDateTime.now() : 현재 시간을 저장
	private LocalDateTime updateDate = LocalDateTime.now();	//수정날짜
	
}
