import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
// import 'public/styles/globals.css';
import 'node_modules/react-toastify/dist/ReactToastify.css';

import 'public/styles/assets/css/vendor/vendor.min.css';
import 'public/styles/assets/css/plugins/plugins.min.css';
import 'public/styles/assets/css/style.min.css';
import 'public/styles/assets/css/responsive.min.css';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { wrapper, store } from "redux/store";
import { Provider } from "react-redux";
import Head from 'next/head';
import Script from 'next/script';
import { SSRProvider } from '@react-aria/ssr';

import Header from 'components/common/header';
import Menu from 'components/common/menu';
import Footer from 'components/common/footer';
import { ToastContainer, Zoom } from 'react-toastify';

function MyApp({ Component, pageProps, menuScrolling, scroll }) {
	return (
		<SSRProvider>
			<Provider store={store}>

				<Script
					id="google-script"
					strategy="lazyOnload"
					src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />

				<Script id="google-exec-script" strategy="lazyOnload">
					{`
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
						page_path: window.location.pathname,
						});
					`}
				</Script>
				<Head>
					<title>Partzrider</title>
					<meta property="og:title" content="Partzrider" key="title" />
				</Head>
				<div className="home-5 home-6 home-8 home-9 home-electronic">
					<div id="main">
						<Header />
						<Menu />
						<Component {...pageProps} />
						<Footer />
						<ToastContainer
							draggable={false}
							transition={Zoom}
							theme="dark"
						/>
					</div>
				</div>
			</Provider>
		</SSRProvider>
	)
}

export default wrapper.withRedux(MyApp);
