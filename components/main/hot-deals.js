import React, { useCallback, useEffect } from 'react';
import Image from 'next/image';
// import hot1 from 'public/styles/assets/images/slider-image/hot-1.jpg';
// import hot2 from 'public/styles/assets/images/slider-image/hot-2.jpg';
// import hot3 from 'public/styles/assets/images/slider-image/hot-3.jpg';
// import hot4 from 'public/styles/assets/images/slider-image/hot-4.jpg';
import new1 from 'public/styles/assets/images/new-slider-image/1.png';
import new2 from 'public/styles/assets/images/new-slider-image/2.png';
import new3 from 'public/styles/assets/images/new-slider-image/3.png';
import new4 from 'public/styles/assets/images/new-slider-image/4.png';
import new5 from 'public/styles/assets/images/new-slider-image/5.png';
import new6 from 'public/styles/assets/images/new-slider-image/6.png';
import new7 from 'public/styles/assets/images/new-slider-image/7.png';


import { Container, Row, Col } from 'react-bootstrap';
import Slider from 'react-slick';

const HotDeals = () => {

    const slider = {
        slidesToShow: 5,
        slidesToScroll: 1,
        speed: 500,
        slidesPerRow: 1,
        infinite: true,
        infinite: true,
        autoplay: true
    };

    const prevIcon = useCallback(() => {
        slider.slickPrev();
    }, [slider]);

    const nextIcon = useCallback(() => {
        slider.slickNext();
    }, [slider]);

    return (
        <section className="hot-deal-area">
            <Container>
                <Row>
                    <Col md={12}>
                        <div className="section-title">
                            <h2>Hot Deals</h2>
                            <p>Add hot products to weekly line up</p>
                        </div>
                    </Col>
                </Row>
                <div className="hot-deal-2 owl-carousel owl-nav-style owl-loaded owl-drag">
                    <div className="owl-stage-outer">
                        <div className="owl-stage" style={{
                            transform: "translate 3d(0px, 0px, 0px)"
                            , transition: "all 1s ease 0s", width: "3200px"
                        }}>
                            <Slider ref={slide => (slider = slide)} {...slider}>
                                {/* <div>
                                    <div className="owl-item active" style={{ width: "625px", marginRight: "0px" }}>
                                        <article className="list-product">
                                            <Image src={hot1} layout="responsive" alt="" />
                                        </article>
                                    </div>
                                </div>
                                <div>
                                    <div className="owl-item" style={{ width: "625px", marginRight: "0px" }}>
                                        <article className="list-product">
                                            <Image src={hot2} layout="responsive" alt="" />
                                        </article>
                                    </div>
                                </div>
                                <div>
                                    <div className="owl-item active" style={{ width: "625px", marginRight: "0px" }}>
                                        <article className="list-product">
                                            <Image src={hot3} layout="responsive" alt="" />
                                        </article>
                                    </div>
                                </div>
                                <div>
                                    <div className="owl-item" style={{ width: "625px", marginRight: "0px" }}>
                                        <article className="list-product">
                                            <Image src={hot4} layout="responsive" alt="" />
                                        </article>
                                    </div>
                                </div>
                                <div>
                                    <div className="owl-item active" style={{ width: "625px", marginRight: "0px" }}>
                                        <article className="list-product">
                                            <Image src={hot1} layout="responsive" alt="" />
                                        </article>
                                    </div>
                                </div>
                                <div>
                                    <div className="owl-item" style={{ width: "625px", marginRight: "0px" }}>
                                        <article className="list-product">
                                            <Image src={hot2} layout="responsive" alt="" />
                                        </article>
                                    </div>
                                </div>
                                <div>
                                    <div className="owl-item active" style={{ width: "625px", marginRight: "0px" }}>
                                        <article className="list-product">
                                            <Image src={hot3} layout="responsive" alt="" />
                                        </article>
                                    </div>
                                </div>
                                <div>
                                    <div className="owl-item" style={{ width: "625px", marginRight: "0px" }}>
                                        <article className="list-product">
                                            <Image src={hot4} layout="responsive" alt="" />
                                        </article>
                                    </div>
                                </div> */}
                                    
                                 <div>
                                    <div className="owl-item" style={{ width: "580px", marginRight: "0px" }}>
                                        <article className="list-product">
                                            <Image src={new1} layout="responsive" alt="" />
                                        </article>
                                    </div>
                                </div>

                                <div>
                                    <div className="owl-item" style={{ width: "580px", marginRight: "0px" }}>
                                        <article className="list-product">
                                            <Image src={new2} layout="responsive" alt="" />
                                        </article>
                                    </div>
                                </div> 


                                <div>
                                    <div className="owl-item" style={{ width: "580px", marginRight: "0px" }}>
                                        <article className="list-product">
                                            <Image src={new3} layout="responsive" alt="" />
                                        </article>
                                    </div>
                                </div>
                                
                                <div>
                                    <div className="owl-item" style={{ width: "580px", marginRight: "0px" }}>
                                        <article className="list-product">
                                            <Image src={new4} layout="responsive" alt="" />
                                        </article>
                                    </div>
                                </div> 

                                <div>
                                    <div className="owl-item" style={{ width: "580px", marginRight: "0px" }}>
                                        <article className="list-product">
                                            <Image src={new5} layout="responsive" alt="" />
                                        </article>
                                    </div>
                                </div>

                               <div>
                                    <div className="owl-item" style={{ width: "580px", marginRight: "0px" }}>
                                        <article className="list-product">
                                            <Image src={new6} layout="responsive" alt="" />
                                        </article>
                                    </div>
                                </div>
                                
                                <div>
                                    <div className="owl-item" style={{ width: "580px", marginRight: "0px" }}>
                                        <article className="list-product">
                                            <Image src={new7} layout="responsive" alt="" />
                                        </article>
                                    </div>
                                </div> 
                                
                            </Slider>
                        </div>
                    </div>
                    <div className="owl-nav">
                        <div className="owl-prev" onClick={prevIcon}>prev</div>
                        <div className="owl-next" onClick={nextIcon}>next</div>
                    </div>
                    <div className="owl-dots disabled">

                    </div>
                </div>
            </Container>
        </section>
    )
}
export default HotDeals;