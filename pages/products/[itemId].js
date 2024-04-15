import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { connect } from 'react-redux';
import { Form, Col, Row, Button, Modal } from 'react-bootstrap';
import BreadCrumb from 'components/products/view-product/viewproduct-breadcrumb';
import ProductDetailsImage from 'components/products/view-product/product-details-main/image';
import ProductExtraDescrition from 'components/products/view-product/product-details-extra/extra-description';
// import ProductDetailsDescription from 'components/products/view-product/product-details-main/description';
// import RecentAddProduct from 'components/products/view-product/recent-product/recent-add-product';
import SameProduct from 'components/products/view-product/recent-product/same-add-product';
import { cartService, wishlistService, itemService, orderService } from 'core/services';
import { utils } from 'core/helper';
import { addToCart, addToWishlist } from 'redux/action/account.action';
import { Field, Formik } from "formik";
import Image from "next/image";
import freeDeliveryImg from "public/styles/assets/images/free-delivery-new.jpg";

const initialValues = {
    cod: 1,
    delivery_pincode: ''
}

const ViewProduct = (props) => {

    const { token, addToCart, addToWishlist, master_settings } = props;
    const [itemDetails, setItemDetails] = useState([]);
    const [cartCount, setCartCount] = useState(1);
    const [estimateDeliveryInputVal, setEstimatedDeliveryInputVal] = useState(null);
    const [schmeShow, setSchemeShow] = useState(false);
    const [schemeData, setschemeData] = useState([]);
    const router = useRouter();
    const itemId = router.query.itemId;
    const navigate = useRouter();
    const handleSchemeShow = (item_id) => {
        setSchemeShow(true);
        loadSchemeDiscount(item_id);
    };

    const handleSchemeClose = () => setSchemeShow(false);
    function loadSchemeDiscount(item_id) {
        orderService.loadSchemeDiscount(item_id).then((resp)=>{
            setschemeData(resp.result);
        }).catch(error => {
            utils.showErrMsg(utils.handleErr(error));
        });
    };
    
    // console.log(router.query);
    
    useEffect(() => {
        if (itemId) {
            loadItemDetails(itemId);
        }
    }, [itemId]);

    function loadItemDetails(itemId) {
        itemService.loadItemDetails(itemId).then((resp) => {
            setItemDetails(resp.result[0]);
            console.log(resp.result[0]);
        }).catch(error => {
            utils.showErrMsg(utils.handleErr(error));
        });
    };

    function addItemToCart(item) {
        if (!token) {
            console.log('user not loggedIn');
            setTimeout(() => { navigate.push('/login') }, 200);
            return false;
        }

        const { item_id, images, item_name, item_no, item_spec, default_discount, price } = item;
        const item_image = images && images[0] && images[0].image_url ? images[0].image_url : "";
        const payload = { item_id, qty: cartCount };
        cartService.addItemTocart(payload).then((resp) => {

            if (resp.is_successful) {

                utils.showSuccessMsg(resp.message);
                const newPrice = default_discount ? default_discount : price
                const stateItem = { item_id, item_image, item_name, item_no, item_spec, price: newPrice, qty: cartCount }
                console.log('newPrice::', stateItem.price);
                addToCart(stateItem);

            } else {
                utils.showErrMsg(resp.message);
            }

        }).catch(error => {
            utils.showErrMsg(utils.handleErr(error));
        });
    };

    function addItemToWishlist(payload) {
        console.log('product-description-item::', payload);
        if (!token) {
            setTimeout(() => { navigate.push('/login') }, 200);
            return false;
        }
        const {
            item_id, images, item_name,
            item_no, item_spec, price, default_discount
        } = payload;
        const item_image = images && images[0] && images[0].image_url ? images[0].image_url : "";

        wishlistService.addItemToWishlist({ item_id }).then((resp) => {
            const { is_successful, message } = resp;
            if (is_successful) {
                const stateItem = {
                    item_id, item_image, item_name, item_no, item_spec,
                    price: default_discount ? default_discount : price
                };
                addToWishlist(stateItem);
                utils.showSuccessMsg(message);
            } else {
                utils.showErrMsg(message);
            }
        }).catch(error => {
            utils.showErrMsg(utils.handleErr(error))
        });
    };

    function handleDeliverySubmit(payload) {
        if (payload.delivery_pincode === "") {
            utils.showErrMsg(utils.handleErr('Enter valid pincode'));
            return false;
        }
        orderService.getEstimatedDeliveyDays(payload).then((resp) => {
            if (resp.is_successful) {
                utils.showSuccessMsg(resp.message);
                setEstimatedDeliveryInputVal(`Delivery in ${resp.estimated_delivery_days} days`);
            } else {
                setEstimatedDeliveryInputVal("");
                utils.showErrMsg(resp.message);
            }
        }).catch(error => {
            utils.showErrMsg(utils.handleErr(error));
        });
    };

    const buyNow = (item) => {
        if (!token) {
            console.log('user not loggedIn');
            setTimeout(() => { navigate.push('/login') }, 200);
            return false;
        }

        const { item_id, images, item_name, item_no, item_spec, default_discount, price } = item;
        const item_image = images && images[0] && images[0].image_url ? images[0].image_url : "";
        const payload = { item_id, qty: cartCount };
        cartService.addItemTocart(payload).then((resp) => {

            if (resp.is_successful) {
                const newPrice = default_discount ? default_discount : price
                const stateItem = { item_id, item_image, item_name, item_no, item_spec, price: newPrice, qty: cartCount }
                addToCart(stateItem);
                navigate.push("/checkout");
            } else {
                utils.showErrMsg(resp.message);
       }     

        }).catch(error => {
            utils.showErrMsg(utils.handleErr(error));
        });
    };

    const getDiscountPriceString = (ele) => {
        return (
            <>
                <li className="old-price">
                    <span>{utils.getCurSvg(20, 20)}</span>
                    {ele.price}
                </li>
                <li className="current-price mx-2">{ele.default_discount}</li>
            </>
        )
    };

    const getNormalPriceString = (ele) => {
        return (
            <>
                <li className="old-price">
                    <span>{utils.getCurSvg(20, 20)}</span>
                </li>
                <li className="current-price mx-2">{ele.default_discount}</li>
            </>
        )
    };
    
    return (
        <div className="home-5 home-6 home-8 home-9 home-electronic">
            <div id="main">
                <BreadCrumb />
                <section className="product-details-area mtb-60px">
                    <div className="container">
                        <div className="row">
                            <ProductDetailsImage product={itemDetails} />
                            <Col xl={6} lg={6} md={12}>
                                <div className="product-details-content">
                                    <h2>{itemDetails.item_name}</h2>
                                    <p className="reference">Stock Availability :<span> {itemDetails.availabilty}</span>
                                        {
                                            itemDetails.is_scheme_discount_available === 'Y' && (
                                                <span style={{ float: 'right' }}>
                                                    <Button variant="btn btn-success btn-sm"
                                                        onClick={() => handleSchemeShow(itemDetails.item_id)}>
                                                        <i className="fa fa-tags"></i>Scheme
                                                    </Button>

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

                                                </span>
                                            )
                                        }
                                    </p>
                                    <Row>
                                        <Col md={3}>
                                        {
                                            (parseFloat(master_settings["Delivery Charges"] || 0) == 0) 
                                                &&
                                            <Image src={freeDeliveryImg} />
                                        }
                                        </Col>
                                    </Row>
                                    <Row className="mt-3 mb-3">
                                        <Col md={12}>
                                            <div className="pricing-meta">
                                                <ul>
                                                    {
                                                        (itemDetails.default_discount !== "0") &&
                                                            (itemDetails.default_discount !== itemDetails.price) ?
                                                            getDiscountPriceString(itemDetails) : getNormalPriceString(itemDetails)
                                                    }
                                                    {
                                                        (parseInt(itemDetails.default_discount_perc) > 0) && (
                                                            <li className="discount-price mt-2">
                                                                {`${itemDetails.default_discount_perc}%`}
                                                            </li>
                                                        )
                                                    }
                                                    <li className='ps-2 taxes-info'>(Excl. GST)</li>
                                                </ul>
                                            </div>
                                        </Col>
                                    </Row>
                                    <div>
                                        <span>Part Number : <span className="font-600">{itemDetails.item_no}</span></span>
                                    </div>
                                    <div>
                                        <span>Quality : <span className="font-600">{itemDetails.quality}</span></span>                                        
                                    </div>
                                    <Row className="mt-3 mb-3">
                                        <Col md={7}>
                                            <Formik
                                                initialValues={initialValues}
                                                onSubmit={handleDeliverySubmit}
                                            >
                                                {({ handleSubmit }) => {
                                                    return (
                                                        <Form onSubmit={handleSubmit}>
                                                            <Field
                                                                name="delivery_pincode"
                                                                className="form-control"
                                                                style={{ width: '43%', marginRight: '6px', display: 'inline-block' }}
                                                                placeholder="Enter PIN Code"
                                                                type="text"
                                                                maxLength={6}
                                                            />
                                                            <button className="btn btn-sm btn-primary ml-2"
                                                                style={{ marginRight: '6px' }}>
                                                                <i className="fa fa-search"></i>
                                                            </button>
                                                            <span className="text-bold text-danger">{estimateDeliveryInputVal}</span>
                                                        </Form>
                                                    )
                                                }}
                                            </Formik>
                                        </Col>
                                    </Row>
                                    <div className="pro-details-quality mt-2">
                                        <div className="cart-plus-minus">
                                            <div className="dec qtybutton"
                                                onClick={() => setCartCount(cartCount - 1)}>-</div>
                                            <input
                                                className="cart-plus-minus-box"
                                                type="number"
                                                name="qtybutton"
                                                value={cartCount}
                                                onChange={(e) => {
                                                    const val = parseInt(e.target.value);
                                                    setCartCount(val ? val : "")
                                                }}
                                            />
                                            <div className="inc qtybutton"
                                                onClick={() => setCartCount(cartCount + 1)}>+</div>
                                        </div>
                                        <div className="pro-details-cart btn-hover">
                                            <a href="#" onClick={() => addItemToCart(itemDetails)}> + Add To Cart</a>
                                        </div>
                                        <div className="pro-details-cart btn-hover">
                                            <a href="#" onClick={() => buyNow(itemDetails)}>Buy Now</a>
                                        </div>
                                    </div>
                                    <div className="pro-details-wish-com">
                                        <div className="pro-details-wishlist">
                                            <a href="#" onClick={() => addItemToWishlist(itemDetails)}>
                                                <i className="ion-android-favorite-outline"></i>
                                                Add to wishlist
                                            </a>
                                        </div>
                                    </div>
                                    <div className="pro-details-social-info">
                                        <div className="social-info">
                                            <ul>
                                                <li>
                                                    <a href="https://www.facebook.com/people/Partzrider/100083152669385/" target="_blank" rel="noreferrer"><i className="ion-social-facebook"></i></a>
                                                </li>
                                                <li>
                                                    <a href="https://www.instagram.com/partzrider/" target="_blank" rel="noreferrer"><i className="ion-social-instagram"></i></a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <h5 className="reference font-600">{itemDetails.warranty_info}</h5>
                                </div>
                            </Col>
                        </div>
                    </div>
                </section>
                <ProductExtraDescrition product={itemDetails} reloadReview={loadItemDetails} />
                <SameProduct product={itemDetails} />
                {/* <RecentAddProduct /> */}
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        token: state.account?.token,
        username: state.account?.profileUser.first_name,
        master_settings: state.common?.settingsData
    }
}

const mapDispatchToProps = {
    addToCart,
    addToWishlist
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewProduct);