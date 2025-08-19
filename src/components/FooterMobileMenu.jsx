// "use client"

// import { useState, useEffect } from "react"
// import { Link } from "react-router-dom"
// import { useDispatch, useSelector } from "react-redux"
// import { getcart } from "../store/feature/cartSlice"
// import img from "../assets/Basket.png"
// import img1 from "../assets/image.png"

// const FooterMobileMenu = ({ selected }) => {
//   const [cartLength, setCartLength] = useState(0)
//   const { cartItems } = useSelector((store) => store.Cart)

//   const dispatch = useDispatch()

//   useEffect(() => {
//     dispatch(getcart())
//   }, [dispatch])

//   useEffect(() => {
//     if (cartItems?.cartmasters) {
//       const length = cartItems.cartmasters.reduce((acc, cart) => acc + (cart.foods?.length || 0), 0)
//       setCartLength(length)
//     }
//   }, [cartItems])

//   return (
//     <>
//       {/* Your existing mobile menu with stability fixes */}
//       <div
//         className="mobile-menu d-md-none d-block mobile-cart"
//         style={{
//           position: "fixed",
//           bottom: 0,
//           left: 0,
//           right: 0,
//           zIndex: 9999,
//           backgroundColor: "white",
//           borderTop: "1px solid #e5e7eb",
//           transform: "translateZ(0)",
//           WebkitTransform: "translateZ(0)",
//           paddingBottom: "env(safe-area-inset-bottom)",
//         }}
//       >
//         <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", height: "64px" }}>
//           <li className={selected === "home" ? `active` : ""} style={{ flex: 1 }}>
//             <Link
//               to={"/"}
//               className="menu-box"
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 height: "100%",
//                 textDecoration: "none",
//                 minHeight: "44px",
//                 color: selected === "home" ? "#2563eb" : "#6b7280",
//               }}
//             >
//               <i className="ri-home-4-line" style={{ fontSize: "20px", marginBottom: "4px" }} />
//               <span style={{ fontSize: "12px", fontWeight: "500" }}>Home</span>
//             </Link>
//           </li>

//           <li className={selected === "Dining" ? "active mobile-category" : "mobile-category"} style={{ flex: 1 }}>
//             <Link
//               to="/cart"
//               className="menu-box"
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 height: "100%",
//                 textDecoration: "none",
//                 minHeight: "44px",
//                 color: selected === "Dining" ? "#2563eb" : "#6b7280",
//               }}
//             >
//               <div style={{ position: "relative", display: "inline-block", marginBottom: "4px" }}>
//                 <img
//                   src={img || "/placeholder.svg"}
//                   alt="Basket"
//                   style={{ width: "24px", height: "24px", objectFit: "contain" }}
//                 />
//                 {cartLength > 0 && (
//                   <span
//                     style={{
//                       position: "absolute",
//                       top: "-8px",
//                       right: "-8px",
//                       backgroundColor: "#ef4444",
//                       color: "white",
//                       borderRadius: "50%",
//                       padding: "2px 6px",
//                       fontSize: "10px",
//                       minWidth: "18px",
//                       height: "18px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontWeight: "bold",
//                       lineHeight: 1,
//                     }}
//                   >
//                     {cartLength > 99 ? "99+" : cartLength}
//                   </span>
//                 )}
//               </div>
//               <span style={{ fontSize: "12px", fontWeight: "500" }}>Basket</span>
//             </Link>
//           </li>

//           <li className={selected === "History" ? `active` : ""} style={{ flex: 1 }}>
//             <Link
//               to="/myhistory"
//               className="menu-box"
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 height: "100%",
//                 textDecoration: "none",
//                 minHeight: "44px",
//                 color: selected === "History" ? "#2563eb" : "#6b7280",
//               }}
//             >
//               <img
//                 src={img1 || "/placeholder.svg"}
//                 alt="Order History"
//                 style={{ width: "24px", height: "24px", objectFit: "contain", marginBottom: "4px" }}
//               />
//               <span style={{ fontSize: "12px", fontWeight: "500" }}>Order</span>
//             </Link>
//           </li>

//           <li className={selected === "setting" ? `active` : ""} style={{ flex: 1 }}>
//             <Link
//               to={"/setting"}
//               className="menu-box"
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 height: "100%",
//                 textDecoration: "none",
//                 minHeight: "44px",
//                 color: selected === "setting" ? "#2563eb" : "#6b7280",
//               }}
//             >
//               <i className="fa fa-user mb-2 pt-1" style={{ fontSize: "20px", marginBottom: "4px" }} />
//               <span style={{ fontSize: "12px", fontWeight: "500" }}>Account</span>
//             </Link>
//           </li>
//         </ul>
//       </div>

//       {/* Spacer to prevent content from being hidden behind fixed footer */}
//       <div className="d-md-none d-block" style={{ height: "64px" }} />
//     </>
//   )
// }

// export default FooterMobileMenu



"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getcart } from "../store/feature/cartSlice"
import img from "../assets/Basket.png"
import img1 from "../assets/image.png"

const FooterMobileMenu = ({ selected }) => {
  const [cartLength, setCartLength] = useState(0)
  const [isIOS, setIsIOS] = useState(false)
  const { cartItems } = useSelector((store) => store.Cart)

  const dispatch = useDispatch()

  // Detect iOS device
  useEffect(() => {
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    setIsIOS(iOS)
  }, [])

  useEffect(() => {
    dispatch(getcart())
  }, [dispatch])

  useEffect(() => {
    if (cartItems?.cartmasters) {
      const length = cartItems.cartmasters.reduce((acc, cart) => acc + (cart.foods?.length || 0), 0)
      setCartLength(length)
    }
  }, [cartItems])

  // Only hide main site footer when this component mounts (mobile only)
  useEffect(() => {
    const isMobile = window.innerWidth <= 767
    if (!isMobile) return

    // Find and hide main site footers only
    const mainFooters = document.querySelectorAll('footer:not(.mobile-menu), .site-footer, .main-footer, .page-footer')
    const originalDisplays = []

    mainFooters.forEach((footer, index) => {
      originalDisplays[index] = footer.style.display
      footer.style.display = 'none'
    })

    // Cleanup function to restore original display
    return () => {
      mainFooters.forEach((footer, index) => {
        footer.style.display = originalDisplays[index] || ''
      })
    }
  }, [])

  return (
    <>
      {/* Mobile footer with component-specific fixes */}
      <div
        className="mobile-menu d-md-none d-block mobile-cart"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          // High z-index but not maximum to avoid conflicts
          zIndex: 99999,
          backgroundColor: "white",
          borderTop: "1px solid #e5e7eb",
          // Create isolated stacking context for this component only
          isolation: "isolate",
          // iOS specific fixes
          ...(isIOS ? {
            paddingBottom: "env(safe-area-inset-bottom)",
            transform: "translate3d(0, 0, 0)",
            WebkitTransform: "translate3d(0, 0, 0)",
            willChange: "transform",
            WebkitWillChange: "transform",
          } : {
            paddingBottom: "0px",
          }),
          // Visual separation
          boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
          // Ensure solid background
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <ul 
          style={{ 
            margin: 0, 
            padding: 0, 
            listStyle: "none", 
            display: "flex", 
            height: "64px",
            backgroundColor: "white",
            position: "relative",
            zIndex: 1,
          }}
        >
          <li className={selected === "home" ? `active` : ""} style={{ flex: 1 }}>
            <Link
              to={"/"}
              className="menu-box"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                textDecoration: "none",
                minHeight: "44px",
                color: selected === "home" ? "#2563eb" : "#6b7280",
                backgroundColor: "white",
              }}
            >
              <i className="ri-home-4-line" style={{ fontSize: "20px", marginBottom: "4px" }} />
              <span style={{ fontSize: "12px", fontWeight: "500" }}>Home</span>
            </Link>
          </li>

          <li className={selected === "Dining" ? "active mobile-category" : "mobile-category"} style={{ flex: 1 }}>
            <Link
              to="/cart"
              className="menu-box"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                textDecoration: "none",
                minHeight: "44px",
                color: selected === "Dining" ? "#2563eb" : "#6b7280",
                backgroundColor: "white",
              }}
            >
              <div style={{ position: "relative", display: "inline-block", marginBottom: "4px" }}>
                <img
                  src={img || "/placeholder.svg"}
                  alt="Basket"
                  style={{ width: "24px", height: "24px", objectFit: "contain" }}
                />
                {cartLength > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "-8px",
                      backgroundColor: "#ef4444",
                      color: "white",
                      borderRadius: "50%",
                      padding: "2px 6px",
                      fontSize: "10px",
                      minWidth: "18px",
                      height: "18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      lineHeight: 1,
                      zIndex: 2,
                    }}
                  >
                    {cartLength > 99 ? "99+" : cartLength}
                  </span>
                )}
              </div>
              <span style={{ fontSize: "12px", fontWeight: "500" }}>Basket</span>
            </Link>
          </li>

          <li className={selected === "History" ? `active` : ""} style={{ flex: 1 }}>
            <Link
              to="/myhistory"
              className="menu-box"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                textDecoration: "none",
                minHeight: "44px",
                color: selected === "History" ? "#2563eb" : "#6b7280",
                backgroundColor: "white",
              }}
            >
              <img
                src={img1 || "/placeholder.svg"}
                alt="Order History"
                style={{ width: "24px", height: "24px", objectFit: "contain", marginBottom: "4px" }}
              />
              <span style={{ fontSize: "12px", fontWeight: "500" }}>Order</span>
            </Link>
          </li>

          <li className={selected === "setting" ? `active` : ""} style={{ flex: 1 }}>
            <Link
              to={"/setting"}
              className="menu-box"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                textDecoration: "none",
                minHeight: "44px",
                color: selected === "setting" ? "#2563eb" : "#6b7280",
                backgroundColor: "white",
              }}
            >
              <i className="fa fa-user mb-2 pt-1" style={{ fontSize: "20px", marginBottom: "4px" }} />
              <span style={{ fontSize: "12px", fontWeight: "500" }}>Account</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Spacer with proper height */}
      <div 
        className="d-md-none d-block" 
        style={{ 
          height: isIOS ? "calc(64px + env(safe-area-inset-bottom))" : "64px",
          minHeight: "64px",
        }} 
      />
    </>
  )
}

export default FooterMobileMenu


// "use client"

// import { useState, useEffect } from "react"
// import { Link } from "react-router-dom"
// import { useDispatch, useSelector } from "react-redux"
// import { getcart } from "../store/feature/cartSlice"
// import img from "../assets/Basket.png"
// import img1 from "../assets/image.png"

// const FooterMobileMenu = ({ selected }) => {
//   const [cartLength, setCartLength] = useState(0)
//   const [isIOS, setIsIOS] = useState(false)
//   const [safeAreaBottom, setSafeAreaBottom] = useState(0)
//   const { cartItems } = useSelector((store) => store.Cart)

//   const dispatch = useDispatch()

//   // Enhanced iOS detection and safe area calculation
//   useEffect(() => {
//     const iOS =
//       /iPad|iPhone|iPod/.test(navigator.userAgent) ||
//       (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
//     setIsIOS(iOS)

//     if (iOS) {
//       // Get actual safe area for iPhone 13 Pro Max
//       const computedStyle = getComputedStyle(document.documentElement)
//       const safeArea =
//         computedStyle.getPropertyValue("--safe-area-inset-bottom") ||
//         computedStyle.getPropertyValue("env(safe-area-inset-bottom)") ||
//         "0px"
//       const safeAreaValue = Number.parseInt(safeArea) || 34 // iPhone 13 Pro Max default
//       setSafeAreaBottom(safeAreaValue)

//       // Set CSS custom property for other components to use
//       document.documentElement.style.setProperty("--mobile-footer-height", `${64 + safeAreaValue}px`)
//     } else {
//       document.documentElement.style.setProperty("--mobile-footer-height", "64px")
//     }
//   }, [])

//   useEffect(() => {
//     dispatch(getcart())
//   }, [dispatch])

//   useEffect(() => {
//     if (cartItems?.cartmasters) {
//       const length = cartItems.cartmasters.reduce((acc, cart) => acc + (cart.foods?.length || 0), 0)
//       setCartLength(length)
//     }
//   }, [cartItems])

//   // Hide main site footer on mobile only
//   useEffect(() => {
//     const isMobile = window.innerWidth <= 767
//     if (!isMobile) return

//     const mainFooters = document.querySelectorAll("footer:not(.mobile-menu), .site-footer, .main-footer, .page-footer")
//     const originalDisplays = []

//     // mainFooters.forEach((footer, index) => {
//     //   originalDisplays[index] = footer.style.display
//     //   footer.style.display = "none"
//     // })

//     return () => {
//       mainFooters.forEach((footer, index) => {
//         footer.style.display = originalDisplays[index] || ""
//       })
//     }
//   }, [])

//   return (
//     <>
//       {/* FIXED: Mobile footer with proper z-index and positioning */}
//       <div
//         className="mobile-menu d-md-none d-block mobile-cart"
//         style={{
//           position: "fixed",
//           bottom: 0,
//           left: 0,
//           right: 0,
//           // FIXED: Highest z-index to stay on top
//           zIndex: 99999,
//           backgroundColor: "white",
//           borderTop: "1px solid #e5e7eb",
//           isolation: "isolate",
//           // FIXED: Proper safe area handling for iPhone 13 Pro Max
//           paddingBottom: isIOS ? `${safeAreaBottom}px` : "0px",
//           height: isIOS ? `${64 + safeAreaBottom}px` : "64px",
//           // iOS performance optimizations
//           ...(isIOS
//             ? {
//                 transform: "translate3d(0, 0, 0)",
//                 WebkitTransform: "translate3d(0, 0, 0)",
//                 willChange: "transform",
//                 WebkitWillChange: "transform",
//               }
//             : {}),
//           boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
//           backdropFilter: "blur(10px)",
//           WebkitBackdropFilter: "blur(10px)",
//         }}
//       >
//         <ul
//           style={{
//             margin: 0,
//             padding: 0,
//             listStyle: "none",
//             display: "flex",
//             height: "64px", // Fixed content height
//             backgroundColor: "white",
//             position: "relative",
//             zIndex: 1,
//             alignItems: "center",
//           }}
//         >
//           <li className={selected === "home" ? `active` : ""} style={{ flex: 1 }}>
//             <Link
//               to={"/"}
//               className="menu-box"
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 height: "100%",
//                 textDecoration: "none",
//                 minHeight: "44px",
//                 color: selected === "home" ? "#2563eb" : "#6b7280",
//                 backgroundColor: "white",
//                 padding: "8px",
//               }}
//             >
//               <i className="ri-home-4-line" style={{ fontSize: "20px", marginBottom: "4px" }} />
//               <span style={{ fontSize: "12px", fontWeight: "500" }}>Home</span>
//             </Link>
//           </li>

//           <li className={selected === "Dining" ? "active mobile-category" : "mobile-category"} style={{ flex: 1 }}>
//             <Link
//               to="/cart"
//               className="menu-box"
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 height: "100%",
//                 textDecoration: "none",
//                 minHeight: "44px",
//                 color: selected === "Dining" ? "#2563eb" : "#6b7280",
//                 backgroundColor: "white",
//                 padding: "8px",
//               }}
//             >
//               <div style={{ position: "relative", display: "inline-block", marginBottom: "4px" }}>
//                 <img
//                   src={img || "/placeholder.svg"}
//                   alt="Basket"
//                   style={{ width: "24px", height: "24px", objectFit: "contain" }}
//                 />
//                 {cartLength > 0 && (
//                   <span
//                     style={{
//                       position: "absolute",
//                       top: "-8px",
//                       right: "-8px",
//                       backgroundColor: "#ef4444",
//                       color: "white",
//                       borderRadius: "50%",
//                       padding: "2px 6px",
//                       fontSize: "10px",
//                       minWidth: "18px",
//                       height: "18px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontWeight: "bold",
//                       lineHeight: 1,
//                       zIndex: 2,
//                     }}
//                   >
//                     {cartLength > 99 ? "99+" : cartLength}
//                   </span>
//                 )}
//               </div>
//               <span style={{ fontSize: "12px", fontWeight: "500" }}>Basket</span>
//             </Link>
//           </li>

//           <li className={selected === "History" ? `active` : ""} style={{ flex: 1 }}>
//             <Link
//               to="/myhistory"
//               className="menu-box"
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 height: "100%",
//                 textDecoration: "none",
//                 minHeight: "44px",
//                 color: selected === "History" ? "#2563eb" : "#6b7280",
//                 backgroundColor: "white",
//                 padding: "8px",
//               }}
//             >
//               <img
//                 src={img1 || "/placeholder.svg"}
//                 alt="Order History"
//                 style={{ width: "24px", height: "24px", objectFit: "contain", marginBottom: "4px" }}
//               />
//               <span style={{ fontSize: "12px", fontWeight: "500" }}>Order</span>
//             </Link>
//           </li>

//           <li className={selected === "setting" ? `active` : ""} style={{ flex: 1 }}>
//             <Link
//               to={"/setting"}
//               className="menu-box"
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 height: "100%",
//                 textDecoration: "none",
//                 minHeight: "44px",
//                 color: selected === "setting" ? "#2563eb" : "#6b7280",
//                 backgroundColor: "white",
//                 padding: "8px",
//               }}
//             >
//               <i className="fa fa-user mb-2 pt-1" style={{ fontSize: "20px", marginBottom: "4px" }} />
//               <span style={{ fontSize: "12px", fontWeight: "500" }}>Account</span>
//             </Link>
//           </li>
//         </ul>
//       </div>

//       {/* FIXED: Proper spacer with iPhone 13 Pro Max safe area */}
//       {/* <div
//         className="d-md-none d-block"
//         style={{
//           height: isIOS ? `${64 + safeAreaBottom}px` : "64px",
//           minHeight: "64px",
//           backgroundColor: "transparent",
//         }}
//       /> */}
//     </>
//   )
// }

// export default FooterMobileMenu
