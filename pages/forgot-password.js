import { Formik, ErrorMessage, Field } from "formik";
import { useRouter } from "next/router";
import Link from "next/link";
import { Container, Row, Col, Form } from "react-bootstrap";
import * as Yup from 'yup';
import { authService } from "core/services";
import { utils } from "core/helper";
import { connect } from "react-redux";
import { forgotAction } from "redux/action/account.action";
import SubmitButton from "components/common/submit-button";

const initialValues = {
    user_name: ''
};

const forgotSchema = Yup.object().shape({
    user_name: Yup
        .string()
        .required('Email is required')
});

const ForgotPassword = (props) => {
    const { forgotAction } = props;
    const navigate = useRouter();

    const handleForgotSubmit = function (forgotValuesObj, { setSubmitting }) {
        const { user_name } = forgotValuesObj;
        authService.forgotPassword(forgotValuesObj).then((resp) => {
            if (!user_name) {
                utils.showErrMsg(resp.message);
                return false
            }
            utils.showSuccessMsg(resp.message);
            forgotAction({ forgotUser: { username: user_name } });
            navigate.push('/reset-password');
        }).catch(error => {
            utils.showErrMsg(utils.handleErr(error));
            setSubmitting(false)
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
                                                initialValues={initialValues}
                                                validationSchema={forgotSchema}
                                                onSubmit={handleForgotSubmit}
                                            >
                                                {({ handleSubmit, isSubmitting }) => {
                                                    return (
                                                        <Form onSubmit={handleSubmit} className="loginForm">
                                                            <Field
                                                                type="text"
                                                                name="user_name"
                                                                placeholder="Email"
                                                            />
                                                            <ErrorMessage className='mb-2 text-danger' component="div" name="user_name" />
                                                            <div className="button-box">
                                                                <div className="login-toggle-btn">
                                                                    <Link href={"/login"}>Back to Login?</Link>
                                                                </div>
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

const mapStateToProps = {
    forgotAction
};

export default connect(null, mapStateToProps)(ForgotPassword);