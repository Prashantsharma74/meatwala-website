// import React, { useEffect, useState } from "react";
// import { addToCart } from "../utils/api";
// import { getcart, incrementCount } from "../store/feature/cartSlice";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import Swal from "sweetalert2";
// import AddonPopup from "./AddonPopup";
// // import AddonPopup from "./AddonPopup";

// const Food = ({ onClose, food, restId, addToCart, open }) => {
//   const storedUser = JSON.parse(localStorage.getItem("user"));
//   const { count } = useSelector((store) => store.Cart);
//   const activeTab = useSelector((store) => store.User.activeTab);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [showPopup, setShowPopup] = useState(false);
//   const toggle = () => {
//     setShowPopup(!showPopup);
//   };

//   const handleIncrement = () => {
//     dispatch(incrementCount());
//   };
//   const handleClick = () => {
//     if (open) {
//       Swal.fire({
//         title: "Store Closed",
//         text: "Sorry, this store is currently closed. Try other open places.",
//         icon: "info",
//         confirmButtonText: "OK",
//         iconColor: "rgb(232, 65, 53)",
//         confirmButtonColor: "rgb(232, 65, 53)",
//       }).then((result) => {
//         if (result.isConfirmed) {
//           navigate("/shop");
//         }
//       });

//       return;
//     }

//     // Only executes when open === true
//     handleIncrement();
//     toggle();
//   };

//   return (
//     <>
//       <div id="item-3">
//         <div className="product-details-box">
//           <div className="product-img">
//             {food?.image != "PhotoNotAvailable.png" &&
//             food?.image != "PhotoNotSelected.png" ? (
//               <img
//                 className="img-fluid img"
//                 src={`https://partnermeatwala.com/documents/${food?.image}`}
//                 alt="rp1"
//               />
//             ) : (
//               <img />
//             )}
//           </div>
//           <div
//             className={
//               food?.image != "PhotoNotAvailable.png" &&
//               food?.image != "PhotoNotSelected.png"
//                 ? `product-content`
//                 : `product-content w-100`
//             }
//           >
//             <div className="description d-flex align-items-center justify-content-between gap-1">
//               <div>
//                 <div className="d-flex align-items-center gap-2">
//                   {/* {food?.nonveg === "1" ? (
//                     <img
//                       className="img"
//                       src="https://themes.pixelstrap.com/zomo-app/assets/images/svg/nonveg.svg"
//                       alt="non-veg"
//                     />
//                   ) : (
//                     <img
//                       className="img"
//                       src="https://themes.pixelstrap.com/zomo-app/assets/images/svg/veg.svg"
//                       alt="veg"
//                     />
//                   )} */}
//                   <h6 className="product-name">{food?.foodname}</h6>
//                 </div>

//                 {/* <div className="rating-section">
//                   <ul className="rating-star">
//                     <li>
//                       <i className="ri-star-fill star" />
//                     </li>
//                     <li>
//                       <i className="ri-star-fill star" />
//                     </li>
//                     <li>
//                       <i className="ri-star-fill star" />
//                     </li>
//                     <li>
//                       <i className="ri-star-fill star" />
//                     </li>
//                     <li>
//                       <i className="ri-star-fill star" />
//                     </li>
//                   </ul>
//                   <h6 className="rating-amount">1k+ Ratings</h6>
//                 </div> */}
//                 <p
//                   className="custom-description"
//                   dangerouslySetInnerHTML={{
//                     __html: food?.description,
//                   }}
//                 ></p>
//               </div>
//               <div className="product-box-price">
//                 {/* <h2 className="fw-semibold">£{(Number(food?.cost) || 0).toFixed(2)}</h2> */}
//                 <div>
//                   <button
//                     className="btn theme-outline add-btn mt-0"
//                     style={{ padding: "2px 10px" }}
//                     onClick={handleClick} // This ensures the correct function is triggered
//                   >
//                     +
//                   </button>
//                 </div>
//                 {/* padding: 14px;
//     padding-top: 5px;
//     padding-bottom: 5px;
//     font-size: 17px; */}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* customized modal starts */}
//       {showPopup && (
//         <AddonPopup
//           onClose={toggle}
//           food={food}
//           restId={restId}
//           addToCart={addToCart}
//         />
//       )}
//       {/* <div className="modal customized-modal" id="customized" tabIndex={-1}>
//       <div className="modal-dialog modal-dialog-centered">
//       <AddonPopup onClose={toggle} food={food} restId={restId} />
//       </div>
//     </div> */}
//       {/* customized modal end */}
//     </>
//   );
// };

// export default Food;





import { useEffect, useState, useCallback, useRef } from "react"
import { incrementCount } from "../store/feature/cartSlice"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"
import AddonPopup from "./AddonPopup"

// Global image loading manager for iPhone
class ImageLoadingManager {
  constructor() {
    this.loadingImages = new Set()
    this.maxConcurrent = 3 // Limit for iPhone
  }

  canLoadImage() {
    return this.loadingImages.size < this.maxConcurrent
  }

  startLoading(src) {
    this.loadingImages.add(src)
  }

  finishLoading(src) {
    this.loadingImages.delete(src)
  }

  pauseAllImages() {
    // Pause all currently loading images
    document.querySelectorAll('img[data-loading="true"]').forEach((img) => {
      img.style.display = "none"
    })
  }

