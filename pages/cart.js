
import BreadCrumb from 'components/common/breadcrumb';
import CartItems from 'components/cart-items';

export default function Cart() {
    return (
        <div className="home-5 home-6 home-8 home-9 home-electronic">
            <div id="main">
                <BreadCrumb
                    heading={'Cart'}
                    title={'Shop List'}
                />
                <CartItems/>
            </div>
        </div>
    )
}