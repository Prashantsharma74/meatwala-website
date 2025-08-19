// import React, { useEffect, useRef, useState } from 'react';

// const CategoriesAccordion = ({ filteredFoods, activeCategory, onCategoryClick }) => {
//   const categoryListRef = useRef(null);
//   const [isManualScroll, setIsManualScroll] = useState(false);

//   // Fallback for onCategoryClick if not provided
//   const handleCategoryClick = (category) => {
//     setIsManualScroll(true);
//     if (onCategoryClick) {
//       onCategoryClick(category);
//     } else {
//       console.warn("onCategoryClick is not provided, active category won't be updated.");
//     }
//   };

//   useEffect(() => {
//     if (!isManualScroll && categoryListRef.current) {
//       const activeIndex = filteredFoods.findIndex(
//         (category) => category.category === activeCategory
//       );

//       if (activeIndex !== -1) {
//         const activeItem = categoryListRef.current.children[activeIndex];
//         const activeItemLeft = activeItem.offsetLeft;
//         const containerWidth = categoryListRef.current.clientWidth;
//         const itemWidth = activeItem.clientWidth;

//         categoryListRef.current.scrollTo({
//           left: activeItemLeft - containerWidth / 2 + itemWidth / 2,
//           behavior: 'smooth',
//         });
//       }
//     }
//   }, [activeCategory, filteredFoods, isManualScroll]);

//   useEffect(() => {
//     if (isManualScroll) {
//       const timer = setTimeout(() => setIsManualScroll(false), 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [isManualScroll]);

//   return (
//     <div className="accordion sidebar-accordion unique" id="accordionPanelsStayOpenExample">
//       <div className="accordion-item">
//         <div
//           id="collapseOne"
//           className="accordion-collapse collapse show"
//           aria-labelledby="headingOne"
//           data-bs-parent="#accordionPanelsStayOpenExample"
//         >
//           <div
//             className="accordion-body"
//             style={{
//               backgroundColor: '#f8f9fa',
//               padding: '1rem',
//             }}
//           >
//             <ul
//               className="category-list custom-padding custom-height scroll-bar"
//               id="myDIV"
//               style={{
//                 display: 'flex',
//                 overflowX: 'auto',
//                 whiteSpace: 'nowrap',
//                 padding: '0',
//                 margin: '0',
//                 listStyle: 'none',
//                 width: '100%',
//               }}
//               ref={categoryListRef}
//             >
//               {filteredFoods.map((category, i) => (
//                 <li
//                   key={i}
//                   style={{
//                     marginRight: '1rem',
//                     flex: '0 0 auto',
//                     padding: "0px",
//                     borderRadius: "30px",
//                   }}
//                 >

//                   <a
//                     href={`#${category.category}`}
//                     onClick={() => handleCategoryClick(category.category)}
//                     className={`${activeCategory === category.category ? 'btn theme-btn' : 'btn btn-outline '}`}
//                     style={{
                
//                       backgroundColor: activeCategory === category.category ? '' : 'rgba(232, 65, 53, 0.38)',
//                       borderRadius:"100px"
//                     }}
//                   >
//                     <div className="form-check ps-0 m-0 category-list-box">
//                       <div className="form-check-label">
//                         <span className="name">{category.category}</span>
//                       </div>
//                     </div>
//                   </a>
//                 </li>
//               ))}
//             </ul>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };



// export default CategoriesAccordion;




// import { useEffect, useRef, useState } from "react"

// const CategoriesAccordion = ({ filteredFoods, activeCategory, onCategoryClick }) => {
//   const categoryListRef = useRef(null)
//   const [isManualScroll, setIsManualScroll] = useState(false)
//   const [isIOS, setIsIOS] = useState(false)

//   // Detect iOS device
//   useEffect(() => {
//     const iOS =
//       /iPad|iPhone|iPod/.test(navigator.userAgent) ||
//       (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
//     setIsIOS(iOS)
//   }, [])

