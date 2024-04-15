
import { Container, Row } from "react-bootstrap";
import BreadCrumb from 'components/products/products-breadcrumb';
import Productslist from 'components/products/products-list';
import ProductsFilter from 'components/products/products-filter';

export default function Products() {
    return (
        <div className="home-5 home-6 home-8 home-9 home-electronic">
            <div id="main">
                <BreadCrumb/>
                <div className="shop-category-area">
                    <Container>
                        <Row>
                            <Productslist/>
                            <ProductsFilter/>
                        </Row>
                    </Container>
                </div>
            </div>
        </div>
    )
}