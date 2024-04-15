import Banner from 'components/main/banner';
import BestSeller from 'components/main/best-seller';
import HotDeals from 'components/main/hot-deals';
import Brand from 'components/main/brand';
// import Static from 'components/main/static';
// import ProductBanner from 'components/main/product-banner';
import ProductVideo from 'components/main/product-video';

export default function Home() {
	return (
		<div className="home-5 home-6 home-8 home-9 home-electronic">
			<div id="main">
				<Banner />
				<BestSeller />
				<HotDeals />
				<Brand />
				{/* <Static /> */}
				{/* <ProductBanner /> */}
			 	<ProductVideo />
			</div>
		</div>
	)
}