//   // Fallback for onCategoryClick if not provided
//   const handleCategoryClick = (category) => {
//     setIsManualScroll(true)
//     if (onCategoryClick) {
//       onCategoryClick(category)
//     } else {
//       console.warn("onCategoryClick is not provided, active category won't be updated.")
//     }
//   }

//   useEffect(() => {
//     if (!isManualScroll && categoryListRef.current) {
//       const activeIndex = filteredFoods.findIndex((category) => category.category === activeCategory)

//       if (activeIndex !== -1) {
//         const activeItem = categoryListRef.current.children[activeIndex]
//         const activeItemLeft = activeItem.offsetLeft
//         const containerWidth = categoryListRef.current.clientWidth
//         const itemWidth = activeItem.clientWidth

//         categoryListRef.current.scrollTo({
//           left: activeItemLeft - containerWidth / 2 + itemWidth / 2,
//           behavior: "smooth",
//         })
//       }
//     }
//   }, [activeCategory, filteredFoods, isManualScroll])

//   useEffect(() => {
//     if (isManualScroll) {
//       const timer = setTimeout(() => setIsManualScroll(false), 1000)
//       return () => clearTimeout(timer)
//     }
//   }, [isManualScroll])

//   return (
//     <div
//       className="accordion sidebar-accordion unique meatwala-category-sticky"
//       id="accordionPanelsStayOpenExample"
//       style={{
//         // CRITICAL: Fixed positioning to stay above footer
//         position: "fixed",
//         bottom: isIOS ? "calc(64px + env(safe-area-inset-bottom))" : "64px", // Above footer
//         left: "0",
//         right: "0",
//         zIndex: 100000, // Higher than footer (99999) but lower than modals
//         backgroundColor: "#ffffff",
//         borderTop: "1px solid #e5e7eb",
//         boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
//         // iOS specific optimizations
//         transform: isIOS ? "translate3d(0, 0, 0)" : "none",
//         WebkitTransform: isIOS ? "translate3d(0, 0, 0)" : "none",
//         willChange: isIOS ? "transform" : "auto",
//         WebkitWillChange: isIOS ? "transform" : "auto",
//         isolation: "isolate",
//         backdropFilter: "blur(10px)",
//         WebkitBackdropFilter: "blur(10px)",
//       }}
//     >
//       <div className="accordion-item">
//         <div
//           id="collapseOne"
//           className="accordion-collapse collapse show"
//           aria-labelledby="headingOne"
//           data-bs-parent="#accordionPanelsStayOpenExample"
//         >
//           <div
//             className="accordion-body"
//             style={{
//               backgroundColor: "#f8f9fa",
//               padding: "0.5rem 1rem", // Reduced for mobile
//               position: "relative",
//               zIndex: 1,
//             }}
//           >
//             <ul
//               className="category-list custom-padding custom-height scroll-bar meatwala-category-list"
//               id="myDIV"
//               style={{
//                 display: "flex",
//                 overflowX: "auto",
//                 whiteSpace: "nowrap",
//                 padding: "0",
//                 margin: "0",
//                 listStyle: "none",
//                 width: "100%",
//                 alignItems: "center", // FIXED: Align items vertically
//                 // Hide scrollbar
//                 scrollbarWidth: "none", // Firefox
//                 msOverflowStyle: "none", // IE/Edge
//                 WebkitOverflowScrolling: "touch", // iOS smooth scrolling
//               }}
//               ref={categoryListRef}
//             >
//               {filteredFoods.map((category, i) => (
//                 <li
//                   key={i}
//                   className="meatwala-category-item"
//                   style={{
//                     marginRight: "0.5rem", // Reduced for mobile
//                     flex: "0 0 auto",
//                     padding: "0px",
//                     borderRadius: "30px",
//                     display: "flex", // FIXED: Make li a flex container
//                     alignItems: "center", // FIXED: Center content vertically
//                   }}
//                 >
//                   <a
//                     href={`#${category.category}`}
//                     onClick={() => handleCategoryClick(category.category)}
//                     className={`${activeCategory === category.category ? "btn theme-btn" : "btn btn-outline"} meatwala-category-btn`}
//                     style={{
//                       backgroundColor: activeCategory === category.category ? "" : "rgba(232, 65, 53, 0.38)",
//                       borderRadius: "100px",
//                       fontSize: "0.875rem", // Smaller for mobile
//                       padding: "0.5rem 1rem", // FIXED: Better padding for text alignment
//                       whiteSpace: "nowrap",
//                       textDecoration: "none",
//                       display: "flex", // FIXED: Use flex for perfect alignment
//                       alignItems: "center", // FIXED: Center vertically
//                       justifyContent: "center", // FIXED: Center horizontally
//                       // Prevent text selection on mobile
//                       WebkitUserSelect: "none",
//                       userSelect: "none",
//                       // Improve touch targets
//                       minHeight: "44px",
//                       minWidth: "44px",
//                       // FIXED: Remove any default button styling that might affect alignment
//                       border: "none",
//                       outline: "none",
//                       lineHeight: "1", // FIXED: Consistent line height
//                     }}
//                   >
//                     <div
//                       className="form-check ps-0 m-0 category-list-box"
//                       style={{
//                         display: "flex", // FIXED: Flex for inner content
//                         alignItems: "center", // FIXED: Center align
//                         justifyContent: "center", // FIXED: Center align
//                         margin: "0", // FIXED: Remove any margins
//                         padding: "0", // FIXED: Remove any padding
//                       }}
//                     >
//                       <div
//                         className="form-check-label"
//                         style={{
//                           display: "flex", // FIXED: Flex for label
//                           alignItems: "center", // FIXED: Center align
//                           justifyContent: "center", // FIXED: Center align
//                           margin: "0", // FIXED: Remove margins
//                           padding: "0", // FIXED: Remove padding
//                           lineHeight: "1", // FIXED: Consistent line height
//                         }}
//                       >
//                         <span
//                           className="name"
//                           style={{
//                             display: "inline-block", // FIXED: Better text control
//                             verticalAlign: "middle", // FIXED: Vertical alignment
//                             lineHeight: "1.2", // FIXED: Optimal line height for readability
//                             fontWeight: "500", // FIXED: Consistent font weight
//                             textAlign: "center", // FIXED: Center text
//                           }}
//                         >
//                           {category.category}
//                         </span>
//                       </div>
//                     </div>
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CategoriesAccordion

