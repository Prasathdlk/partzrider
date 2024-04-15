import React, { useRef, useEffect, useState } from 'react';
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { Container, Row, Col, Dropdown,Offcanvas, Modal, Button, Accordion} from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import Turnstone from 'turnstone'
import Image1 from 'public/styles/assets/images/product-image/image1.jpg';
import { authService, cartService, categoryService, itemService, wishlistService, commonService } from 'core/services';
import {
    loginAction, saveUserAction, logoutAction, removeFromCart,
    addToCart, removeAllCart, addToWishlist, removeFromWishlist,
    emptyWishlist
} from "redux/action/account.action";

import { 
    addMasterSettings
} from "redux/action/common.action";

import logo from 'public/styles/assets/images/logo.png';
import { utils, localStorage } from 'core/helper';


const styles = {
    input: 'w-full h-12 border border-oldsilver-300 py-2 pl-10 pr-7 text-xl outline-none',
    inputFocus: 'w-full h-12 border-x-0 border-t-0 border-b border-crystal-500 py-2 pl-10 pr-7 text-xl outline-none sm:border',
    query: 'text-oldsilver-800 placeholder-oldsilver-400',
    typeahead: 'text-crystal-500 border-white',
    cancelButton: 'absolute w-10 h-12 inset-y-0 left-0 items-center justify-center z-10 text-crystal-600 inline-flex sm:hidden',
    clearButton: 'absolute inset-y-0 right-0 w-8 close-bu inline-flex text-right text-crystal-500 hover:text-hotpink-300',
    listbox: 'w-full close-busearch bg-white sm:border sm:border-crystal-500 text-left sm:mt-2 p-2 sm:drop-shadow-xl listbox',
    groupHeading: 'cursor-default mt-2 mb-0.5 px-1.5 uppercase text-sm text-hotpink-300',
    item: 'cursor-pointer p-1.5 text-lg overflow-ellipsis overflow-hidden text-oldsilver-700 item',
    highlightedItem: 'cursor-pointer p-1.5 text-lg overflow-ellipsis overflow-hidden text-oldsilver-700 bg-crystal-100',
    match: 'font-semibold',
    noItems: 'cursor-default text-center my-20'
};
const maxItems = 10;
const listbox = {
    id: 'products',
    name: 'Products',
    ratio: 10,
    displayField: 'name',
    data: (query) => itemService.getSearchItems(query)
        .then(response => response.result),
    searchType: 'startswith'
};

