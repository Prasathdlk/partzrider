import { utils } from "core/helper";
import { ErrorMessage, Field, Formik } from "formik";
import { Col, Container, Form, Row } from "react-bootstrap";
import * as Yup from "yup";
import {contactService} from "../core/services";

const initialValues = {
    contact_name: "",
    contact_email: "support@partzrider.com",
    contact_mobile: "",
    contact_subject: "",
    contact_message: ""
};

const ContactUsSchema = Yup.object().shape({
    contact_name: Yup
        .string()
        .required('Name is required'),
    // contact_email: Yup
    //     .string()
    //     .email("Invalid email")
    //     .required('Email is required'),
    contact_mobile: Yup
        .string()
        .required('Mobile number is required')
        .matches(/^\d{10}$/, 'Invalid Number'),
    contact_subject: Yup
        .string()
        .required('Subject is required'),
    contact_message: Yup
        .string()
        .required('Message is required')
});

const ContactUs = () => {

    const handleContactusSubmit = (values, {setSubmitting, resetForm}) => {
        console.log("values::",values);
        contactService.contactUs(values).then((resp)=>{
            if(resp.is_successful === true)
            utils.showSuccessMsg(resp.message);
            setSubmitting(false);
            resetForm();
        }).catch(err=>{
            utils.showErrMsg(utils.handleErr(err));
            setSubmitting(false)
        })
    };
    
    return (
        <>
            <section className="breadcrumb-area">
                <Container>
                    <Row>
                        <Col md={12}>
                            <div className="breadcrumb-content">
                                <h1 className="breadcrumb-hrading">Contact Us</h1>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <div className="contact-area mtb-60px">
                <Container>
                    <Row className="custom-row-2">
                        <Col lg={4} md={5}>
                            <div className="contact-info-wrap">
                                <div className="single-contact-info">
                                    <div className="contact-icon">
                                        <i className="fa fa-phone"></i>
                                    </div>
                                    <div className="contact-info-dec">
                                        <p>+91 89255 11777</p>
                                    </div>
                                </div>
                                <div className="single-contact-info">
                                    <div className="contact-icon">
                                        <i className="fa fa-globe"></i>
                                    </div>
                                    <div className="contact-info-dec">
                                        <p><a href="#">support@partzrider.com</a></p>
                                    </div>
                                </div>
                                <div className="single-contact-info">
                                    <div className="contact-icon">
                                        <i className="fa fa-map-marker"></i>
                                    </div>
                                    <div className="contact-info-dec">
                                        <h6>George Oakes Limited,</h6>
                                        <p>New No.43, Old No.17, Greams Road, Thousand Lights, Chennai - 600 006.</p>
                                    </div>
                                </div>
                                <div className="contact-social">
                                    <h3>Follow Us</h3>
                                    <div className="social-info">
                                        <ul>
                                            <li>
                                                <a href="https://www.facebook.com/people/Partzrider/100083152669385/" target="_blank" rel="noreferrer">
                                                    <i className="ion-social-facebook"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="https://www.instagram.com/partzrider/" target="_blank" rel="noreferrer">
                                                    <i className="ion-social-instagram"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={8} md={7}>
                            <div className="contact-form">
                                <div className="contact-title mb-30">
                                    <h2>Get In Touch</h2>
                                </div>
                                <Formik
                                    validationSchema={ContactUsSchema}
                                    initialValues={initialValues}
                                    onSubmit={handleContactusSubmit}
                                >
                                    {({ handleSubmit, isSubmitting })=>{
                                        return(
                                            <Form onSubmit={handleSubmit} className="contact-form-style">
                                                <Row>
                                                    <Col lg={6}>
                                                        <Field
                                                            name="contact_name"
                                                            placeholder="Name*"
                                                            type="text" 
                                                        />
                                                        <ErrorMessage name="contact_name" component="span" className="text-danger"/>
                                                    </Col>
                                                    <Col lg={6}>
                                                        <Field 
                                                            name="contact_mobile"
                                                            placeholder="Mobile Number*"
                                                            type="text"
                                                        />
                                                        <ErrorMessage name="contact_mobile" component="span" className="text-danger"/>
                                                    </Col>
                                                    <Col lg={12}>
                                                        <Field 
                                                            name="contact_subject" 
                                                            placeholder="Subject*" 
                                                            type="text" 
                                                        />
                                                        <ErrorMessage name="contact_subject" component="span" className="text-danger"/>
                                                    </Col>
                                                    <Col lg={12}>
                                                        <Field 
                                                            as="textarea"
                                                            name="contact_message" 
                                                            placeholder="Your Message*"
                                                        >
                                                        </Field>
                                                        <ErrorMessage name="contact_message" component="span" className="text-danger"/>
                                                    </Col>
                                                    <button disabled={isSubmitting} className="submit" type="submit">SEND</button>
                                                </Row>
                                            </Form>
                                        )
                                    }}
                                </Formik>
                                {/* <p className="form-messege"></p> */}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
};

export default ContactUs;