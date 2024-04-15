import { Container, Row, Col } from "react-bootstrap";
import Image from 'next/image';
import codImage from 'public/styles/assets/images/cod.png';

const COD = () => {
    return (
        <div className="login-register-area mb-60px mt-53px">
            <Container>
                <Row>
                    <Col lg={12} md={12} className="mx-auto text-center">
                        <div className="">
                            <div className="">
                                <i className="checkmark">
                                    <Image src={codImage}
                                        alt="cod-image" />
                                </i>
                            </div>
                            <h1>Your Order is confirmed</h1>
                            <p>We will deliver the items as per schedule.</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default COD;