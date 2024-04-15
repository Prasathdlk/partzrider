import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row, Button } from 'react-bootstrap';
import { Field, Formik } from 'formik';
import { itemFilterService } from 'core/services';
import { connect } from "react-redux";
import { useRouter } from 'next/router';
import { utils } from 'core/helper';

const initialValues = {
    segment: '',
    brand: '',
    variant: ''
}

const BreadCrumb = (props) => {
    
    const navigate = useRouter();
    const [segments, setSegments] = useState([]);
    const [brands, setBrands] = useState([]);
    const [variants, setVariants] = useState([]);

    useEffect(() => {
        loadSegments();
    }, []);

    function loadSegments() {
        itemFilterService.loadSegments().then((resp) => {
            setSegments(resp.result)
        }).catch(error => {
            setSegments([])
        })
    };

    const handleSegmentChange = (event) => {
        const { value: segmentId } = event.target;
        setBrands([]);
        setVariants([]);
        loadBrands(segmentId);
    };

    function loadBrands(segmentId) {
        itemFilterService.loadBrands(segmentId).then((resp) => {
            setBrands(resp.result);
        }).catch(error => {
            setBrands([]);
        });
    };

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
        // if (segment !== '' || brand !== '' || variant !== '') {

            const filterObj = {
                search_from: 'product',
                s_id: !!segment ? segment : undefined,
                b_id: !!brand ? brand : undefined,
                v_id: !!variant ? variant : undefined,
            }
            const newQuery = {...navigate.query,...filterObj};
            delete(newQuery.category);
            delete(newQuery.manufacture);
            delete(newQuery.page);
            if(!(!!brand))
                delete(newQuery.b_id);
            if(!(!!segment))
                delete(newQuery.s_id);
            if(!(!!variant))
                delete(newQuery.v_id);
            navigate.push({'href':'/products',query:newQuery});

        // } else {
        //     utils.showSuccessMsg('Atleast one filter should be choosen');
        //     return false;
        // }
    };

    return (
        <section className="breadcrumb-area1">
            <Container>
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                >
                    {({ handleSubmit, setFieldValue, resetForm, values }) => {
                        return (
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={1} sm={12} className=""></Col>
                                    <Col md={2} sm={12} className="">
                                        <h5 className="text-white text-center mt-1">Search by Vehicle</h5>
                                    </Col>
                                    <Col md={2} sm={12}>
                                        <Field
                                            as="select"
                                            className="form-control mt-1"
                                            placeholder="Select Brand"
                                            name="segment"
                                            onChange={(e) => {
                                                setFieldValue("segment", e.target.value);
                                                handleSegmentChange(e);
                                            }}
                                        >
                                            <option value={''}>Select Segment</option>
                                            {segments && segments.map((ele, ind) => (
                                                <option key={ind} value={ele.segment_id}>{ele.segment_name}</option>
                                            ))}
                                        </Field>
                                    </Col>
                                    <Col md={2} sm={12}>
                                        <Field
                                            as="select"
                                            className="form-control mt-1"
                                            name='brand'
                                            placeholder="Select Model"
                                            onChange={(e) => {
                                                setFieldValue("brand", e.target.value);
                                                handleBrandChange(e);
                                            }}>
                                            <option value={''}>Select Brand</option>
                                            {
                                                brands && brands.map((ele, ind) => (
                                                    <option key={ind} value={ele.brand_id}>{ele.brand_name}</option>
                                                ))
                                            }
                                        </Field>
                                    </Col>
                                    <Col md={2} sm={12}>
                                        <Field
                                            as="select"
                                            className="form-control mt-1"
                                            name='variant'
                                            placeholder="Select Model">
                                            <option value={''}>Select Model</option>
                                            {
                                                variants && variants.map((ele, ind) => (
                                                    <option key={ind} value={ele.variant_id}>{ele.variant_name}</option>
                                                ))
                                            }
                                        </Field>
                                    </Col>
                                    <Col md={3} sm={12}>
                                        <div className="Place-search2 d-flex">
                                            <Button type='submit' className='btn btn-sm  mt-1 width50 btn-warning'>
                                                <i className="fa fa-search"></i>
                                                Search
                                            </Button>
                                            {
                                                (values.segment !== '' || values.brand !== '' || values.variant !== '') && (
                                                    <Button
                                                        type='reset'
                                                        className='btn btn-sm  width50 btn-warning'
                                                        style={{ marginLeft: '10px', backgroundColor: '#ffbf00' }}
                                                        onClick={() => resetForm()}>
                                                        Reset
                                                    </Button>
                                                )
                                            }
                                        </div>
                                    </Col>
                                </Row>
                            </Form>
                        )
                    }}
                </Formik>
            </Container>
        </section>
    )
}

const mapStateToProps = state => {
    return {
        filters: state.account?.filters
    }
}

const mapDispatchToProps = {
    // setSearchFilters
}

export default connect(mapStateToProps, mapDispatchToProps)(BreadCrumb);