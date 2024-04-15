import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Carousel, Button } from 'react-bootstrap';
import Image from 'next/image';
import banner1 from 'public/styles/assets/images/slider-image/sample-36.jpg';
import banner2 from 'public/styles/assets/images/slider-image/sample-37.jpg';
import banner3 from 'public/styles/assets/images/slider-image/sample-38.jpg';
//import banner4 from 'public/styles/assets/images/slider-image/sample-39.jpg';
//import banner5 from 'public/styles/assets/images/slider-image/sample-40.jpg';
//import banner6 from 'public/styles/assets/images/slider-image/sample-41.jpg';
import { itemFilterService } from 'core/services';
import { Field, Formik } from 'formik';
import { useRouter } from 'next/router';
import { utils } from 'core/helper';
import { connect } from "react-redux";

const initialValues = {
    segment: '',
    brand: '',
    variant: ''
};

const Banner = () => {
    const [segments, setSegments] = useState([]);
    const [brands, setBrands] = useState([]);
    const [variants, setVariants] = useState([]);
    const navigate = useRouter();

    useEffect(() => {
        loadSegments();
    }, []);

    function loadSegments() {
        itemFilterService.loadSegments().then((resp) => {
            setSegments(resp.result);
        })
            .catch(error => {
                setSegments([]);
            });
    }

    const handleSegmentChange = (event) => {
        const { value: segmentId } = event.target;
        setBrands([]);
        setVariants([]);
        loadBrands(segmentId);
    };

    function loadBrands(segmentId) {
        itemFilterService.loadBrands(segmentId).then((resp) => {
            setBrands(resp.result)
        })
            .catch(error => {
                setBrands([]);
            });
    }

    const handleBrandChange = (event) => {
        const { value: brandId } = event.target;
        setVariants([]);
        loadVariants(brandId);
    };

    function loadVariants(brandId) {
        itemFilterService.loadVariants(brandId).then((resp) => {
            setVariants(resp.result);
        }).catch(error => {
            setVariants([]);
        });
    };

    const onSubmit = (fields) => {
        const { segment, brand, variant } = fields;
        if (segment !== '' || brand !== '' || variant !== '') {
      
            const filterObj = {
                search_from: 'home',
                s_id: segment ? segment : undefined,
                b_id: brand ? brand : undefined,
                v_id: variant ? variant : undefined
            }

            // localStorage.setHomeFilter(searchPayload);
            // setSearchFilters({ filters: searchPayload });

            filterObj = JSON.parse(JSON.stringify(filterObj, (k, v) => v ?? undefined))
            const filterObjString = new URLSearchParams(filterObj).toString();
            console.log('filterObjStringFromHome::', filterObjString);

            navigate.push('/products?' + filterObjString);
        } else {
            utils.showSuccessMsg('Atleast one filter should be choosen');
            return false;
        }
    };

    return (
        <div className="slider-area">
            <Container>
                <Row>
                    <Col lg={3} md={3} sm={12} xs={12}>
                        <div className="banner-wrapper mt-5 mb-5">                       
                           
                            <Formik
                                initialValues={initialValues}
                                   onSubmit={onSubmit}>

                                {({ setFieldValue, handleSubmit }) => {
                                return(

                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={12} sm={12} className="mb-3">
                                        <h5 className="text-black text-center">Search by Vehicle</h5>
                                    </Col> 

                                    <Col md={12} sm={12} className="mb-3 form-group">
                                        <Field
                                            as="select"
                                            className='form-control'
                                            name='segment'
                                            onChange={(e) => {
                                                setFieldValue("segment", e.target.value);
                                                handleSegmentChange(e);
                                            }}>

                                            <option>Select Segment</option>
                                            {
                                                segments && segments.map((ele, ind) => (
                                                    <option key={ind} value={ele.segment_id}>
                                                        {ele.segment_name}
                                                    </option>
                                                ))
                                            }
                                        </Field>
                                    </Col>

                                    <Col md={12} sm={12} className="form-group">
                                        <Field
                                            as="select"
                                            className="form-control"
                                            name='brand'
                                            placeholder="Select Brand"
                                            onChange={(e) => {
                                                setFieldValue("brand", e.target.value);
                                                handleBrandChange(e);
                                            }}>
                                            <option>Select Brand</option>
                                            {
                                                brands && brands.map((ele, ind) => (
                                                    <option key={ind} value={ele.brand_id}>{ele.brand_name}</option>
                                                ))
                                            }
                                        </Field>
                                    </Col>

                                    <Col md={12} sm={12} className="form-group">
                                        <Field
                                            as="select"
                                            className="form-control"
                                            name='variant'
                                            placeholder="Select Model">
                                            <option>Select Model</option>
                                            {
                                                variants && variants.map((ele, ind) => (
                                                    <option key={ind} value={ele.variant_id}>{ele.variant_name}</option>
                                                ))
                                            }
                                        </Field>
                                    </Col>
                                    <Col md={12} sm={12}>
                                        <div className="Place-search">
                                            <Button type='submit'>
                                            <i className="fa fa-search"></i>
                                            &nbsp; Search 
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </Form>
                                    )
                                }}
                            </Formik>
                        </div>
                    </Col>
                    <Col lg={9} md={9} sm={12} xs={12} className="mb-res-xs-30 mb-res-sm-30">
                        <Carousel fade className="slider-active-3 owl-carousel slider-hm8 owl-dot-style owl-loaded owl-drag">
                            <Carousel.Item interval={1500}>
                                <Image
                                    className="d-block w-100"
                                    src={banner1}
                                    alt="First slide"
                                    layout="responsive"
                                />
                            </Carousel.Item>
                            <Carousel.Item interval={2000}>
                                <Image
                                    className="d-block w-100"
                                    src={banner2}
                                    alt="Second slide"
                                    layout="responsive"
                                />
                            </Carousel.Item>
                            <Carousel.Item interval={2500}>
                                <Image
                                    className="d-block w-100"
                                    src={banner3}
                                    alt="Third slide"
                                    layout="responsive"
                                />
                            </Carousel.Item>
                            {/* <Carousel.Item interval={3000}>
                                <Image
                                    className="d-block w-100"
                                    src={banner4}
                                    alt="Four slide"
                                    layout="responsive"
                                />
                            </Carousel.Item>
                            <Carousel.Item interval={3500}>
                                <Image
                                    className="d-block w-100"
                                    src={banner5}
                                    alt="Five slide"
                                    layout="responsive"
                                />
                            </Carousel.Item>
                            <Carousel.Item interval={4000}>
                                <Image
                                    className="d-block w-100"
                                    src={banner6}
                                    alt="Six slide"
                                    layout="responsive"
                                />
                            </Carousel.Item> */}
                        </Carousel>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        filters: state.account?.filters
    }
}

export default connect(mapStateToProps, null)(Banner);