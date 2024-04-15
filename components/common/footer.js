import React from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import Image from 'next/image';
import Link from "next/link";
import { Formik, ErrorMessage, Field } from "formik";
import { newsletterService } from 'core/services';
import { utils } from 'core/helper';
import * as Yup from 'yup';
import logo from 'public/styles/assets/images/logo.png';
import appStore from 'public/styles/assets/images/icons/app_store.png';
import googlePlay from 'public/styles/assets/images/icons/google_play.png';
// import payment from 'public/styles/assets/images/icons/payment.png';

import icon0 from 'public/styles/assets/images/pay/icon-0.png';
import icon1 from 'public/styles/assets/images/pay/icon-1.png';
import icon2 from 'public/styles/assets/images/pay/icon-2.png';
import icon3 from 'public/styles/assets/images/pay/icon-3.png';
import icon4 from 'public/styles/assets/images/pay/icon-4.png';
import icon5 from 'public/styles/assets/images/pay/icon-5.png';
import icon6 from 'public/styles/assets/images/pay/icon-6.png';

const newsletterSchema = Yup.object().shape({
    email: Yup
        .string()
        .email()
        .required("Email is required")
});

const Footer = () => {

    const handleNewsletterSubmit = function (values, { setSubmitting, resetForm }) {
        const email = values.email;
        newsletterService.newsLetter(email).then((resp) => {
            utils.showSuccessMsg(resp.message)
            resetForm();
        }).catch(error => {
            utils.showErrMsg(utils.handleErr(error));
            setSubmitting(false)
        });
    };

    return (
        <footer className="footer-area">
            <div className="footer-top">
                <Container>
                    <Row>
                        <Col md={6} lg={4}>
                            <div className="footer-logo">
                                <a href="">
                                    <Image src={logo} layout="responsive" className="img-responsive" alt="" />
                                </a>
                            </div>
                            <div className="about-footer">
                                <p className="text-info">

                                </p>
                                <div className="need-help">
                                    <p className="phone-info">
                                        NEED HELP?
                                        <span>
                                            +91 89255 11777
                                        </span>
                                    </p>
                                </div>
                                <div className="social-info text-left">
                                    <ul>
                                        <li>
                                            <a href="https://www.facebook.com/people/Partzrider/100083152669385/" target="_blank"
                                                rel="noreferrer"
                                            >
                                                <i className="ion-social-facebook"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://www.instagram.com/partzrider/" target="_blank"
                                                rel="noreferrer">
                                                <i className="ion-social-instagram"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                        <Col md={6} lg={2} className="mt-res-sx-30px mt-res-md-30px">
                            <div className="single-wedge">
                                <h4 className="footer-herading">Quick Links</h4>
                                <div className="footer-links">
                                    <ul>
                                        <li>
                                            <Link href={'/about-us'}>
                                                About Us
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={'/contact-us'}>
                                                Contact Us
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={'/faq'}>
                                                FAQ
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                        <Col lg={2} md={6} className="mt-res-md-50px mt-res-sx-30px mt-res-md-30px">
                            <div className="single-wedge">
                                <h4 className="footer-herading">Custom Links</h4>
                                <div className="footer-links">
                                    <ul>
                                        <li>
                                            <Link href={'/privacy-policy'}>
                                                Privacy Policy
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={'/terms-and-services'}>
                                                Terms of Service
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={'/shipping-policy'}>
                                                Shipping Policy
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={'/returns-and-exchange'}>
                                                Returns & Exchange
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                        <Col md={6} lg={4} className="mt-res-md-50px mt-res-sx-30px mt-res-md-30px">
                            <div className="single-wedge">
                                <h4 className="footer-herading">Newsletter</h4>
                                <div className="subscrib-text">
                                    <p>
                                        You may unsubscribe at any moment. For that purpose, please find our contact info
                                        in the legal notice.
                                    </p>
                                </div>
                                <div id="mc_embed_signup" className="subscribe-form">
                                    <Formik
                                        initialValues={{ email: '' }}
                                        onSubmit={handleNewsletterSubmit}
                                        validationSchema={newsletterSchema}
                                    >
                                        {({ handleSubmit }) => {
                                            return (
                                                <Form onSubmit={handleSubmit} className="validate">
                                                    <div id="mc_embed_signup_scroll" className="mc-form">
                                                        <Field
                                                            type="email"
                                                            name="email"
                                                            placeholder="user@example.com"
                                                        />
                                                        <ErrorMessage
                                                            name='email'
                                                            component="span"
                                                            className='text-danger' />
                                                        <div className="clear">
                                                            <Button type='submit' className='button'>
                                                                Sign Up
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </Form>
                                            )
                                        }}
                                    </Formik>
                                </div>
                                <div className="img_app">
                                    <a href="https://apps.apple.com/in/app/partzrider/id1633776749" target="_blank" rel="noreferrer"><Image src={appStore} width={150} height={50} alt="" /></a>
                                    <a href="https://play.google.com/store/apps/details?id=com.georgeoakeslimited.partzrider" target="_blank"
                                        rel="noreferrer"><Image src={googlePlay} width={150} height={50} alt="" /></a>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="footer-bottom">
                <Container>
                    <Row>
                        <Col md={6} lg={6} className="text-center text-md-start order-2 order-md-1 mt-4 mt-md-0">
                            <p className="copy-text">
                                Copyright © <a href=""> </a>. All Rights Reserved
                            </p>
                        </Col>
                        <Col lg={6} md={6} className="text-center text-md-end order-1 order-md-2">
                            {/* <img src={payment.src} /> */}
                            {/* <Image 
                                src={payment} 
                                // width={400}
                                // height={140}
                                width={520} 
                                height={70} 
                                layout='fixed' 
                                alt="payment_img" 
                            /> */}

                    <ul className="list-inline1 d-flex justify-content-between">
                        <li><Image layout='fixed' width={50} height={25} className="payment-img" src={icon0} alt="" /></li>
                        <li><Image layout='fixed' width={50} height={25} className="payment-img" src={icon1} alt="" /></li>
                        <li><Image layout='fixed' width={50} height={25} className="payment-img" src={icon2} alt="" /></li>
                        <li><Image layout='fixed' width={50} height={25} className="payment-img" src={icon3} alt="" /></li>
                        <li><Image layout='fixed' width={50} height={25} className="payment-img" src={icon4} alt="" /></li>
                        <li><Image layout='fixed' width={50} height={25} className="payment-img" src={icon5} alt="" /></li>
                        <li><Image layout='fixed' width={50} height={25} className="payment-img" src={icon6} alt="" /></li>
                    </ul>

                        </Col>
                    </Row>
                </Container>
            </div>
        </footer>
    )
}
export default Footer;