import Billing from 'components/checkout-billing';
import BreadCrumb from 'components/common/breadcrumb';

export default function Checkout() {
    return(
        <div className="home-5 home-6 home-8 home-9 home-electronic">
            <div id="main">
                <BreadCrumb
                    heading={'Checkout'}
                    title={'Part List'}
                />
                <Billing/>
            </div>
        </div>
    )
}