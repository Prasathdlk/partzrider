import { Formik, ErrorMessage, Field } from 'formik';
import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from 'react';
import { Container, Form, Row, Col, Button, Card } from 'react-bootstrap';
import { utils } from 'core/helper';
import { addressService } from 'core/services';


const initialValues = {
    name: '',
    company_name: '',
    address: '',
    state_id: '',
    city_id: '',
    pincode: '',
    contact_mob: '',
    contact_email: '',
};

const EditAddress = () => {
    const formikRef = useRef();
    const [addressDetails, setAddressDetails] = useState('');
    const [states, setState] = useState([]);
    const [city, setCity] = useState([]);
    const router = useRouter();
    const { addressId } = router.query;

    function setFormValues(address) {
        if (formikRef.current && address) {
            console.log("formikRef.current::", formikRef.current);
            console.log('formikAddress:', address);

            const { setFieldValue } = formikRef.current;
            console.log("setFieldValue::", setFieldValue);

            const fields = [
                'name',
                'company_name',
                'address',
                'state_id',
                'city_id',
                'pincode',
                'contact_mob',
                'contact_email',
            ];
            console.log("fields::", fields);

            fields.forEach(field => setFieldValue(field, address[field], false));
        }
    };

    

    function handleAddressSubmit(address_id, values) {
        console.log('updateAddress_id::', address_id);
        console.log('updateFields:', values);
        addressService.updateAddress(address_id, values).then((resp) => {
            utils.showSuccessMsg(resp.message)
        }).catch(error => {
            utils.showErrMsg(utils.handleErr(error));
        });
    };

    function loadState() {
        addressService.loadState().then((resp) => {
            setState(resp.result);
        }).catch(error => {
            utils.showErrMsg(utils.handleErr(error));
        });
    };

    const handleStateChange = (e) => {
        const { value: state_id } = e.target;
        loadCity(state_id);
    };

    function loadCity(state_id) {
        addressService.loadCity(state_id).then((resp) => {
            console.log("state_id::", state_id);
            console.log("state_idResp::", resp);
            setCity(resp.result);
        }).catch(error => {
            utils.showErrMsg(utils.handleErr(error));
        });
    };

    useEffect(() => {
        function loadAddressDetails(addressId) {
            addressService.loadAddressDetails(addressId).then((resp) => {
                const addressDetails = resp;
                setAddressDetails(addressDetails);
                setFormValues(addressDetails);
            }).catch(error => {
                utils.showErrMsg(utils.handleErr(error));
            });
        };
        loadAddressDetails(addressId)
    }, [addressId]);

    useEffect(()=>{
        loadState();
        loadCity();
    },[])

    return (
        <div className="checkout-area mt-60px mb-40px">
            <Container>
                <Row>
                    <Col lg={1}></Col>
                    <Col lg={7}>
                        <div className="billing-info-wrap">
                            <h4>Edit Address</h4>
                            <Formik
                                innerRef={formikRef}
                                initialValues={initialValues}
                                onSubmit={async (values, { setSubmitting }) => {
                                    console.log('values::', values);
                                    await handleAddressSubmit(values);
                                    setSubmitting(false);
                                }}
                            >
                                {({ values, handleSubmit, setFieldValue }) => {
                                    return (
                                        <Form onSubmit={handleSubmit}>
                                            <Row>
                                                <Col lg={12} md={12}>
                                                    <div className="billing-info mb-20px">
                                                        <Form.Label>Name</Form.Label>
                                                        <Field
                                                            type="text"
                                                            name="name"
                                                        />
                                                        <ErrorMessage className='mb-2 text-danger' component="span" name="name" />
                                                    </div>
                                                </Col>
                                                <Col lg={12}>
                                                    <div className="billing-info mb-20px">
                                                        <Form.Label>Company Name</Form.Label>
                                                        <Field
                                                            name='company_name'
                                                            type="text"
                                                        />
                                                        <ErrorMessage className='mb-2 text-danger' component="span" name="company_name" />
                                                    </div>
                                                </Col>
                                                <Col lg={12}>
                                                    <div className="billing-info mb-20px">
                                                        <Form.Label>Street Address</Form.Label>
                                                        <Field
                                                            className="billing-address"
                                                            type="text"
                                                            name="address"
                                                        />
                                                        <ErrorMessage className='mb-2 text-danger' component="span" name="address" />
                                                    </div>
                                                </Col>
                                                <Col lg={6} md={6}>
                                                    <div className="billing-info mb-20px">
                                                        <Form.Label>State</Form.Label>
                                                        <Field
                                                            as="select"
                                                            className="form-control"
                                                            name='state_id'
                                                            onChange={(e) => {
                                                                setFieldValue("state_id", e.target.value);
                                                                handleStateChange(e);
                                                            }}
                                                        >
                                                            <option>--Select--</option>
                                                            {states.map((ele, ind) => (
                                                                <option key={ind} value={ele.state_id}>{ele.state_name}</option>
                                                            ))}
                                                        </Field>
                                                    </div>
                                                </Col>
                                                <Col lg={6} md={6}>
                                                    <div className="billing-info mb-20px">
                                                        <Form.Label>Town / City</Form.Label>
                                                        <Field
                                                            as="select"
                                                            name='city_id'
                                                            className="form-control"
                                                        >
                                                            <option>--Select--</option>
                                                            {city.map((ele, ind) => (
                                                                <option key={ind} value={ele.city_id}>
                                                                    {ele.city_name}
                                                                </option>
                                                            ))}
                                                        </Field>
                                                        <ErrorMessage className='mb-2 text-danger' component="span" name="city_id" />
                                                    </div>
                                                </Col>
                                                <Col lg={6} md={6}>
                                                    <div className="billing-info mb-20px">
                                                        <Form.Label>Postcode / ZIP</Form.Label>
                                                        <Field
                                                            name='pincode'
                                                            type="text"
                                                        />
                                                        <ErrorMessage className='mb-2 text-danger' component="span" name="pincode" />
                                                    </div>
                                                </Col>
                                                <Col lg={6} md={6}>
                                                    <div className="billing-info mb-20px">
                                                        <Form.Label>Phone</Form.Label>
                                                        <Field
                                                            type="text"
                                                            name='contact_mob'
                                                        />
                                                        <ErrorMessage className='mb-2 text-danger' component="span" name="contact_mob" />
                                                    </div>
                                                </Col>
                                                <Col lg={12} md={12}>
                                                    <div className="billing-info mb-20px">
                                                        <Form.Label>Email Address</Form.Label>
                                                        <Field
                                                            type="email"
                                                            name='contact_email'
                                                        />
                                                        <ErrorMessage className='mb-2 text-danger' component="span" name="contact_email" />
                                                    </div>
                                                </Col>
                                                {/* <Row>
                                                    <Col lg={1} md={1} xs={1}>
                                                        <Form.Check type='checkbox' 
                                                            name='default_address' 
                                                            className='text-center'
                                                            onLoad={()=> 
                                                                initialValues.default_address = "N"
                                                            }
                                                            onChange={
                                                                (e) => e.target.checked ? 
                                                                initialValues.default_address = 'Y':
                                                                initialValues.default_address = 'N'
                                                            }
                                                        />
                                                    </Col>
                                                    <Col lg={11} md={11} xs={11}>
                                                        <Form.Label>Default Address</Form.Label>
                                                    </Col>
                                                </Row> */}
                                            </Row>
                                            <Button type='submit'>Submit</Button>
                                        </Form>
                                    )
                                }}
                            </Formik>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
};

export default EditAddress;