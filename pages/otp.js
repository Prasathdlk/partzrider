import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";

const OTP = () => {
    return (
        <div className="home-5 home-6 home-8 home-9 home-electronic">
            <div id="main">
                <div className="login-register-area mb-60px mt-53px">
                    <Container>
                        <Row>
                            <Col lg={7} md={12} className="mx-auto">
                                <div className="login-register-wrapper">
                                    <div className="login-form-container">
                                        <h4 className="text-center m-4">Login With SMS</h4>
                                        <div className="login-register-form">
                                            <Form action="#" method="post">
                                                <Form.Control type="number" name="name" placeholder="Enter Mobile Number"/>
                                                <div className="button-box text-center">
                                                    <button type="submit"><span>Send Verification Code</span></button>
                                                </div>
                                            </Form>
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
}
export default OTP;

