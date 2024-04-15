import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Container, Form, Row, Col, Button, Modal } from "react-bootstrap";
import { utils } from "core/helper";
import { connect } from "react-redux";
import { addressService, orderService } from "core/services";
import { Formik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import {
	removeAllCart
} from "redux/action/account.action";

const initialValues = {
	default_address: "N",
	address_type: "B",
	latitude: "string",
	longitude: "string",
	address: "",
	address1: "",
	city_id: "",
	state_id: "",
	pincode: "",
	contact_email: "",
	contact_mob: "",
	landmark: "",
};

const addressSchema = Yup.object().shape({
	address: Yup.string().required("Address is required"),
	state_id: Yup.string().required("State is required"),
	city_id: Yup.string().required("City is required"),
	default_address: Yup.string().optional(),
	pincode: Yup.string()
		.min(6)
		.max(6)
		.matches(/^[0-9]/, "Invalid pincode")
		.required("Pincode is required"),
	contact_mob: Yup.string()
		.min(10)
		.max(10)
		.matches(/^[0-9]/, "Invalid Mobile number")
		.required("Mobile number is required"),
	contact_email: Yup.string().email().required("Email is required"),
});

// const couponSchema = Yup.object().shape({
// 	coupon_code: Yup.string().required("Coupon code is required"),
// });

const paymentSchema = Yup.object().shape({
	payment_type: Yup.string().required("Payment type is required"),
});

const Billing = (props) => {
	const { removeAllCart } = props;
	const [loadItemsForCheckout, setLoadItemsForCheckout] = useState({});
	const [state, setState] = useState([]);
	const [city, setCity] = useState([]);
	const [triggerPayment, setTriggerPayment] = useState(false);
	const [paymentDetails, setPaymentDetails] = useState({});
	const formikRef = useRef();
	const paymentForm = useRef(null);
	const navigate = useRouter();
	const [couponApply, setCouponApply] = useState("");


	const [shippingAddressId, setShippingAddressId] = useState("");
	const [billingAddressId, setBillingAddressId] = useState("");

	useEffect(() => {
		loadState(1);
		loadAddress();
		loadItemForCheckoutPage();
	}, []);

	function loadItemForCheckoutPage(payload) {
		orderService.loadItemForCheckoutPage(payload)
			.then((resp) => {
				if (resp.is_successful) {
					setLoadItemsForCheckout(resp);
				} else {
					utils.showErrMsg(utils.handleErr(resp.message));
				}
			})
			.catch((error) => {
				utils.showErrMsg(utils.handleErr(error));
			});
	};

	function loadState() {
		addressService.loadState()
			.then((resp) => {
				setState(resp.result);
			})
			.catch((error) => {
				utils.showErrMsg(utils.handleErr(error));
			});
	};

	const handleStateChange = (event) => {
		const { value: state_id } = event.target;
		loadCity(state_id);
	};

	function loadCity(state_id) {
		addressService
			.loadCity(state_id)
			.then((resp) => {
				// console.log('stateResp', resp);
				setCity(resp.result);
			})
			.catch((error) => {
				utils.showErrMsg(utils.handleErr(error));
			});
	};

	function loadAddress() {
		addressService
			.loadAllAddress()
			.then((resp) => {
				if (resp.is_successful && resp.result && resp.result.length > 0) {
					setLoadAllAddress(resp.result);
					resp.result.map((ele) => {
						if (ele.default_address === 'Y') {
							setShippingAddressId(ele.address_id);
							setBillingAddressId(ele.address_id);
						}
					})
				} else {
					setLoadAllAddress(resp.result);
					console.log('address empty');
				}
			})
			.catch((error) => {
				utils.showErrMsg(utils.handleErr(error));
			});
	};

	function generateProperties(order_id) {
		orderService.generateProperties(order_id)
			.then((resp) => {
				console.log("generateProperties::", resp);

				setPaymentDetails(resp);

				setTriggerPayment(true);

				setTimeout(() => {
					paymentForm.current && paymentForm.current.submit();
				}, 10);

			})
			.catch((error) => {
				utils.showErrMsg(utils.handleErr(error));
			});
	};

	const deleteAddress = (addressId) => {
		addressService.deleteAddress(addressId)
			.then((resp) => {
				utils.showSuccessMsg(resp.message);
				loadAddress();
			})
			.catch((error) => {
				utils.showErrMsg(utils.handleErr(error));
			});
	};

	const handleCouponSubmit = function (values, { setSubmitting }) {
		setCouponApply(values.coupon_code);

		if (shippingAddressId === "" || billingAddressId === "") {
			utils.showErrMsg("Need atlease one default address for billing and shipping address");
			return false;
		}

		const payload = {
			billing_address_id: billingAddressId,
			shipping_address_id: shippingAddressId,
			coupon_code: values.coupon_code
		};

		loadItemForCheckoutPage(payload);
	};

	const handleCheckoutSubmit = function (values, { setSubmitting }) {

		if (shippingAddressId === "" || billingAddressId === "") {
			utils.showErrMsg("Need atlease one default address for billing and shipping address");
			return false;
		}

		const payload = {
			billing_address_id: billingAddressId,
			shipping_address_id: shippingAddressId,
			payment_type: values.payment_type,
			coupon_code: couponApply
		};

		// console.log('payload::', payload);
		// return false;

		orderService.placeOrder(payload)
			.then((resp) => {
				if (resp.is_successful) {
					if (values.payment_type === 'online') {
						generateProperties(resp.customer_order_id);
					} else {
						utils.showSuccessMsg(resp.message);
						removeAllCart();
						setTimeout(() => {
							navigate.push('/payment/cod');
						}, 10);
					}
				} else {
					utils.showErrMsg(resp.message);
				}
			})
			.catch((error) => {
				utils.showErrMsg(utils.handleErr(error));
			});
	};

	// function placeOrder() {
	// 	if (shippingAddressId === "" || billingAddressId === "") {
	// 		utils.showErrMsg("Need atlease one default address for billing and shipping address");
	// 		return false;
	// 	}

	// 	const payload = {
	// 		billing_address_id: billingAddressId,
	// 		shipping_address_id: shippingAddressId,
	// 		coupon: couponApply
	// 	};

	// 	// console.log('payload::', payload);
	// 	// return false;

	// 	orderService.placeOrder(payload)
	// 		.then((resp) => {
	// 			console.log("resp::", resp);
	// 			// utils.showSuccessMsg(resp.message);
	// 			generateProperties(resp.customer_order_id);
	// 		})
	// 		.catch((error) => {
	// 			utils.showErrMsg(utils.handleErr(error));
	// 		});
	// }

	const [loadAllAddress, setLoadAllAddress] = useState([]);
	const [addressShow, setAdressShow] = useState(false);
	const [addressType, setAddressType] = useState("");
	const [modalTitle, setModalTitle] = useState("");
	const [isAddMode, setIsAddMode] = useState(true);
	const [addressId, setAddressId] = useState(null);

	const handleAddressClose = () => setAdressShow(false);

	const handleAddressShow = (addressType) => {
		setAddressType(addressType);
		setAdressShow(true);
		setIsAddMode(true);
		setModalTitle("Add address");
	};

	function handleAddressSubmit(values, { setSubmitting }) {
		console.log('handleAddressSubmit-isAddMode::', isAddMode)
		isAddMode ? handleAddAddressSubmit(values, setSubmitting) : handleEditAddressSubmit(values, setSubmitting);
	};

	const handleAddAddressSubmit = function (values, { setSubmitting }) {
		addressService.addAddress(values)
			.then((resp) => {
				utils.showSuccessMsg(resp.message);
				setAdressShow(false);
				loadAddress();
			})
			.catch((error) => {
				utils.showErrMsg(utils.handleErr(error));
				setSubmitting(false);
			});
	};

	const handleEditAddressSubmit = function (values, setSubmitting) {
		values.address_id = addressId;
		addressService.updateAddress(values)
			.then((resp) => {
				utils.showSuccessMsg(resp.message);
				setAdressShow(false);
				loadAddress();
			})
			.catch((error) => {
				utils.showErrMsg(utils.handleErr(error));
				setSubmitting(false);
			});
	};

	const handleEditAddressShow = (values) => {
		setModalTitle("Edit address");
		setAdressShow(true);
		setIsAddMode(false);
		setAddressId(values.address_id);
		loadAddressDetailsValues(values.address_id);
	};

	const setAddressValues = (address) => {
		if (formikRef.current && address) {
			const { setFieldValue } = formikRef.current;
			const fields = [
				'contact_email',
				'contact_mob',
				'pincode',
				'address',
				'address1',
				'landmark',
				'state_id',
				'city_id',
				'default_address'
			];
			fields.forEach(field => setFieldValue(field, address[field], false));
			loadCity(address['state_id']);
		}
	};

	function loadAddressDetailsValues(address_id) {
		addressService.loadAddressDetails(address_id).then((resp) => {
			const address = resp.result[0];
			console.log('address::', address);
			setAddressValues(address);
		});
	};

	function makeDefaultAddress(address_id) {
		addressService.defaultAddress(address_id).then((resp) => {
			console.log('makeDefaultAddress-resp::', resp);
			const { is_successful, message } = resp;
			if (is_successful) {
				utils.showSuccessMsg(message);
				loadAddress();
			} else {
				utils.showErrMsg(message);
			}
		});
	};

	// useEffect(() => {
	//     if(!isAddMode) {
	// 		addressService.loadAddressDetails(addressId).then((resp)=>{
	// 			console.log("loadAddDetailas::", resp);
	//             const address = resp.result[0];
	//             setAddressValues(address);
	//         });
	//     };
	// },[isAddMode]);

	return (
		<div className="cart-main-area mtb-60px">
			<Container>
				<Row>
					<Col lg={8} md={8} className="address_section">
						<div className="cart-tax">
							<div className="title-wrap">
								<h4 className="cart-bottom-title section-bg-gray">
									Shipping Address
								</h4>
							</div>
							<div className="text-right">
								<Button
									onClick={() => handleAddressShow("S")}
									className="btn btn-primary btn-sm"
								>
									Add address
								</Button>
							</div>
							<div className="tax-wrapper">
								<Row>
									{loadAllAddress &&
										loadAllAddress.map((addr, ind) => {
											const { address_id, default_address, name = "", address = "", address1 = "",
												contact_email = "", contact_mob = "", landmark = "", city_name = "",
												state_name = "", pincode = "" } = addr;
											return (
												<Col md={4} key={ind}>
													<h5>{name}</h5>
													<p>{contact_email}</p>
													<p>{contact_mob}</p>
													<p>{address}, {address1}</p>
													<p>{landmark}</p>
													<p>{city_name}, {state_name}</p>
													<p>India - {pincode}</p>
													<Row>
														<Col md={12} className="mt-1 mb-1">
															<Button
																className={`btn btn-secondary btn-sm ${default_address === 'Y' ? 'active' : ''}`}
																style={{ width: "100%" }}
																onClick={() => makeDefaultAddress(address_id)}
															>
																Deliver to this address
															</Button>
														</Col>
														<Col md={12} className="text-center">
															<Button
																onClick={() => deleteAddress(address_id)}
																className="btn btn-secondary btn-sm"
																style={{ width: "100%" }}
															>
																Delete
															</Button>
														</Col>
														<Col md={12} className="text-center mt-1">
															<Button
																onClick={() => handleEditAddressShow(addr)}
																className="btn btn-success btn-sm"
																style={{ width: "100%" }}
															>
																Edit
															</Button>
														</Col>
													</Row>
												</Col>
											);
										})}
								</Row>
							</div>
						</div>
						<div className="cart-tax">
							<div className="title-wrap">
								<h4 className="cart-bottom-title section-bg-gray">
									Billing Address
								</h4>
							</div>
							<div className="text-right">
								<Button
									className="btn btn-primary btn-sm"
									onClick={() => handleAddressShow("B")}
								>
									Add address
								</Button>
							</div>
							<div className="tax-wrapper">
								<Row>
									{loadAllAddress &&
										loadAllAddress.map((addr, ind) => {
											const { address_id, default_address, name = "", address = "", address1 = "",
												contact_email = "", contact_mob = "", landmark = "", city_name = "",
												state_name = "", pincode = "" } = addr;
											return (
												<Col key={ind} md={4}>
													<h5>{name}</h5>
													<p>{contact_email}</p>
													<p>{contact_mob}</p>
													<p>{address}, {address1}</p>
													<p>{landmark}</p>
													<p>{city_name}, {state_name}</p>
													<p>India - {pincode}</p>
													<Row>
														<Col md={12} className="mt-1 mb-1">
															<Button
																className={`btn btn-secondary btn-sm ${default_address === 'Y' ? 'active' : ''}`}
																style={{ width: "100%" }}
																onClick={() => makeDefaultAddress(address_id)}
															>
																Deliver to this address
															</Button>
														</Col>
														<Col md={12} className="text-center">
															<Button
																onClick={() => deleteAddress(address_id)}
																className="btn btn-secondary btn-sm"
																style={{ width: "100%" }}
															>
																Delete
															</Button>
														</Col>
														<Col md={12} className="text-center mt-1">
															<Button
																className="btn btn-success btn-sm"
																style={{ width: "100%" }}
																onClick={() => handleEditAddressShow(addr)}
															>
																Edit
															</Button>
														</Col>
													</Row>
												</Col>
											);
										})}
								</Row>
							</div>
						</div>
					</Col>
					<Col lg={4} md={4}>
						{/* <div className="discount-code-wrapper">
									<div className="title-wrap">
										<h4 className="cart-bottom-title section-bg-gray">
											Use Coupon Code
										</h4>
									</div>
									<div className="discount-code">
										<p>Enter your coupon code.</p>
										<Formik
											initialValues={{ coupon_code: "" }}
											onSubmit={handleCouponSubmit}
											validationSchema={couponSchema}
										>
											{({ handleSubmit, resetForm, isSubmitting, values }) => {
												return (
													<Form onSubmit={handleSubmit}>
														<Form.Group>
															<Field
																type="text"
																name="coupon_code"
																className="form-control"
																placeholder="ASDF123"
															/>
															<ErrorMessage
																name="coupon_code"
																component="span"
																className="text-danger"
															/>

														</Form.Group>
														<Button
															type="submit"
															disabled={isSubmitting}
															className="cart-btn-2"
														>
															Apply Coupon
														</Button>
														{
															values.coupon_code !== "" && (
																<Button
																	type='reset'
																	className='cart-btn-2'
																	style={{ marginLeft: '5px' }}
																	onClick={() => {
																		setCouponApply("");
																		resetForm();
																	}}>
																	Reset
																</Button>
															)
														}
													</Form>
												);
											}}
										</Formik>
									</div>
								</div> */}
						<div className="grand-totall">
							<div className="title-wrap">
								<h4 className="cart-bottom-title section-bg-gary-cart">
									Amount
								</h4>
							</div>
							<div className="total-shipping">
								<ul>
									<li>
										Payable
										<span>
											<i className="fa fa-rupee-sign font-13"></i>
											{loadItemsForCheckout.product_cost}
										</span>
									</li>
									<li>
										Discount(s)
										<span>
											<i className="fa fa-rupee-sign font-13"></i>
											{loadItemsForCheckout.total_discount}
										</span>
									</li>
									{/* <li>
										Coupon
										<span>
											{utils.getCurSvg(14, 14)}
											{loadItemsForCheckout.coupon_discount}
										</span>
									</li> */}
									<li>
										Sub Total
										<span>
											<i className="fa fa-rupee-sign font-13"></i>
											{loadItemsForCheckout.sub_total}
										</span>
									</li>
									<li>
										GST
										<span>
											<i className="fa fa-rupee-sign font-13"></i>
											{loadItemsForCheckout.tax_amount}
										</span>
									</li>
								</ul>
							</div>

							<h5>
								Total Cost
								<span>
									<i className="fa fa-rupee-sign mr-6"></i>
									{loadItemsForCheckout.total_with_tax}
								</span>
							</h5>
							{/* <h5>
								Coupon(-)
								<span>
									{utils.getCurSvg(14, 14)}
									{loadItemsForCheckout.coupon_discount}
								</span>
							</h5> */}
							<div className="total-shipping border-bottom mb-2">
								<ul>
									<li>
										Delivery Charges
										<span>
											{/* {utils.getCurSvg(14, 14)} */}
											<i className="fa fa-rupee-sign font-13"></i>
											{loadItemsForCheckout.delivery_charges}
										</span>
									</li>
									<li>
										Round off
										<span>
											<i className="fa fa-rupee-sign font-13"></i>
											{loadItemsForCheckout.rounding_Amount}
										</span>
									</li>
								</ul>
							</div>

							<h4 className="grand-totall-title">
								Grand Total
								<span>
									<i className="fa fa-rupee-sign mr-6"></i>
									{loadItemsForCheckout?.round_total}
								</span>
							</h4>

							<Formik
								initialValues={{ payment_type: "" }}
								onSubmit={handleCheckoutSubmit}
								validationSchema={paymentSchema}
							>
								{({ handleSubmit, isSubmitting }) => {
									return (
										<Form onSubmit={handleSubmit}>
											<div role="group" aria-labelledby="my-radio-group">
												<label style={{ marginRight: '15px', marginBottom: '10px' }}>
													<Field className="mx-1" type="radio" name="payment_type" value="cash" />
													<strong>Cash on Delivery</strong>
												</label>
												<label>
													<Field className="mx-1" type="radio" name="payment_type" value="online" />
													<strong>Online Payment</strong>
												</label>
											</div>
											<ErrorMessage
												name="payment_type"
												component="span"
												className="text-danger"
											/>
											<div className="d-flex justify-content-between">
												<Button
													type="submit"
													disabled={isSubmitting}
													className="cart-btn-2"
												>
													 Place Order
												</Button>
												<Button
													className="cart-btn-2"
													onClick={() => { navigate.back() }}
												>
													Back
												</Button>
											</div>
										</Form>

									);
								}}
							</Formik>

							{/* <div className="total-shipping">
								<ul>
									<li>
										<input name="payment" type="radio" /> <strong>Cash on Delivery</strong>
										<input name="payment" type="radio" className="m-3" /> <strong>Online Payment
										</strong>
									</li>
								</ul>
							</div>
							<a href="#" onClick={() => placeOrder()}>
								Proceed to Checkout
							</a> */}

						</div>
					</Col>
				</Row>
			</Container>

			<Modal
				show={addressShow}
				onHide={handleAddressClose}
				size="md"
				keyboard={false}
				backdrop="static"
			>
				<Modal.Body className="scrollbox2">
					<div className="d-flex justify-content-between">
						<h5 className="mb-2">
							<i className="fa fa-tags"></i>
							{modalTitle}
						</h5>
						<Button onClick={handleAddressClose}>
							<i className="fa fa-times"></i>
						</Button>
					</div>
					{modalTitle && (modalTitle === "Add address" || modalTitle === "Edit address") && (
						<div className="tax-select-wrapper">
							<Formik
								innerRef={formikRef}
								initialValues={initialValues}
								onSubmit={handleAddressSubmit}
								validationSchema={addressSchema}
							>
								{({ values, handleSubmit, isSubmitting, setFieldValue, errors }) => {
									console.log('values::', values);
									console.log('errors::', errors);
									return (
										<Form onSubmit={handleSubmit}>
											<Row>
												<Col md={6}>
													<Form.Group className="form-group">
														<Form.Label>Contact Email</Form.Label>
														<Field
															type="text"
															name="contact_email"
															className="form-control"
															placeholder="Enter Email"
														/>
														<ErrorMessage
															name="contact_email"
															component="span"
															className="text-danger"
														/>
													</Form.Group>
												</Col>
												<Col md={6}>
													<Form.Group className="form-group">
														<Form.Label>Contact Mobile Number</Form.Label>
														<Field
															type="text"
															name="contact_mob"
															className="form-control"
															placeholder="Enter Mobile Number"
														/>
														<ErrorMessage
															name="contact_mob"
															component="span"
															className="text-danger"
														/>
													</Form.Group>
												</Col>
											</Row>
											<Row>
												<Col md={6}>
													<Form.Group className="form-group">
														<Form.Label>Pincode</Form.Label>
														<Field
															type="text"
															name="pincode"
															className="form-control"
															placeholder="Pincode"
														/>
														<ErrorMessage
															name="pincode"
															component="span"
															className="text-danger"
														/>
													</Form.Group>
												</Col>
												<Col md={6}>
													<Form.Group>
														<Form.Label>Landmark</Form.Label>
														<Field
															type="text"
															name="landmark"
															className="form-control"
														/>
														<ErrorMessage
															name="landmark"
															component="span"
															className="text-danger"
														/>
													</Form.Group>
												</Col>
											</Row>
											<Form.Group>
												<Form.Label>
													{" "}
													Flat, House no, Building, Company, Apartment
												</Form.Label>
												<Field
													type="text"
													name="address"
													className="form-control"
												/>
												<ErrorMessage
													name="address"
													component="span"
													className="text-danger"
												/>
											</Form.Group>
											<Form.Group>
												<Form.Label>Area, Street, Sector, Village</Form.Label>
												<Field
													type="text"
													name="address1"
													className="form-control"
												/>
												<ErrorMessage
													name="address1"
													component="span"
													className="text-danger"
												/>
											</Form.Group>
											<Row className="form-group">
												<Col md={6}>
													<Form.Label>State</Form.Label>
													<Field
														name="state_id"
														as="select"
														className="form-control"
														onChange={(e) => {
															setFieldValue("state_id", e.target.value);
															handleStateChange(e);
														}}
													>
														<option>--Select--</option>
														{
															state &&
															state.map((ele, ind) => (
																<option key={ind} value={ele.state_id}>
																	{ele.state_name}
																</option>
															))}
													</Field>
													<ErrorMessage
														name="state_id"
														component="span"
														className="text-danger"
													/>
												</Col>
												<Col md={6}>
													<Form.Label>Town/City</Form.Label>
													<Field
														as="select"
														type="text"
														className="form-control"
														name="city_id"
													>
														<option>--Select--</option>
														{
															city &&
															city.map((ele, ind) => (
																<option key={ind} value={ele.city_id}>
																	{ele.city_name}
																</option>
															))
														}
													</Field>
													<ErrorMessage
														name="city_id"
														component="span"
														className="text-danger"
													/>
												</Col>
											</Row>
											<Form.Group>
												<label>
													<Field
														type="checkbox"
														name="default_address"
														checked={values.default_address === 'Y' ? true : false}
														onChange={e => setFieldValue('default_address', e.target.checked ? 'Y' : 'N')}
													/>
													Make default address
												</label>
											</Form.Group>
											<Form.Group>
												<Button
													type="submit"
													disabled={isSubmitting}
													style={{ width: "100%" }}
													className="btn btn-success btn-sm"
												>
													Submit
												</Button>
											</Form.Group>
										</Form>
									);
								}}
							</Formik>
						</div>
					)}
				</Modal.Body>
			</Modal>
			{
				triggerPayment && (
					<form name="paymentWeb" method="post" action={paymentDetails.payment_url} ref={paymentForm}>
						<input type="hidden" name="key" value={paymentDetails.key} />
						<input type="hidden" name="txnid" value={paymentDetails.txnid} />
						<input type="hidden" name="productinfo" value={paymentDetails.productinfo} />
						<input type="hidden" name="amount" value={paymentDetails.amount} />
						<input type="hidden" name="email" value={paymentDetails.email} />
						<input type="hidden" name="firstname" value={paymentDetails.firstname} />
						<input type="hidden" name="lastname" value={paymentDetails.lastname} />
						<input type="hidden" name="surl" value={paymentDetails.surl} />
						<input type="hidden" name="furl" value={paymentDetails.furl} />
						<input type="hidden" name="phone" value={paymentDetails.phone} />
						<input type="hidden" name="hash" value={paymentDetails.hash} />
						<button type="submit" style={{ display: "none" }} />
					</form>
				)
			}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		token: state.account?.token,
		username: state.account?.profileUser.first_name,
		cart: state.cartItems?.cart,
		cartTotal: state.cartItems?.total,
	};
};

const mapDispatchToProps = {
	removeAllCart
}

export default connect(mapStateToProps, mapDispatchToProps)(Billing);
