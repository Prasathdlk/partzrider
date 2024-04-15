import React from 'react';
import { connect } from 'react-redux';
import { useRouter } from "next/router";
import Image from 'next/image';
import { Form, Col } from 'react-bootstrap';
import policy1 from 'public/styles/assets/images/icons/policy.png';
import policy2 from 'public/styles/assets/images/icons/policy-2.png';
import policy3 from 'public/styles/assets/images/icons/policy-3.png';

import { cartService, wishlistService } from 'core/services';
import { utils } from 'core/helper';
import { addToCart } from 'redux/action/account.action';
import Link from 'next/link';

const ProductDetailsDescription = (props) => {
    const { token, product, addToCart } = props;
    const navigate = useRouter();
    console.log('product-description::', product);

    function addItemToCart(item) {
        if (!token) {
            setTimeout(() => { navigate.push('/login') }, 200);
            return false;
        }
        const { item_id, item_image, item_name, item_no, item_spec, price } = item;
        const stateItem = {
            item_id, item_image, item_name, item_no, item_spec, price, qty: 1
        }
        addToCart(stateItem);
        const payload = {
            item_id, qty: stateItem.qty
        };
        cartService.addItemTocart(payload).then((resp) => {
            utils.showSuccessMsg('Product added to cart');
        }).catch(error => {
            utils.showErrMsg(utils.handleErr(error));
        })
    };

    function addItemToWishlist(item) {
        console.log('productlistDetail::', item);
        if (!token) {
            setTimeout(() => { navigate.push('/login') }, 200);
            return false;
        }
        const {
            item_id, item_image, item_name,
            item_no, item_spec, price, default_discount
        } = item;
        // const { item_id, item_image, item_name, item_no, item_spec } = item;
        wishlistService.addItemToWishlist({ item_id }).then((resp) => {
            console.log('wishlistPayload::', item);
            const stateItem = {
                item_id, item_image, item_name, item_no, item_spec,
            }
            addItemToWishlist(stateItem);
            utils.showSuccessMsg(resp.message);
            // if (resp.is_successful) {
            //     utils.showSuccessMsg(resp.message);
            //     const stateItem = {
            //         item_id, item_image, item_name, item_no, item_spec,
            //         price: default_discount ? default_discount : price
            //     }
            //     addToWishlist(stateItem);
            // } else {
            //     utils.showErrMsg(resp.message);
            // }
        }).catch(error => {
            utils.showErrMsg(utils.handleErr(error))
        });
    };

    return (
        <Col xl={6} lg={6} md={12}>
            <div className="product-details-content">
                <h2>{product.item_name}</h2>
                <h3>Part Number</h3>
                <p className="reference">Stock Availability :<span></span></p>
                <div className="pro-details-rating-wrap">
                    <div className="rating-product">
                        <i className="ion-android-star"></i>
                        <i className="ion-android-star"></i>
                        <i className="ion-android-star"></i>
                        <i className="ion-android-star"></i>
                        <i className="ion-android-star"></i>
                    </div>
                    <span className="read-review">
                        <a className="reviews" href="#">Read reviews (1)</a>
                    </span>
                </div>

                <div className='row'>
                    <div className='col-md-5'>
                        <div className="pricing-meta">
                            <ul>
                                <li className="old-price not-cut">
                                    {utils.getRupeeIconWithPrice(product.price, 20, 20)}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='col-md-7'>
                        <div className="row mb-2">
                            <div className="col-md-3"></div>
                            <div className="col-md-6">
                                <input className="form-control" placeholder="Enter PIN Code" type="text" />
                            </div>
                            <div className="col-md-2">
                                <button className="btn btn-sm btn-primary">
                                    <i className="fa fa-search"></i>
                                </button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3"></div>
                            <div className="col-md-8">
                                <input className="form-control" placeholder="Delivery Days" type="text" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="row">
                    <div className="col-md-4">
                        <div className="pricing-meta">
                            <ul>
                                <li className="old-price not-cut">�18.90</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="row" style="margin-bottom:4px;">
                            <div className="col-md-3"></div>
                            <div className="col-md-6"><input className="form-control" placeholder="Enter PIN Code" type="text" /> </div>
                            <div className="col-md-2"><button className="btn btn-sm btn-primary"><i className="fa fa-search"></i></button></div>
                        </div>
                        <div className="row">
                            <div className="col-md-3"></div>
                            <div className="col-md-8"><input className="form-control" placeholder="Delivery Days" type="text" /> </div>
                        </div>
                    </div>
                </div> */}
                <div className="mb-2" dangerouslySetInnerHTML={{ __html: product.item_spec }} />
                {/* <div className="pro-details-list">
                    <ul>
                        <li>- 0.5 mm Dail</li>
                        <li>- Inspired vector icons</li>
                        <li>- Very modern style</li>
                    </ul>
                </div> */}
                <div className="pro-details-quality mt-0px">
                    <div className="cart-plus-minus">
                        <div className="dec qtybutton">-</div>
                        <Form.Control className="cart-plus-minus-box" type="text" name="qtybutton" value="1" />
                        <div className="inc qtybutton">+</div>
                    </div>
                    <div className="pro-details-cart btn-hover">
                        <a href="#" onClick={() => addItemToCart(product)}> + Add To Cart</a>
                    </div>
                    <div className="pro-details-cart btn-hover">
                        <a href="#"> Buy Now</a>
                    </div>
                </div>
                <div className="pro-details-wish-com">
                    <div className="pro-details-wishlist">
                        <a href="#" onClick={() => addItemToWishlist(product)}>
                            <i className="ion-android-favorite-outline" />
                            Add to wishlist
                        </a>
                    </div>
                    {/* <div className="pro-details-compare">
                        <a href="#"><i className="ion-ios-shuffle-strong"></i>Add to compare</a>
                    </div> */}
                </div>
                <div className="pro-details-social-info">
                    <span>Share</span>
                    <div className="social-info">
                        <ul>
                            <li>
                                <a href="#"><i className="ion-social-facebook"></i></a>
                            </li>
                            <li>
                                <a href="#"><i className="ion-social-twitter"></i></a>
                            </li>
                            <li>
                                <a href="#"><i className="ion-social-google"></i></a>
                            </li>
                            <li>
                                <a href="#"><i className="ion-social-instagram"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="pro-details-policy">
                    <ul>
                        <li >
                            <Link href={"/privacy"}>
                                <Image src={policy1} alt="" layout='fixed' className="policy_iconLink" />
                            </Link>
                            <span>Security Policy (Edit With Customer Reassurance Module)</span>
                        </li>
                        <li>
                            <Link href={"/delivery"}>
                                <Image src={policy2} alt="" layout='fixed' className="policy_iconLink" />
                            </Link>
                            <span>Delivery Policy (Edit With Customer Reassurance Module)</span>
                        </li>
                        <li>
                            <Link href={"/return"}>
                                <Image src={policy3} alt="" layout='fixed' className="policy_iconLink" />
                            </Link>
                            <span>Return Policy (Edit With Customer Reassurance Module)</span>
                        </li>
                    </ul>
                </div>
            </div>
        </Col>
    )
}

const mapStateToProps = state => {
    return {
        token: state.account?.token,
        username: state.account?.profileUser.first_name,
    }
}

const mapDispatchToProps = {
    addToCart
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailsDescription);