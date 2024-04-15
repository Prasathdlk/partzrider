import { ErrorMessage, Field, Formik } from 'formik';
import { utils } from 'core/helper';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Tab, Nav, Row, Col, Form, Container } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';
import { connect } from 'react-redux';
import { reviewService } from 'core/services';
import * as Yup from 'yup';

const ratingValues = {
    ref_key: '',
    review_for: 'item',
    rating: 0,
    remarks: ''
};

const reviewSchema = Yup.object().shape({
    remarks : Yup
        .string()
        .required('Review is required')
});

const ConvertDate = date =>  new Intl.DateTimeFormat('en-US').format(new Date(date));

const ProductExtraDescrition = (props) => {
    // console.log("props::",props);
    const { product, token, reloadReview } = props;
    // console.log('product::',product);
    const { attributes, reviews } = product;
    const navigate = useRouter();
    const [rating, setRating] = useState(0);

    const ratingAttributes = {
        size: 30,
        count: 5,
        value: rating,
        edit: true,
    };

    const handleReviewSubmit = (values, {resetForm}) => {
        console.log('reviewPayload::',values);
        if (!token) {
            navigate.push('/login');
        }
        values.ref_key = product.item_id;
        values.rating = rating;
        reviewService.addReview(values).then((resp) => {
            utils.showSuccessMsg(resp.message);
            resetForm();
            reloadReview(product.item_id);
            // ratingValues.rating(0);
        }).catch(error => {
            utils.showErrMsg(utils.handleErr(error))
        });
    };

    const handleRatingChange = (value) => {
        // console.log('value::',value);
        setRating(value);
    };

    const ratingStatic = {
        edit : false
    };

    return (
        <div className="description-review-area mb-60px">
            <Container>
                <div className="description-review-wrapper">
                    <Tab.Container defaultActiveKey={"PRODUCT DETAILS"}>
                        <div className="description-review-topbar nav d-flex justify-content-center">
                            <Nav>
                                <Nav.Item>
                                    <Nav.Link eventKey={"DESCRIPTION"}>Description</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey={"PRODUCT DETAILS"}>Product Details</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey={"REVIEWS"}>Reviews ({reviews && reviews.length})</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey={"COMPATABILITY"}>Compatability</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </div>
                        <div className="tab-content description-review-bottom">
                            <Tab.Content>
                                <Tab.Pane eventKey={"DESCRIPTION"}>
                                    <div id="des-details1" className="tab-pane active">
                                        <div className="product-description-wrapper" dangerouslySetInnerHTML={{ __html: product.item_spec }} />
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey={"PRODUCT DETAILS"}>
                                    <div id="des-details2" className="tab-pane">
                                        <div className="product-anotherinfo-wrapper">
                                            <ul>
                                                {
                                                    attributes && attributes.map((attribute, indx) => {
                                                        const { attribute_name, attribute_value } = attribute;
                                                        return (
                                                            <div key={indx}>
                                                            <table style={{width:'26%'}}>
                                                            <tr>
                                                            <td style={{textAlign:'left',width:'55%'}}><b>{attribute_name}</b></td>
                                                             <td style={{textAlign:'left',width:'45%'}}>{attribute_value}</td>
                                                             </tr>
                                                             </table>                                                            
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey={"REVIEWS"}>
                                    <div id="des-details3" className="tab-pane">
                                        <Row>
                                            <Col lg={7}>
                                                {
                                                    reviews && reviews.map((review, indx) => (
                                                        <div className="review-wrapper" key={indx}>
                                                            <div className="single-review">
                                                                <div className="review-img">
                                                                    <img src="assets/images/testimonial-image/1.png" alt="" />
                                                                </div>
                                                                <div className="review-content">
                                                                    <div className="review-top-wrap">
                                                                        <div className="review-left">
                                                                            <div className="review-name">
                                                                                <p>{ConvertDate(review.review_date)}</p>
                                                                                <h4>{review.review_by}</h4>
                                                                            </div>
                                                                                <ReactStars
                                                                                    {...ratingStatic}
                                                                                    value={review.rating}
                                                                                />
                                                                        </div>
                                                                    </div>
                                                                    <div className="review-bottom">
                                                                        <p>
                                                                            {review.remarks}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </Col>
                                            <Col lg={5}>
                                                <div className="ratting-form-wrapper pl-50">
                                                    <h3>Add a Review</h3>
                                                    <div className="ratting-form">
                                                        <Formik
                                                            initialValues={ratingValues}
                                                            onSubmit={handleReviewSubmit}
                                                            validationSchema={reviewSchema}
                                                        >
                                                            {({ handleSubmit, resetForm }) => {
                                                                return (
                                                                    <Form onSubmit={handleSubmit} onReset={resetForm}>
                                                                        <div className="star-box">
                                                                            <span>Your rating:</span>
                                                                            <div className="rating-product">
                                                                                <ReactStars
                                                                                    {...ratingAttributes}
                                                                                    name="rating"
                                                                                    value={rating}
                                                                                    onChange={handleRatingChange}
                                                                                    // onReset={resetForm}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <Row>
                                                                            {/* <Col md={6}>
                                                                                <div className="rating-form-style mb-10">
                                                                                    <Form.Control placeholder="Name" type="text" />
                                                                                </div>
                                                                            </Col> */}
                                                                            {/* <Col md={6}>
                                                                                <div className="rating-form-style mb-10">
                                                                                    <Form.Control placeholder="Email" type="email" />
                                                                                </div>
                                                                            </Col> */}
                                                                            <Col md={12}>
                                                                                <div className="rating-form-style form-submit">
                                                                                    <Field
                                                                                        as='textarea'
                                                                                        name="remarks"
                                                                                        placeholder="Message"
                                                                                    />
                                                                                    <ErrorMessage name='remarks' component='span' className='text-danger'/>
                                                                                    {
                                                                                        token ?
                                                                                            <Form.Control type="submit" value="Submit"/>
                                                                                            :
                                                                                            <Link href={"/login"}> Please login </Link>
                                                                                    }
                                                                                </div>
                                                                            </Col>
                                                                        </Row>
                                                                    </Form>
                                                                )
                                                            }}
                                                        </Formik>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey={"COMPATABILITY"}>
                                    <div id="des-details4" className="tab-pane">
                                        <div className="product-description-wrapper">
                                            <p> {product.compatability ? product.compatability : '-'} </p>
                                        </div>
                                    </div>
                                </Tab.Pane>
                            </Tab.Content>
                        </div>
                    </Tab.Container>
                </div>
            </Container>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        token: state.account?.token,
        username: state.account?.profileUser.first_name,
    }
};

export default connect(mapStateToProps)(ProductExtraDescrition);