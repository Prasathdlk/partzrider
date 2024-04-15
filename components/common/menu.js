import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import { categoryService } from 'core/services';
import { connect } from "react-redux";
import { useRouter } from 'next/router';
import { utils } from 'core/helper';

const Menu = (props) => {

    const [menuScrolling, setMenuScrolling] = useState(false);
    const [categories, setCategories] = useState([]);
    const navigate = useRouter();

    const handleScroll = () => {
        if (window.pageYOffset >= 168) {
            setMenuScrolling(true);
        } else {
            setMenuScrolling(false);
        };
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.addEventListener('scroll', handleScroll);
    });

    useEffect(() => {
        loadCategories();
    }, []);

    function loadCategories() {
        categoryService.getCategories().then((resp) => {
            if (resp.result && resp.result.length <= 0) {
                console.log('category list not found');
            }
            setCategories(resp.result);
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

        // navigate.push('/products?category=' + categoryId);
    }

    const getCategoryWithArrow = (category, categoryKey, subCategoryKey) => {
        return (
            <Link href={handleCategory(category, categoryKey)}>
                <a href="#">
                    {category[categoryKey]}
                    {
                        category[subCategoryKey] && category[subCategoryKey].length > 0 && (
                            <i className="ion-ios-arrow-down"></i>
                        )
                    }
                </a>
            </Link>
        )
    }

    const getLiSubMenu2 = (endCategoryList, categoryKey) => {
        return (
            endCategoryList.map((endEle, endInd) => {
                return (
                    <li className="menu-dropdown position-static" key={endInd}>
                        <Link href={handleCategory(endEle, categoryKey)}>
                            <a href="#">
                                {endEle[categoryKey]}
                            </a>
                        </Link>
                    </li>
                )
            })
        )
    }

    const getCatgoryMenu = (categoryList) => {
        return (
            <>
                {
                    categoryList && categoryList.map((ele, ind) => {
                        return (
                            <li className="menu-dropdown" key={ind}>
                                {getCategoryWithArrow(ele, 'category_name', 'sub_categories')}
                                {
                                    ele.sub_categories && ele.sub_categories.length > 0 && (
                                        <ul className="sub-menu">
                                            {
                                                ele.sub_categories.map((subEle, subInd) => {
                                                    return (
                                                        <li className="menu-dropdown position-static" key={subInd}>
                                                            {getCategoryWithArrow(subEle, 'sub_category_name', 'end_categories')}
                                                            {
                                                                subEle.end_categories && subEle.end_categories.length > 0 && (
                                                                    <ul className="sub-menu sub-menu-2">
                                                                        {
                                                                            getLiSubMenu2(subEle.end_categories, 'end_category_name')
                                                                        }
                                                                    </ul>
                                                                )
                                                            }
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    )
                                }
                            </li>
                        )
                    })
                }
            </>
        )
    }

    return (
        // className={ menuScrolling ?'menu fixed': 'menu '}
        <div className='header-buttom-nav sticky-nav'>
            <Container>
                <Row>
                    <Col md={12} className=" text-left d-none d-lg-block ">
                        <div className="d-flex align-items-start justify-content-start ">
                            <div className="main-navigation">
                                <ul>
                                    <li>
                                        <Link href={'/'}>
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={'/about-us'}>
                                            About Us
                                        </Link>
                                    </li>
                                    {getCatgoryMenu(categories)}
                                    <li>
                                        <Link href={'/contact-us'}>
                                            Contact Us
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default connect(null, null)(Menu);
