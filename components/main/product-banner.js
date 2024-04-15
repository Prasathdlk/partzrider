import React from 'react';
import Image1 from 'public/styles/assets/images/image-1.jpg';
import Image2 from 'public/styles/assets/images/image-2.jpg';
import Image3 from 'public/styles/assets/images/image-3.jpg';
import Image from 'next/image';
import { Container, Row, Col } from 'react-bootstrap';

const ProductBanner = () => {
    return (
        <div className="banner-3-area">
            <Container>
                <Row>
                    <Col lg={6} md={6} sm={12} xs={12} className=" mb-res-xs-30 mb-res-sm-30">
                        <div className="banner-wrapper">
                            <a href=""><Image src={Image1} layout="responsive" alt="" /></a>
                        </div>
                    </Col>
                    <Col lg={6} md={6} sm={12} xs={12}>
                        <div className="banner-wrapper mb-30px">
                            <a href=""><Image src={Image2} layout="responsive" alt="" /></a>
                        </div>
                        <div className="banner-wrapper">
                            <a href=""><Image src={Image3} layout="responsive" alt="" /></a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default ProductBanner;