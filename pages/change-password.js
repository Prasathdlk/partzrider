import React from "react";
import { ErrorMessage, Field, Formik } from "formik";
import { useRouter } from "next/router";
import { Container, Row, Col, Form } from "react-bootstrap";
import * as Yup from 'yup';
import { authService } from "core/services";
import { utils } from "core/helper";
import { useRef } from "react";
import SubmitButton from "components/common/submit-button";

const initialValues = {
    old_password: '',
    new_password: '',
};

const forgotSchema = Yup.object().shape({
    old_password: Yup
        .string()
        .required('Old password is required'),
    new_password: Yup
        .string()
        .required('New password is required'),
});

const ChangePassword = () => {
    const formikRef = useRef();
    const navigate = useRouter();

    const handleChangePassword = function (changePassword, { setSubmitting }) {
        console.log("changePassword::", changePassword);
        authService.changePassword(changePassword).then((resp) => {
            utils.showSuccessMsg(resp.message);
            navigate.push('/')
        }).catch(error => {
            utils.showErrMsg(utils.handleErr(error));
            setSubmitting(false);
        });
    };

    return (
        <div className="home-5 home-6 home-8 home-9 home-electronic">
            <div id="main">
                <div className="login-register-area mb-60px mt-53px">
                    <Container>
                        <Row>
                            <Col lg={7} md={12} className="mx-auto">
                                <div className="login-register-wrapper">
                                    <div className="login-form-container">
                                        <div className="m-2 text-center">
                                            <h3>Change Password</h3>
                                        </div>
                                        <div className="login-register-form">
                                            <Formik
                                                innerRef={formikRef}
                                                initialValues={initialValues}
                                                validationSchema={forgotSchema}
                                                handleChangePassword={handleChangePassword}
                                            >
                                                {({ handleSubmit, isSubmitting }) => {
                                                    return (
                                                        <Form onSubmit={handleSubmit} className="loginForm" >
                                                            <Field
                                                                type="password"
                                                                name="old_password"
                                                                placeholder="Old Password"
                                                            />
                                                            <ErrorMessage component="span" name="old_password" className="text-danger" />
                                                            <Field
                                                                type="password"
                                                                name="new_password"
                                                                placeholder="New Password"
                                                            />
                                                            <ErrorMessage component="span" name="new_password" className="text-danger" />
                                                            <div className="button-box">
                                                                <div className="d-flex">
                                                                    <SubmitButton
                                                                        type="submit"
                                                                        text="Submit"
                                                                        disabled={isSubmitting}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </Form>
                                                    )
                                                }}
                                            </Formik>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </div>
    )
};

export default ChangePassword;
