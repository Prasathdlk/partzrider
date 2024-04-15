import React, { Fragment, useEffect, useState } from "react";
import { itemService, orderService } from 'core/services';
import Image from 'next/image';
import Accordion from 'react-bootstrap/Accordion';
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from 'yup'
import { utils } from "core/helper";

const cancelOrderValues = {
    reason_id: '',
};

const returnOrReplaceValues = {
    reason_id: '',
    type: '',
};

const returnOrReplaceSchema = Yup.object().shape({
    reason_id: Yup
        .string()
        .required('Return / Replacement reason is required'),
    type: Yup
        .string()
        .required('Type is required'),
})

const cancelOrderSchema = Yup.object().shape({
    reason_id: Yup
        .string()
        .required('Cancel reason is required')
});

export default function Cart() {
    const [orders, setOrders] = useState([]);
    const [orderDetail, setOrderDetail] = useState(null);
    const [cancelOrderDetails, setCancelOrderDetails] = useState(false);
    const [customerOrderId, setCustomerOrderId] = useState();
    const [modalTitle, setModalTitle] = useState('');
    const [loadCancelOrderReson, setLoadCancelOrderReason] = useState([]);
    const [loadReturnOrReplace, setLoadReturnOrReplace] = useState([]);
    const [returnOrReplaceIds, setReturnOrReplaceIds] = useState([]);

    const handleShow = () => setCancelOrderDetails(true);
    const handleClose = () => setCancelOrderDetails(false);

    useEffect(() => {
        loadUserOrders();
        loadCancelOrderReason();
        loadReplaceOrReplace();
    }, []);

    function loadCancelOrderReason() {
        orderService.loadCancelOrderReason().then((resp) => {
            setLoadCancelOrderReason(resp.result)
        }).catch((error) => {
            utils.showErrMsg(utils.handleErr(error));
        });
    };

    function loadReplaceOrReplace() {
        orderService.loadReturnOrReplace().then((resp) => {
            setLoadReturnOrReplace(resp.result)
        }).catch((error) => {
            utils.showErrMsg(utils.handleErr(error));
        });
    };

    function loadUserOrders() {
        itemService.loadOrders().then((resp) => {
                setOrders(resp.result);
            })
            .catch((error) => {
                utils.showErrMsg(utils.handleErr(error));
            });
    };

    const handleOrderDetail = (order) => {
        if (orderDetail && (orderDetail.customer_order_id !== order.customer_order_id)) {
            setOrderDetail(null);
            load_order_details(order.customer_order_id);
        }
         else 
         {
            load_order_details(order.customer_order_id);
        }
    };

    function load_order_details(order_id) {
        itemService
            .load_order_details(order_id)
            .then((resp) => {
                const orderDetail = resp.result[0];
                orderDetail.items.map((ele) => ele.selected = false);
                setOrderDetail(orderDetail);
            })
            .catch((error) => {
                utils.showErrMsg(utils.handleErr(error));
            });
    };

         const orderAccordion = (order, ordInd) => {
        console.log(order)
        const statClsArr = {
            Pending: "bg-danger",
            Shipped: "bg-warning",
            Delivered: "bg-success",
            Returned: "bg-info",
            Replaced: "bg-info",
            Cancelled: "bg-danger",
            Refunded: "bg-success"
        };
        const selectedArr = [];
        return (
            <Accordion.Item key={ordInd} eventKey={ordInd}>
                <Accordion.Header onClick={(e) => handleOrderDetail(order)}>
                    <label className="tab-label" htmlFor="chck1">
                        <div className="list2">
                            <ul className="">
                                <li>Invoice Date : <strong>{order.order_date}</strong></li>
                                <li>Invoice Number : <strong>{order.order_no}</strong></li>
                                <li>Invoice Amount : <strong>Rs.{order.net_amount}</strong></li>
                                {/* console.log({order}); */}
                                <li>Payment Status : <strong>{order.payment_status}</strong></li>
                                <li>Order Status : <strong>{order.order_status}</strong></li>
                            </ul>
                        </div>
                    </label>
                </Accordion.Header>
                <Accordion.Body>
                    {
                        orderDetail &&
                        orderDetail.items &&
                        orderDetail.items.length > 0 && (
                            <table className="table table-responsive" width="100%">
                                <thead>
                                    <tr>
                                        <th width="4%"></th>
                                        <th width="6%">Image</th>
                                        <th width="15%">Part No</th>
                                        <th>Part Name</th>
                                        <th width="5%">Status</th>
                                        <th width="10%">Qty</th>
                                        <th width="10%" className="text-right">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* {
                                        orderDetail.items.map((orderDet) => (
                                            <tr key={orderDet.ordertrans_id}>
                                                <td>
                                                    <input type="checkbox"
                                                        id="rowcheck{orderDet.ordertrans_id}"
                                                        checked={orderDet.selected}
                                                        onChange={(eve) => handleCheckboxChange(eve, orderDet)}
                                                    />
                                                </td>
                                                <td>
                                                    <div>
                                                        {
                                                            orderDet.item_image !== '' && orderDet.item_image !== null && (
                                                                <Image
                                                                    className="first-img"
                                                                    alt=""
                                                                    layout="responsive"
                                                                    width={100}
                                                                    height={100}
                                                                    src={orderDet.item_image}
                                                                />
                                                            )
                                                        }
                                                    </div>
                                                </td>
                                                <td>{orderDet.item_no}</td>
                                                <td>{orderDet.item_name}</td>
                                                <td>
                                                    {
                                                        orderDet.delivery_status !== "-" ? (
                                                            <button className={`btn btn-sm text-white ${orderDet.delivery_status ? statClsArr[orderDet.delivery_status] : 'bg-success'}`}>{orderDet.delivery_status}</button>
                                                        ) : "-"
                                                    }
                                                </td>
                                                <td>{orderDet.qty}</td>
                                                <td className="text-right">
                                                    {orderDet.net_amount}
                                                </td>
                                            </tr>
                                        ))
                                    } */}
                                    {
                                        orderDetail && orderDetail.items.map((orderDet, ordDetInd) => getOrderDetTr(orderDet, ordDetInd))
                                    }
                                    {
                                        orderDetail.grand_total && (
                                            <Fragment key={'asdf'}>
                                                <tr>
                                                    <td></td>
                                                    <td colSpan="4"></td>
                                                    <td>Total</td>
                                                    <td className="text-right">{orderDetail.taxable_amount}</td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td colSpan="4"></td>
                                                    <td>GST</td>
                                                    <td className="text-right">{orderDetail.gst}</td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td colSpan="4"></td>
                                                    <td>Delivery Charges</td>
                                                    <td className="text-right">{orderDetail.delivery_charges}</td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td colSpan="4"></td>
                                                    <td>Round Off</td>
                                                    <td className="text-right">{orderDetail.round_off}</td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td colSpan="4"></td>
                                                    <td><strong>Net Amount</strong></td>
                                                    <td className="text-right">
                                                        <strong>{orderDetail.grand_total}</strong>
                                                    </td>
                                                </tr>

                                                {getOrderCancelReturnAndReplaceTr(order, orderDetail)}
                                            </Fragment>
                                        )
                                    }
                                </tbody>
                            </table>
                        )
                    }
                </Accordion.Body>
            </Accordion.Item>
        )
    };

    const getOrderDetTr = (order, ind) => {
        const {
            item_no, item_name, qty, net_amount,total_amount,
            ordertrans_id, selected, item_returnable,
            delivery_status = "-", item_image = null,
        } = order;
        const statClsArr = {
            Pending: "bg-danger",
            Shipped: "bg-warning",
            Delivered: "bg-success",
            Returned: "bg-info",
            Replaced: "bg-info",
            Cancelled: "bg-danger"
        };
        return (
            <tr key={ordertrans_id}>
                <td>
                    <input type="checkbox"
                        id="rowcheck{ordertrans_id}"
                        disabled={item_returnable === "Y" ? "" : "disabled"}
                        checked={selected}
                        onChange={(eve) => handleCheckboxChange(eve, order)}
                    />
                </td>
                <td>
                    <div>
                        {
                            item_image && (
                                <Image
                                    className="first-img"
                                    alt=""
                                    layout="responsive"
                                    width={100}
                                    height={100}
                                    src={item_image}
                                />
                            )
                        }
                    </div>
                </td>
                <td>{item_no}</td>
                <td>{item_name}</td>
                <td>
                    {
                        delivery_status !== "-" ? (
                            <button className={`btn btn-sm text-white ${statClsArr[delivery_status] ? statClsArr[delivery_status] : 'bg-success'}`}>{delivery_status}</button>
                        ) : "-"
                    }
                </td>
                <td>{qty}</td>
                <td className="text-right">{total_amount}</td>
            </tr>
        )
    };

    const getOrderCancelReturnAndReplaceTr = (order, orderDetail) => {
        const showCancelBtn = (order.order_cancellable === "Y");
        const showReturnReplaceBtn = (orderDetail.items.filter(e => e.item_returnable === "Y").length > 0);
        const showTr = showCancelBtn || showReturnReplaceBtn;
        if (!showTr) {
            return false;
        }

        return (
            <tr>
                <td colSpan={'6'}>
                    <div className="d-flex">
                        {
                            showCancelBtn && (
                                <button
                                    onClick={() => handleOrderCancel(order.customer_order_id)}
                                    className="btn btn-danger"
                                >
                                    Cancel Order
                                </button>
                            )
                        }
                        {
                            showReturnReplaceBtn && (
                                <button
                                    className="btn btn-warning btn-sm mx-2"
                                    onClick={() => handleReplaceOrder()}
                                >
                                    Return / Replacement
                                </button>
                            )
                        }
                    </div>
                </td>
            </tr>
        )
    };

    const handleCheckboxChange = (event, order) => {

        let tempList = orderDetail.items;
        tempList.map((ele) => {
            if (ele.ordertrans_id === order.ordertrans_id) {
                ele.selected = event.target.checked;
            }
            return order;
        });

        orderDetail.items = tempList;
        setOrderDetail({ ...orderDetail });

        // if (event.target.checked) {
        //     returnOrReplaceIds.push(ordertrans_id);
        //     setReturnOrReplaceIds(returnOrReplaceIds);
        // } else {
        //     returnOrReplaceIds.splice(returnOrReplaceIds.indexOf(ordertrans_id), 1);
        //     setReturnOrReplaceIds(returnOrReplaceIds);
        // }
    };

    const handleOrderCancel = (customerOrderId) => {
        setModalTitle('Cancel Order')
        handleShow();
        setCustomerOrderId(customerOrderId);
    };

    const handleReplaceOrder = () => {
        setModalTitle('Return / Replacement');
        handleShow();
    };

    const handleCancelOrderSubmit = (values, { setSubmitting }) => {
        values.customer_order_id = customerOrderId;
        orderService.cancelOrder(values).then((resp) => {
            if (resp.is_successful === true) {
                utils.showSuccessMsg(resp.message);
                handleClose();
                loadUserOrders();
            } else {
                utils.showErrMsg(resp.message);
                setSubmitting(false);
            }
        }).catch((error) => {
            utils.showErrMsg(utils.handleErr(error));
        });
    };

    const handleReturnOrReplaceSubmit = (values, { setSubmitting }) => {
        values.order_trans_id = orderDetail.items.filter((e) => e.selected).map(ele => ele.ordertrans_id);
        orderService.returnOrReplaceOrder(values).then((resp) => {
            if (resp.is_successful === true) {
                utils.showSuccessMsg(resp.message);
                handleClose();
                loadUserOrders();
            } else {
                utils.showErrMsg(resp.message);
                setSubmitting(false);
            }
        }).catch((error) => {
            utils.showErrMsg(utils.handleErr(error));
        });
    };

    return (
        <div className="home-5 home-6 home-8 home-9 home-electronic">
            <div id="main">
                <section className="breadcrumb-area2">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="breadcrumb-content">
                                    <ul className="breadcrumb-links">
                                        <li><a href="">Your Account</a></li>
                                        <li>Your Orders</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                <div className="cart-main-area mtb-60px">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                {
                                    orders.length > 0 && (
                                        <Fragment>
                                            <Accordion>
                                                {orders.map((order, ordInd) => orderAccordion(order, ordInd))}
                                            </Accordion>
                                            <Modal
                                                show={cancelOrderDetails}
                                                onHide={handleClose}
                                                size="sm"
                                                centered
                                                keyboard={false}
                                                backdrop="static"
                                            >
                                                <Modal.Header closeButton>
                                                    <h5 className="mb-2">{modalTitle}</h5>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    {modalTitle && modalTitle === 'Cancel Order' && (
                                                        <Formik
                                                            initialValues={cancelOrderValues}
                                                            onSubmit={handleCancelOrderSubmit}
                                                            validationSchema={cancelOrderSchema}
                                                        >
                                                            {({ handleSubmit, isSubmitting }) => {
                                                                return (
                                                                    <Form onSubmit={handleSubmit}>
                                                                        <Row>
                                                                            <Col md={5}>
                                                                                <Form.Label>Cancel Reason</Form.Label>
                                                                            </Col>
                                                                            <Col md={7}>
                                                                                <Field
                                                                                    as="select"
                                                                                    className="form-control"
                                                                                    name="reason_id"
                                                                                >
                                                                                    <option value="">--Select--</option>
                                                                                    {loadCancelOrderReson.map((ele, ind) => (
                                                                                        <option key={ind} value={ele.reason_id}>
                                                                                            {ele.reason_text}
                                                                                        </option>
                                                                                    ))}
                                                                                </Field>
                                                                                <ErrorMessage name="reason_id" component="span" className="text-danger" />
                                                                            </Col>
                                                                        </Row>
                                                                        <Row>
                                                                            <div className="d-flex justify-content-end mt-3">
                                                                                <Button disabled={isSubmitting} variant="btn btn-success" className="mx-2" type="submit">Submit</Button>
                                                                                <Button variant="btn btn-danger" onClick={handleClose}>
                                                                                    Cancel
                                                                                </Button>
                                                                            </div>
                                                                        </Row>
                                                                    </Form>
                                                                )
                                                            }}
                                                        </Formik>
                                                    )}
                                                    {modalTitle && modalTitle === 'Return / Replacement' && (
                                                        <Formik
                                                            initialValues={returnOrReplaceValues}
                                                            onSubmit={handleReturnOrReplaceSubmit}
                                                            validationSchema={returnOrReplaceSchema}
                                                        >
                                                            {({ handleSubmit, isSubmitting }) => {
                                                                return (
                                                                    <Form onSubmit={handleSubmit}>
                                                                        <Row>
                                                                            <Col md={5}>
                                                                                <Form.Label>Return / Replacement Reason</Form.Label>
                                                                            </Col>
                                                                            <Col md={7}>
                                                                                <Field
                                                                                    as="select"
                                                                                    className="form-control"
                                                                                    name="reason_id"
                                                                                >
                                                                                    <option value="">--Select--</option>
                                                                                    {loadReturnOrReplace.map((ele, ind) => (
                                                                                        <option key={ind} value={ele.reason_id}>
                                                                                            {ele.reason_text}
                                                                                        </option>
                                                                                    ))}
                                                                                </Field>
                                                                                <ErrorMessage name="reason_id" component="span" className="text-danger" />
                                                                            </Col>
                                                                        </Row>
                                                                        <Row className="mt-3">
                                                                            <Col md={5}>
                                                                                <Form.Label>Type</Form.Label>
                                                                            </Col>
                                                                            <Col md={7}>
                                                                                <Field
                                                                                    as="select"
                                                                                    className="form-control"
                                                                                    name="type"
                                                                                >
                                                                                    <option value="">--Select--</option>
                                                                                    <option value="Return">Return</option>
                                                                                    <option value="Replace">Replacement</option>
                                                                                </Field>
                                                                                <ErrorMessage name="type" component="span" className="text-danger" />
                                                                            </Col>
                                                                        </Row>
                                                                        <Row>
                                                                            <div className="d-flex justify-content-end mt-3">
                                                                                <Button disabled={isSubmitting} variant="btn btn-success" className="mx-2" type="submit">Submit</Button>
                                                                                <Button variant="btn btn-danger" onClick={handleClose}>
                                                                                    Cancel
                                                                                </Button>
                                                                            </div>
                                                                        </Row>
                                                                    </Form>
                                                                )
                                                            }}
                                                        </Formik>
                                                    )}
                                                </Modal.Body>
                                            </Modal>
                                        </Fragment>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}