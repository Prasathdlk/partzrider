import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { utils } from "core/helper";
import { authService } from "core/services";
//import Image from "next/image";
//import Image1 from "public/styles/assets/images/product-image/product1.jpg";

const Profile = () => {
    const [profile, setProfile] = useState({});

    function loadProfile() {
        authService.loadProfile().then((resp) => {
            setProfile(resp)
        }).catch(error => {
            utils.showErrMsg(utils.handleErr(error));
        });
    };

    useEffect(() => {
        loadProfile();
    }, []);

    return (
        <div className="home-5 home-6 home-8 home-9 home-electronic">
            <div id="main">
                <div className="checkout-area mtb-60px">
                    <Container>
                        <Row>
                            <Col lg={9} className="mx-auto">
                                <div className="checkout-wrapper">
                                    <div id="faq" className="panel-group">
                                        <div className="panel panel-default single-my-account">
                                            <div id="my-account-1" className="panel-collapse collapse show">
                                                <div className="panel-body">
                                                    <div className="myaccount-info-wrapper">
                                                        <div className="account-info-wrapper ">
                                                            <h5>Your Profile Details
                                                                <span style={{ float: 'right' }}>
                                                                    <Link href={"/edit-profile"} className="btn btn-sm btn-primary">
                                                                        <a href="#" className="mx-2 btn btn-success btn-sm">
                                                                            Edit 
                                                                        </a>
                                                                    </Link>
                                                                    <Link href={"/deactive-account"} className="btn btn-sm btn-primary">
                                                                        <a href="#" className="mx-2 btn btn-danger btn-sm">
                                                                            Deactive
                                                                        </a>
                                                                    </Link>
                                                                </span>
                                                            </h5>
                                                        </div>
                                                        {
                                                            profile && (
                                                                <Row >
                                                                    {/* <Col md={3}>
                                                                        <Image
                                                                            alt="user-profile-image"
                                                                            src={Image1}
                                                                            class="img-responsive"
                                                                        />
                                                                    </Col> */}
                                                                    <Col md={9}>
                                                                        <Row className="form-group">
                                                                            <Col lg={3} md={3}>
                                                                                <label style={{ fontWeight: 600 }}>Name</label>
                                                                            </Col>
                                                                            <Col lg={8} md={8}>
                                                                                <label>{profile.first_name}</label>
                                                                            </Col>
                                                                        </Row>
                                                                        <Row className="form-group">
                                                                            <Col lg={3} md={3}>
                                                                                <label style={{ fontWeight: 600 }}>Email</label>
                                                                            </Col>
                                                                            <Col lg={8} md={8}>
                                                                                <label>{profile.email_id}</label>
                                                                            </Col>
                                                                        </Row>
                                                                        <Row className="form-group">
                                                                            <Col lg={3} md={3}>
                                                                                <label style={{ fontWeight: 600 }}>Mobile</label>
                                                                            </Col>
                                                                            <Col lg={8} md={8}>
                                                                                <label>{profile.mobile_no}</label>
                                                                            </Col>
                                                                        </Row>
                                                                        {/* <Row className="form-group">
                                                                        <Col lg={3} md={3}>
                                                                            <label style={{ fontWeight: 600 }}>Manage Address</label>
                                                                        </Col>
                                                                        <Col lg={8} md={8}>
                                                                            <label>Trichy, India.</label>
                                                                        </Col>
                                                                    </Row> */}
                                                                        <Row className="form-group">
                                                                            <Col lg={3} md={3}>
                                                                                <label style={{ fontWeight: 600 }}>Allow Email</label>
                                                                            </Col>
                                                                            <Col lg={8} md={8}>
                                                                                <label>{profile.by_email}</label>
                                                                            </Col>
                                                                        </Row>
                                                                        <Row className="form-group">
                                                                            <Col lg={3} md={3}>
                                                                                <label style={{ fontWeight: 600 }}>Allow sms</label>
                                                                            </Col>
                                                                            <Col lg={8} md={8}>
                                                                                <label>{profile.by_sms}</label>
                                                                            </Col>
                                                                        </Row>
                                                                    </Col>
                                                                </Row>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
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

export default Profile;