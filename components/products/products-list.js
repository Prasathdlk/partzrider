import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { Row, Col, Nav, Tab } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import Image from 'next/image';
import Link from 'next/link';
import { connect, useSelector } from 'react-redux';
import { isArray, truncate, uniq } from "lodash";
import { itemService, cartService, wishlistService } from 'core/services';
import { utils } from 'core/helper';
import { addToCart, addToWishlist, setSearchFilters, resetSearchFilters, modifySegmentInSearchFilter, modifyBrandInSearchFilter,
    modifyVariantInSearchFilter,modifyManufactureInSearchFilter, modifyCategoryInSearchFilter, modifyQueryInSearchFilter } from 'redux/action/account.action';
import freeDeliveryImg from "public/styles/assets/images/free-delivery-new.jpg"
import {usePrevious} from 'react-use';
import { useRef } from 'react';

const Productslist = (props) => {
    const {
        token, isFilterSet, filters,
        addToCart, addToWishlist,
        setSearchFilters, resetSearchFilters,
        modifySegmentInSearchFilter,
        modifyBrandInSearchFilter,
        modifyCategoryInSearchFilter,
        modifyVariantInSearchFilter,
        modifyQueryInSearchFilter,
        master_settings,
        modifyManufactureInSearchFilter,
        
    } = props;
    
    const router = useRouter();
    const {
        category, search_query, manufacture,
        search_from, s_id, b_id, v_id,
        page: currentPage,
    } = router.query;

    const oldCategoryId = usePrevious(category);
    const oldSearchQuery = usePrevious(search_query); 
    const oldManufacture = usePrevious(manufacture);
    const oldSearchFrom = usePrevious(search_from);
    const oldSegmentId = usePrevious(s_id);
    const oldBrandId = usePrevious(b_id);
    const oldVarientId = usePrevious(v_id);
    const [page, setPage] = useState(currentPage);
    const [pageSize, setPageSize] = useState(12);
    const [productCount, setProductCount] = useState(0);
    const [totalPage, setTotalPage] = useState(1);
    const [itemsList, setItemsList] = useState([]);
    
    const previousCurrentPage = usePrevious(currentPage);
    const itemControllerRef = useRef(null);


    function loadItems(filters) {
        // console.log('loadItems called::', filters);
        Object.keys(filters).forEach((k) => filters[k] === [] && delete filters[k]);

        //reset item list
        setItemsList([]);
        setProductCount(0);

        const pageVal = page || 1;
        const pageSizeVal = pageSize;
        if(itemControllerRef.current){
            itemControllerRef.current.abort();
        }
        const itemController = new AbortController();
        itemControllerRef.current = itemController;
        itemService.loadItems(pageVal, pageSizeVal, filters,{signal: itemController?.signal}).then((resp) => {
            const { result, total_count } = resp;
            setItemsList(result);
            setProductCount(total_count);
            setTotalPage(Math.ceil(total_count / pageSizeVal));
            itemController = new AbortController();
        }).catch(error => {
            utils.showErrMsg(utils.handleErr(error));
        });
    };


    useEffect(() => {
        if(!!s_id)
        {
            const ts_id = s_id.split(',');
            modifySegmentInSearchFilter(ts_id);
        }
        else{
            modifySegmentInSearchFilter([]);
        }
    },[s_id]);

    useEffect(() => {
        if(!!b_id){
            const tb_id = b_id.split(',');
            modifyBrandInSearchFilter(tb_id);
        }
        else{
            modifyBrandInSearchFilter([]);
        }
    },[b_id]);
    
    useEffect(()=>
    {
        if(!!manufacture){
            const tManufacture = manufacture.split(',');
            console.log(tManufacture);
            modifyManufactureInSearchFilter(tManufacture);
        }
        else{
            modifyManufactureInSearchFilter([]);
        }
    },[manufacture])


    useEffect(() => {
        if(!!category){
            const tCategory = category.split(',');
            modifyCategoryInSearchFilter(tCategory);
        }
        else{
            modifyCategoryInSearchFilter([]);
        }
    },[category]);

    useEffect(() => {
        if(!!v_id){
            const tv_id = v_id.split(',');
            modifyVariantInSearchFilter(tv_id);
        }
        else{
            modifyVariantInSearchFilter([]);
        }
    },[v_id]);

    useEffect(()=>{
        modifyQueryInSearchFilter(search_query);
    },[search_query])

    useEffect(() => {
        loadItems(filters);
    }, [filters, page]);


    useEffect(()=>{
        if(!!page)
        {
            const newQuery = {...router.query,page: page}
            router.push({
                href:"/products",
                query: newQuery,
            });
        }
    },[page]);

    useEffect(()=>{
        if(currentPage != previousCurrentPage)
            setPage(parseInt(currentPage));
    },[currentPage])

    //search_from
    // useEffect(() => {
    //     let filterObj = {
    //         categories: [...(filters.categories || [])],
    //         search_qry: "",
    //         manufacturers: [...(filters.manufactures || [])],
    //         segments: [...(filters.segments || [])],
    //         brands: [...(filters.brands || [])],
    //         variants: [...(filters.variants || [])]
    //     };

    //     if (search_from || s_id || b_id || v_id) {
            
    //             filterObj.segments = [...filterObj.segments , s_id];

    //             if(s_id != oldSegmentId){
    //                 filterObj.segments = filterObj.segments.filter(s => parseInt(s) != parseInt(oldSegmentId));
    //             }
    //             filterObj.segments = uniq(filterObj.segments.map(s=>parseInt(s)))

    //             if (b_id)
    //             {
    //                 filterObj.brands = [...filterObj.brands, b_id];
    //                 if(b_id != oldBrandId)
    //                     filterObj.brands = filterObj.brands.filter(s => parseInt(s) != parseInt(oldBrandId));
    //             }
    //             filterObj.brands = uniq(filterObj.brands.map(s=>parseInt(s)));

    //             if (v_id)
    //             {
    //                 filterObj.variants = [...filterObj.variants, v_id];
    //                 if(v_id != oldVarientId)
    //                     filterObj.variants = filterObj.variants.filter(s => parseInt(s) != parseInt(oldVarientId));
    //             }
    //             filterObj.variants = uniq(filterObj.variants.map(s=>parseInt(s)));
    //     }
    //     if (category || search_query || manufacture) {

    //         if (category) {
    //             filterObj.categories = [...filterObj.categories, category];
    //             if(category != oldCategoryId)
    //                 filterObj.categories = filterObj.categories.filter(s => parseInt(s) != parseInt(oldCategoryId));
    //             filterObj.categories = uniq(filterObj.categories.map(s=>parseInt(s)));
    //         }
    //         if (search_query) {
    //             filterObj.search_qry = search_query;
    //         }
    //         if (manufacture) {
    //             filterObj.manufacturers = [manufacture];
    //             if(manufacture != oldManufacture)
    //                 filterObj.manufacture = filterObj.manufacture.filter(s => parseInt(s) != parseInt(oldManufacture));
    //             filterObj.manufacture = uniq(filterObj.manufacture.map(s=>parseInt(s)));
    //         }
    //     }
    //     setSearchFilters(filterObj);

    //     return () => {
    //         console.log('component destroy - search_from');
    //         resetSearchFilters();
    //     };
    // }, [router.query]);

    const changePage = useCallback(({ selected }) => {
        setPage(selected + 1);
    },[page]);

    function addItemToCart(item) {
        if (!token) {
            setTimeout(() => { router.push('/login') }, 200);
            return false;
        }
        const { item_id, item_image, item_name, item_no, item_spec, default_discount, price } = item;
        const payload = { item_id, qty: 1 };
        cartService.addItemTocart(payload).then((resp) => {

            if (resp.is_successful) {
                utils.showSuccessMsg(resp.message);
                const newPrice = default_discount ? default_discount : price
                const stateItem = { item_id, item_image, item_name, item_no, item_spec, price: newPrice, qty: 1 }
                addToCart(stateItem);

            } else {
                utils.showErrMsg(resp.message);
            }

        }).catch(error => {
            utils.showErrMsg(utils.handleErr(error));
        });
    };

    function addItemToWishlist(item) {
        console.log('product-list-single-item::', item);
        if (!token) {
            setTimeout(() => { router.push('/login') }, 200);
            return false;
        }
        const {
            item_id, item_image, item_name,
            item_no, item_spec, price, default_discount
        } = item;
        wishlistService.addItemToWishlist({ item_id }).then((resp) => {
            if (resp.is_successful) {
                const stateItem = {
                    item_id, item_image, item_name, item_no, item_spec,
                    price: default_discount ? default_discount : price
                }
                addToWishlist(stateItem);
                utils.showSuccessMsg(resp.message);
            } else {
                utils.showErrMsg(resp.message);
            }
        }).catch(error => {
            utils.showErrMsg(utils.handleErr(error))
        });
    };

    const getDiscountPriceString = (ele) => {
        const { price, default_discount, default_discount_perc } = ele;
        return (
            <React.Fragment>
                <ul>
                    <li className='old-price'>{utils.getCurSvg(14, 14)}{price}</li>
                    <li className='discount-price text-right'>{`${default_discount_perc}%`}</li>
                </ul>
                <ul>
                    <li className='current-price'>{utils.getCurSvg(14, 14)}{default_discount} <span className='taxes-info'>(Excl. GST)</span> </li>
                </ul>
            </React.Fragment>
        )
    }

    const getNormalPriceString = (ele) => {
        return (
            <React.Fragment>
                <ul>
                    <li className='old-price'></li>
                </ul>
                <ul>
                    <li className='current-price'>{utils.getCurSvg(16, 16)}{ele.price}<span className='taxes-info'>(Excl. GST)</span></li>
                </ul>
            </React.Fragment>

        );
    };

    const getDiscountPriceStringForUlItems = (ele) => {
        const { price, default_discount, default_discount_perc } = ele;
        return (
            <React.Fragment>
                <ul>
                    <li className='old-price'>{utils.getCurSvg(14, 14)}{price}</li>
                    <li className='discount-price text-right'>{`${default_discount_perc}%`}</li>
                </ul>
                <ul>
                    <li className='current-price'>{utils.getCurSvg(14, 14)}{default_discount}<span className='taxes-info'>(Excl. GST)</span></li>
                </ul>
            </React.Fragment>
        )
    }

    const getNormalPriceStringForUlItems = (ele) => {
        return (
            <ul>
                <li className='current-price'>{utils.getCurSvg(16, 16)}{ele.price}<span className='taxes-info'>(Excl. GST)</span></li>
            </ul>
        );
    };

    const gridItems = itemsList.map((ele, ind) => { 
        return (
            <Col xl={3} md={6} lg={4} sm={6} xs={12} key={ind}>
                <article className="list-product">
                        <Fragment>
                            <a href={`products/${ele.item_id}`}>
                            <div className="img-block">
                                <a href={`products/${ele.item_id}`} className="thumbnail">
                                    <Image
                                        className="first-img"
                                        layout="responsive"
                                        width={150}
                                        height={150}
                                        src={ele.item_image}
                                        alt="products-img"
                                    />
                                </a>
                                <div className="quick-view">
                                    <Link href={`products/${ele.item_id}`}>
                                        <a className="quick_view"
                                            href={`products/${ele.item_id}`}
                                            data-link-action="quickview"
                                            title="Quick view"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal">
                                            <i className="ion-ios-search-strong"></i>
                                        </a>
                                    </Link>
                                </div>
                            </div>

                            
                            <ul className="product-flag">
                                <li className="new">New</li>
                            </ul>
                            <div className="product-decs">
                                <Link href={`products/${ele.item_id}`} passHref>
                                    <a className="inner-link" href=""><span>{ele.item_no}</span></a>
                                </Link>
                               
                                    <Link passHref href={`products/${ele.item_id}`} className="pointer">

                             <a data-toggle="tooltip"
                                 data-placement="right" 
                                 title={(ele.item_name)} 
                                 
                                 className="product-link text-wrap pointer">
                                            {truncate(ele.item_name)}
                                            </a>
                                    </Link>
                                {
                                    (parseFloat(master_settings["Delivery Charges"] || 0) == 0) 
                                        &&
                                        <div className='free-delivery-img'><Image src={freeDeliveryImg} /></div>
                                }
                                <div className="pricing-meta pointer">
                                    {
                                        ele.default_discount > 0 &&
                                            parseFloat(ele.default_discount) !== parseFloat(ele.price) ?
                                            getDiscountPriceString(ele) : getNormalPriceString(ele)
                                    }
                                </div>
                            </div>
                            </a>
                        </Fragment>
                    <div className="add-to-link">
                        <ul>
                            <li className="cart">
                                <a onClick={() => addItemToCart(ele)} className="cart-btn">
                                    ADD TO CART
                                </a>
                            </li>
                            <li>
                                <a onClick={() => addItemToWishlist(ele)}>
                                    <i className="ion-android-favorite-outline"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </article>
            </Col>
        )
    });

    const ulItems = itemsList.map((ele, ind) => {
        return (
            <Row className="list-product m-0px" key={ind}>
                <Link href={`products/${ele.item_id}`}>
                    <Col xs={12} sm={12} md={4} lg={4}>
                        <div className="left-img">
                            <div className="img-block">
                                <a href="" className="thumbnail">
                                    <Image
                                        className="first-img"
                                        alt="products-img"
                                        layout="responsive"
                                        width={100}
                                        height={100}
                                        src={ele.item_image}
                                    />
                                </a>
                                <div className="quick-view">
                                    <Link href={`products/${ele.item_id}`} >
                                        <a className="quick_view"
                                            href={`products/${ele.item_id}`}
                                            data-link-action="quickview"
                                            title="Quick view"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal">
                                            <i className="ion-ios-search-strong"></i>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                            <ul className="product-flag">
                                <li className="new">New</li>
                            </ul>
                        </div>
                    </Col>
                </Link>
                <Col xs={12} sm={12} md={8} lg={8}>
                    <div className="product-desc-wrap">
                        <Link href={`products/${ele.item_id}`}>
                            <div className="product-decs">
                                <Link href={`products/${ele.item_id}`}>
                                    <a className="inner-link" href=""><span>{ele.item_no}</span></a>
                                </Link>
                                <h2><a href="" className="product-link">{ele.item_name}</a></h2>
                                {
                                    (parseFloat(master_settings["Delivery Charges"] || 0) == 0) 
                                        &&
                                        <div className='free-delivery-img'><Image src={freeDeliveryImg} /></div>
                                }
                                <div className="pricing-meta">
                                    {
                                        ele.default_discount > 0 &&
                                            parseFloat(ele.default_discount) !== parseFloat(ele.price) ?
                                            getDiscountPriceStringForUlItems(ele) : getNormalPriceStringForUlItems(ele)
                                    }
                                </div>
                            </div>
                        </Link>
                        <div className="add-to-link">
                            <ul>
                                <li className="cart">
                                    <a className="cart-btn" href="#" onClick={() => addItemToCart(ele)}>ADD TO CART </a>
                                </li>
                                <li>
                                    <a href="#" onClick={() => addItemToWishlist(ele)}>
                                        <i className="ion-android-favorite-outline"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Col>
            </Row>
        )
    });

    const scrollToTop = () => {
        window.scrollTo({
            top: 0
        });
    };

    return (
        <Col lg={9} md={12} className="order-lg-last order-md-first">
            <Tab.Container defaultActiveKey={'grid'}>
                <div className="shop-top-bar">
                    <div className="shop-tab nav mb-res-sm-15">
                        <Nav>
                            <Nav.Item>
                                <Nav.Link eventKey={'grid'} className='p-0'>
                                    <p><i className="fa fa-th show_grid"></i></p>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey={'ul'} className='p-0 '>
                                    <p><i className="fa fa-list-ul"></i></p>
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <p>There Are {productCount} Products.</p>
                    </div>                    
                    <div className="select-shoing-wrap">
                        {/* <div className="shot-product">
                            <p>Sort By:</p>
                        </div>
                        <div className="shop-select">
                            <Form.Select>
                                <option value='relevance'>Relevance</option>
                                <option value='popularity'>Popularity</option>
                                <option value='price'>Price</option>
                                <option value='date'>Date</option>
                            </Form.Select>
                        </div> */}
                    </div>
                </div>
                <Tab.Content>
                    <div className="shop-bottom-area mt-35">
                        <div className="tab-content jump">
                            <Tab.Pane eventKey={'grid'}>
                                <Row>
                                    {itemsList && gridItems}
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey={'ul'}>
                                <div className="shop-list-wrap mb-30px scroll-zoom">
                                    {itemsList && ulItems}
                                </div>
                            </Tab.Pane>
                        </div>
                        {
                            totalPage > 1 && (
                                <ReactPaginate
                                    initialPage={page-1}
                                    className='pro-pagination-style d-flex justify-content-center'
                                    previousLabel={''}
                                    nextLabel={''}
                                    pageCount={totalPage}
                                    onPageChange={changePage}
                                    disabledClassName={"navigationDisabled"}
                                    activeLinkClassName="active"
                                    previousLinkClassName={'bi bi-chevron-left'}
                                    nextLinkClassName={'bi bi-chevron-right'}
                                    onClick={scrollToTop}
                                />
                            )
                        }
                    </div>
                </Tab.Content>
            </Tab.Container>
        </Col>
    );
};

const mapStateToProps = state => {
    return {
        isFilterSet: state.account?.isFilterSet,
        filters: state.account?.filters,
        token: state.account?.token,
        username: state.account?.profileUser.first_name,
        master_settings: state.common?.settingsData
    }
}

const mapDispatchToProps = {
    addToCart,
    addToWishlist,
    setSearchFilters,
    resetSearchFilters,
    modifySegmentInSearchFilter, modifyBrandInSearchFilter,
    modifyVariantInSearchFilter, modifyCategoryInSearchFilter,
    modifyQueryInSearchFilter,modifyManufactureInSearchFilter,
    resetSearchFilters
}

export default connect(mapStateToProps, mapDispatchToProps)(Productslist);
