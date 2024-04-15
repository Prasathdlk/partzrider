import { Col, Container, Row, Accordion } from 'react-bootstrap';

const faqList = [
    {
        question: '1.Who is Partzrider?',
        answer: `<p class="text-justify">Partzrider is an online portal selling automotive spare parts of all Two wheeler, Car and
        Commercial vehicles. We are not a marketplace between sellers and buyers. We ourselves
        have been involved in auto parts distribution for over 80 years and now we have made the
        whole range of parts available online through    <a href="https://partzrider.com" target="_blank">Partzrider.com</a>. Our aim is to provide genuine
        &amp; Quality auto parts to end customers.</p>`
    },
    {
        question: '2.What kind of category of parts do you sell?',
        answer: `<p class="text-justify">We have an exhaustive list of spare parts including Brake parts, Filters, Transmission parts,
        Suspension parts, Engine Parts, Electricals, Consumables, Bulbs, Accessories, etc.</p>`
    },
    {
        question: '3.Are these products from OEM or Aftermarket?',
        answer: `<p class="text-justify">Currently, we are selling aftermarket products only.</p>`
    },
    {
        question: '4. How do I find the right part for my Vehicle?',
        answer: `<p class="text-justify">   There are different ways to identify the correct part number. Details are below:</p>
        <p class='fa fa-angle-right'>   If you already know the part number, you can use the &#39;Search box&#39; field directly and
        get it promptly.</p>
        <p class='fa fa-angle-right'>   If you know your Vehicle’s brand &amp; model, use the ‘Search by Vehicle’ feature to
        refine the product results. This can help you locate the right part in a few clicks.</p>
        <p class='fa fa-angle-right'>   You can also find the part number, by using a category-wise search.</p>
        <p class='fa fa-angle-right'>   If you are confused about the part you need, or can’t find what you are looking for,
        or for any other query that you may have, Call or email us with no hesitation. We will
        resolve your query at the earliest.</p>`
    },
    {
        question: '5. Do you have a return policy for a damaged or a faulty product?',
        answer: `<p class='text-justify'>Yes, we provide returns for products received in damaged or faulty condition. You can read
        our return policy through this link : <a href="https://partzrider.com/returns-and-exchange" target="_blank">https://partzrider.com/returns-and-exchange</a></p>`
    },
    {
        question: '6. What are the payment options available?',
        answer: `<p>You can choose to make the payment through any of the following:</p>
        <ul class='list'>
            <li><i class='fa fa-angle-right'></i> Debit/Credit cards</li>
            <li><i class='fa fa-angle-right'></i> Net banking</li>
            <li><i class='fa fa-angle-right'></i> UPI (Google Pay, PhonePe, Paytm, BHIM, Amazon Pay, WhatsApp)</li>
            <li><i class='fa fa-angle-right'></i> Wallet (Paytm)</li>
            <li><i class='fa fa-angle-right'></i> Pay later (ICICI, LazyPay)</li>
        </ul> `
        // <p>For any assistance, click on the Support option available on our website/app.</p>`
    },
    {
        question: '7. How can I recover my forgotten password?',
        answer: `
                <ul class='list'>
        <li><i class='fa fa-angle-right'></i> Click ‘Forgotten Password’ on the login page.</li>
        <li><i class='fa fa-angle-right'></i> Enter your registered email ID then press ‘continue’ Button. You will receive mail
        with 6-digit password reset code.</li>
        <li><i class='fa fa-angle-right'></i> Just enter the code and type your new Password.</li>
        <li><i class='fa fa-angle-right'></i> Again enter the confirm Password.</li>
        <li><i class='fa fa-angle-right'></i> Now your new password will be generated and use this for the next time login.</li>
    </ul> `
    },
    {
        question: '8. How can I place an order?',
        answer:
         `
        <ul class='list'>
        <li><i class='fa fa-angle-right'></i> Once you&#39;ve found the required part and are on the product page, click ‘Add to cart’
        button to proceed to the cart page or &quot;Buy Now&quot; to move directly to the checkout
        page.</li>
        <li><i class='fa fa-angle-right'></i> Add your shipping &amp; billing address then select the payment type to place the order.</li>
    </ul> `
    },
    {
        question: '9.How do I check my order status?',
        answer:
         `<p class='text-justify'>You can check the status of your order in the order summary section on both the Mobile
         app/website.</p>
        <ul class='list'>
        <li><i class='fa fa-angle-right'></i> For Mobile App : Tap the ‘Order’ icon on the bottom side of your screen. You’ll be
        able to view your complete order details here.</li>
        <li><i class='fa fa-angle-right'></i> For Website   : Tap the ‘My Account’ icon on the top side of your screen and select
        ‘Your orders’ option. You’ll be able to view your complete order details here.</li>
    </ul> `
    },
    {
        question: '10. How can I cancel the order?',
        answer:
         `
        <ul class='list'>
        <li><i class='fa fa-angle-right'></i> For Mobile App: Tap the ‘Order’ icon on the bottom side of your screen. You’ll be
        able to view your complete order details here.</li>
        <li><i class='fa fa-angle-right'></i> Click the ‘View Details’ option to cancel a particular order.</li>
        <li><i class='fa fa-angle-right'></i> Once you have clicked on the &quot;Cancel Order&quot; option, you will be prompted to select
        a reason for cancellation. After selecting the appropriate reason, click on the
        &quot;Confirm&quot; button to complete the cancellation process.</li>
        <li><i class='fa fa-angle-right'></i> For Website: Tap the ‘My Account’ icon on the top side of your screen and select
        ‘Your orders’ option. You’ll be able to view your complete order details here.</li>
        <li><i class='fa fa-angle-right'></i> Click the down arrow option to view a particular order.</li>
        <li><i class='fa fa-angle-right'></i> Once you have clicked on the ‘Cancel Order’ option. You will be prompted to select a
        reason for cancellation. After selecting the appropriate reason, click on the ‘Confirm’
        button to complete the cancellation process.</li>

        
    
        </ul> `
    },
    {
        question: '11. How do I place an exchange/replacement request?',
        answer:
         `
        <ul class='list'>
        <li><i class='fa fa-angle-right'></i> For Mobile App: Tap the ‘Order’ icon on the bottom side of your screen. You’ll be
        able to view your complete order details here.</li>
        <li><i class='fa fa-angle-right'></i> Click the ‘View Details’ option to raise a Return/Replacement request.</li>
        <li><i class='fa fa-angle-right'></i> Select ‘Return or Replace’ button for a particular item, then click ‘Return Item’ at the
        bottom of the screen. You will be prompted to select a reason for
        Return/Replacement. After selecting the appropriate reason, click on the &quot;Confirm
        Return &quot; button to complete the request.</li>
        <li><i class='fa fa-angle-right'></i> For Website: Tap the ‘My Account’ icon on the top side of your screen and select
        ‘Your orders’ option. You’ll be able to view your complete order details here.</li>

        <li><i class='fa fa-angle-right'></i> Click the down arrow option to view a particular order.</li>
        <li><i class='fa fa-angle-right'></i> Select ‘Return or Replace&quot; button for a particular item. You will be prompted to select
        a reason for Return/Replacement. After selecting the appropriate reason, click the
        ‘Submit’ button to complete the request.</li>
        
        
    
        </ul> `
    },
    {
        question: '12. How can I contact customer support team?',
        answer:
         `<p>You can also call us at <b>+91-89255 11777 </b>for any assistance on your general queries.</p>`
    },
];

const FAQ = () => {
    return (
        <>
            <section className="breadcrumb-area">
                <Container>
                    <Row>
                        <Col md={12}>
                            <div className="breadcrumb-content">
                                <h1 className="breadcrumb-hrading">FAQ&lsquo;s</h1>
                                <ul className="breadcrumb-links">
                                    <li><a href="">Home</a></li>
                                    <li></li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <div className="cart-main-area mtb-60px">
                <Container>
                    <Row>
                        <Col lg={2} md={2} sm={12}></Col>
                        <Col lg={8} md={8} sm={12}>
                            <div className="accordions">
                                {faqList.map((ele, ind) => (
                                    <Accordion key={ind}>
                                        <Accordion.Item eventKey={ind}>
                                            <Accordion.Header>{ele.question}</Accordion.Header>
                                            <Accordion.Body dangerouslySetInnerHTML={{ __html: ele.answer }}></Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                ))
                                }
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
};

export default FAQ;