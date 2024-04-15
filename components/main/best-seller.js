import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { Container, Row, Col } from 'react-bootstrap';
import Slider from 'react-slick';
import { categoryService } from 'core/services';
import { utils } from 'core/helper';
import Link from 'next/link';

const BestSeller = () => {
    const [categories, setCategories] = useState([]);

    function topSellingCategories() {
        categoryService.getCategories().then((resp) => {
            setCategories(resp.result)
        }).catch(error => {
            utils.showErrMsg(utils.handleErr(error));
        })
    };

    useEffect(() => {
        topSellingCategories();
    }, [])

    const slider = {
        slidesToShow: 5,
        slidesToScroll: 1,
        adaptiveHeight: true
    };

    const nextIcon = useCallback(() => {
        slider.slickNext()
    }, [slider])

    const prevIcon = useCallback(() => {
        slider.slickPrev()
    }, [slider])

    const renderCategoryItem = (ele, ind) => {
        return (
            <div className="owl-item" key={ind} style={{ width: "215px" }} >
                <Link passHref={true} href={`products?category=${ele.category_id}`} >
                    <article className="list-product text-center">
                        <div className="img-block">
                            <a href="#" className="thumbnail">
                                <Image
                                    className="first-img"
                                    layout="responsive"
                                    src={ele.image}
                                    width={50}
                                    height={50}
                                    alt="top-selling-products"
                                />
                            </a>
                            <div className="quick-view">
                                <a href="#" className="quick_view">
                                    <i className="ion-ios-search-strong"></i>
                                </a>
                            </div>
                        </div>
                        <ul className="product-flag">
                            <li className="new">New</li>
                        </ul>
                        <div className="product-decs">
                            <h2>
                                <a href="#" className="product-link">{ele.category_name}</a>
                            </h2>
                        </div>
                    </article>
                </Link>
            </div>
        )
    };

    return (
        <section className="best-sells-area">
            <Container>
                <Row>
                    <Col md={12}>
                        <div className="section-title">
                            <h2>Top Selling Categories</h2>
                        </div>
                    </Col>
                </Row>
                <div className="best-sell-slider owl-carousel owl-nav-style owl-loaded owl-drag">
                    <div className="owl-stage-outer">
                        <div className="owl-stage" style={{
                            transform: "translate 3d(-786px, 0px, 0px)",
                            transition: "all 0s ease 0s"
                        }}>
                            <Row>
                                {
                                    categories.length > 5 && (
                                        <Slider ref={slide => (slider = slide)} {...slider}>
                                            {categories.map((ele, ind) => renderCategoryItem(ele, ind))}
                                        </Slider>
                                    )
                                }
                                {categories.length <= 5 && categories.map((ele, ind) => renderCategoryItem(ele, ind))}
                            </Row>
                        </div>
                    </div>
                    {
                        categories.length > 5 && (
                            <div className="owl-nav">
                                <div className="owl-next disabled" onClick={nextIcon} >next</div>
                                <div className="owl-prev" onClick={prevIcon}>prev</div>
                            </div>
                        )
                    }
                </div>
            </Container>
        </section>
    )
}
export default BestSeller;