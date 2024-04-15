import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const ProductVideo = () => {
    return(
        <div className="banner-3-area mt-30px">
             <Container>
                <Row>
                    <Col lg={6} md={6} sm={12} xs={12} className="mb-res-xs-30 mb-res-sm-30">
                       <iframe src="https://www.youtube.com/embed/cMX4Q5Xjj2w" title="YouTube video player" allowFullScreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"  width="100%" height="350" frameBorder="true"></iframe>
                    </Col>
                    <Col lg={6} md={6} sm={12} xs={12} className="mb-res-xs-30 mb-res-sm-30">
                        <iframe src="https://www.youtube.com/embed/HRHcpD9wkGU" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen width="100%" height="350" frameBorder="true"></iframe>
                    </Col>
                </Row>
             </Container>
        </div>
    )
}
export default ProductVideo;