const Header = (props) => {
    const {
        token, loginAction, logoutAction, cart, addToCart, removeFromCart,
        removeAllCart, addToWishlist, removeFromWishlist, wishlist,
        addMasterSettings
    } = props;
    const navigate = useRouter();
    const [show, setShow] = useState(false);
    const [profile, setProfile] = useState({});
    const [cartItem, setCartItem] = useState([]);
    const [mobileOffcanvas, setMobileCanvas] = useState(false);
    const [scroll, setScroll] = useState(false);
    const [wishlistShow, setWishlistShow] = useState(false);
    const [wishlistState, setWishlist] = useState([]);
    const [items, setItems] = useState([]);
    const turnstoneRef = useRef()

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleShowMobileOffcanvas = () => setMobileCanvas(true);
    const handleHideMobileOffcanvas = () => setMobileCanvas(false);

    const handleCloseWhislist = () => setWishlistShow(false);
    const handleShowWhishlist = () => setWishlistShow(true);

    const handleScroll = () => {
        if (window.pageYOffset >= 60) {
            setScroll('true');
        } else {
            setScroll('false');
        };
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.addEventListener('scroll', handleScroll);
    });

    useEffect(() => {
        if (token) {
            async function fetchData() {
                // You can await here
                // const response = await MyAPI.getData(someId);
                await loadProfileData();
                await loadCartItem();
                await loadWishlist();
                await loadMasterSettings();
            }
            fetchData();
            // navigate.push('/');
        } else {
            // console.log('token empty');
            async function fetchData() {
                // You can await here
                await loadMasterSettings();
            }
            fetchData();
            setProfile({});
        }
    }, [token]);

    useEffect(() => {
        checkSessionLogin();
        loadCategories();
    }, []);

    const checkSessionLogin = () => {
        const token = localStorage.getAuthToken();
        if (token !== "") {
            const authUser = localStorage.getAuthUser();
            loginAction(authUser);
        } else {
            // console.log('token not there');
        }
    };

    const logOut = () => {
        removeAllCart();
        logoutAction();
        emptyWishlist();
        utils.showSuccessMsg('logout successfully');
        navigate.push('/login');
    };

    async function loadProfileData() {
        authService.loadProfile().then(
            (resp) => {
                saveUserAction({ profileUser: resp });
                setProfile(resp);
            },
            (error) => {
                utils.showErrMsg(utils.handleErr(error));
            }
        );
    }

    async function loadCartItem() {
        cartService.loadCartItem().then((resp) => {
            if (resp.is_successful && resp.result && resp.result.length > 0) {
                setCartItem(resp.result);
                resp.result.map((item, ind) => {
                    const { item_id, item_image, item_name, item_no, item_spec, qty, amount: price } = item;
                    const previousItem = {
                        item_id, item_image, item_name, item_no, item_spec, qty, price
                    };
                    addToCart(previousItem);
                })
            }
        }).catch(error => {
            utils.showErrMsg(utils.handleErr(error));
        });
    };

    function removeCartItem(item) {
        const { item_id, item_image, item_name, item_no, item_spec, price } = item;
        cartService.removeItemFromCart(item).then((resp) => {
            const previousItem = { item_id, item_image, item_name, item_no, item_spec, price };
            removeFromCart(previousItem);
        }).catch(error => {
            utils.showErrMsg(utils.handleErr(error));
        });
    };

    const [cartCount, setCartCount] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [wishListCount, setWishlistCount] = useState(0);

    useEffect(() => {
        let count = 0;
        let subTotal = 0;
        cart.forEach((ele) => {
            count += ele.item_id ? 1 : 0;
            subTotal += ele.qty * parseFloat(ele.price);
        })
        setCartCount(count);
        setSubTotal(subTotal);
    });

    useEffect(() => {
        let wishlistCount = 0;
        wishlist.forEach((ele) => {
            wishlistCount += ele.item_id ? 1 : 0
        })
        setWishlistCount(wishlistCount);
    });

    function loadWishlist() {
        wishlistService.loadWishlist().then((resp) => {
            if (resp.is_successful && resp.result && resp.result.length > 0) {
                setWishlist(resp.result);
                resp.result.map((item) => {
                    const { item_id, item_image, item_name, item_no, item_spec, amount: price } = item;
                    const wishlistItem = {
                        item_id, item_image, item_name, item_no, item_spec, price
                    }
                    addToWishlist(wishlistItem);
                })
            }
        }).catch(error => {
            // utils.showErrMsg(utils.handleErr(error));
        });
    };
    function loadMasterSettings(){
        commonService.getMasterSettings().then((resp) => {
            resp = Object.assign({}, ...resp.result.map((x) => ({[x.description]: x.values})));
            // console.log("🚀 ~ file: header.js:209 ~ commonService.getMasterSettings ~ resp:", resp);
            addMasterSettings(resp);
        })
    }

    function removeItemFromWishlist(item) {
        const { item_id, item_image, item_name, item_no, item_spec, price } = item;
        wishlistService.removeItemFromWhislist(item_id).then(() => {
            const previousItem = { item_id, item_image, item_name, item_no, item_spec, price };
            removeFromWishlist(previousItem);
        }).catch(error => {
            utils.showErrMsg(utils.handleErr(error));
        });
    };

    const handleOnSelect = (item) => {
        if (item !== undefined) {
            console.log('item::', item);  
            const { type, name, id } = item;
            const searchUrl = '/products' + (type === 'item' ? '?search_query=' + name : '?category=' + id);
            console.log(searchUrl)
            turnstoneRef.current?.clear();
            setTimeout(() => navigate.push(searchUrl), 10);
        }
     }

 
    //  handleOnEnter

     const handleOnEnter = (query, item) => {
        if (!!query) {
            const searchUrl = '/products' + '?search_query=' + query;
            turnstoneRef.current?.clear();
            setTimeout(() => navigate.push(searchUrl), 10);
        }
        }

    const [categories, setCategories] = useState([]);
    function loadCategories() {
        categoryService.getCategories().then((resp) => {
            setCategories(resp.result)
        }).catch(error => {
            utils.showErrMsg(utils.handleErr(error));
        });
    };

    const handleCategory = (category, categoryKey) => {
        let categoryId = "";
        switch (categoryKey) {
            case 'category_name':
                categoryId = category.category_id;
                break;
            case 'sub_category_name':
                categoryId = category.sub_category_id;
                break;
            case 'end_category_name':
                categoryId = category.end_category_id;
                break;

            default:
                break;
        }
        return '/products?category=' + categoryId;
    };

    const getCategoryWithArrow = (category, categoryKey) => {
        return (
            <Link href={handleCategory(category, categoryKey)}>
                <a onClick={handleHideMobileOffcanvas}>
                    {category[categoryKey]}
                </a>
            </Link>
        )
    };

    const getLiSubMenu2 = (endCategoryList, categoryKey) => {
        return (
            endCategoryList.map((endEle, ind) => {
                return (
                    <Link href={handleCategory(endEle, categoryKey)} key={ind}>
                        <a onClick={handleHideMobileOffcanvas}>
                            {endEle[categoryKey]}
                        </a>
                    </Link>
                )
            })
        )
    };

    const getCategoriesMenu = (categoryList) => {
        return (
            <React.Fragment>
                {
                    categoryList && categoryList.map((ele, ind) => {
                        return (
                            <Accordion flush key={ind}>
                                <Accordion.Item eventKey='0'>
                                    <Accordion.Header>
                                        {getCategoryWithArrow(ele, 'category_name', 'sub_categories')}
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        {
                                            ele.sub_categories && ele.sub_categories.length > 0 && (
                                                ele.sub_categories.map((subEle, subInd) => {
                                                    return (
                                                        <Accordion key={subInd}>
                                                            <Accordion.Item eventKey='1'>
                                                                <Accordion.Header>
                                                                    {getCategoryWithArrow(subEle, 'sub_category_name', 'end_categories')}
                                                                </Accordion.Header>
                                                                <Accordion.Body>
                                                                    {subEle.end_categories && subEle.end_categories.length > 0 && (
                                                                        getLiSubMenu2(subEle.end_categories, 'end_category_name')
                                                                    )}
                                                                </Accordion.Body>
                                                            </Accordion.Item>
                                                        </Accordion>
                                                    )
                                                })
                                            )
                                        }
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        )
                    })
                }
            </React.Fragment>
        )
    };

    const navigateTo = (url) => {
        handleCloseWhislist();
        navigate.push(url);
    }

    const getWishList = (wishlist) => {
        return (
            <React.Fragment>
                {
                    wishlist &&
                    wishlist.length > 0 &&
                    wishlist.map((ele, ind) => {
                        const item_image = ele.item_image ? ele.item_image : Image1;
                        return (
                            <div key={ind}>
                                <Row>
                                    <Col xl={3}
                                        onClick={() => navigateTo(`/products/${ele.item_id}`)}
                                        style={{ cursor: "pointer" }}>
                                        <Image
                                            width={50}
                                            height={40}
                                            layout="responsive"
                                            src={item_image}
                                            alt="wishlist-Img"
                                        />
                                    </Col>
                                    <Col xl={8}>
                                        <div className='d-block'
                                            onClick={() => navigateTo(`/products/${ele.item_id}`)}
                                            style={{ cursor: "pointer" }}>
                                            <h5 style={{ cursor: "pointer" }}>{ele.item_name}</h5>
                                            <h6 style={{ cursor: "pointer" }}>{ele.item_no}</h6>
                                            <p>{ele.price}</p>
                                        </div>
                                    </Col>
                                    <Col xl={1}>
                                        <Button className='my-3 text-end btn-sm'
                                            onClick={() => removeItemFromWishlist(ele)}>
                                            <i className="fa fa-times"></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                        )
                    })
                }
                {
                    wishlist.length === 0 && (
                        <div className='text-center my-3'>
                            Wishlist is empty
                        </div>
                    )
                }
            </React.Fragment>
        )
    };

    return (
        <React.Fragment>
            <div className="header-top-nav">
                <Container>
                    <Row className="align-items-center">
                        <Col lg={4} md={12}>
                            <div className="text-lg-start text-center">
                                <p className="color-white"></p>
                            </div>
                        </Col>
                        <Col lg={8} className="d-lg-block d-none">
                            <div className="header-right-nav hover-style-electronic">
                                <div className="header-top-curr">
                                    <ul className="border-0">
                                        <li className='text-dark'>Helpline Number :</li>
                                        <li className='bg-success text-white font-600 p-2'>+91 89255 11777</li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className={'header-navigation d-lg-block d-none ' + (scroll ? 'menu fixed' : '')}>
                <Container>
                    <Row>
                        <Col md={2} sm={2}>
                            <div className="logo">
                                <Link href="/">
                                    <a>
                                        <Image
                                            className='header_img'
                                            src={logo}
                                            alt="header_img"
                                        />
                                    </a>
                                </Link>
                            </div>
                        </Col>
                        <Col md={10} sm={10} >
                            <div className="header_account_area ">
                               
                                <div className="header_account_list search_list">
                                    <a><i className="ion-ios-search-strong"></i></a>
                                    <div className="dropdown_search">
                                        <div style={{ width: 500 }}>
                                            {/* // https://www.npmjs.com/package/turnstone#listbox */}
                                            <Turnstone
                                                ref={turnstoneRef}
                                                id="search"
                                                name="search"
                                                clearButton={true}
                                                debounceWait={250}
                                                listbox={listbox}
                                                listboxIsImmutable={false}
                                                matchText={true}
                                                maxItems={maxItems}
                                                noItemsMessage="no results found"
                                                placeholder="Part number, Make, Model, Product Name..."
                                                styles={styles}
                                                typeahead={true}
                                                onSelect={handleOnSelect}
                                                onEnter={handleOnEnter}
                                            />
                                        </div>
                                    </div>
                                </div>
          
                                <div className="contact-link-wrap">
                                    <div className="cart-info d-flex">
                                        <Dropdown className='header-bottom-set'>
                                            <Dropdown.Toggle id="dropdown-basic"
                                                className='border-right-1 pr-1 f-20 color-black after-none hover-style-electronic'>
                                                <i className="icon icon-User" ></i>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className={'content-setting ' + (!profile.user_name && "text-center" || "text-left")}>
                                                {
                                                    !profile.user_name && (
                                                        <Dropdown.Item>
                                                            <div className="user-info info_setting">
                                                                <div className="title_setting">Returning Customer ?</div>
                                                                <ul>
                                                                    <li>
                                                                        <Link passHref={true} href="/login">
                                                                            <span className="btn btn-dark btn-sm">Sign in</span>
                                                                        </Link>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className="info_setting">
                                                                <div className="title_setting">Don&apos;t have an account ?<br />
                                                                    <Link href={"/login"}>Register</Link>
                                                                </div>
                                                            </div>
                                                        </Dropdown.Item>
                                                    )
                                                }
                                                {
                                                    profile.user_name && (
                                                        <Dropdown.Item>
                                                            <div className="user-info info_setting">
                                                                <div className="title_setting">
                                                                    {
                                                                        profile && profile.user_name ? profile.user_name : "username"
                                                                    }
                                                                </div>
                                                                <ul>
                                                                    <li>
                                                                        <Link href={"/profile"}>
                                                                            <a >
                                                                                <i className="fa fa-user"></i>
                                                                                {" Your Profile"}
                                                                            </a>
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link href={"/change-password"}>
                                                                            <a >
                                                                                <i className="fa fa-unlock"></i>
                                                                                {" Change Password"}
                                                                            </a>
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link href={"/orders"}>
                                                                            <a >
                                                                                <i className="fa fa-cart-arrow-down"></i>
                                                                                {" Your orders"}
                                                                            </a>
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <span onClick={logOut}>
                                                                            <a >
                                                                                <i className="fa fa-lock"></i>
                                                                                {" Logout"}
                                                                            </a>
                                                                        </span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </Dropdown.Item>
                                                    )
                                                }
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        {
                                            profile && profile.user_name && (
                                                <React.Fragment>
                                                    <a onClick={handleShowWhishlist} className="count-cart heart">
                                                        {
                                                            wishListCount > 0 && (
                                                                <span className="item-quantity-tag">{wishListCount}</span>
                                                            )
                                                        }
                                                    </a>
                                                    <div className="mini-cart-warp">
                                                        <a  onClick={handleShow}
                                                            className="count-cart offcanvas-toggle color-black">
                                                            {
                                                                cartCount > 0 && (
                                                                    <span className="item-quantity-tag">{cartCount}</span>
                                                                )
                                                            }
                                                        </a>
                                                    </div>
                                                    <Modal show={wishlistShow} onHide={handleCloseWhislist}
                                                        backdrop="static"
                                                        keyboard={false}>
                                                        <Modal.Header style={{ justifyContent: 'flex-start' }}>
                                                            <Modal.Title>Wishlist items</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body className='border-bottom'>
                                                            {getWishList(wishlist)}
                                                        </Modal.Body>
                                                        <Modal.Footer>
                                                            <Button className='btn-sm' variant="secondary"
                                                                onClick={handleCloseWhislist}>
                                                                Close
                                                            </Button>
                                                        </Modal.Footer>
                                                    </Modal>
                                                </React.Fragment>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className={scroll ? "header-bottom d-lg-none py-3  mobile-navigation sticky-nav header_section" :
                "header-bottom d-lg-none py-3 mobile-navigation"}>
                <Container fluid>
                    <Row className="justify-content-between align-items-center">
                        <Col md={1} sm={1} className="hover-style-electronic">
                            <a onClick={handleShowMobileOffcanvas} className="offcanvas-toggle mobile-menu">
                                <i className="ion-navicon"></i>
                            </a>
                        </Col>
                        <Col md={6} sm={6} className="d-flex justify-content-center">
                            <div className="logo m-0">
                                <Link href="/"><a><Image src={logo} width={200} height={55} alt="logo-img" /> </a></Link>
                            </div>
                        </Col>
                        <Col md={5} sm={5}>
                            <div className="cart-info d-flex m-0 justify-content-end">
                                <Dropdown className="header-bottom-set dropdown hover-style-electronic">
                                    <Dropdown.Toggle className="border-0 header-action-btn hover-style-default" data-bs-toggle="dropdown">
                                        <i className="ion-person"></i>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {!profile.user_name && (
                                            <Dropdown.Item>
                                                <ul>
                                                    <li>
                                                        <Link href={'#'}>My account</Link>
                                                    </li>
                                                    <li>
                                                        <Link href={'#'}>Checkout</Link>
                                                    </li>
                                                    <li>
                                                        <Link href={'/login'}>Sign in</Link>
                                                    </li>
                                                </ul>
                                            </Dropdown.Item>
                                        )}
                                        {
                                            profile.user_name && (
                                                <Dropdown.Item>
                                                    <div>
                                                        {
                                                            profile && profile.user_name ? profile.user_name : "username"
                                                        }
                                                    </div>
                                                    <ul>
                                                        <li>
                                                            <Link href={"/profile"}>
                                                                <a >
                                                                    <i className="fa fa-user"></i>
                                                                    {" Your Profile"}
                                                                </a>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link href={"/change-password"}>
                                                                <a >
                                                                    <i className="fa fa-unlock"></i>
                                                                    {" Change Password"}
                                                                </a>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link href={"/orders"}>
                                                                <a >
                                                                    <i className="fa fa-cart-arrow-down"></i>
                                                                    {" Your orders"}
                                                                </a>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <span onClick={logOut}>
                                                                <a >
                                                                    <i className="fa fa-lock"></i>
                                                                    {" Logout"}
                                                                </a>
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </Dropdown.Item>
                                            )
                                        }
                                        {/* {profile.user_name && (
                                            <Dropdown.Item>
                                                    <ul>
                                                        <li>
                                                            {
                                                                profile && profile.user_name ? profile.user_name : "username"
                                                            }
                                                        </li>
                                                        <li>
                                                            <Link href={'#'}>My account</Link>
                                                        </li>
                                                        <li>
                                                            <Link href={'#'}>Checkout</Link>
                                                        </li>
                                                        <li>
                                                            <Link href={'/login'}>Sign in</Link>
                                                        </li>
                                                    </ul>
                                            </Dropdown.Item>
                                        )} */}
                                    </Dropdown.Menu>
                                </Dropdown>
                                <div className="mini-cart-warp hover-style-electronic">
                                    <a onClick={handleShow} className="count-cart color-black offcanvas-toggle">
                                        <span className="amount-tag">$
                                            {/* {totalPrice} */}
                                        </span>
                                        <span className="item-quantity-tag">{cartCount}</span>
                                    </a>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className="mobile-search-option pb-3 d-lg-none hover-style-electronic">
                <Container fluid>
                    <div className="header-account-list">
                        <div className="dropdown-search">
                            <div style={{ width: '370px' }}>
                                <Turnstone
                                    ref={turnstoneRef}
                                    id="search"
                                    name="search"
                                    clearButton={true}
                                    debounceWait={250}
                                    listbox={listbox}
                                    listboxIsImmutable={false}
                                    matchText={true}
                                    maxItems={maxItems}
                                    noItemsMessage="no results found"
                                    placeholder="Part number, Make, Model, Product Name..."
                                    styles={styles}
                                    typeahead={true}
                                    onSelect={handleOnSelect}
                                />
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
            <div className="offcanvas-overlay"></div>
            <Offcanvas
                placement='end'
                show={show}
                onHide={handleClose}
                className="offcanvas offcanvas-cart hover-style-electronic">
                <div className="inner">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title className="title"> Cart </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className="body customScroll">
                        {
                            cart && (
                                <div>
                                    <ul className="minicart-product-list">
                                        {
                                            cart.map((ele, ind) => {
                                                const item_image = ele.item_image ? ele.item_image : Image1;
                                                return (
                                                    <li key={ind}>
                                                        <Link href={`/products/${ele.item_id}`}>
                                                            <a className="image" onClick={handleClose}>
                                                                <Image
                                                                    src={item_image}
                                                                    layout="responsive"
                                                                    width={100}
                                                                    height={100}
                                                                    alt="Cart product Image"
                                                                />
                                                            </a>
                                                        </Link>
                                                        <div className="content" style={{ width: "20px" }}>
                                                            <Link className="title" href={`products/${ele.item_id}`}>
                                                                <a  onClick={handleClose}>
                                                                    {ele.item_name}
                                                                </a>
                                                            </Link>
                                                            <span className="quantity-price">{ele.qty} x
                                                                <span className="amount">
                                                                    {ele.price}
                                                                </span>
                                                            </span>
                                                            <a
                                                                onClick={() => removeCartItem(ele)}
                                                                className="remove"
                                                            > x </a>
                                                        </div>
                                                    </li>
                                                );
                                            })
                                        }
                                    </ul>
                                    {
                                        cart.length > 0 && (
                                            <React.Fragment>
                                                <div className="shopping-cart-total">
                                                    <h4>
                                                        Subtotal:
                                                        <span>
                                                            {utils.getRupeeIconWithPrice((subTotal.toFixed(2)), 13, 13)}
                                                        </span>
                                                    </h4>
                                                    <h4 className="shop-total">
                                                        Total :
                                                        <span>
                                                            {utils.getRupeeIconWithPrice((subTotal.toFixed(2)), 14, 14)}
                                                        </span>
                                                    </h4>
                                                </div>
                                                <div className="foot">
                                                    <div className="buttons text-center">
                                                        <Link href={"/cart"} id="offcanvasNavbarLabel">
                                                            <a className="btn btn-dark btn-hover-primary" onClick={handleClose}>
                                                                view cart
                                                            </a>
                                                        </Link>
                                                        <Link href={"/checkout"}>
                                                            <a className="btn btn-outline-dark current-btn mt-3" onClick={handleClose}>
                                                                checkout
                                                            </a>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        )
                                    }
                                    {
                                        cart.length === 0 && (
                                            <span> Cart empty </span>
                                        )
                                    }
                                </div>
                            )
                        }
                    </Offcanvas.Body>
                </div>
            </Offcanvas>
            <Offcanvas
                placement='start'
                show={mobileOffcanvas}
                onHide={handleHideMobileOffcanvas}
            // className="offcanvas-mobile-menu hover-style-electronic"
            >
                <Offcanvas.Header closeButton>
                    <div className="contact-info d-flex align-items-center justify-content-center color-black py-3">
                        <p>Helpline : +91 89255 11777</p>
                    </div>
                </Offcanvas.Header>
                <Offcanvas.Body>

                    <div className="inner customScroll">
                        <div className="offcanvas-menu mb-4">
                            <ul>
                                <li>
                                    <Link href="/">
                                        <a  onClick={handleHideMobileOffcanvas}>
                                            Home
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/about-us" >
                                        <a  onClick={handleHideMobileOffcanvas}>
                                            About Us
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    {getCategoriesMenu(categories)}
                                </li>
                                <li>
                                    <Link href="/contact-us" >
                                        <a  onClick={handleHideMobileOffcanvas}>
                                            Contact Us
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="offcanvas-social mt-5">
                            <ul>
                                <li>
                                    <a href="https://www.facebook.com/people/Partzrider/100083152669385/"
                                        target="_blank"
                                        rel="noreferrer" >
                                        <i className="ion-social-facebook" />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.instagram.com/partzrider/"
                                        target="_blank"
                                        rel="noreferrer" >
                                        <i className="ion-social-instagram" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    
                </Offcanvas.Body>
            </Offcanvas>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        token: state.account?.token,
        username: state.account?.profileUser.first_name,
        cart: state.cartItems?.cart,
        wishlist: state.wishlistItems?.wishList,
    }
}

const mapDispatchToProps = {
    loginAction,
    logoutAction,
    addToCart,
    removeFromCart,
    removeAllCart,
    addToWishlist,
    removeFromWishlist,
    emptyWishlist,
    addMasterSettings
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

// import { ReactSearchAutocomplete } from 'react-search-autocomplete';

// async function getSearchItems(itemString) {
//     console.log('getSearchItems-api called');
//     try {
//         let resp = await itemService.getSearchItems(itemString);

//         const result = [];
//         for (let i = 0; i < resp.result.length; i++) {
//             const ele = resp.result[i];
//             result.push({ id: ele.id, name: ele.name, type: ele.type })
//         }
//         // resp.result.map((ele) => {
//         //     result.push({ id: ele.id, name: ele.name, type: ele.type })
//         // })
//         // setItems(result);
//         // setCounter(counter + 1);
//         console.log(result);
//         return result;
//     } catch (error) {
//         utils.showErrMsg(utils.handleErr(error));
//     }

//     // let resp = await itemService.getSearchItems(itemString).then(() => {

//     // }).catch(error => {
//     //     utils.showErrMsg(utils.handleErr(error));
//     // });


// };

// const [searchString, setSearchString] = useState("");
// const handleOnSelect = async (string, results) => {
//     // onSearch will have as the first callback parameter
//     // the string searched and for the second the results.
//     if (string.length === 0) {
//         setItems([]);
//         // setCounter(counter + 1);
//         return false;
//     } else {
//         // setCounter(counter + 1);
//         results = await getSearchItems(string);
//         setItems(results);
//         setSearchString(string);
//         setTimeout(() => {
//             console.log('settimout');
//             setItems(results);
//         }, 100);
//     }

//     // results = await getSearchItems(string);
//     // setItems(results);

//     // await itemService.getSearchItems(string)
//     //     .then(response => response)
//     //     .then(data => setItems(data))
// }

// const handleOnClear = () => {
//     setItems([]);
// }

// const handleOnHover = (result) => {
//     // the item hovered
//     console.log('handleOnHover::', result)
// }

// const handleOnFocus = () => {
//     console.log('Focused')
// }
// const formatResult = (item) => {
//     console.log('formatResult', item);
//     return (
//         <span style={{ display: 'block', textAlign: 'left' }}>
//             {item.name}
//             {
//                 item.type == 'Category' && (
//                     <span style={{ color: "darkgray" }}> in category</span>
//                 )
//             }

//         </span>
//     )
// };



// const getSerchInput = () => {
//     return (
//         <ReactSearchAutocomplete
//             placeholder="Part number, Make, Model, Product Name..."
//             items={items}
//             inputSearchString={searchString}
//             // showItemsOnFocus={true}
//             inputDebounce={10}
//             onSearch={handleOnSearch}
//             onSelect={handleOnSelect}
//             formatResult={formatResult}
//         // onClear={handleOnClear}
//         // inputDebounce={300}
//         // onFocus={handleOnFocus}
//         // onHover={handleOnHover}
//         />
//     )
// }