"use client"

import { useEffect, useRef, useState } from "react"

const CategoriesAccordion = ({ filteredFoods, activeCategory, onCategoryClick }) => {
  const categoryListRef = useRef(null)
  const [isManualScroll, setIsManualScroll] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [safeAreaBottom, setSafeAreaBottom] = useState(0)

  // Detect iOS device and get safe area
  useEffect(() => {
    const iOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
    setIsIOS(iOS)

    // Get actual safe area bottom for iPhone 13 Pro Max
    if (iOS) {
      const computedStyle = getComputedStyle(document.documentElement)
      const safeArea =
        computedStyle.getPropertyValue("--safe-area-inset-bottom") ||
        computedStyle.getPropertyValue("env(safe-area-inset-bottom)") ||
        "0px"
      setSafeAreaBottom(Number.parseInt(safeArea) || 34) // iPhone 13 Pro Max default
    }
  }, [])

  const handleCategoryClick = (category) => {
    setIsManualScroll(true)
    if (onCategoryClick) {
      onCategoryClick(category)
    }
  }

  useEffect(() => {
    if (!isManualScroll && categoryListRef.current) {
      const activeIndex = filteredFoods.findIndex((category) => category.category === activeCategory)

      if (activeIndex !== -1) {
        const activeItem = categoryListRef.current.children[activeIndex]
        const activeItemLeft = activeItem.offsetLeft
        const containerWidth = categoryListRef.current.clientWidth
        const itemWidth = activeItem.clientWidth

        categoryListRef.current.scrollTo({
          left: activeItemLeft - containerWidth / 2 + itemWidth / 2,
          behavior: "smooth",
        })
      }
    }
  }, [activeCategory, filteredFoods, isManualScroll])

  useEffect(() => {
    if (isManualScroll) {
      const timer = setTimeout(() => setIsManualScroll(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [isManualScroll])

  return (
    <div
      className="accordion sidebar-accordion unique meatwala-category-sticky"
      id="accordionPanelsStayOpenExample"
      style={{
        position: "fixed",
        // FIXED: Proper bottom positioning for iPhone 13 Pro Max
        bottom: isIOS ? `${64 + safeAreaBottom}px` : "64px", // No gap - directly on footer
        left: "0",
        right: "0",
        // FIXED: Same z-index as footer to sit directly on top
        zIndex: 99999, // Same as footer
        backgroundColor: "#ffffff",
        borderTop: "1px solid #e5e7eb",
        boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
        // iOS optimizations
        transform: isIOS ? "translate3d(0, 0, 0)" : "none",
        WebkitTransform: isIOS ? "translate3d(0, 0, 0)" : "none",
        willChange: isIOS ? "transform" : "auto",
        isolation: "isolate",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        // FIXED: Ensure visibility on iPhone 13 Pro Max
        minHeight: "56px",
        maxHeight: "56px",
      }}
    >
      <div className="accordion-item">
        <div
          id="collapseOne"
          className="accordion-collapse collapse show"
          aria-labelledby="headingOne"
          data-bs-parent="#accordionPanelsStayOpenExample"
        >
          <div
            className="accordion-body"
            style={{
              backgroundColor: "#f8f9fa",
              padding: "0.5rem 1rem",
              position: "relative",
              zIndex: 1,
              height: "56px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ul
              className="category-list custom-padding custom-height scroll-bar meatwala-category-list"
              id="myDIV"
              style={{
                display: "flex",
                overflowX: "auto",
                whiteSpace: "nowrap",
                padding: "0",
                margin: "0",
                listStyle: "none",
                width: "100%",
                alignItems: "center",
                height: "100%",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
              }}
              ref={categoryListRef}
            >
              {filteredFoods.map((category, i) => (
                <li
                  key={i}
                  className="meatwala-category-item"
                  style={{
                    marginRight: "0.5rem",
                    flex: "0 0 auto",
                    padding: "0px",
                    borderRadius: "30px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <a
                    href={`#${category.category}`}
                    onClick={(e) => {
                      e.preventDefault()
                      handleCategoryClick(category.category)
                    }}
                    className={`${activeCategory === category.category ? "btn theme-btn" : "btn btn-outline"} meatwala-category-btn`}
                    style={{
                      backgroundColor: activeCategory === category.category ? "" : "rgba(232, 65, 53, 0.38)",
                      borderRadius: "100px",
                      fontSize: "0.875rem",
                      padding: "0.5rem 1rem",
                      whiteSpace: "nowrap",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      WebkitUserSelect: "none",
                      userSelect: "none",
                      minHeight: "40px",
                      minWidth: "44px",
                      border: "none",
                      outline: "none",
                      lineHeight: "1",
                    }}
                  >
                    <div
                      className="form-check ps-0 m-0 category-list-box"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0",
                        padding: "0",
                      }}
                    >
                      <div
                        className="form-check-label"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0",
                          padding: "0",
                          lineHeight: "1",
                        }}
                      >
                        <span
                          className="name"
                          style={{
                            display: "inline-block",
                            verticalAlign: "middle",
                            lineHeight: "1.2",
                            fontWeight: "500",
                            textAlign: "center",
                          }}
                        >
                          {category.category}
                        </span>
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoriesAccordion

