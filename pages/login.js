import { useRef, useState } from "react";
import Link from "next/link";
import { Formik, Field, ErrorMessage } from "formik";
import { Nav, Tab, Container, Row, Col, Form } from "react-bootstrap";
import * as Yup from 'yup';
import { connect } from "react-redux";
import { authService } from "core/services";
import { loginAction } from "redux/action/account.action";
import { utils } from "core/helper";
import { useRouter } from "next/router";
import SubmitButton from "components/common/submit-button";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
    }
    return false;
}
const mobileSchema = Yup.object().shape({
    mobile: Yup
        .string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .required('Mobile number is required'),
});

const logInSchema = Yup.object().shape({
    username: Yup
        .string()
        .required('Email / Mobile number is required'),
    password: Yup.string()
        .required('Password / OTP is required')
        .min(4, "Password must be at least 8 characters")
});

const loginInitialValues = {
    username: '',
    password: ''
};

const RegisterSchema = Yup.object().shape({
    mobile_no: Yup
        .string()
        .max(10, "Mobile Number exceed")
        .required('Mobile number is required')
        .matches(/^[0-9]/, 'Invalid mobile number'),
    // email_id: Yup.string().sequence([
    //     () => Yup.string().email("Email should be valid and contain @").required("Email is required"), // check format
    //     () => Yup.string().unique('Username is already taken', uniqueUsername),  // check uniqe via api
    // ]),
    email_id: Yup
        .string()
        .email("Email should be valid and contain @")
        .required("Email is required")
        .test("unique_email", "Email is already taken", async (email) => {
            if (ValidateEmail(email)) {
                return authService.checkEmailAvailability(email).then((resp) => {
                    return resp.is_successful;
                }).catch(error => {
                    console.log('checkEmailAvailability-error::', error);
                    return false;
                })
            } else {
                return false;
            }

        }, ['email']),
    password: Yup
        .string()
        .required('Password is required')
        .min(8, "Password must be at least 8 characters")
        .max(15, 'Password must be at less than 15 characters'),
    confirmPassword: Yup.string()
        .required("Confirm password is required")
        .test(
            "confirm-password-test",
            "Password and confirm password should match",
            function (value) {
                return value === this.parent.password;
            }
        ),
    first_name: Yup
        .string('')
        .required('First name is required'),
    last_name: Yup
        .string('')
        .required('Last name is required'),
});

const registerIntialValues = {
    mobile_no: '',
    email_id: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    customer_type: '',
    referral_code: 'j612',
    reg_media: 'A'
}

