import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { Table } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserSidebar from "../../components/UserSidebar";
import "../../css/user.css";
import 'bootstrap/dist/css/bootstrap.min.css';


function Product() {

	const imageHeight = 80;
	const imageWidth  = imageHeight * 3 / 4;
	const tableHeight = 240;

	const [ forSaleProducts, setForSaleProducts ] = useState([]);
	const [ editingProducts, setEditingProducts ] = useState([]);
	const [ soldOutProducts, setSoldOutProducts ] = useState([]);

	const [ cookies ] = useCookies();
	const navigate = useNavigate();
	

	async function resetLists() {
		await fetch("https://ntnu.site/api/member/products", {
			method: "GET",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((response) => {
				if (response.status !== "ok") {
					alert(response.message);
				}
				else {
					setForSaleProducts(response.data.forSaleProducts);
					setEditingProducts(response.data.editingProducts);
					setSoldOutProducts(response.data.soldOutProducts);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	async function discontinueProduct(productId, name) {
		await fetch("https://ntnu.site/api/member/products/discontinue", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				productId: productId,
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				if (response.status !== "ok") {
					alert(response.message);
				}
				else {
					alert("商品「" + name + "」下架成功！");
					resetLists();
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	async function launchProduct(productId, name) {
		await fetch("https://ntnu.site/api/member/products/launch", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				productId: productId,
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				if (response.status !== "ok") {
					alert(response.message);
				}
				else {
					alert("商品「" + name + "」上架成功！");
					resetLists();
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	async function outOfStockProduct(productId, name) {
		await fetch("https://ntnu.site/api/member/products/outofstock", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				productId: productId,
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				if (response.status !== "ok") {
					alert(response.message);
				}
				else {
					alert("商品「" + name + "」標示為售出成功！");
					resetLists();
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		if (!cookies.jwt) navigate("../../login");
		else resetLists();
	}, []);

	
	return (
		<div className="member-page">
			<UserSidebar />
			<div className="body-text">
				<div>已上架</div>
				<Table striped bordered hover size="sm">
					<tbody style={{overflowY: "scroll", height: tableHeight, display: "block"}}>
						{forSaleProducts.length > 0 ?
							forSaleProducts.map((item) => 
								<tr style={{display: "block"}}>
									<Row style={{marginLeft: 0, marginRight: 0}}>
										<Col sm="auto" onClick={() => navigate("../../products/" + item.productId)}>
											<div className="img-container" style={{height: imageHeight, width: imageWidth}}>
												{
													item.images.length > 0 ? (
														<img src={item.images[0]} alt=''/>
													) : (
														<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXd5451e837N2pG4biVWIzg3IV-DeCTG4STHw3BwpBhQI2CyyZRKiTyc3MRaZRGohKcLE&usqp=CAU" alt=''/>
													)
												}
											</div>
										</Col>
										<Col sm={3} className="border-column" onClick={() => navigate("../../products/" + item.productId)}>
											商品名稱：<br/>{item.name}<br/>
											商品價格：${item.price}
										</Col>
										<Col className="border-column" onClick={() => navigate("../../products/" + item.productId)}>
											商品描述：<br/>{ item.extraDescription.length > 60 ?
												item.extraDescription.substring(0, 60) + "..." : item.extraDescription }
										</Col>
										<Col sm="auto" className="button-column">
											<button onClick={() => discontinueProduct(item.productId, item.name)}>下架</button>
											<button onClick={() => outOfStockProduct(item.productId, item.name)}>標示為售出</button>
										</Col>
									</Row>
								</tr>
							) : (
								<tr style={{display: "block"}}>
									<Row style={{marginLeft: 0, marginRight: 0}}>
										<Col><td>暫無已上架的商品！</td></Col>
									</Row>
								</tr>
							)
						}
					</tbody>
				</Table>

				<div>未上架</div>
				<Table striped bordered hover size="sm">
					<tbody style={{overflowY: "scroll", height: tableHeight, display: "block"}}>
						{editingProducts.length > 0 ?
							editingProducts.map((item) => 
								<tr style={{display: "block"}}>
									<Row style={{marginLeft: 0, marginRight: 0}}>
										<Col sm="auto" onClick={() => navigate("../../products/" + item.productId)}>
											<div className="img-container" style={{height: imageHeight, width: imageWidth}}>
												{
													item.images.length > 0 ? (
														<img src={item.images[0]} alt=''/>
													) : (
														<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXd5451e837N2pG4biVWIzg3IV-DeCTG4STHw3BwpBhQI2CyyZRKiTyc3MRaZRGohKcLE&usqp=CAU" alt=''/>
													)
												}
											</div>
										</Col>
										<Col sm={3} className="border-column" onClick={() => navigate("../../products/" + item.productId)}>
											商品名稱：<br/>{item.name}<br/>
											商品價格：${item.price}
										</Col>
										<Col className="border-column" onClick={() => navigate("../../products/" + item.productId)}>
											商品描述：<br/>{ item.extraDescription.length > 60 ?
												item.extraDescription.substring(0, 60) + "..." : item.extraDescription }
										</Col>
										<Col sm="auto" className="button-column">
											<button onClick={() => launchProduct(item.productId, item.name)}>上架</button>
											<button onClick={() => navigate("../editproduct/" + item.productId)}>編輯</button>
										</Col>
									</Row>
								</tr>
							) : (
								<tr style={{display: "block"}}>
									<Row style={{marginLeft: 0, marginRight: 0}}>
										<Col><td>暫無商品，請新增商品!</td></Col>
									</Row>
								</tr>
							)
						}
					</tbody>
				</Table>

				<div>已售出</div>
				<Table striped bordered hover size="sm">
					<tbody style={{overflowY: "scroll", height: tableHeight, display: "block"}}>
						{soldOutProducts.length > 0 ?
							soldOutProducts.map((item) =>
								<tr style={{display: "block"}}>
									<Row style={{marginLeft: 0, marginRight: 0}}>
										<Col sm="auto" onClick={() => navigate("../../products/" + item.productId)}>
											<div className="img-container" style={{height: imageHeight, width: imageWidth}}>
												{
													item.images.length > 0 ? (
														<img src={item.images[0]} alt=''/>
													) : (
														<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXd5451e837N2pG4biVWIzg3IV-DeCTG4STHw3BwpBhQI2CyyZRKiTyc3MRaZRGohKcLE&usqp=CAU" alt=''/>
													)
												}
											</div>
										</Col>
										<Col sm={3} className="border-column" onClick={() => navigate("../../products/" + item.productId)}>
											商品名稱：<br/>{item.name}<br/>
											商品價格：${item.price}
										</Col>
										<Col className="border-column" onClick={() => navigate("../../products/" + item.productId)}>
											商品描述：<br/>{ item.extraDescription.length > 60 ?
												item.extraDescription.substring(0, 60) + "..." : item.extraDescription }
										</Col>
										<Col sm="auto" className="button-column">
											<button onClick={() => launchProduct(item.productId, item.name)}>上架</button>
										</Col>
									</Row>
								</tr>
							) : (
								<tr style={{display: "block"}}>
									<Row style={{marginLeft: 0, marginRight: 0}}>
										<Col><td>暫無已售出的商品!</td></Col>
									</Row>
								</tr>
							)
						}
					</tbody>
				</Table>
			</div>
		</div>
	);
}


export default Product;