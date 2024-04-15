import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";

const ShippingPolicy = () => {
    return (
        <>
            <section className="breadcrumb-area">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="breadcrumb-content">
                                <h1 className="breadcrumb-hrading">Shipping Policy</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="about-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-2 mb-res-sm-50px">
                        </div>
                        <div className="col-lg-8">
                            <div className="about-content"
                                dangerouslySetInnerHTML={{
                                    __html: `
                                        <p class='mb-1' style="text-align:justify;">The portal, Partzrider.com("Website") and the mobile application 'Partzrider' ("App") (collectively "Platform") is owned and operated by George Oakes Limited ("Company"), a public company incorporated under the Companies Act, 1913.</p>
                                        <p class='mb-1' style="text-align:justify;">Each order would be shipped only to a single destination address specified at the time of payment for that order. If you wish to ship products to different addresses, you shall need to place multiple orders.</p>
                                        <p class='mb-1' style="text-align:justify;">The customer support team will inform in case of delay beyond 7 days via email or phone contact.</p>
                                        <p class='mb-1' style="text-align:justify;">All products sold on partzrider.com attracts shipping charges. The charges vary depend on various factors like product weight, size, fragileness, location and mode of delivery (Air, Surface or Sea).</p>
                                        <h6>How does the delivery process work?</h6>
                                        <ul class='ht-list'>
                                            <li>The User agrees that the delivery can be made to the person who is present at the shipping address provided by the User.</li>
                                            <li>Once our system processes your order, your products are inspected thoroughly to ensure they are in a perfect condition.</li>
                                            <li>After they pass through the final round of quality check, they are packed and handed over to our trusted delivery partner.</li>
                                            <li>Our delivery partners then bring the package to you at the earliest possible.</li>
                                            <li>The delivery partner will make a maximum of three attempts to deliver your order. In case the User is not reachable or does not accept delivery of products in these attempts Partzrider.com reserves the right to cancel the order(s) at its discretion.</li>
                                        </ul>                                        
                                        <h6>Will I Be Charged Customs and Import Charges?</h6>
                                        <p class='mb-1' style="text-align:justify;">Any customs or import duties are charged once the parcel reaches the destination country. These charges must be paid by the recipient of the parcel. Unfortunately, we have no control over these charges, and cannot guess or guarantee what the cost will be as the customs policies and import duties vary widely from country to country. We recommend you to contact your local customs office for current charges before you order, so you are not surprised by the charges when due.</p>
                                        <h6>Has My Order Been Dispatched?</h6>
                                        <p class='mb-1' style="text-align:justify;">As soon as your order is dispatched, an email will be sent to confirm that it has been dispatched. You can request your tracking number by emailing Chennai@georgeoakes.com</p>
                                        <h6>I Have Received a Faulty Item. What do I do?</h6>
                                        <p class='mb-1' style="text-align:justify;">If you think the item you received is faulty, please contact our customer service team or by mailing at support@partzrider.com. We will then guide you on how to proceed with the return. Please include as many details as possible about the fault. Each product is quality-checked prior to leaving the warehouse. We cannot accept returns that have been fitted to the vehicle and tried.</p>
                                        <h6>I Have Received an Incorrect Item in My Order. What do I do?</h6>
                                        <p class='mb-1' style="text-align:justify;">If you have received an incorrect item in your order, please contact our customer service team or mailing at support@partzrider.com. We will then guide on how to proceed with the return. Please include as many details as possible about the error.</p>
                                        <h6>An Item Is Missing From My Order</h6>
                                        <p class='mb-1' style="text-align:justify;">Some mistakes are bound to happen when many orders have been placed. We cannot guarantee that all the items will be dispatched at the same time. We request you to check your packing notes or dispatch emails to see if when your items will be arriving, whether it will be individual or together. If there are any missing items with respect to the packaging note, please contact our customer service team at support@partzrider.com, who will try to rectify the mistake as quickly as possible.</p>
                                    `
                                }}
                            />
                        </div>
                    </div>
                    
                </div>
            </section>
        </>
    )
};

export default ShippingPolicy;