const Login = (props) => {

    const { token, loginAction } = props;
    const formikRef = useRef();
    const [loginType, setLoginType] = useState("password");
    const router = useRouter();

    const handleLoginSubmit = function (payload, { setSubmitting }) {
        try {
            payload.type = loginType;
            console.log(payload.type);
            authService.login(payload).then(async resp => {
                if (resp.is_successful) {
                    utils.showSuccessMsg(resp.message);
                    await loginAction({ isLoggedIn: true, authUser: resp, token: resp.token });
                    location.href="/";
                } else {
                    utils.showErrMsg(resp.message);
                    setSubmitting(false);
                }
            });
        } 
        catch (error) 
        {
            utils.showErrMsg(utils.handleErr(error));
            setSubmitting(false);
        }
    };

    const handleLoginWithOTP = async (username) => {
        const mobileCheck = await mobileSchema.isValid({
            mobile: username
        });
        console.log('mobileCheck::', mobileCheck);
        if (mobileCheck === false) {
            utils.showErrMsg("enter valid mobile number")
            return false
        } else {
            console.log('logOtpPayload::', username);
            await authService.generateOTP(username).then((resp) => {
                console.log("otpResp::", resp);
                if (resp.is_successful === true) {
                    setLoginType("otp");
                    utils.showSuccessMsg(resp.message);
                } else {
                    utils.showErrMsg(resp.message);
                    // setSubmitting(false);
                }
            }).catch(error => {
                utils.showErrMsg(utils.handleErr(error));
                // setSubmitting(false);
            })
        }
    };



    
    const handleRegisterSubmit = (payload, { setSubmitting }) => {
        delete payload.confirmPassword;
        authService.register(payload).then(async (resp) => {
            if (resp.is_successful) {
                utils.showSuccessMsg(resp.message);
                await loginAction({ isLoggedIn: true, authUser: resp, token: resp.token });
                location.href="/"
            }
            else {
                utils.showErrMsg(resp.message);
                setSubmitting(false);
            }
        }).catch(error => {
            utils.showErrMsg(utils.handleErr(error));
            setSubmitting(false);
        })
    }

    return (
        <div className="home-5 home-6 home-8 home-9 home-electronic">
            <div id="main">
                <div className="login-register-area mb-60px mt-53px">
                    <Container>
                        <Row>
                            <Col lg={7} md={12} className="mx-auto">
                                <Tab.Container defaultActiveKey={"login"}>
                                    <div className="login-register-wrapper">
                                        <div className="login-register-tab-list nav">
                                            <Nav>
                                                <Nav.Link eventKey={"login"}>
                                                    <h4>login</h4>
                                                </Nav.Link>
                                                <Nav.Link eventKey={"register"}>
                                                    <h4>register</h4>
                                                </Nav.Link>
                                            </Nav>
                                        </div>
                                        <Tab.Content>
                                            <Tab.Pane eventKey={"login"}>
                                                <div className="login-form-container">
                                                    <div className="login-register-form">
                                                        <Formik
                                                            initialValues={loginInitialValues}
                                                            validationSchema={logInSchema}
                                                            onSubmit={handleLoginSubmit}
                                                        >
                                                            {({ handleSubmit, isSubmitting, values }) => {
                                                                return (
                                                                    <Form onSubmit={handleSubmit}>
                                                                        <Field
                                                                            type="text"
                                                                            name="username"
                                                                            placeholder="Email / Mobile No"
                                                                            autoComplete="off"
                                                                            className="mb-2"
                                                                        />

                                                                        <ErrorMessage className='mb-2 text-danger' component="div" name="username" />
                                                                        <Field
                                                                            type="password"
                                                                            name="password"
                                                                            placeholder="Password / OTP"
                                                                            autoComplete="off"
                                                                            className="mb-2"
                                                                        />

                                                                        <ErrorMessage className='mb-2 text-danger' component="div" name="password" />
                                                                        <div className="button-box">
                                                                            <div className="login-toggle-btn">
                                                                                <input type="checkbox" />
                                                                                <a className="flote-none mx-2" href="#">Remember me</a>
                                                                                <Link href={"/forgot-password"}>Forgot Password?</Link>
                                                                            </div>
                                                                            <div className="d-flex">
                                                                                <SubmitButton
                                                                                    type="submit"
                                                                                    text="Login"
                                                                                    disabled={isSubmitting}
                                                                                />
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={() => {
                                                                                        handleLoginWithOTP(values.username)
                                                                                    }}>
                                                                                    <span>Login with OTP </span>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </Form>
                                                                )
                                                            }}
                                                        </Formik>
                                                    </div>
                                                </div>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey={"register"}>
                                                <div className="login-form-container">
                                                    <div className="login-register-form">
                                                        <Formik
                                                            innerRef={formikRef}
                                                            initialValues={registerIntialValues}
                                                            validationSchema={RegisterSchema}
                                                            onSubmit={handleRegisterSubmit}
                                                        >
                                                            {({ isSubmitting, handleSubmit }) => (
                                                                <Form onSubmit={handleSubmit}>
                                                                    <div role="group" aria-labelledby="my-radio-group">
                                                                        <label className="mrl-12 text-bold">
                                                                            User Type
                                                                        </label>
                                                                        <br />
                                                                        <br />
                                                                        
                                                                        <label>
                                                                            <Field type="radio" className="mrl-2" name="customer_type" value="customer" />
                                                                            DIY Customers
                                                                        </label>
                                                                        &nbsp;
                                                                        &nbsp;
                                                                        &nbsp;
                                                                        &nbsp;
                                                                        <label>
                                                                            <Field type="radio" className="mrl-2" name="customer_type" value="garage_owner" />
                                                                            Repairers / B2B
                                                                        </label>
                                                                    </div>
                                                                    
                                                                    <br />
                                                                    <Field
                                                                        name="first_name"
                                                                        placeholder="First Name"
                                                                        type="text"
                                                                        className="mb-2"
                                                                    />
                                                                    <ErrorMessage className='mb-2 text-danger' component="div" name="first_name" />
                                                                    <br />
                                                                        
                                                                    <Field
                                                                        name="last_name"
                                                                        placeholder="Last Name"
                                                                        type="text"
                                                                        className="mb-2"
                                                                    />
                                                                    <ErrorMessage className='mb-2 text-danger' component="div" name="last_name" />
                                                                    <br />
                                                                    <Field
                                                                        name="mobile_no"
                                                                        placeholder="Mobile Number"
                                                                        type="text"
                                                                        className="mb-2"
                                                                        maxLength="10"
                                                                    />
                                                                    <ErrorMessage className='mb-2 text-danger' component="div" name="mobile_no" />
                                                                    <br />
                                                                    <Field
                                                                        type="email"
                                                                        name="email_id"
                                                                        placeholder="Email"
                                                                        className="mb-2"
                                                                    />
                                                                    <ErrorMessage className='mb-2 text-danger' component="div" name="email_id" />
                                                                    <br />
                                                                    <Field
                                                                        name="password"
                                                                        placeholder="Password"
                                                                        type="password"
                                                                        autoComplete="off"
                                                                        className="mb-2"
                                                                    />
                                                                    <ErrorMessage className='mb-2 text-danger' component="div" name="password" />
                                                                    <br />
                                                                    <Field
                                                                        name="confirmPassword"
                                                                        placeholder="Confirm Password"
                                                                        type="password"
                                                                        className="mb-2"
                                                                    />
                                                                    <ErrorMessage className='mb-2 text-danger' component="div" name="confirmPassword" />
                                                                    <br />
                                                                    <br />
                                                                      <div className="button-box">
                                                                        <SubmitButton
                                                                            type="submit"
                                                                            text="Register"
                                                                            disabled={isSubmitting}
                                                                        />
                                                                    </div>
                                                                </Form>
                                                            )}
                                                        </Formik>
                                                    </div>
                                                </div>
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </div>
                                </Tab.Container>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </div>

    )
}

const mapStateToProps = state => {
    return {
        token: state.account?.token
    }
}

const mapDispatchToProps = {
    loginAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
