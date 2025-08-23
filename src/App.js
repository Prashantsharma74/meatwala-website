import "./App.css";
import "./assets/css/vendors/bootstrap.css";
import "./assets/css/vendors/remixicon.css";
import "./assets/css/vendors/swiper-bundle.min.css";
import "./assets/css/style.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useLocation,
} from "react-router-dom";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/SearchHome";
import Login from "./pages/Login";
import OTP from "./pages/OTP";
import Offers from "./pages/Offers";
import Restaurant from "./pages/Restaurant";
import Navbar from "./components/Navbar";
import Dining from "./pages/Dining";
import Cart from "./pages/Cart";
import Address from "./pages/Address-book";
import BookTable from "./pages/BookTable";
import ConfirmOrder from "./pages/confirm-order";
import Cancel from "./pages/Cancel";
// import Favourate from "./pages/favourate";
import Favourite from "./pages/Favourite";
import Myhistory from "./pages/Myhistory";
import Payment from "./pages/Payment";
import Faq from "./pages/faq";
import Orderdetail from "./pages/Orderdetail";
import Restaurantdetail from "./pages/Restaurantdetail";
import Restaurantlist from "./pages/Restaurantlist";
import Selectaddress from "./pages/Selectaddress";
import Setting from "./pages/Setting";
import Toprestaurant from "./pages/Toprestaurant";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Review from "./pages/review";
import DiningHistorys from "./pages/DiningHistorys";
import DiningHistory from "./pages/DiningHistory";
import Map from "./components/Map";
import Notification from "./pages/Notification";
import Support from "./pages/Support";
import Ticketdetails from "./pages/Ticketdetails";
import CreateTicket from "./pages/CreateTicket";
import Bookingconfirm from "./pages/Bookingconfirm";
import Localheros from "./pages/locaHeros";
import Familydeal from "./pages/Family-deal";
import Cartcomponent from "./components/CartComponent";
import PrivacyPolicy from "./pages/Privacy";
import Terms from "./pages/Term";
import Ride from "./pages/RideWithUs";
import AddRestaurant from "./pages/AddRestaurant";
import BitesBussiness from "./pages/BitesBussiness";
import Blog from "./pages/Blog";
import BlogContact from "./pages/BlogContact";
import ResForm from "./components/RestaurantForm";
import SupportedByBites from "./pages/SupportedByBites";
import DriverForms from "./components/RideWithUs/DriverVerification";
import Allrestaurant from "./pages/Allrestaurant";
import Content from "./pages/Allcontent";
import Loyalty from "./pages/Loyaltipoint";
import Search from "./pages/search";
import City from "./pages/City";
import Cookie from "./pages/Cookie";
import Wholesale from "./pages/WholeSales";
import { gtmPageview } from "./utils/gtm";

function App() {

  function GtmRouteListener() {
    const { pathname, search } = useLocation();
    React.useEffect(() => {
      gtmPageview(pathname + search);
    }, [pathname, search]);
    return null;
  }

  return (
    <Provider store={store}>
      {/* <ToastContainer /> */}
      <Router>
        <ScrollToTop />
        <GtmRouteListener />
        <Routes>
          <Route path="/*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Login />} />
          <Route path="/otp" element={<OTP />} />
          {/* <Route path="*" element={<Notfound />} /> */}
          <Route element={<SidebarLayout />}>
            <Route path="/" element={<Home />} />
            {/* <Route path="/dining" element={<Dining />} /> */}
            <Route path="/store/:id" element={<Restaurant />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/address" element={<Address />} />
            <Route path="/bookatablehighwycombe/:id" element={<BookTable />} />
            <Route path="/confirmorder" element={<ConfirmOrder />} />
            <Route path="/bookingConfirm" element={<Bookingconfirm />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/Orderdetail/:id" element={<Orderdetail />} />
            <Route
              path="/Restaurantdetail/:id"
              element={<Restaurantdetail />}
            />
            <Route path="/Restaurantlist" element={<Restaurantlist />} />
            <Route path="/Selectaddress" element={<Selectaddress />} />
            <Route path="/toprestaurant" element={<Toprestaurant />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/category/:name/:id" element={<Restaurantlist />} />
            <Route path="/review" element={<Review />} />
            {/*  <Route path="/dininghistorys" element={<DiningHistorys/>} />
            <Route path="/dininghistory" element={<DiningHistory/>} /> */}
            <Route path="/map" element={<Map />} />
            <Route path="/localHeros" element={<Localheros />} />
            <Route path="/family-deal" element={<Familydeal />} />
            <Route path="/com" element={<Cartcomponent />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<Terms />} />
            <Route path="/cancel" element={<Cancel />} />
            <Route path="/become-a-rider" element={<Ride />} />
            <Route path="/partner" element={<AddRestaurant />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/myhistory" element={<Myhistory />} />
            <Route path="/address" element={<Address />} />
            <Route path="/favourite" element={<Favourite />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/support" element={<Support />} />
            <Route path="/generateTicket" element={<CreateTicket />} />
            <Route
              path="/ticketdetails/:ticketId"
              element={<Ticketdetails />}
            />
            <Route path="/notification" element={<Notification />} />
            <Route path="/cookies-policy" element={<Cookie />} />
            <Route path="/bitesforbusiness" element={<BitesBussiness />} />
            <Route path="/recipes" element={<Blog />} />
            <Route path="/blog-detail" element={<BlogContact />} />
            <Route path="/form" element={<ResForm />} />
            <Route path="/supported-by-meatwala" element={<SupportedByBites />} />
            <Route path="/driver" element={<DriverForms />} />
            <Route path="/all-restaurant" element={<Allrestaurant />} />
            <Route path="/content-detail" element={<Content />} />
            <Route path="/loyaltypoint" element={<Loyalty />} />
            <Route path="/shop" element={<Search />} />
            <Route path="/near-me/:cityName/:cityid" element={<City />} />
            <Route path="/wholesale" element={<Wholesale />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

const SidebarLayout = () => (
  <>
    {/* <Sidebar /> */}
    <Outlet />
    {/* <Navbar/> */}
  </>
);

export default App;
