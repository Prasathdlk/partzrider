import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button, Modal, Form } from 'react-bootstrap';
import Link from 'next/link';
import { cartService, orderService } from 'core/services';
import { connect } from 'react-redux';
import { addToCart, removeFromCart } from 'redux/action/account.action';
import { utils } from 'core/helper';
import Image from 'next/image';

const CartItems = (props) => {
    const { addToCart, removeFromCart } = props;
    const [loadItemForCheckout, setLoadItemsForCheckout] = useState({});
    const [schmeShow, setSchemeShow] = useState(false);
    const [schemeData, setschemeData] = useState([]);
    const [itemQty, setItemQty] = useState([]);

    useEffect(() => {
        loadItemForCheckoutPage();
    }, []);

    function removeCartItem(item) {
        const { item_id, item_image, item_name, item_no, item_spec, price } = item;

        cartService.removeItemFromCart(item).then((resp) => {
            if (resp.is_successful) {
                const previousItem = { item_id, item_image, item_name, item_no, item_spec, price };
                removeFromCart(previousItem);
                loadItemForCheckoutPage();
            } else {
                utils.showErrMsg(resp.message);
            }
        }).catch(error => {
            utils.showErrMsg(utils.handleErr(error));
        });
    };

    function loadItemForCheckoutPage() {
        orderService.loadItemForCheckoutPage().then((resp) => {
            if (resp.is_successful) {
                setLoadItemsForCheckout(resp);
                if(resp.items)
                {   
                    const filterItemIds = resp.items.map((item) => item['qty']);
                    setItemQty(filterItemIds);
                }
            } else {
                utils.showErrMsg(resp.message);
            }
        }).catch(error => {
            utils.showErrMsg(utils.handleErr(error));
        });
    };

    const handleItemQty = (ind, upQty, ele) => {
        itemQty[ind] = upQty;
        setItemQty([...itemQty, itemQty]);
        handleQtyChange(upQty, ele);
    }

    const handleSchemeShow = (item_id) => {
        setSchemeShow(true);
        loadSchemeDiscount(item_id)
    };

    const handleSchemeClose = () => setSchemeShow(false);

    function loadSchemeDiscount(item_id) {
        orderService.loadSchemeDiscount(item_id).then((resp) => {
            if (resp.is_successful) {
                setschemeData(resp.result);
            } else {
                utils.showErrMsg(resp.message);
            }
        }).catch(error => {
            utils.showErrMsg(utils.handleErr(error));
        });
    };

    const handleQtyChange = (upItemQty, item) => {
        const { item_id, item_image, item_name, item_no, item_spec, price } = item;
        const payload = { item_id, qty: upItemQty };
        cartService.addItemTocart(payload).then((resp) => {
            if (resp.is_successful) {
                utils.showSuccessMsg(resp.message);
                const stateItem = { item_id, item_image, item_name, item_no, item_spec, price, qty: upItemQty }
                addToCart(stateItem);
                loadItemForCheckoutPage();
            } else {
                utils.showErrMsg(resp.message);
            }

        }).catch(error => {
            utils.showErrMsg(utils.handleErr(error));
        });
    }

    return (
        <div className="checkout-area mt-60px mb-40px">
            <Container>
                <Row>
                    <Col md={12}>
                        <Table className="tabletable-responsive">
                            {
                                loadItemForCheckout &&
                                loadItemForCheckout.items &&
                                loadItemForCheckout.items.map((ele, ind) => {
                                    return (
                                        <div key={ind}>
                                            <Row>
                                                <Col md={12} className="text-left">
                                                    <h5>{ele.item_name}</h5>
                                                    <h6>{ele.item_no}</h6>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={3} className="text-center">
                                                    <div className="m-1">
                                                        <Image src={ele.item_image}
                                                            width={186}
                                                            height={148}
                                                            className="img-responsive"
                                                            alt="cart-img" />
                                                    </div>
                                                </Col>
                                                <Col md={5} className="">
                                                    <h5>{ele.brand_name}</h5>
                                                    <Row className="m-1">
                                                        <Col md={4}><strong>Quantity</strong></Col>
                                                        <Col md={8}></Col>
                                                    </Row>
                                                    <Row className="m-1">
                                                        <Col md={4}>
                                                            <div className="product-quantity1">
                                                                <div className="cart-plus-minus">
                                                                    <div className="dec qtybutton"
                                                                        onClick={() =>
                                                                            handleItemQty(ind, (itemQty[ind] - 1), ele)
                                                                        }>-</div>
                                                                    <Form.Control
                                                                        className="cart-plus-minus-box"
                                                                        type="number"
                                                                        name="qtybutton"
                                                                        value={itemQty[ind]}
                                                                        onChange={(e) => {
                                                                            const val = parseInt(e.target.value);
                                                                            handleItemQty(ind, val, ele)
                                                                        }}
                                                                    />
                                                                    <div className="inc qtybutton"
                                                                        onClick={() =>
                                                                            handleItemQty(ind, (itemQty[ind] + 1), ele)
                                                                        }>+</div>
                                                                </div>
                                                                {/* <div className="cart-plus-minus">
                                                                    <input
                                                                        className="cart-plus-minus-box"
                                                                        type="text"
                                                                        name="qty"
                                                                        // value={itemQty[ind]}
                                                                        onBlur={(e) => handleQtyChange(e, ele)}
                                                                    />
                                                                </div> */}
                                                            </div>
                                                        </Col>
                                                        
                                                        <Col md={4} className="text-right m-2">
                                                            <span className='font-13'><i className="fa fa-rupee-sign"></i></span>
                                                            {ele.price}
                                                        </Col>
                                                        <Col md={4} className="text-right"></Col>
                                                    </Row>
                                                    {
                                                        ele.is_scheme_discount_available === 'Y' && (
                                                            <Row className="m-1">
                                                                <Col md={12}>
                                                                    <Button className="btn btn-success btn-sm" onClick={() => handleSchemeShow(ele.item_id)}>
                                                                        <i className="fa fa-tags"></i> Scheme
                                                                    </Button>
                                                                </Col>
                                                            </Row>
                                                        )
                                                    }

                                                    <Row className="m-1 p-0">
                                                        <Col md={4}><strong>Discount</strong></Col>
                                                        <Col md={8}></Col>
                                                    </Row>
                                                    {
                                                        ele.is_default_discount_available === 'Y' && (
                                                            <Row className="m-1 p-0">
                                                                <Col md={5}>Default Discount</Col>
                                                                <Col md={3} className="text-right">
                                                                    {
                                                                        ele.default_discount_type === 'Percentage' ?
                                                                            ele.default_discount_value + '%' : ele.default_discount_value
                                                                    }
                                                                </Col>
                                                                <Col md={4} className="text-right">
                                                                    {/* <span>{utils.getCurSvg(14, 14)}</span> */}
                                                                    <span className='font-13'><i className="fa fa-rupee-sign"></i></span>
                                                                    {ele.default_discount}
                                                                </Col>
                                                            </Row>
                                                        )
                                                    }
                                                    {
                                                        ele.is_additional_discount_available === 'Y' && (
                                                            <Row className="m-1 p-0">
                                                                <Col md={5}>Additional Discount</Col>
                                                                <Col md={3} className="text-right">
                                                                    {
                                                                        ele.additional_discount_type === 'Percentage' ?
                                                                            ele.additional_discount_value + '%' : ele.additional_discount_value
                                                                    }
                                                                </Col>
                                                                <Col md={4} className="text-right">
                                                                    <span className='font-13'><i className="fa fa-rupee-sign"></i></span>
                                                                    {ele.additional_discount}
                                                                </Col>
                                                            </Row>
                                                        )
                                                    }
                                                    {
                                                        ele.is_scheme_discount_available === 'Y' && (
                                                            <Row className="m-1 p-0">
                                                                <Col md={5}>Scheme Discount</Col>
                                                                <Col md={3} className="text-right">
                                                                    {
                                                                        ele.scheme_discount_type === 'Percentage' ?
                                                                            ele.scheme_discount_value + '%' : ele.scheme_discount_value
                                                                    }
                                                                </Col>
                                                                <Col md={4} className="text-right">
                                                                    <span className='font-13'><i className="fa fa-rupee-sign"></i></span>
                                                                    {ele.scheme_discount}
                                                                </Col>
                                                            </Row>
                                                        )
                                                    }
                                                    <Row className="m-1">
                                                        <Col md={7}>Total Discount</Col>
                                                        <Col md={5} className="text-right">
                                                            <span className='font-13'><i className="fa fa-rupee-sign"></i></span>
                                                            {ele.total_discount}
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col md={4} className="">
                                                    <Row className="m-1 p-0">
                                                        <Col md={12}>
                                                            <span><strong>Amount</strong>
                                                                <span style={{ float: 'right' }}>
                                                                    <a onClick={() => removeCartItem(ele)}>
                                                                        <i className="fa fa-times"></i>
                                                                    </a>
                                                                </span>
                                                            </span>
                                                        </Col>
                                                    </Row>
                                                    <Row className="m-1 p-0">
                                                        <Col md={7}>Payable</Col>
                                                        <Col md={5} className="text-right">
                                                            <span className='font-13'><i className="fa fa-rupee-sign"></i></span>
                                                            {ele.amount}
                                                        </Col>
                                                    </Row>
                                                    <Row className="row m-1 p-0">
                                                        <Col md={7}>Discount(s)</Col>
                                                        <Col md={5} className="text-right">
                                                            <span className='font-13'><i className="fa fa-rupee-sign"></i></span>
                                                            {ele.total_discount}
                                                        </Col>
                                                    </Row>
                                                    <Row className="m-1 p-0">
                                                        <Col md={7}>Sub Total</Col>
                                                        <Col md={5} className="text-right">
                                                            <span className='font-13'><i className="fa fa-rupee-sign"></i></span>
                                                            {ele.sub_total}
                                                        </Col>
                                                    </Row>
                                                    <Row className="m-1 border-bottom pt-2 pb-2">
                                                        <Col md={7}>GST {ele.tax_rate}%</Col>
                                                        <Col md={5} className="text-right">
                                                            <span className='font-13'><i className="fa fa-rupee-sign"></i></span>
                                                            {ele.tax_amount}
                                                        </Col>
                                                    </Row>
                                                    <Row className="m-1">
                                                        <Col md={7}><strong>Grand Total</strong></Col>
                                                        <Col md={5} className="text-right"><strong>
                                                            <span className='font-13'><i className="fa fa-rupee-sign"></i></span>
                                                            {ele.grand_total}
                                                        </strong></Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </div>
                                    )
                                })
                            }
                        </Table>

                        <Modal
                            show={schmeShow}
                            onHide={handleSchemeClose}
                            size="sm"
                            centered
                        >
                            <Modal.Header style={{ justifyContent: 'flex-start' }}>
                                <h5 className="mb-2"><i className="fa fa-tags"></i> SCHEME</h5>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="row form-group">
                                    <div className="col-md-12">
                                        {
                                            schemeData && schemeData[0] && (
                                                <table width="100%" className="table table-border">
                                                    <tr>
                                                        <th>Manufacturer</th>
                                                        <th>{schemeData[0].manufacturer_name}</th>
                                                        <th>Part No</th>
                                                        <th>{schemeData[0].discount_type}</th>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <th>From Range</th>
                                                        <th>To Range</th>
                                                        <th></th>
                                                        <th>Discount</th>
                                                    </tr>
                                                    {
                                                        schemeData.map((ele, ind) => {
                                                            const { from_qty, to_qty, discount_type, discount_value } = ele;
                                                            return (
                                                                <tr key={ind}>
                                                                    <td>{from_qty}</td>
                                                                    <td>{to_qty}</td>
                                                                    <td></td>
                                                                    <td>{discount_type === 'Percentage' ? discount_value + '%' : discount_value}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </table>
                                            )
                                        }
                                    </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleSchemeClose}>
                                    OK
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Col>
                </Row>
                <Row className="your-order-area">
                    <Col lg={9}></Col>
                    <Col lg={3}>
                        <div className="Place-order mt-2">
                            <Link className="btn-hover" href={"/checkout"} >Check Out</Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        cart: state.cartItems?.cart
    };
};

const mapDispatchToProps = {
    addToCart,
    removeFromCart
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItems);