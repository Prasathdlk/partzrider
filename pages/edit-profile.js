import Link from "next/link";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Formik, ErrorMessage, Field } from "formik";
import * as Yup from 'yup';
//import Image from "next/image";
//import Image1 from "../public/styles/assets/images/product-image/product1.jpg";
import { useEffect, useRef, useState } from "react";
import { authService } from "core/services";
import { utils } from "core/helper";
import { useRouter } from "next/router";

const initialValues = {
    first_name: '',
    last_name: 'user',
    email: '',
    mobile_no: '',
    by_email: '',
    by_sms: ''
    // address:''
};

const editProfileSchema = Yup.object().shape({
    first_name: Yup
        .string()
        .required('First name is required'),
    last_name: Yup
        .string()
        .required('Last name is required'),
    email: Yup
        .string()
        .required('email is required'),
    mobile_no: Yup
        .string()
        .required('Mobile number is required')
        .matches(/^\d{10}$/, 'Invalid Number'),
    // address: Yup
    //     .string()
    //     .required('Address is required')
    //     .matches(/^[A-Za-z " "]+$/,"Invalid ")
});

const EditProfile = () => {

    const [loadProfile, setLoadProfile] = useState('');
    const formikRef = useRef();
    const navigate = useRouter();

    function loadProfileData() {
        authService.loadProfile().then((resp) => {
            if (resp.is_successful = true) {
                let  { first_name, last_name, mobile_no, by_email, by_sms, email_id:email } = resp;
                by_email = by_email == 'Y' ? true : false 
                by_sms = by_sms == 'Y' ? true :  false 
                const data = { first_name, last_name, mobile_no, by_email, by_sms, email }
                setLoadProfile(data);
                setFormValues(data);
            } else {
                setLoadProfile('');
            }
        }).catch(error => {
            utils.showErrMsg(utils.handleErr(error));
        });
    };

    useEffect(() => {
        loadProfileData();
    }, []);

    function setFormValues(loadProfile) {
        if (formikRef.current && loadProfile) {
            const { setFieldValue } = formikRef.current;
            const fields = ['first_name', 'email', 'mobile_no', 'by_email', 'by_sms'];
            fields.forEach(field => setFieldValue(field, loadProfile[field], false));
        }
    };

    const handleEditProfileSubmit = (payload, { setSubmitting }) => {
        payload.by_email = payload.by_email ? 'Y' : 'N';
        payload.by_sms =  payload.by_sms ? 'Y' : 'N';   
        authService.updateProfile(payload).then((resp) => {
            utils.showSuccessMsg(resp.message);
            navigate.push('/profile')
        }).catch(error => {
            utils.showErrMsg(utils.handleErr(error));
            setSubmitting(false);
        })
    };

    return (
        <div className="checkout-area mtb-60px">
            <Container>
                <Row>
                    <Col lg={9} className="mx-auto">
                        <div className="checkout-wrapper">
                            <div id="faq" className="panel-group">
                                <div className="panel panel-default single-my-account">
                                    <div id="my-account-1" className="panel-collapse collapse show">
                                        <div className="panel-body">
                                            <div className="myaccount-info-wrapper">
                                                <div className="account-info-wrapper">
                                                    <h5>Profile Edit</h5>
                                                </div>
                                                <Formik
                                                    innerRef={formikRef}
                                                    initialValues={initialValues}
                                                    validationSchema={editProfileSchema}
                                                    onSubmit={handleEditProfileSubmit}
                                                >
                                                    {({ handleSubmit, isSubmitting }) => {
                                                        return (
                                                            <Form onSubmit={handleSubmit}>
                                                                <Row>
                                                                    {/* <Col md={3}>
                                                                        <Image alt="previous-user-profile-image" src={Image1} className="img-responsive" />
                                                                        <Form.Control type="file" className="form-control" />
                                                                    </Col> */}
                                                                    <Col md={9}>
                                                                        <Row className="form-group">
                                                                            <Col lg={3} md={3}>
                                                                                <Form.Label style={{ fontWeight: 600 }}>Name</Form.Label>
                                                                            </Col>
                                                                            <Col lg={9} md={9}>
                                                                                <Field
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    name="first_name"
                                                                                // value={loadProfile.first_name}
                                                                                />
                                                                                <ErrorMessage name="first_name" component="span" className="text-danger" />
                                                                            </Col>
                                                                        </Row>
                                                                        <Row className="form-group">
                                                                            <Col lg={3} md={3}>
                                                                                <Form.Label style={{ fontWeight: 600 }}>Email</Form.Label>
                                                                            </Col>
                                                                            <Col lg={9} md={9}>
                                                                                <Field
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    name="email"
                                                                                />
                                                                                <ErrorMessage name="email" component="span" className="text-danger" />
                                                                            </Col>
                                                                        </Row>
                                                                        <Row className="form-group">
                                                                            <Col lg={3} md={3}>
                                                                                <Form.Label style={{ fontWeight: 600 }}>Mobile</Form.Label>
                                                                            </Col>
                                                                            <Col lg={9} md={9}>
                                                                                <Field
                                                                                    type="text"
                                                                                    class="form-control"
                                                                                    name="mobile_no"
                                                                                />
                                                                                <ErrorMessage name="mobile_no" component="span" className="text-danger" />
                                                                            </Col>
                                                                        </Row>
                                                                        <Row className="form-group">
                                                                            <Col lg={3} md={3}>
                                                                                <Form.Label style={{ fontWeight: 600 }}>Allow Email
                                                                                </Form.Label>
                                                                            </Col>
                                                                            <Col lg={9} md={9}>
                                                                                <Field
                                                                                    type="checkbox"
                                                                                    name="by_email"
                                                                                />
                                                                            </Col>
                                                                        </Row>
                                                                        <Row className="form-group">
                                                                            <Col lg={3} md={3}>
                                                                                <Form.Label style={{ fontWeight: 600 }}>Allow sms
                                                                                </Form.Label>
                                                                            </Col>
                                                                            <Col lg={9} md={9}>
                                                                                <Field
                                                                                    type="checkbox"
                                                                                    name="by_sms"
                                                                                />
                                                                            </Col>
                                                                        </Row>
                                                                        <Row>
                                                                            <Col md={3}></Col>
                                                                            <Col md={6}>
                                                                                <Button
                                                                                    disabled={isSubmitting}
                                                                                    type="submit"
                                                                                    className="btn btn-success"
                                                                                >
                                                                                    Submit
                                                                                </Button>
                                                                            </Col>
                                                                        </Row>
                                                                    </Col>
                                                                </Row>
                                                            </Form>
                                                        )
                                                    }}
                                                </Formik>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
};

export default EditProfile;