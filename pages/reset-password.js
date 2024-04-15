import { ErrorMessage, Formik, Field } from "formik";
import { useRouter } from "next/router";
import { Container, Row, Col, Form } from "react-bootstrap";
import * as Yup from 'yup';
import { authService } from "core/services";
import { utils } from "core/helper";
import { connect } from "react-redux";
import { useEffect, useRef } from "react";
import SubmitButton from "components/common/submit-button";

const initialValues = {
    username: '',
    password: '',
    confirm_password: '',
    code: ''
};

const forgotSchema = Yup.object().shape({
    username: Yup
        .string()
        .required('Username is required'),
    code: Yup
        .string()
        .required('Code is required')
        .min(6, "Code must be at least 6 characters")
        .max(6, 'Code must be at less than 6 characters'),
    password: Yup
        .string()
        .required('Password is required'),
    confirm_password: Yup
        .string()
        .required('Confirm Password is required')
        .test("confirm-password-test",
            "Password not match",
            function (value) {
                return value === this.parent.password
            }
        )
});

const ResetPassword = (props) => {
    const { forgotUser } = props;
    const formikRef = useRef();
    const navigate = useRouter();

    useEffect(() => {
        if (formikRef.current) {
            initialValues.username = forgotUser.username;
        } else {
            console.log('username=', initialValues.username);
        }
    }, [forgotUser]);

    const handleChangeForgotPassword = function (changePassword, { setSubmitting }) {
        delete changePassword.confirm_password;
        authService.changeForgotPassword(changePassword).then((resp) => {
            utils.showSuccessMsg(resp.message);
            navigate.push('/login');
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
                                        <div className="login-register-form">
                                            <Formik
                                                innerRef={formikRef}
                                                initialValues={initialValues}
                                                validationSchema={forgotSchema}
                                                onSubmit={handleChangeForgotPassword}
                                            >
                                                {({ handleSubmit, isSubmitting }) => (
                                                    <Form onSubmit={handleSubmit} className="loginForm" >
                                                        <Field
                                                            type="password"
                                                            name="password"
                                                            placeholder="Password"
                                                        />
                                                        <ErrorMessage name="password" component="span" className="text-danger" />
                                                        <Field
                                                            type="password"
                                                            name="confirm_password"
                                                            placeholder="Confirm Password"
                                                        />
                                                        <ErrorMessage name="confirm_password" component="span" className="text-danger" />
                                                        <Field
                                                            type="text"
                                                            name="code"
                                                            placeholder="Code"
                                                        />
                                                        <ErrorMessage name="code" component="span" className="text-danger" />
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
                                                )}
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

const mapStateToProps = state => {
    return {
        // forgotUser : state.forgotUser?.username
        forgotUser: state.account?.forgotUser,
    };
};

export default connect(mapStateToProps)(ResetPassword);