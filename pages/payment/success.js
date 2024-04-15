import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";

const DeliveryPolicy = () => {
    return (
        <section className="about-area">
            <Container>
                <Row>
                    <Col lg={12} className="mx-auto text-center">
                        <div className="card-su">
                            <div style={{ borderRadius: "200px", height: "200px", width: "200px", background: "#F8FAF5", margin: "0 auto" }}>
                                <i className="checkmark">✓</i>
                            </div>
                            <h1>Payment Successful</h1>
                            <p dangerouslySetInnerHTML={{
                                __html: `
                                    We received your purchase request;<br /> we'll be in touch shortly!
                                `
                            }}
                            />
                        </div>
                    </Col>
                    {/* <Col lg={2} className="mb-res-sm-50px">
                    </Col>
                    <Col lg={8}>
                        <div className="about-content">
                            <ul className="list-inline-item">
                                <li>1. All products are shipped within 2-3 days but however in some cases it may get delayed due to non availability with suppliers or factors beyond control.</li>
                                <li>2. Each order would be shipped only to a single destination address specified at the time of payment for that order. If you wish to ship products to different addresses, you shall need to place multiple orders.</li>
                                <li>3. The customer team will inform in case of delay beyond 5 days via email or phone contact.</li>
                                <li>4. To ensure that your order reaches you in the fastest time and in good condition, sellers will only make shipments through reputed courier agencies.</li>
                                <li>5.  All products sold on Partzrider.com attracts shipping charges. The charges vary depend on various factors like product weight, size, fragileness, location and mode of delivery (Air, Surface or Sea).</li>
                                <li>7. Please note all items will be shipped with our Invoice copy and if the same is not received, you may call our customer care number at at 044-48622525 (10.00 a.m. to 6.00 p.m. / Monday – Saturday), or write an e-mail to onlinesupport@georgeoakes.com mentioning your order reference number.</li>
                                <li>8. You can cancel your order by getting in touch with us via e-mail at onlinesupport@georgeoakes.com or over phone at our customer care number 044-48622525 (10.00 a.m. to 6.00 p.m. / Monday – Saturday). Your order will be cancelled if it has not been shipped and we will refund the order value as applicable. Moreover, if the order has been shipped but not yet delivered to you, you may cancel the order by contacting us as mentioned above. Your refund will only be processed by us once we receive the originally ordered product back from our courier / logistics partner after deduction of shipping charges.</li>
                            </ul>
                        </div>
                    </Col> */}
                </Row>
            </Container>
        </section>
    )
};

export default DeliveryPolicy;