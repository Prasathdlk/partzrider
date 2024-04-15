import Link from "next/link";
import { Container, Row ,Col} from "react-bootstrap";

const ReturnPolicy = () => {
    return (
        <>
            <section className="breadcrumb-area">
                <Container>
                    <Row>
                        <Col md={12} >
                            <div className="breadcrumb-content">
                                <h1 className="breadcrumb-hrading">Return Policy</h1>
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
                                <ul className="list-inline-item">
                                    <li>1.	You must provide our <strong>Invoice copy as proof</strong> of purchase to accept returns.</li>
                                    <li>2.	Any <strong>damage or tamper</strong> found on the package should be mentioned in the document of logistics company (Proof of delivery).</li>
                                    <li>3.	We recommend <strong>taking photos of packages and items received</strong> and <strong>shooting an unpacking video of the product</strong>. You must preserve the packing in original condition and the product returned must be in similar condition at time of receipt and should not have been installed, used or have any signs of fitment.</li>
                                    <li>4.	In the case of any defect, decision will be taken after <strong>inspection done</strong> by the manufacturer or certified organization.</li>
                                    <li>5.	<strong>No returns or warranty will be provided for Imported parts, electrical parts and fragile parts</strong>.</li>
                                    <li>6.	<strong>No returns will be accepted if there is any damage/defect which is not covered under the manufacturers warranty</strong>.</li>
                                    <li>7.	<strong>No refund for the parts wrongly ordered by the customer</strong>.</li>
                                    <li>8.	Returns accepted by us will be eligible for refund after deduction of 20% of Invoice value or courier charges whichever is higher.</li>
                                    <li>9.	In case of a return, we recommend to make a video while repacking the parts.</li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
};

export default ReturnPolicy;