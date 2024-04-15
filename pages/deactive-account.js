import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Modal,Button } from "react-bootstrap";
import { utils } from "core/helper";
import { authService } from "core/services";
import { useRouter } from "next/router";

const DeactiveAccount = () => {
    const [deleteReason, setDeleteReason] = useState([]);
    const navigate = useRouter();

    function loadDeleteReason() {
        authService.loadDeleteReason().then((resp)=>{
            setDeleteReason(resp.result)
        }).catch(error=>{
            utils.showErrMsg(utils.handleErr(error));
        })
    };

    const [show, setShow] = useState(false);
    const [reasonDelete, setReasonDelete] = useState([]);
    console.log('reasonDelete::',reasonDelete);

    const handleClose = () => setShow(false);
    const handleShow  = (values) => {
        setReasonDelete(values)
        setShow(true);
    };

    const handleDeleteReason = (values) => {
        console.log('values::',values);
        // return false
        const payload ={
            delete_reason : values
        };
        console.log("payload::",payload);
        authService.deActiveAccount(payload).then((resp)=>{
            utils.showSuccessMsg(resp.message)
            console.log('valuesss::',values);
            handleClose();
            navigate.push('/login');
        }).catch(error=>{
            utils.showErrMsg(utils.handleErr(error));
        })
    }

    useEffect(()=>{
        loadDeleteReason();
    },[])

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
                                                            <h5>Deactive Account</h5>
                                                        </div>
                                                        <h6>Reasoning For DeactiveAccount</h6>

                                                        {deleteReason && deleteReason.map((ele,ind)=>(
                                                            <ul key={ind} style={{listStyleType:'revert', margin:'10px'}}>
                                                                <li>
                                                                    <Link href={"#"}>
                                                                        <a href="#"
                                                                        onClick={() =>handleShow(ele.delete_reason_id)}
                                                                        //  onClick={() => handleDeleteReason(ele.delete_reason_id)}
                                                                        >
                                                                            {ele.delete_reason_text}
                                                                        </a>
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        ))}
                                                        <Modal 
                                                            show={show} 
                                                            onHide={handleClose} 
                                                            centered 
                                                            size="sm" 
                                                            backdrop="static" 
                                                            keyboard={false}
                                                        >
                                                            <Modal.Header closeButton>
                                                                <Modal.Title>Account Deactive Confirmation</Modal.Title>
                                                            </Modal.Header>
                                                            <Modal.Body className="text-center">
                                                                Are you sure you want to delete your account!
                                                            </Modal.Body>
                                                            <Modal.Footer>
                                                                <Button variant="secondary" onClick={() => handleDeleteReason(reasonDelete)}>
                                                                    Yes
                                                                </Button>
                                                                <Button variant="primary" onClick={handleClose}>
                                                                    No
                                                                </Button>
                                                            </Modal.Footer>
                                                        </Modal>
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

export default DeactiveAccount;