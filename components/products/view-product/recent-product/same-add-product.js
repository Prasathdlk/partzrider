import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Col, Container, Row } from 'react-bootstrap';
import { itemService, wishlistService, cartService } from 'core/services';
import { utils } from 'core/helper';
import { addToWishlist, addToCart } from 'redux/action/account.action';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { truncate } from 'lodash';

const SameProduct = (props) => {
    const { token, addToWishlist, addToCart, product } = props;
    const router = useRouter();
    const [loadItemsInSameCatg, setLoadItemsInSameCatg] = useState([]);

    function loadItemBasedOnFilter(category_id) {
        itemService.loadItems(1, 6, category_id).then((resp) => {
            if (resp && resp.result.length > 0) {
                setLoadItemsInSameCatg(resp.result);
            }
        }).catch(error => {
            utils.showErrMsg(utils.handleErr(error))
        });
    };

    useEffect(() => {
        let filterObj = {};
        if (product.category_id) {
            filterObj.categories = [product.category_id]
            loadItemBasedOnFilter(filterObj);
        }
    }, [product]);

    function addItemToCart(item) {
        if (!token) {
            setTimeout(() => { router.push('/login') }, 200);
            return false;
        }

        const { item_id, item_image, item_name, item_no, item_spec, price } = item;
        const payload = { item_id, qty: 1 };
        cartService.addItemTocart(payload).then((resp) => {
            if (resp.is_successful) {
                utils.showSuccessMsg(resp.message);
                const stateItem = { item_id, item_image, item_name, item_no, item_spec, price, qty: 1 }
                addToCart(stateItem);
            } else {
                utils.showErrMsg(resp.message);
            }
        }).catch(error => {
            utils.showErrMsg(utils.handleErr(error));
        });
    };

    function addItemToWishlist(payload) {
        console.log('same-product-item::', payload);
        if (!token) {
            setTimeout(() => { router.push('/login') }, 200);
            return false;
        }
        const {
            item_id, item_image, item_name,
            item_no, item_spec, price, default_discount
        } = payload;
        wishlistService.addItemToWishlist({ item_id }).then((resp) => {
            console.log('productlistDetailApi::', resp);
            const { is_successful, message } = resp;
            if (is_successful) {
                const stateItem = {
                    item_id, item_image, item_name, item_no, item_spec,
                    price: default_discount ? default_discount : price
                }
                addToWishlist(stateItem);
                utils.showSuccessMsg(message);
            } else {
                utils.showErrMsg(message);
            }
        }).catch(error => {
            utils.showErrMsg(utils.handleErr(error))
        });
    };

    return (
        <section className="recent-add-area mt-30 mb-30px">
            <Container>
                <Row>
                    <Col md={12}>
                        <div className="section-title">
                            <h2>In The Same Category</h2>
                            <p>16 other products in the same category:</p>
                        </div>
                    </Col>
                </Row>
                <div className="recent-product-slider owl-carousel owl-nav-style owl-loaded owl-drag">
                    <div className="owl-stage-outer">
                        <div className="owl-stage"
                            style={{ transform: "translate3d(0px, 0px, 0px)", transition: "all 0s ease 0s", width: "1310px" }}>
                            {loadItemsInSameCatg.map((ele, ind) => (
                                <div key={ind} className="owl-item active" style={{ width: "188.333px", marginRight: "30px" }}>
                                    <article className="list-product">
                                        <div className="img-block">
                                            <a href="" className="thumbnail">
                                                <Image className="first-img" width={100} height={100} layout='responsive'
                                                    src={ele.item_image} alt="" />
                                            </a>
                                            <div className="quick-view">
                                                <Link href={`${ele.item_id}`}>
                                                    <a href="#" className="quick_view" data-link-action="quickview" title="Quick view" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                        <i className="ion-ios-search-strong"></i>
                                                    </a>
                                                </Link>
                                            </div>
                                        </div>
                                   
                                        <ul className="product-flag">
                                            <li className="new">New</li>
                                        </ul>
                                   
                                        <div className="product-decs">
                                            <Link href={`${ele.item_id}`}>
                                                <a className="inner-link" href=""><span>{ele.item_no}</span></a>
                                            </Link>
                                            <h2>
                                                <Link href={`${ele.item_id}`}>
                                                    <a href="" className="product-link">{truncate(ele.item_name, 5)}</a>
                                                </Link>
                                            </h2>
                                            <div className="rating-product">
                                                <i className="ion-android-star"></i>
                                                <i className="ion-android-star"></i>
                                                <i className="ion-android-star"></i>
                                                <i className="ion-android-star"></i>
                                                <i className="ion-android-star"></i>
                                            </div>
                                            <div className="pricing-meta">
                                                <ul>
                                                    <li className="old-price">{utils.getCurSvg(20, 20)}{ele.price}</li>
                                                    <li className="current-price">{ele.default_discount}</li>
                                                    <li className="discount-price">{`${ele.default_discount_perc}%`}</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="add-to-link">
                                            <ul>
                                                <li className="cart"><a className="cart-btn" onClick={() => addItemToCart(ele)} href="#">ADD TO CART </a></li>
                                                <li>
                                                    <a href="#" onClick={() => addItemToWishlist(ele)}>
                                                        <i className="ion-android-favorite-outline"></i>
                                                    </a>
                                                </li>
                                                {/* <li>
                                                    <a href=""><i className="ion-ios-shuffle-strong"></i></a>
                                                </li> */}
                                            </ul>
                                        </div>
                                    </article>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="owl-nav disabled">
                        <div className="owl-prev disabled">prev</div>
                        <div className="owl-next disabled">next</div>
                    </div>
                    <div className="owl-dots disabled"></div>
                </div>
            </Container>
        </section>
    )
};

const mapStateToProps = state => {
    return {
        token: state.account?.token,
    }
};

const mapDispatchToProps = {
    addToCart,
    addToWishlist
};

export default connect(mapStateToProps, mapDispatchToProps)(SameProduct);