  resumeAllImages() {
    // Resume all paused images
    document.querySelectorAll('img[data-loading="true"]').forEach((img) => {
      img.style.display = ""
    })
  }
}

const imageManager = new ImageLoadingManager()

const Food = ({ onClose, food, restId, addToCart, open }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"))
  const { count } = useSelector((store) => store.Cart)
  const activeTab = useSelector((store) => store.User.activeTab)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [showPopup, setShowPopup] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [shouldLoadImage, setShouldLoadImage] = useState(false)

  const imageRef = useRef(null)
  const intersectionObserverRef = useRef(null)

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!imageRef.current) return

    intersectionObserverRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && imageManager.canLoadImage()) {
            setShouldLoadImage(true)
            intersectionObserverRef.current?.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    intersectionObserverRef.current.observe(imageRef.current)

    return () => {
      intersectionObserverRef.current?.disconnect()
    }
  }, [])

  // Handle image loading with network management
  const handleImageLoad = useCallback(() => {
    const src = `https://partnermeatwala.com/documents/${food?.image}`
    imageManager.finishLoading(src)
    setImageLoaded(true)
  }, [food?.image])

  const handleImageError = useCallback(() => {
    const src = `https://partnermeatwala.com/documents/${food?.image}`
    imageManager.finishLoading(src)
    setImageError(true)
    setImageLoaded(true)
  }, [food?.image])

  // Start image loading when allowed
  useEffect(() => {
    if (
      shouldLoadImage &&
      food?.image &&
      food.image !== "PhotoNotAvailable.png" &&
      food.image !== "PhotoNotSelected.png"
    ) {
      const src = `https://partnermeatwala.com/documents/${food.image}`
      imageManager.startLoading(src)
    }
  }, [shouldLoadImage, food?.image])

  const toggle = useCallback(() => {
    setShowPopup(!showPopup)
  }, [showPopup])

  const handleIncrement = useCallback(() => {
    dispatch(incrementCount())
  }, [dispatch])

  // CRITICAL: Pause image loading when opening modal on iPhone
  const handleClick = useCallback(async () => {
    if (isButtonDisabled) return

    setIsButtonDisabled(true)

    try {
      // PAUSE ALL IMAGE LOADING ON IPHONE
      imageManager.pauseAllImages()

      // Cancel any pending image requests
      if (window.stop) {
        window.stop() // Stop all network requests
      }

      if (open) {
        await Swal.fire({
          title: "Store Closed",
          text: "Sorry, this store is Not Taking Orders. Try other open places.",
          icon: "info",
          confirmButtonText: "OK",
          iconColor: "rgb(232, 65, 53)",
          confirmButtonColor: "rgb(232, 65, 53)",
        })
        navigate("/shop")
        return
      }

      // Open modal immediately
      handleIncrement()
      toggle()
    } catch (error) {
      console.error("Error handling click:", error)
    } finally {
      setTimeout(() => {
        setIsButtonDisabled(false)
        // Resume image loading after modal data loads
        setTimeout(() => {
          imageManager.resumeAllImages()
        }, 2000)
      }, 500)
    }
  }, [open, navigate, handleIncrement, toggle, isButtonDisabled])

  const shouldShowImage = food?.image && food.image !== "PhotoNotAvailable.png" && food.image !== "PhotoNotSelected.png"

  return (
    <>
      <div id="item-3">
        <div className="product-details-box">
          <div className="product-img" ref={imageRef}>
            {shouldShowImage ? (
              shouldLoadImage ? (
                <img
                  className="img-fluid img"
                  src={food.image ? `https://partnermeatwala.com/documents/${food.image}` : '/favicon-192x192.png'}
                  alt="rp1"
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  data-loading="true"
                  style={{
                    opacity: imageLoaded ? 1 : 0.5,
                    transition: "opacity 0.3s ease",
                  }}
                />
              ) : (
               <img
                  className="img-fluid img"
                  src={'/favicon-192x192.png'}
                  alt="rp1"
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  data-loading="true"
                  style={{
                    opacity: imageLoaded ? 1 : 0.5,
                    transition: "opacity 0.3s ease",
                  }}
                />
              )
            ) : (
              <img />
            )}
          </div>
          <div className={shouldShowImage ? `product-content` : `product-content w-100`}>
            <div className="description d-flex align-items-center justify-content-between gap-1">
              <div>
                <div className="d-flex align-items-center gap-2">
                  <h6 className="product-name">{food?.foodname}</h6>
                </div>
                <p
                  className="custom-description"
                  dangerouslySetInnerHTML={{
                    __html: food?.description,
                  }}
                ></p>
              </div>
              <div className="product-box-price">
                <div>
                  <button
                    className={`btn theme-outline add-btn mt-0 ${isButtonDisabled ? "disabled" : ""}`}
                    style={{
                      padding: "2px 10px",
                      opacity: isButtonDisabled ? 0.6 : 1,
                      cursor: isButtonDisabled ? "not-allowed" : "pointer",
                    }}
                    onClick={handleClick}
                    disabled={isButtonDisabled}
                  >
                    {isButtonDisabled ? "..." : "+"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPopup && <AddonPopup onClose={toggle} food={food} restId={restId} addToCart={addToCart} />}
    </>
  )
}

export default Food



