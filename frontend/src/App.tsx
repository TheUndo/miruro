import { Analytics } from "@vercel/analytics/react";
import { useEffect } from "react";
import ReactGA from "react-ga4";
import {
	Route,
	BrowserRouter as Router,
	Routes,
	useLocation,
} from "react-router-dom";
import { register } from "swiper/element/bundle";
import { AuthProvider } from "./client/useAuth";
import {
	About,
	ApolloClientProvider,
	Callback,
	Home,
	Navbar,
	Page404,
	PolicyTerms,
	Profile,
	ScrollToTop,
	Search,
	Settings,
	SettingsProvider,
	ShortcutsPopup,
	ThemeProvider,
	Watch,
	usePreserveScrollOnReload,
} from "./index";

register();

function App() {
	usePreserveScrollOnReload();
	/* const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

	useEffect(() => {
		if (measurementId) {
			ReactGA.initialize(measurementId);
		}
	}, [measurementId]); */

	return (
		<ApolloClientProvider>
			<Router>
				<AuthProvider>
					<ThemeProvider>
						<SettingsProvider>
							<Navbar />
							<ShortcutsPopup />
							<ScrollToTop />
							<TrackPageViews />
							<div style={{ minHeight: "35rem" }}>
								<Routes>
									<Route path="/" element={<Home />} />
									<Route path="/home" element={<Home />} />
									<Route path="/search" element={<Search />} />
									<Route path="/watch/:animeId" element={<Watch />} />
									<Route
										path="/watch/:animeId/:animeTitle/:episodeNumber"
										element={<Watch />}
									/>
									<Route path="/profile" element={<Profile />} />
									<Route path="/profile/settings" element={<Settings />} />
									<Route path="/about" element={<About />} />
									<Route path="/pptos" element={<PolicyTerms />} />
									<Route path="/callback" element={<Callback />} />
									<Route path="*" element={<Page404 />} />
								</Routes>
							</div>
						</SettingsProvider>
					</ThemeProvider>
				</AuthProvider>
			</Router>
			<Analytics />
		</ApolloClientProvider>
	);
}

function TrackPageViews() {
	const { pathname } = useLocation();

	useEffect(() => {
		ReactGA.send({ hitType: "pageview", page: pathname });
	}, [pathname]);

	return null;
}

export default App;
