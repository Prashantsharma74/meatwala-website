// // import React, { useEffect } from "react";
// // import Swiper from "swiper";
// // import { Navigation, Pagination } from "swiper/modules";
// // import RestaurantCard from "./RestaurantCard";
// // import { Link, useNavigate } from "react-router-dom";
// // const RestaurantCategory = ({ num, text, data }) => {

// //   useEffect(() => {
// //     new Swiper(`.swiper-rest-${num}`, {
// //       modules: [Navigation, Pagination],
// //       navigation: {
// //         nextEl: `.next-rest-${num}`,
// //         prevEl: `.prev-rest-${num}`,
// //       },
// //       pagination: {
// //         el: ".swiper-pagination",
// //         clickable: true,
// //       },
// //       slidesPerView: 1.5,
// //       spaceBetween: 10,
// //       breakpoints: {
// //         640: {
// //           slidesPerView: 2,
// //           spaceBetween: 10,
// //         },
// //         768: {
// //           slidesPerView: 3,
// //           spaceBetween: 10,
// //         },
// //         1024: {
// //           slidesPerView: 4,
// //           spaceBetween: 15,
// //         },
// //       },
// //     });
// //   }, []);
// //   // console.log("data",data);
// //   const navigate = useNavigate();

// //   const handleNavigation = () => {
// //     // if (text === "Family Meal Deals") {
// //     //   navigate("/offers");
// //     // } else {
// //     navigate("/all-restaurant", { state: { data: data } });
// //     // }
// //   };
// //   return (
// //     <div className="restaurant-list  ratio3_2">
// //       <div className="container">
// //         <div className="popular-restaurant section-md-t-space ratio3_2">
// //           <div className="title title-sm mt-0">
// //             <h2>{text}</h2>
// //             <div className="loader-line" />
// //           </div>
// //           <div className="theme-arrow">
// //             <div className={`swiper swiper-rest-${num} popular-slider`}>
// //               <div className="swiper-wrapper">
// //                 {data?.map((item) => (
// //                   <RestaurantCard key={item.pkid} item={item} />
// //                 ))}
// //               </div>
// //             </div>
// //             <div
// //               className={`swiper-button-next popular-next next-rest-${num}`}
// //               style={{
// //                 display: "block",
// //                 width: "40px", // Set the size of the button
// //                 height: "40px", // Equal width and height for a circle
// //                 borderRadius: "50%", // Makes it circular
// //                 display: "flex", // Centers the content inside
// //                 alignItems: "center", // Centers the content vertically
// //                 justifyContent: "center", // Centers the content horizontally
// //                 boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Optional shadow for better visuals
// //                 cursor: "pointer", // Makes it clickable
// //               }}
// //             />
// //             <div
// //               className={`swiper-button-prev popular-prev prev-rest-${num}`}
// //               style={{
// //                 display: "block",
// //                 width: "40px", // Set the size of the button
// //                 height: "40px", // Equal width and height for a circle
// //                 borderRadius: "50%", // Makes it circular
// //                 display: "flex", // Centers the content inside
// //                 alignItems: "center", // Centers the content vertically
// //                 justifyContent: "center", // Centers the content horizontally
// //                 boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Optional shadow for better visuals
// //                 cursor: "pointer", // Makes it clickable
// //               }}
// //             />
// //           </div>
// //         </div>
// //         {/* <div
// //           style={{
// //             textAlign: "right",
// //             marginTop: "25px",
// //             marginBottom: "25px",
// //           }}
// //         >
// //           <button
// //             onClick={handleNavigation}
// //             className="btn hover-effect theme-btn"
// //           >
// //             View All
// //           </button>
// //         </div> */}
// //       </div>
// //     </div>
// //   );
// // };

// // export default RestaurantCategory;

// import React from "react";
// import RestaurantCard from "./RestaurantCard";

// const RestaurantCategory = ({ num, text, data }) => {
//   return (
//     <div className="restaurant-list ratio3_2">
//       <div className="container">
//         <div className="popular-restaurant section-md-t-space ratio3_2">
//           <div className="title title-sm mt-0">
//             <h2>{text}</h2>
//             <div className="loader-line" />
//           </div>

//           {/* Grid list (no slider) */}
//           <div className="row g-3">
//             {data?.map((item) => (
//               <div
//                 key={item.pkid}
//                 className="col-12 col-sm-6 col-md-4 col-lg-3"
//               >
//                 <RestaurantCard item={item} />
//               </div>
//             ))}
//           </div>

//           {/* Uncomment if you want a 'View All' button later
//           <div className="text-end mt-4">
//             <button className="btn hover-effect theme-btn">
//               View All
//             </button>
//           </div>
//           */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RestaurantCategory;


import React, { useEffect, useMemo, useRef, useState } from "react";
import RestaurantCard from "./RestaurantCard";

const PAGE_SIZE = 12; // how many cards per batch

const RestaurantCategory = ({ text, data = [] }) => {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef(null);

  const hasMore = visibleCount < data.length;

  const items = useMemo(() => data.slice(0, visibleCount), [data, visibleCount]);

  useEffect(() => {
    // reset when data changes
    setVisibleCount(PAGE_SIZE);
  }, [data]);

  useEffect(() => {
    if (!sentinelRef.current) return;
    const el = sentinelRef.current;

    let ticking = false; // throttle intersection callbacks a bit
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry.isIntersecting || !hasMore || ticking) return;
        ticking = true;
        // simulate pagination: reveal next page
        setVisibleCount((c) => c + PAGE_SIZE);
        // release throttle soon after
        setTimeout(() => (ticking = false), 150);
      },
      { rootMargin: "600px 0px 600px 0px" } // prefetch early
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, [hasMore]);

  return (
    <div className="restaurant-list ratio3_2">
      <div className="container">
        <div className="popular-restaurant section-md-t-space ratio3_2">
          <div className="title title-sm mt-0">
            <h2>{text}</h2>
            <div className="loader-line" />
          </div>

          {/* Grid (renders only visible items) */}
          <div className="row g-3">
            {items.map((item) => (
              <div key={item.pkid} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                <RestaurantCard item={item} />
              </div>
            ))}

            {/* Optional skeletons while more exist */}
            {hasMore &&
              Array.from({ length: Math.min(PAGE_SIZE, data.length - visibleCount) }).map(
                (_, i) => (
                  <div key={`skeleton-${i}`} className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div className="card placeholder-wave" style={{ height: 220 }}>
                      <div className="placeholder col-12" style={{ height: 160 }} />
                      <div className="card-body">
                        <div className="placeholder col-8" />
                        <div className="placeholder col-6 mt-2" />
                      </div>
                    </div>
                  </div>
                )
              )}
          </div>

          {/* The sentinel that triggers loading the next page */}
          <div ref={sentinelRef} style={{ height: 1 }} />

          {/* Optional fallback button */}
          {!hasMore && data.length > 0 && (
            <p className="text-center mt-3 mb-0 small text-muted">You’ve reached the end.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantCategory;
