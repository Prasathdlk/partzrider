import React from 'react';
import Image from 'next/image';
import freeShiping from 'public/styles/assets/images/icons/static-icons-5.png'
import freeReturns from 'public/styles/assets/images/icons/static-icons-6.png';
import Secure from 'public/styles/assets/images/icons/static-icons-7.png';
import Support from 'public/styles/assets/images/icons/static-icons-8.png';
import { Container, Row, Col } from 'react-bootstrap';

const Static = () => {
    return (
        <section className="static-area">
            <Container>
                <div className="static-area-wrap">
                    <Row>
                        <Col lg={3} xs={12} md={6} sm={6}>
                            <div className="single-static pb-res-md-0 pb-res-sm-0 pb-res-xs-0">
                                <Image src={freeShiping} layout="responsive" alt="" className="img-responsive" />
                                <div className="single-static-meta">
                                    <h4>Free Shipping</h4>
                                    <p>On all orders over <i className='fa fa-rupee-sign'></i> 100</p>
                                </div>
                            </div>
                        </Col>
                        <Col lg={3} xs={12} md={6} sm={6}>
                            <div className="single-static pb-res-md-0 pb-res-sm-0 pb-res-xs-0 pt-res-xs-20">
                                <Image src={freeReturns} alt="" layout="responsive" className="img-responsive" />
                                <div className="single-static-meta">
                                    <h4>Easy Returns</h4>
                                    <p>Returns are free</p>
                                </div>
                            </div>
                        </Col>
                        <Col lg={3} xs={12} md={6} sm={6}>
                            <div className="single-static pt-res-md-30 pb-res-sm-30 pb-res-xs-0 pt-res-xs-20">
                                <Image src={Secure} alt="" layout="responsive" className="img-responsive" />
                                <div className="single-static-meta">
                                    <h4>100% Payment Secure</h4>
                                    <p>Your payment are safe with us.</p>
                                </div>
                            </div>
                        </Col>
                        <Col lg={3} xs={12} md={6} sm={6}>
                            <div className="single-static pt-res-md-30 pb-res-sm-30 pt-res-xs-20">
                                <Image src={Support} alt="" layout="responsive" className="img-responsive" />
                                <div className="single-static-meta">
                                    <h4>Support 24/7</h4>
                                    <p>Contact us 24 hours a day</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </section>
    )
}
export default Static;