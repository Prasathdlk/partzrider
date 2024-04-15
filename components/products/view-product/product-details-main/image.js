import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Image1 from 'public/styles/assets/images/product-image/product1.jpg';
import Image2 from 'public/styles/assets/images/product-image/product2.jpg';
import Image3 from 'public/styles/assets/images/product-image/product3.jpg';
import Image4 from 'public/styles/assets/images/product-image/product4.jpg';
import { Col } from 'react-bootstrap';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const ProductDetailsImage = (props) => {
    const { product } = props;
    const { images } = product;
    const [imagesList, setImagesList] = useState([]);

    useEffect(() => {
        if (images && images[0]) {
            const imageArr = []
            images.map((ele) => {
                const imageObj = {
                    original: ele.image_url,
                    thumbnail: ele.image_url
                };
                imageArr.push(imageObj)
            })
            setImagesList(imageArr)
        }
    }, [images]);

    return (
        <Col xl={6} lg={6} md={12}>
            <div className="product-details-img product-details-tab">
                <div className="zoompro-wrap zoompro-2">
                    <div className="zoompro-border zoompro-span">
                        <ImageGallery
                            items={imagesList}
                            showBullets={false}
                            showIndex={true}
                            showThumbnails={true}
                            showPlayButton={false}
                            showFullscreenButton={true}
                            lazyLoad={true}
                            thumbnailPosition={"bottom"}
                        />
                    </div>
                </div>
                <div id="gallery" className="product-dec-slider-2 slick-initialized slick-slider">
                    <div className="slick-list draggable">
                        <div className="slick-track" style={{ opacity: 1, width: "548px", transform: "translate3d(0px, 0px, 0px)" }}>
                            {/* <a 
                                className="slick-slide slick-current slick-active" 
                                data-image={Image1} 
                                data-zoom-image={Image1} 
                                data-slick-index="0" 
                                aria-hidden="false" 
                                style={{width:"137px"}} 
                                tabIndex="0"
                            >
                                <Image src={Image1} alt="" layout="responsive"/>
                            </a> */}
                        </div>
                    </div>
                </div>
            </div>
        </Col>
    )
}
export default ProductDetailsImage;