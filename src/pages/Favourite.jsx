// import React, { useEffect, useState } from 'react'
// import { getFavorite } from '../utils/api';
// import Navbar from '../components/Navbar';
// import RestaurantCard from '../components/RestaurantCard';
// import Profileshow from '../components/Profileshow';
// import Footer from '../components/Footer';
// import FooterMobileMenu from '../components/FooterMobileMenu';
// import Delivery from '../components/delivery';
// import FavouriteCard from '../components/favouriteCard';
// import { Link } from 'react-router-dom';
// const Favourite = () => {
//   const storedUser = JSON.parse(localStorage.getItem("user"));
//   const storedAddress = JSON.parse(localStorage.getItem("userAddress"));
//   const storedPincode = JSON.parse(localStorage.getItem("pincode")) || "";
//   const pincode = storedPincode ? storedPincode.longName : "";
//   const [rest, setRest] = useState([]);

//   const callData = async () => {
//     const data = {
//       lat: storedAddress?.lat,
//       lng: storedAddress?.lng,
//       pincode: pincode,
//       // userid:"7",
//       userid: storedUser?.userid,
//     };
//     const res = await getFavorite(data);
//     setRest(res?.restdata);
//     console.log("data", res);
//   };

//   useEffect(() => {
//     callData();
//   }, []);

//   return (
//     <>
//       <Navbar />
//       <section className="section-t-space mytabb overflow-hidden pt-120">
//         <Delivery />
//       </section>
//       <section className="page-head-section">
//         <div className="container page-heading">
//           <h2 className="h3 mb-3 text-white text-center">Favourite Restaurants</h2>
//           <nav aria-label="breadcrumb">
//             <ol className="breadcrumb flex-lg-nowrap justify-content-center justify-content-lg-star">
//               <li className="breadcrumb-item">
//                 <Link href="index.html">
//                   <i className="ri-home-line" />
//                   Home
//                 </Link>
//               </li>
//               <li className="breadcrumb-item active" aria-current="page">
//                 Favourite Restaurants
//               </li>
//             </ol>
//           </nav>
//         </div>
//       </section>
//       <section className="profile-section section-b-space">
//         <div className="container">
//           <div className="row">
//             <div className="col-lg-3">
//               <Profileshow selected={"Favourite"} />
//             </div>
//             <div className="col-lg-9">
//               <div className="change-profile-content">
//                 <div className="title">
//                   <div className="loader-line" />
//                   <h3>Favourite Restaurants</h3>
//                 </div>
//                 <div className="row g-4 ratio2_3">
//                   {
//                     rest?.map((item) => (
//                       <div key={item.pkid} className="col-xl-6 col-lg-4 col-sm-6 trash" >
//                         <FavouriteCard item={item} getFavorite={callData} />
//                       </div>
//                     ))
//                   }
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       <Footer />
//       <FooterMobileMenu />
//       <div
//         className="modal fade location-modal"
//         id="location"
//         data-bs-backdrop="static"
//         data-bs-keyboard="false"
//         tabIndex={-1}
//       >
//         <div className="modal-dialog modal-dialog-centered">
//           <div className="modal-content">
//             <div className="modal-header">
//               <div className="modal-title">
//                 <h5 className="fw-semibold">Select a Location</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   data-bs-dismiss="modal"
//                   aria-label="Close"
//                 />
//               </div>
//             </div>
//             <div className="modal-body">
//               <div className="search-section">
//                 <form className="form_search" role="form">
//                   <input
//                     type="search"
//                     placeholder="Search Location"
//                     className="nav-search nav-search-field"
//                   />
//                 </form>
//               </div>
//               <Link href="" className="current-location">
//                 <div className="current-address">
//                   <i className="ri-focus-3-line focus" />
//                   <div>
//                     <h5>Use current-location</h5>
//                     <h6>Wellington St., Ottawa, Ontario, Canada</h6>
//                   </div>
//                 </div>
//                 <i className="ri-arrow-right-s-line arrow" />
//               </Link>
//               <h5 className="mt-sm-3 mt-2 fw-medium recent-title dark-text">
//                 Recent Location
//               </h5>
//               <Link href="" className="recent-location">
//                 <div className="recant-address">
//                   <i className="ri-map-pin-line theme-color" />
//                   <div>
//                     <h5>Bayshore</h5>
//                     <h6>kingston St., Ottawa, Ontario, Canada</h6>
//                   </div>
//                 </div>
//               </Link>
//             </div>
//             <div className="modal-footer">
//               <Link href="#" className="btn gray-btn" data-bs-dismiss="modal">
//                 Close
//               </Link>
//               <Link href="#" className="btn theme-btn mt-0" data-bs-dismiss="modal">
//                 Save
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default Favourite

import React, { useEffect, useState } from 'react'
import { getFavorite } from '../utils/api';
import Navbar from '../components/Navbar';
import Profileshow from '../components/Profileshow';
import Footer from '../components/Footer';
import FooterMobileMenu from '../components/FooterMobileMenu';
import Delivery from '../components/delivery';
import FavouriteCard from '../components/favouriteCard';
import { Link, useNavigate } from 'react-router-dom';

const Favourite = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedAddress = JSON.parse(localStorage.getItem("userAddress"));
  const storedPincode = JSON.parse(localStorage.getItem("pincode")) || "";
  const pincode = storedPincode ? storedPincode.longName : "";
  const [rest, setRest] = useState([]);

  const callData = async () => {
    const data = {
      lat: storedAddress?.lat,
      lng: storedAddress?.lng,
      pincode: pincode,
      userid: storedUser?.userid,
    };
    const res = await getFavorite(data);
    setRest(res?.restdata || []);
    console.log("data", res);
  };

  useEffect(() => {
    callData();
  }, []);

  return (
    <>
      <Navbar />
      <section className="section-t-space mytabb overflow-hidden pt-120">
        <Delivery />
      </section>

      <section className="page-head-section">
        <div className="container page-heading">
          <h2 className="h3 mb-3 text-white text-center">Favourite Stores</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb flex-lg-nowrap justify-content-center justify-content-lg-star">
              <li className="breadcrumb-item">
                <Link to="/">
                  <i className="ri-home-line" />
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Favourite Stores
              </li>
            </ol>
          </nav>
        </div>
      </section>

      <section className="profile-section mt-4 section-b-space">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <Profileshow selected={"Favourite"} />
            </div>

            <div className="col-lg-9">
              <div className="change-profile-content">
                <div className="title">
                  <div className="loader-line" />
                  <h3>Favourite Stores</h3>
                </div>

                {/* ✅ Empty State */}
                {(!rest || rest.length === 0) ? (
                  <div className="d-flex flex-column align-items-center justify-content-center p-5 text-center">
                    <h4 className="mb-3">You haven’t added any favourite stores yet.</h4>
                    <button
                      onClick={() => navigate('/shop')}
                      className="btn"
                      style={{
                        backgroundColor: '#e53935',
                        color: '#fff',
                        padding: '10px 18px',
                        borderRadius: 8,
                        fontWeight: 600,
                      }}
                    >
                      Discover Local Butchers
                    </button>
                  </div>
                ) : (
                  /* ✅ Show list of favourites if available */
                  <div className="row g-4 ratio2_3">
                    {rest.map((item) => (
                      <div key={item.pkid} className="col-xl-6 col-lg-4 col-sm-6">
                        <FavouriteCard item={item} getFavorite={callData} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FooterMobileMenu />
    </>
  )
}

export default Favourite;
