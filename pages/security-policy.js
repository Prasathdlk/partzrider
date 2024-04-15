

import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";

const SecurityPolicy = () => {
    return (
        <>
            <section className="breadcrumb-area">
                <Container>
                    <Row>
                        <Col md={12}>
                            <div className="breadcrumb-content">
                                <h1 className="breadcrumb-hrading">Security/Privacy Policy</h1>
                                <ul className="breadcrumb-links">
                                    <li><Link href={"/"}>Home</Link></li>
                                    <li>List</li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="about-area">
                <Container>
                    <Row>
                        <Col lg={2} className="mb-res-sm-50px">
                        </Col>
                        <Col lg={8}>
                            <div className="about-content">
                                <p className="mb-30px" style={{ textAlign: 'justify' }}>
                                    On behalf of George Oakes Ltd, we cordially welcome you here and thank you for visiting our website. Your visit to this site is subject to this Privacy Policy as we are fully committed to protect our customers privacy at any cost. We respect the privacy of our users when they use our websites, mobile and other online applications and products and services. We strongly believe that the personal information of our customers should not be shared with the third party without the prior consent or request from the customer. This Privacy policy states the types of personal information we are collecting on our website and how we may use that information with whom we may share it. Our privacy policy also states the actions we take to safeguard your privacy as you visit and use our website. This policy governs the only information provided to us and it does not govern any other information that may have been collected through other online stores selling our products. So by accepting this policy, you give your consent to our use and disclosure of your personal information as per mentioned in this privacy policy.
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
};

export default SecurityPolicy;