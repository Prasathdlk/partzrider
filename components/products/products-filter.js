import React, { useEffect, useState } from 'react';
import { Col, Accordion } from 'react-bootstrap';
import { categoryService, itemFilterService } from 'core/services';
import { utils, localStorage } from 'core/helper';
import { connect } from "react-redux";
import {
    modifySegmentInSearchFilter, modifyBrandInSearchFilter,
    modifyVariantInSearchFilter, modifyCategoryInSearchFilter,
    resetSearchFilters
} from "redux/action/account.action";
import { useRouter } from 'next/router';
import { join, uniq } from 'lodash';
import { usePrevious } from 'react-use';
import { Axios } from 'axios';
import { useRef } from 'react';

const ProductsFilter = (props) => {
    const router = useRouter();
    const {
        modifySegmentInSearchFilter, modifyBrandInSearchFilter,
        modifyCategoryInSearchFilter, resetSearchFilters,
        filters
    } = props;

    const [categories, setCategories] = useState([]);
    const [segments, setSegments] = useState([]);
    const [brands, setBrands] = useState([]);
    const [isGobalSegement, setIsGobalSegement] = useState("");
    const [isGobalCategory, setIsGlobalCategory] = useState("");
    const [sideFilterActivated, setSideFilterActivated] = useState(false);
    const segmentControllerRef = useRef(null);
    const categoryControllerRef = useRef(null);
    const brandControllerRef = useRef(null);

    useEffect(() => {
        loadCategories();
        loadSegments();
        loadBrands();

        const { categories } = JSON.parse(localStorage.getHomeFilter());
        if (categories && categories.length > 0) {
            setIsGlobalCategory(categories[0]);
        }
    }, [router.isReady]);

    useEffect(() => {
        if(!!filters.segments && filters.segments.length > 0)
            filterBrands(filters.segments)
        else
            filterBrands('');        
        loadSegments();
    },[filters.segments]);

    useEffect(() => {

        if(!!filters.segments && filters.segments.length > 0)
            filterBrands(filters.segments)
        else
            filterBrands('');

    },[filters.brands]);

    useEffect(() => {
        loadCategories();
    },[filters.categories])


    function loadCategories() {
        if(categoryControllerRef.current != null)
            categoryControllerRef.current.abort();
        const categoryController = new AbortController();
        categoryControllerRef.current = categoryController;

        categoryService.getCategories(undefined,{signal:categoryController?.signal}).then((resp) => {
            if (resp.result && resp.result.length) {
                formatFilterCategory(resp.result);
            } else {
            }
        }).catch(error => {
            utils.showErrMsg(utils.handleErr(error));
        });
    };
    
    function loadSegments() {
        if(segmentControllerRef.current != null)
            segmentControllerRef.current.abort();

        const segmentController = new AbortController();
        segmentControllerRef.current = segmentController;

        itemFilterService.loadSegments(undefined,{ signal: segmentController?.signal }).then((resp) => {
            if (resp && resp.result.length) {
                resp.result = resp.result.map((seg) => {
                    if(filters.segments.includes(""+seg.segment_id)){
                        seg.isChecked = true;
                    }
                    else{   
                        seg.isChecked = false;
                    }
                    return seg;
                })
            }
            
            setSegments(resp.result)

        }).catch(error => {
            utils.showErrMsg(utils.handleErr(error))
        });
    };

    function loadBrands() {
        itemFilterService.loadBrands().then((resp) => {
            // if (resp && resp.result.length) {

            //     resp.result = resp.result.map((b) => {
            //         // console.log(brands_id);
            //         if(b.brand_id == brands_id){
            //             b.isChecked = true;
            //         }
            //         else{
            //             b.isChecked = false;
            //         }
            //         return b;
            //     })
            // }
            setBrands(resp.result)
        }).catch(error => {
            utils.showErrMsg(utils.handleErr(error))
        });
    };    
    

    function formatFilterCategory(categoryList) {
        const category_ids = filters.categories || [];
        categoryList = categoryList.map((c) => {
            c.sub_categories = c.sub_categories.map((sc) => {
                if(category_ids.includes(`${sc.sub_category_id}`))
                    sc.isChecked = true;
                else
                    sc.isChecked = false;
                sc.end_categories = sc.end_categories.map((ec) => {
                    if(category_ids.includes(`${ec.end_category_id}`))
                        ec.isChecked = true;
                    else
                        ec.isChecked = false;
                    return ec;
                });
                return sc;
            });
            return c;
        })
        setCategories([...categoryList]);
    };

    function resetFilter() {
        if (!sideFilterActivated) {
            resetSearchFilters();
            setSideFilterActivated(true);
        }
        return true;
    }

    function handleCheckBoxChange(event, category, subCategory, endCategory) {
        // resetFilter();
        const checked = event.target.checked;
   
        let selectedSubCategoryIds = [...filters.categories];
        let selectedEndCategoryIds = [...filters.categories];
        if (endCategory) {
            categories = categories.map((c) => {
                if (c.category_id == category.category_id) {
                    c.sub_categories.map((sc) => {
                        if (sc.sub_category_id == subCategory.sub_category_id) {
                            sc.end_categories = sc.end_categories.map((ec) => {
                                if (ec.end_category_id == endCategory.end_category_id) {
                                    ec.isChecked = checked;
                                    if(!checked)
                                    {
                                        selectedSubCategoryIds = selectedSubCategoryIds.filter(id => id != `${ec.end_category_id}`)
                                        selectedEndCategoryIds = selectedEndCategoryIds.filter(id => id != `${ec.end_category_id}`)
                                    }
                                }
                                return ec;
                            });
                            const isAllChecked = sc.end_categories.every(c=>c.isChecked);

                            if(isAllChecked)
                                sc.isChecked = true;
                            else
                            {
                                sc.isChecked = false;
                                selectedSubCategoryIds = selectedSubCategoryIds.filter(id => id != `${sc.sub_category_id}`)
                                selectedEndCategoryIds = selectedEndCategoryIds.filter(id => id != `${sc.sub_category_id}`)
                            }
                        }

                        const tempSelectedEndCategoryIds = sc.end_categories.filter(x => x.isChecked === true).map(x => x.end_category_id);
                        selectedEndCategoryIds = [...selectedEndCategoryIds, ...tempSelectedEndCategoryIds];

                        if(sc.isChecked)
                            selectedSubCategoryIds = [...selectedSubCategoryIds, sc.sub_category_id];
                        else
                        {
                            selectedSubCategoryIds = selectedSubCategoryIds.filter(id => id != `${sc.sub_category_id}`);
                            selectedEndCategoryIds = selectedEndCategoryIds.filter(id => id != `${sc.sub_category_id}`)
                        }

                        return sc;
                    });
                }
                return c;
            });

            //trigger the load_items api
            // modifyCategoryInSearchFilter(checked ? endCategory.end_category_id : "");
        } else {
            categories = categories.map((c) => {
                if (c.category_id == category.category_id) {
                    c.sub_categories.map((sc) => {
                        if (sc.sub_category_id == subCategory.sub_category_id ) {
                            sc.isChecked = checked;
                            if(sc.end_categories.length > 0)
                            {
                                sc.end_categories = sc.end_categories.map(c=>{
                                            c.isChecked= checked; 
                                            if(!checked)
                                            {
                                                selectedSubCategoryIds = selectedSubCategoryIds.filter(id => id != `${c.end_category_id}`)
                                                selectedEndCategoryIds = selectedEndCategoryIds.filter(id => id != `${c.end_category_id}`)
                                            }
                                            return c;
                                        })
                            }
                            if(!checked)
                            {
                                selectedSubCategoryIds = selectedSubCategoryIds.filter(id => id != `${sc.sub_category_id}`)
                                selectedEndCategoryIds = selectedEndCategoryIds.filter(id => id != `${sc.sub_category_id}`)
                            }
                            const tempSelectedEndCategoryIds = sc.end_categories.filter(x => x.isChecked === true).map(x => x.end_category_id);
                            selectedEndCategoryIds = [...selectedEndCategoryIds, ...tempSelectedEndCategoryIds];
                        }
                        return sc;
                    });

                    const tempSelectedSubCategoryIds = (c.sub_categories.filter(x => x.isChecked === true).map(x => x.sub_category_id));
                    selectedSubCategoryIds = [...selectedSubCategoryIds, ...tempSelectedSubCategoryIds];
                }
                return c;
            });

            //trigger the load_items api
            // modifyCategoryInSearchFilter(checked ? subCategory.sub_category_id : "");
        }

        setCategories([...categories]);

        let selectedAllCategoryIds = [...selectedSubCategoryIds, ...selectedEndCategoryIds];
        selectedAllCategoryIds = selectedAllCategoryIds.map(c => parseInt(c));
        selectedAllCategoryIds = uniq(selectedAllCategoryIds);
        const newQuery = {...router.query, category: selectedAllCategoryIds.join(',')};
        delete(newQuery.manufacture);
        router.push({ href:'/purchase', query: newQuery });

        // modifyCategoryInSearchFilter(selectedAllCategoryIds);

    };


    function filterBrands(segment_id) {
        if(brandControllerRef.current != null)
            brandControllerRef.current.abort();
        const brandController = new AbortController();
        brandControllerRef.current = brandController;

        itemFilterService.loadBrands(segment_id, { signal: brandController?.signal }).then((resp) => {
            if (resp && resp.result.length) {

                resp.result = resp.result.map((b) => {
                    if(filters.brands.includes(`${b.brand_id}`)){
                        b.isChecked = true;
                    }
                    else{
                        b.isChecked = false;
                    }
                    return b;
                })
            }
            setBrands(resp.result)
        })
            .catch(error => {
                setBrands([]);
            })}


    const handleSegmentChange = (event, eleSegment) => {

        const checked = event.target.checked;
        const { segment_id } = eleSegment;

        for (let segment of segments) {
            segment.isChecked = (segment.segment_id == segment_id) ? checked : segment.isChecked;
        }

        const selectedSegmentIds = segments.filter(x => x.isChecked === true).map(x => x.segment_id);
        const newQuery = {...router.query,s_id: selectedSegmentIds.join(',')}
        delete(newQuery.b_id);
        delete(newQuery.v_id);
        delete(newQuery.category);
        delete(newQuery.manufacture);
        router.push({'href':'/products',query: newQuery})

        modifySegmentInSearchFilter(selectedSegmentIds);
    };
      

        const handleBrandChange = (event, eleBrand) => {

        const checked = event.target.checked;
        const { brand_id } = eleBrand;
        for (let brand of brands) {
            brand.isChecked = (brand.brand_id == brand_id) ? checked : brand.isChecked;
        }
        setBrands([...brands]);
        // setSegments([...segments]);
        const selectedBrandIds = brands.filter(x => x.isChecked === true).map(x => x.brand_id);
        const newQuery = {...router.query,b_id: selectedBrandIds.join(',')}
        delete(newQuery.v_id);
        delete(newQuery.category);
        delete(newQuery.manufacture);
        router.push({
            href:'/products',
            query: newQuery
        })
        // modifyBrandInSearchFilter(selectedBrandIds);
    };


    return (
        <Col lg={3} md={12} className="order-lg-first order-md-last mb-res-md-60px mb-res-sm-60px">
            <div className="left-sidebar">
                <div className="sidebar-heading">
                    <div className="main-heading">
                        <h2>Filter By</h2>     
                    </div>

                    <div className="sidebar-widget">
                        <h4 className="pro-sidebar-title">Segment</h4>
                        <div className="sidebar-widget-list scrollbox1">
                            <ul>
                                {
                                    segments.length > 0 && segments.map((ele, ind) => (
                                        <li key={ind}>
                                            <div className="sidebar-widget-list-left">
                                                <input type="checkbox"
                                                    checked={ele.isChecked}
                                                    onChange={(eve) => handleSegmentChange(eve, ele)}
                                                className={`has-sub ${ele.isChecked ? 'active' : '' }`}
                                                />
                                                <a href="#">{ele.segment_name}  <span>({ele.product_count} ) </span>
                                                </a>
                                                <span className="checkmark"></span>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>

                    <div className="sidebar-widget">
                        <h4 className="pro-sidebar-title">Categories</h4>
                        <div className="sidebar-widget-list scrollbox">
                            {
                                categories && categories.length > 0 && categories.map((ele, ind) => (
                                    <Accordion flush key={ind}>
                                        <Accordion.Item eventKey='0'>
                                                <Accordion.Header key={ind}>
                                                    {ele.category_name}
                                                </Accordion.Header>
                                            <Accordion.Body>
                                                {
                                                    ele.sub_categories && ele.sub_categories.map((sub_ele, subEleInd) => {
                                                        return (
                                                            <Accordion key={subEleInd}>
                                                                <Accordion.Item eventKey='1'>
                                                                    {
                                                                        sub_ele.end_categories &&
                                                                        sub_ele.end_categories.length == 0 && (
                                                                            <>
                                                                                <input
                                                                                    type="checkbox"
                                                                                    onChange={(eve) =>
                                                                                        handleCheckBoxChange(eve, ele, sub_ele, false)
                                                                                    }
                                                                                    checked={sub_ele.isChecked}
                                                                                    className={`has-sub ${ele.isChecked ? 'active' : ''} mx-1`}
                                                                                />
                                                                                {sub_ele.sub_category_name}
                                                                            </>
                                                                        )
                                                                    }
                                                                    {
                                                                        sub_ele.end_categories &&
                                                                        sub_ele.end_categories.length > 0 && (
                                                                            <>
                                                                                <Accordion.Header>  
                                                                                    <input type="checkbox"
                                                                                        onChange={(eve) =>
                                                                                        handleCheckBoxChange(eve, ele, sub_ele, false)
                                                                                        }
                                                                                        checked={sub_ele.isChecked}
                                                                                        className={`has-sub ${sub_ele.isChecked ? 'active' : ''} mx-1`}
                                                                                    />
                                                                                    {sub_ele.sub_category_name}
                                                                                </Accordion.Header>
                                                                                <Accordion.Body>
                                                                                        {
                                                                                            sub_ele.end_categories && sub_ele.end_categories.map((end_ele, endEleInd) => (
                                                                                                <Accordion.Item eventKey='2' key={endEleInd}>
                                                                                                    <input
                                                                                                        type="checkbox"
                                                                                                        onChange={(eve) =>
                                                                                                            handleCheckBoxChange(eve, ele, sub_ele, end_ele)
                                                                                                        }
                                                                                                        checked={end_ele.isChecked}
                                                                                                        className={`has-sub ${end_ele.isChecked ? 'active' : ''} mx-1`}
                                                                                                    />
                                                                                                    {end_ele.end_category_name}
                                                                                                </Accordion.Item>
                                                                                            ))
                                                                                        }
                                                                                </Accordion.Body>
                                                                            </>
                                                                        )
                                                                    }
                                                                </Accordion.Item>
                                                            </Accordion>
                                                        )
                                                    })
                                                }
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                ))
                            }
                        </div>
                    </div>
                    
                    <div className="sidebar-widget">
                        <h4 className="pro-sidebar-title">Brand</h4>
                        <div className="sidebar-widget-list">
                            <ul>
                                {
                                    brands.map((ele, ind) => (
                                        <li key={ind}>
                                            <div className="sidebar-widget-list-left">
                                                <input type="checkbox"
                                                    checked={ele.isChecked}
                                                    onChange={(eve) => handleBrandChange(eve, ele)}
                                                />
                                                <a href="#">{ele.brand_name}<span>({ele.product_count})</span> </a>
                                                <span className="checkmark"></span>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>


                    
                </div>
            </div>
        </Col>
    )
}

const mapStateToProps = state => {
    return {
        filters: state.account?.filters
    }
}

const mapDispatchToProps = {
    modifySegmentInSearchFilter, modifyBrandInSearchFilter,
    modifyVariantInSearchFilter, modifyCategoryInSearchFilter,
    resetSearchFilters
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsFilter);