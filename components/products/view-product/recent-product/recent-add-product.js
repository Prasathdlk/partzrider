import React from 'react';
import Image from 'next/image';
import Image1 from 'public/styles/assets/images/product-image/image1.jpg';
// import Image2 from 'public/styles/assets/images/product-image/image2.jpg';
import { Container, Row, Col } from 'react-bootstrap';

const RecentAddProduct = () => {
    // const [categorieRelatedProducts, setCategorieRelatedProducts] = useState([]);

    // function topSellingCategories() {
    //     categoryService.getCategories().then((resp) => {
    //         setCategories(resp.result)
    //     }).catch(error => {
    //         utils.showErrMsg(utils.handleErr(error));
    //     })
    // };

    // useEffect(() => {
    //     topSellingCategories();
    // }, []);

    return (
        <section className="recent-add-area">
            <Container>
                <Row>
                    <Col md={12}>
                        <div className="section-title">
                            <h2>People also viewed</h2>
                        </div>
                    </Col>
                </Row>
                <div className="recent-product-slider owl-carousel owl-nav-style owl-loaded owl-drag">
                    <div className="owl-stage-outer">
                        <div className="owl-stage" style={{ transform: "translate3d(0px, 0px, 0px)", transition: "all 0s ease 0s", width: "1310px" }}>
                            <div className="owl-item active" style={{ width: " 188.333px", marginRight: "30px" }}>
                                <article className="list-product">
                                    <div className="img-block">
                                        <a href="" className="thumbnail">
                                            <Image className="first-img" layout='responsive' src={Image1} alt="" />
                                            {/* <Image className="second-img" src={Image1} alt=""/> */}
                                        </a>
                                        <div className="quick-view">
                                            <a className="quick_view" href="#" data-link-action="quickview" title="Quick view" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                <i className="ion-ios-search-strong"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <ul className="product-flag">
                                        <li className="new">New</li>
                                    </ul>
                                    <div className="product-decs">
                                        <a className="inner-link" href=""><span>STUDIO DESIGN</span></a>
                                        <h2><a href="" className="product-link">Originals Kaval Windbr...</a></h2>
                                        <div className="rating-product">
                                            <i className="ion-android-star"></i>
                                            <i className="ion-android-star"></i>
                                            <i className="ion-android-star"></i>
                                            <i className="ion-android-star"></i>
                                            <i className="ion-android-star"></i>
                                        </div>
                                        <div className="pricing-meta">
                                            <ul>
                                                <li className="old-price">€23.90</li>
                                                <li className="current-price">€21.51</li>
                                                <li className="discount-price">-10%</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="add-to-link">
                                        <ul>
                                            <li className="cart">
                                                <a className="cart-btn" href="#">ADD TO CART </a>
                                            </li>
                                            <li>
                                                <a href=""><i className="ion-android-favorite-outline"></i></a>
                                            </li>
                                            <li>
                                                <a href=""><i className="ion-ios-shuffle-strong"></i></a>
                                            </li>
                                        </ul>
                                    </div>
                                </article>
                            </div>
                            <div className="owl-item active" style={{ width: " 188.333px", marginRight: "30px" }}>
                                <article className="list-product">
                                    <div className="img-block">
                                        <a href="" className="thumbnail">
                                            <Image className="first-img" layout='responsive' src={Image1} alt="" />
                                            {/* <Image className="second-img" src={Image2} alt=""/> */}
                                        </a>
                                        <div className="quick-view">
                                            <a className="quick_view" href="#" data-link-action="quickview" title="Quick view" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                <i className="ion-ios-search-strong"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <ul className="product-flag">
                                        <li className="new">New</li>
                                    </ul>
                                    <div className="product-decs">
                                        <a className="inner-link" href=""><span>STUDIO DESIGN</span></a>
                                        <h2><a href="" className="product-link">Originals Kaval Windbr...</a></h2>
                                        <div className="rating-product">
                                            <i className="ion-android-star"></i>
                                            <i className="ion-android-star"></i>
                                            <i className="ion-android-star"></i>
                                            <i className="ion-android-star"></i>
                                            <i className="ion-android-star"></i>
                                        </div>
                                        <div className="pricing-meta">
                                            <ul>
                                                <li className="old-price">€23.90</li>
                                                <li className="current-price">€21.51</li>
                                                <li className="discount-price">-10%</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="add-to-link">
                                        <ul>
                                            <li className="cart"><a className="cart-btn" href="#">ADD TO CART </a></li>
                                            <li>
                                                <a href=""><i className="ion-android-favorite-outline"></i></a>
                                            </li>
                                            <li>
                                                <a href=""><i className="ion-ios-shuffle-strong"></i></a>
                                            </li>
                                        </ul>
                                    </div>
                                </article>
                            </div>
                            <div className="owl-item active" style={{ width: " 188.333px", marginRight: "30px" }}>
                                <article className="list-product">
                                    <div className="img-block">
                                        <a href="" className="thumbnail">
                                            <Image className="first-img" layout='responsive' src={Image1} alt="" />
                                            {/* <Image className="second-img" src={Image2} alt=""/> */}
                                        </a>
                                        <div className="quick-view">
                                            <a className="quick_view" href="#" data-link-action="quickview" title="Quick view" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                <i className="ion-ios-search-strong"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <ul className="product-flag">
                                        <li className="new">New</li>
                                    </ul>
                                    <div className="product-decs">
                                        <a className="inner-link" href=""><span>STUDIO DESIGN</span></a>
                                        <h2><a href="" className="product-link">Originals Kaval Windbr...</a></h2>
                                        <div className="rating-product">
                                            <i className="ion-android-star"></i>
                                            <i className="ion-android-star"></i>
                                            <i className="ion-android-star"></i>
                                            <i className="ion-android-star"></i>
                                            <i className="ion-android-star"></i>
                                        </div>
                                        <div className="pricing-meta">
                                            <ul>
                                                <li className="old-price">€23.90</li>
                                                <li className="current-price">€21.51</li>
                                                <li className="discount-price">-10%</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="add-to-link">
                                        <ul>
                                            <li className="cart"><a className="cart-btn" href="#">ADD TO CART </a></li>
                                            <li>
                                                <a href=""><i className="ion-android-favorite-outline"></i></a>
                                            </li>
                                            <li>
                                                <a href=""><i className="ion-ios-shuffle-strong"></i></a>
                                            </li>
                                        </ul>
                                    </div>
                                </article>
                            </div>
                            <div className="owl-item active" style={{ width: " 188.333px", marginRight: "30px" }}>
                                <article className="list-product">
                                    <div className="img-block">
                                        <a href="" className="thumbnail">
                                            <Image className="first-img" layout='responsive' src={Image1} alt="" />
                                            {/* <Image className="second-img" src={Image2} alt=""/> */}
                                        </a>
                                        <div className="quick-view">
                                            <a className="quick_view" href="#" data-link-action="quickview" title="Quick view" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                <i className="ion-ios-search-strong"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <ul className="product-flag">
                                        <li className="new">New</li>
                                    </ul>
                                    <div className="product-decs">
                                        <a className="inner-link" href=""><span>STUDIO DESIGN</span></a>
                                        <h2><a href="" className="product-link">Originals Kaval Windbr...</a></h2>
                                        <div className="rating-product">
                                            <i className="ion-android-star"></i>
                                            <i className="ion-android-star"></i>
                                            <i className="ion-android-star"></i>
                                            <i className="ion-android-star"></i>
                                            <i className="ion-android-star"></i>
                                        </div>
                                        <div className="pricing-meta">
                                            <ul>
                                                <li className="old-price">€23.90</li>
                                                <li className="current-price">€21.51</li>
                                                <li className="discount-price">-10%</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="add-to-link">
                                        <ul>
                                            <li className="cart"><a className="cart-btn" href="#">ADD TO CART </a></li>
                                            <li>
                                                <a href=""><i className="ion-android-favorite-outline"></i></a>
                                            </li>
                                            <li>
                                                <a href=""><i className="ion-ios-shuffle-strong"></i></a>
                                            </li>
                                        </ul>
                                    </div>
                                </article>
                            </div>
                            <div className="owl-item active" style={{ width: " 188.333px", marginRight: "30px" }}>
                                <article className="list-product">
                                    <div className="img-block">
                                        <a href="" className="thumbnail">
                                            <Image className="first-img" layout='responsive' src={Image1} alt="" />
                                            {/* <Image className="second-img" src={Image2} alt=""/> */}
                                        </a>
                                        <div className="quick-view">
                                            <a className="quick_view" href="#" data-link-action="quickview" title="Quick view" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                <i className="ion-ios-search-strong"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <ul className="product-flag">
                                        <li className="new">New</li>
                                    </ul>
                                    <div className="product-decs">
                                        <a className="inner-link" href=""><span>STUDIO DESIGN</span></a>
                                        <h2><a href="" className="product-link">Originals Kaval Windbr...</a></h2>
                                        <div className="rating-product">
                                            <i className="ion-android-star"></i>
                                            <i className="ion-android-star"></i>
                                            <i className="ion-android-star"></i>
                                            <i className="ion-android-star"></i>
                                            <i className="ion-android-star"></i>
                                        </div>
                                        <div className="pricing-meta">
                                            <ul>
                                                <li className="old-price">€23.90</li>
                                                <li className="current-price">€21.51</li>
                                                <li className="discount-price">-10%</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="add-to-link">
                                        <ul>
                                            <li className="cart"><a className="cart-btn" href="#">ADD TO CART </a></li>
                                            <li>
                                                <a href=""><i className="ion-android-favorite-outline"></i></a>
                                            </li>
                                            <li>
                                                <a href=""><i className="ion-ios-shuffle-strong"></i></a>
                                            </li>
                                        </ul>
                                    </div>
                                </article>
                            </div>
                            <div className="owl-item active" style={{ width: " 188.333px", marginRight: "30px" }}>
                                <article className="list-product">
                                    <div className="img-block">
                                        <a href="" className="thumbnail">
                                            <Image className="first-img" layout='responsive' src={Image1} alt="" />
                                            {/* <Image className="second-img" src={Image2} alt=""/> */}
                                        </a>
                                        <div className="quick-view">
                                            <a className="quick_view" href="#" data-link-action="quickview" title="Quick view" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                <i className="ion-ios-search-strong"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <ul className="product-flag">
                                        <li className="new">New</li>
                                    </ul>
                                    <div className="product-decs">
                                        <a className="inner-link" href=""><span>STUDIO DESIGN</span></a>
                                        <h2><a href="" className="product-link">Originals Kaval Windbr...</a></h2>
                                        <div className="rating-product">
                                            <i className="ion-android-star"></i>
                                            <i className="ion-android-star"></i>
                                            <i className="ion-android-star"></i>
                                            <i className="ion-android-star"></i>
                                            <i className="ion-android-star"></i>
                                        </div>
                                        <div className="pricing-meta">
                                            <ul>
                                                <li className="old-price">€23.90</li>
                                                <li className="current-price">€21.51</li>
                                                <li className="discount-price">-10%</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="add-to-link">
                                        <ul>
                                            <li className="cart"><a className="cart-btn" href="#">ADD TO CART </a></li>
                                            <li>
                                                <a href=""><i className="ion-android-favorite-outline"></i></a>
                                            </li>
                                            <li>
                                                <a href=""><i className="ion-ios-shuffle-strong"></i></a>
                                            </li>
                                        </ul>
                                    </div>
                                </article>
                            </div>
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
}
export default RecentAddProduct