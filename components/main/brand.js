import React, { useCallback, useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import Slider from 'react-slick';
import { itemFilterService } from 'core/services';
import { utils } from 'core/helper';
import Link from 'next/link';

const Brand = () => {
    const [manufacturers, setManufacturers] = useState([]);
    console.log(manufacturers)

    const slider = {
        slidesToShow: 5,
        slidesToScroll: 1,
        slidesPerRow: 1,
    };

    const prevIcon = useCallback(() => {
        slider.slickPrev();
    }, [slider]);

    const nextIcon = useCallback(() => {
        slider.slickNext();
    }, [slider]);
    

    function loadManufacture() {
        itemFilterService.loadManufactures('market').then((resp) => {
            setManufacturers(resp.result)
        }).catch(error => {
            utils.showErrMsg(utils.handleErr(error));
        })
    };

    
    useEffect(() => {
        loadManufacture();
    }, []);

    const brandEle = (ele, ind) => {

        return (
            <div key={ind} className='brand-slider-item'>
                <Link href={`products?manufacture=${ele.manufacturer_id}`}>
                     <a href='#'>
                        <Image
                            src={ele.image}
                            width={200}
                            height={100}
                            layout="responsive"
                            alt=""   
                        />
                    </a>
                </Link>
            </div>
        )
    };

    

    return (
        <div className="brand-area">
            <Container>
                <Row>
                    <Col md={12}>
                        <div className="section-title">
                            <h2>Top Aftermarket Brands</h2>
                        </div>
                    </Col>
                </Row>
                <div className='brand-slider owl-carousel owl-nav-style owl-nav-style-2'>
                    {
                        manufacturers.length > 5 && (
                            <Slider ref={slide => (slider = slide)} {...slider}                       
                            >
                                {manufacturers.map((ele, ind) => brandEle(ele, ind))}
                            </Slider>
                        )
                    }
                    {
                        manufacturers.length > 5 && (
                            <div className="owl-nav">
                                <div className="owl-next" onClick={nextIcon} >next</div>
                                <div className="owl-prev" onClick={prevIcon}>prev</div>
                            </div>
                        )
                    }
                </div>
            </Container>
        </div>
    )
};

export default Brand;