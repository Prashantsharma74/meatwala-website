// "use client"

// import { useEffect, useState, useCallback, useRef } from "react"
// import { addToCart, chooseAdd } from "../utils/api"
// import { toast } from "react-toastify"
// import { useNavigate } from "react-router-dom"
// import { incrementCount } from "../store/feature/cartSlice"
// import { useDispatch, useSelector } from "react-redux"

// const AddonPopup = ({ onClose, food, restId }) => {
//   const storedUser = JSON.parse(localStorage.getItem("user"))
//   const activeTab = useSelector((store) => store.User.activeTab)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const modalRef = useRef(null)

//   // State management
//   const [addon, setAddon] = useState([])
//   const [selectedSize, setSelectedSize] = useState("")
//   const [selectedItem, setSelectedItem] = useState({})
//   const [selectedOptions, setSelectedOptions] = useState({})
//   const [totalCost, setTotalCost] = useState(0)
//   const [loading, setLoading] = useState(true)
//   const [isVisible, setIsVisible] = useState(false)

//   // Optimized fetch function
//   const fetchAddons = useCallback(async () => {
//     try {
//       const data = {
//         catid: food?.pkid,
//         isdelivery: "1",
//       }
//       const res = await chooseAdd(data)

//       if (res?.menutypes && res.menutypes.length > 0) {
//         // Use requestAnimationFrame to ensure smooth rendering
//         requestAnimationFrame(() => {
//           setAddon(res.menutypes)

//           const initialMenu = res.menutypes[0]
//           setSelectedSize(initialMenu.type)
//           setSelectedItem(initialMenu)

//           // Initialize selected options
//           const initialOptions = {}
//           initialMenu.menutypecategorys?.forEach((category) => {
//             if (category.menutypesubcategorys?.length > 0) {
//               initialOptions[category.menutypecategoryid] = category.menutypesubcategorys
//                 .filter((subcategory) => subcategory.isselected === "1")
//                 .map((subcategory) => subcategory.menutypesubcategoryid)
//             }
//           })
//           setSelectedOptions(initialOptions)
//           setLoading(false)
//         })
//       } else {
//         setLoading(false)
//       }
//     } catch (error) {
//       console.error("Error fetching addons:", error)
//       setLoading(false)
//     }
//   }, [food?.pkid])

//   // Show modal with animation
//   useEffect(() => {
//     // Trigger animation after component mounts
//     requestAnimationFrame(() => {
//       setIsVisible(true)
//     })

//     // Fetch data
//     fetchAddons()

//     // Prevent body scroll on iOS
//     document.body.style.overflow = "hidden"
//     document.body.style.position = "fixed"
//     document.body.style.width = "100%"

//     return () => {
//       document.body.style.overflow = ""
//       document.body.style.position = ""
//       document.body.style.width = ""
//     }
//   }, [fetchAddons])

//   // Calculate total cost
//   useEffect(() => {
//     if (!selectedItem || !selectedItem.cost) return

//     let total = Number.parseFloat(selectedItem.cost) || 0

//     Object.entries(selectedOptions).forEach(([categoryId, selectedIds]) => {
//       selectedItem.menutypecategorys?.forEach((category) => {
//         if (category.menutypecategoryid === categoryId) {
//           category.menutypesubcategorys?.forEach((subcategory) => {
//             if (selectedIds.includes(subcategory.menutypesubcategoryid)) {
//               total += Number.parseFloat(subcategory.cost) || 0
//             }
//           })
//         }
//       })
//     })

//     setTotalCost(total)
//   }, [selectedOptions, selectedItem])

//   // Handle size change
//   const handleSizeChange = (size) => {
//     const selectedMenu = addon.find((menu) => menu.type === size)
//     if (!selectedMenu) return

//     setSelectedSize(size)
//     setSelectedItem(selectedMenu)

//     const newOptions = {}
//     selectedMenu.menutypecategorys?.forEach((category) => {
//       if (category.menutypesubcategorys?.length > 0) {
//         newOptions[category.menutypecategoryid] = category.menutypesubcategorys
//           .filter((sub) => sub.isselected === "1")
//           .map((sub) => sub.menutypesubcategoryid)
//       }
//     })
//     setSelectedOptions(newOptions)
//   }

//   // Handle option change
//   const handleOptionChange = (categoryId, subCategoryId) => {
//     setSelectedOptions((prevOptions) => {
//       const currentSelections = prevOptions[categoryId] || []
//       const category = selectedItem?.menutypecategorys?.find((cat) => cat.menutypecategoryid === categoryId)

//       if (!category) return prevOptions

//       const isMultipleAllowed = category.ismultiple === "1"
//       const maxSelections = Number.parseInt(category.multiple, 10) || 0

//       let updatedSelections

//       if (!isMultipleAllowed || maxSelections === 1) {
//         updatedSelections = currentSelections.includes(subCategoryId) ? [] : [subCategoryId]
//       } else {
//         if (currentSelections.includes(subCategoryId)) {
//           updatedSelections = currentSelections.filter((id) => id !== subCategoryId)
//         } else {
//           updatedSelections =
//             maxSelections === 0 || currentSelections.length < maxSelections
//               ? [...currentSelections, subCategoryId]
//               : currentSelections
//         }
//       }

//       return {
//         ...prevOptions,
//         [categoryId]: updatedSelections,
//       }
//     })
//   }

//   // Check if proceed button should be disabled
//   const isProceedDisabled = () => {
//     if (loading || !selectedItem) return true

//     const requiredCategories = selectedItem.menutypecategorys?.filter((category) => category.isrequired === "1")
//     if (!requiredCategories?.length) return false

//     return requiredCategories.some((category) => {
//       const selections = selectedOptions[category.menutypecategoryid]
//       return !selections || selections.length === 0
//     })
//   }

//   // Handle close with animation
//   const handleClose = () => {
//     setIsVisible(false)
//     setTimeout(() => {
//       onClose()
//     }, 200) // Wait for animation to complete
//   }

//   // Handle add to cart
//   const handleClick = async () => {
//     if (!storedUser) {
//       navigate("/login")
//       return
//     }

//     try {
//       const allSelectedValues = Object.values(selectedOptions).flat()

//       const sendData = {
//         userid: storedUser?.userid,
//         restId: restId,
//         type: activeTab === "Delivery" ? "delivery" : "takeaway",
//         catid: food.catid,
//         foodid: food.pkid,
//         typeid: selectedItem?.menutypeid || "",
//         extratopupid: allSelectedValues,
//         quantity: "1",
//         cartid: "",
//         cartdetailid: "",
//       }

//       const data = await addToCart(sendData)

//       if (data.status === "1") {
//         toast.success("Item added to cart!")
//         dispatch(incrementCount())
//       }
//     } catch (error) {
//       console.error("Error adding to cart:", error)
//       toast.error("Something went wrong")
//     } finally {
//       handleClose()
//     }
//   }

//   return (
//     <div
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         backgroundColor: `rgba(0, 0, 0, ${isVisible ? 0.5 : 0})`,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         padding: "10px",
//         zIndex: 1050,
//         transition: "background-color 0.2s ease",
//         WebkitBackfaceVisibility: "hidden",
//         backfaceVisibility: "hidden",
//       }}
//       onClick={(e) => {
//         if (e.target === e.currentTarget) handleClose()
//       }}
//     >
//       <div
//         ref={modalRef}
//         style={{
//           width: "340px",
//           maxHeight: "90vh",
//           backgroundColor: "white",
//           borderRadius: "12px",
//           boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
//           overflow: "hidden",
//           transform: `scale(${isVisible ? 1 : 0.9}) translateY(${isVisible ? 0 : "20px"})`,
//           opacity: isVisible ? 1 : 0,
//           transition: "all 0.2s ease",
//           WebkitTransform: `scale(${isVisible ? 1 : 0.9}) translateY(${isVisible ? 0 : "20px"})`,
//           WebkitTransition: "all 0.2s ease",
//           willChange: "transform, opacity",
//         }}
//       >
//         {/* Header */}
//         <div
//           style={{
//             padding: "16px 20px",
//             backgroundColor: "#f8f9fa",
//             borderBottom: "1px solid #dee2e6",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <h5 style={{ margin: 0, fontWeight: "bold", fontSize: "16px" }}>
//             Custom Order Total: £{totalCost.toFixed(2)}
//           </h5>
//           <button
//             onClick={handleClose}
//             style={{
//               background: "none",
//               border: "none",
//               fontSize: "24px",
//               cursor: "pointer",
//               padding: "0",
//               width: "24px",
//               height: "24px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//             aria-label="Close"
//           >
//             ×
//           </button>
//         </div>

//         {/* Body */}
//         <div
//           style={{
//             padding: "20px",
//             maxHeight: "calc(90vh - 140px)",
//             overflowY: "auto",
//             WebkitOverflowScrolling: "touch",
//           }}
//         >
//           {loading ? (
//             <div style={{ textAlign: "center", padding: "40px 0" }}>
//               <div
//                 style={{
//                   width: "40px",
//                   height: "40px",
//                   border: "3px solid #f3f3f3",
//                   borderTop: "3px solid rgb(232, 65, 53)",
//                   borderRadius: "50%",
//                   animation: "spin 1s linear infinite",
//                   margin: "0 auto 16px",
//                 }}
//               />
//               <p style={{ margin: 0, color: "#666" }}>Loading...</p>
//             </div>
//           ) : (
//             <>
//               <h5 style={{ marginBottom: "16px", fontWeight: "600" }}>Select Your Order</h5>

//               {/* Size Selection */}
//               {addon.length > 0 && (
//                 <div style={{ paddingBottom: "16px", borderBottom: "1px solid #dee2e6", marginBottom: "16px" }}>
//                   {addon.map((menu) => {
//                     const isSelected = selectedSize === menu.type
//                     return (
//                       <div
//                         key={menu.menutypeid}
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "space-between",
//                           padding: "8px",
//                           borderRadius: "6px",
//                           backgroundColor: isSelected ? "#f8f9fa" : "transparent",
//                           marginBottom: "4px",
//                         }}
//                       >
//                         <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//                           <input
//                             type="radio"
//                             name="size-selection"
//                             checked={isSelected}
//                             onChange={() => handleSizeChange(menu.type)}
//                             id={`size-${menu.menutypeid}`}
//                             style={{
//                               margin: 0,
//                               accentColor: "rgb(232, 65, 53)", // Custom red color
//                               width: "18px",
//                               height: "18px",
//                             }}
//                           />
//                           <label
//                             htmlFor={`size-${menu.menutypeid}`}
//                             style={{
//                               margin: 0,
//                               cursor: "pointer",
//                               fontWeight: isSelected ? "bold" : "normal",
//                               color: isSelected ? "rgb(232, 65, 53)" : "inherit",
//                             }}
//                           >
//                             {menu.type}
//                           </label>
//                         </div>
//                         <span style={{ fontWeight: "500" }}>£{menu.cost}</span>
//                       </div>
//                     )
//                   })}
//                 </div>
//               )}

//               {/* Category Selections */}
//               {selectedItem?.menutypecategorys?.map((category) => (
//                 <div key={category.menutypecategoryid} style={{ marginBottom: "20px" }}>
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "center",
//                       marginBottom: "8px",
//                     }}
//                   >
//                     <h6 style={{ margin: 0, fontWeight: "600" }}>{category.name}</h6>
//                     {category?.isrequired === "1" && (
//                       <span style={{ fontSize: "12px", color: "rgb(232, 65, 53)" }}>(1) Required</span>
//                     )}
//                   </div>
//                   <div>
//                     {category?.menutypesubcategorys?.map((subcategory) => (
//                       <div
//                         key={subcategory.menutypesubcategoryid}
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "space-between",
//                           padding: "8px 0",
//                           borderBottom: "1px solid #f0f0f0",
//                         }}
//                       >
//                         <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1 }}>
//                           <input
//                             type="checkbox"
//                             id={`subcategory-${subcategory.menutypesubcategoryid}`}
//                             checked={
//                               selectedOptions[category.menutypecategoryid]?.includes(
//                                 subcategory.menutypesubcategoryid,
//                               ) || false
//                             }
//                             onChange={() =>
//                               handleOptionChange(category.menutypecategoryid, subcategory.menutypesubcategoryid)
//                             }
//                             style={{
//                               margin: 0,
//                               accentColor: "rgb(232, 65, 53)", // Custom red color
//                               width: "18px",
//                               height: "18px",
//                             }}
//                           />
//                           <label
//                             htmlFor={`subcategory-${subcategory.menutypesubcategoryid}`}
//                             style={{ margin: 0, cursor: "pointer", flex: 1 }}
//                           >
//                             {subcategory.name}
//                           </label>
//                         </div>
//                         {Number.parseFloat(subcategory.cost) > 0 && (
//                           <span style={{ color: "#666", fontSize: "14px" }}>£{subcategory.cost}</span>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </>
//           )}
//         </div>

//         {/* Footer */}
//         <div style={{ padding: "16px 20px", borderTop: "1px solid #dee2e6" }}>
//           <button
//             onClick={handleClick}
//             disabled={isProceedDisabled()}
//             style={{
//               width: "100%",
//               padding: "12px",
//               backgroundColor: isProceedDisabled() ? "#ccc" : "rgb(232, 65, 53)",
//               color: "white",
//               border: "none",
//               borderRadius: "8px",
//               fontSize: "16px",
//               fontWeight: "bold",
//               cursor: isProceedDisabled() ? "not-allowed" : "pointer",
//               transition: "background-color 0.2s ease",
//             }}
//           >
//             + Add to Order
//           </button>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//       `}</style>
//     </div>
//   )
// }

// export default AddonPopup



// "use client"

// import { useEffect, useState, useCallback, useRef, useMemo } from "react"
// import { addToCart, chooseAdd } from "../utils/api"
// import { toast } from "react-toastify"
// import { useNavigate } from "react-router-dom"
// import { incrementCount } from "../store/feature/cartSlice"
// import { useDispatch, useSelector } from "react-redux"

// const AddonPopup = ({ onClose, food, restId }) => {
//   const storedUser = JSON.parse(localStorage.getItem("user"))
//   const activeTab = useSelector((store) => store.User.activeTab)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const modalRef = useRef(null)

//   // Optimized state management
//   const [addon, setAddon] = useState([])
//   const [selectedSize, setSelectedSize] = useState("")
//   const [selectedItem, setSelectedItem] = useState({})
//   const [selectedOptions, setSelectedOptions] = useState({})
//   const [loading, setLoading] = useState(true)
//   const [isVisible, setIsVisible] = useState(false)

//   // Memoized total cost calculation
//   const totalCost = useMemo(() => {
//     if (!selectedItem || !selectedItem.cost) return 0

//     let total = Number.parseFloat(selectedItem.cost) || 0

//     Object.entries(selectedOptions).forEach(([categoryId, selectedIds]) => {
//       selectedItem.menutypecategorys?.forEach((category) => {
//         if (category.menutypecategoryid === categoryId) {
//           category.menutypesubcategorys?.forEach((subcategory) => {
//             if (selectedIds.includes(subcategory.menutypesubcategoryid)) {
//               total += Number.parseFloat(subcategory.cost) || 0
//             }
//           })
//         }
//       })
//     })

//     return total
//   }, [selectedOptions, selectedItem])

//   // Optimized fetch function with error handling
//   const fetchAddons = useCallback(async () => {
//     if (!food?.pkid) {
//       setLoading(false)
//       return
//     }

//     try {
//       const data = {
//         catid: food.pkid,
//         isdelivery: "1",
//       }

//       const res = await chooseAdd(data)

//       if (res?.menutypes && res.menutypes.length > 0) {
//         const initialMenu = res.menutypes[0]

//         // Batch state updates
//         const initialOptions = {}
//         initialMenu.menutypecategorys?.forEach((category) => {
//           if (category.menutypesubcategorys?.length > 0) {
//             initialOptions[category.menutypecategoryid] = category.menutypesubcategorys
//               .filter((subcategory) => subcategory.isselected === "1")
//               .map((subcategory) => subcategory.menutypesubcategoryid)
//           }
//         })

//         // Use a single state update to prevent multiple re-renders
//         setAddon(res.menutypes)
//         setSelectedSize(initialMenu.type)
//         setSelectedItem(initialMenu)
//         setSelectedOptions(initialOptions)
//       }
//     } catch (error) {
//       console.error("Error fetching addons:", error)
//       toast.error("Failed to load options")
//     } finally {
//       setLoading(false)
//     }
//   }, [food?.pkid])

//   // Optimized modal show/hide
//   useEffect(() => {
//     // Use setTimeout instead of requestAnimationFrame for better mobile performance
//     const timer = setTimeout(() => {
//       setIsVisible(true)
//     }, 10)

//     // Optimized body scroll prevention for iOS
//     const originalStyle = {
//       overflow: document.body.style.overflow,
//       position: document.body.style.position,
//       width: document.body.style.width,
//       height: document.body.style.height,
//     }

//     document.body.style.overflow = "hidden"
//     document.body.style.position = "fixed"
//     document.body.style.width = "100%"
//     document.body.style.height = "100%"

//     fetchAddons()

//     return () => {
//       clearTimeout(timer)
//       // Restore original styles
//       Object.assign(document.body.style, originalStyle)
//     }
//   }, [fetchAddons])

//   // Memoized size change handler
//   const handleSizeChange = useCallback(
//     (size) => {
//       const selectedMenu = addon.find((menu) => menu.type === size)
//       if (!selectedMenu) return

//       const newOptions = {}
//       selectedMenu.menutypecategorys?.forEach((category) => {
//         if (category.menutypesubcategorys?.length > 0) {
//           newOptions[category.menutypecategoryid] = category.menutypesubcategorys
//             .filter((sub) => sub.isselected === "1")
//             .map((sub) => sub.menutypesubcategoryid)
//         }
//       })

//       // Batch state updates
//       setSelectedSize(size)
//       setSelectedItem(selectedMenu)
//       setSelectedOptions(newOptions)
//     },
//     [addon],
//   )

//   // Optimized option change handler
//   const handleOptionChange = useCallback(
//     (categoryId, subCategoryId) => {
//       setSelectedOptions((prevOptions) => {
//         const currentSelections = prevOptions[categoryId] || []
//         const category = selectedItem?.menutypecategorys?.find((cat) => cat.menutypecategoryid === categoryId)

//         if (!category) return prevOptions

//         const isMultipleAllowed = category.ismultiple === "1"
//         const maxSelections = Number.parseInt(category.multiple, 10) || 0

//         let updatedSelections

//         if (!isMultipleAllowed || maxSelections === 1) {
//           updatedSelections = currentSelections.includes(subCategoryId) ? [] : [subCategoryId]
//         } else {
//           if (currentSelections.includes(subCategoryId)) {
//             updatedSelections = currentSelections.filter((id) => id !== subCategoryId)
//           } else {
//             updatedSelections =
//               maxSelections === 0 || currentSelections.length < maxSelections
//                 ? [...currentSelections, subCategoryId]
//                 : currentSelections
//           }
//         }

//         return {
//           ...prevOptions,
//           [categoryId]: updatedSelections,
//         }
//       })
//     },
//     [selectedItem],
//   )

//   // Memoized proceed button state
//   const isProceedDisabled = useMemo(() => {
//     if (loading || !selectedItem) return true

//     const requiredCategories = selectedItem.menutypecategorys?.filter((category) => category.isrequired === "1")
//     if (!requiredCategories?.length) return false

//     return requiredCategories.some((category) => {
//       const selections = selectedOptions[category.menutypecategoryid]
//       return !selections || selections.length === 0
//     })
//   }, [loading, selectedItem, selectedOptions])

//   // Optimized close handler
//   const handleClose = useCallback(() => {
//     setIsVisible(false)
//     setTimeout(onClose, 150) // Reduced timeout for faster closing
//   }, [onClose])

//   // Optimized add to cart handler
//   const handleClick = useCallback(async () => {
//     if (!storedUser) {
//       navigate("/login")
//       return
//     }

//     try {
//       const allSelectedValues = Object.values(selectedOptions).flat()

//       const sendData = {
//         userid: storedUser?.userid,
//         restId: restId,
//         type: activeTab === "Delivery" ? "delivery" : "takeaway",
//         catid: food.catid,
//         foodid: food.pkid,
//         typeid: selectedItem?.menutypeid || "",
//         extratopupid: allSelectedValues,
//         quantity: "1",
//         cartid: "",
//         cartdetailid: "",
//       }

//       const data = await addToCart(sendData)

//       if (data.status === "1") {
//         toast.success("Item added to cart!")
//         dispatch(incrementCount())
//       }
//     } catch (error) {
//       console.error("Error adding to cart:", error)
//       toast.error("Something went wrong")
//     } finally {
//       handleClose()
//     }
//   }, [storedUser, navigate, selectedOptions, restId, activeTab, food, selectedItem, dispatch, handleClose])

//   // Optimized styles object to prevent recreation
//   const modalStyles = useMemo(
//     () => ({
//       overlay: {
//         position: "fixed",
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         backgroundColor: `rgba(0, 0, 0, ${isVisible ? 0.5 : 0})`,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         padding: "10px",
//         zIndex: 1050,
//         transition: "background-color 0.15s ease",
//         WebkitBackfaceVisibility: "hidden",
//         backfaceVisibility: "hidden",
//       },
//       modal: {
//         width: "340px",
//         maxHeight: "90vh",
//         backgroundColor: "white",
//         borderRadius: "12px",
//         boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
//         overflow: "hidden",
//         transform: `scale(${isVisible ? 1 : 0.95}) translateY(${isVisible ? 0 : "10px"})`,
//         opacity: isVisible ? 1 : 0,
//         transition: "all 0.15s ease",
//         WebkitTransform: `scale(${isVisible ? 1 : 0.95}) translateY(${isVisible ? 0 : "10px"})`,
//         WebkitTransition: "all 0.15s ease",
//         willChange: "transform, opacity",
//       },
//       scrollArea: {
//         padding: "20px",
//         maxHeight: "calc(90vh - 140px)",
//         overflowY: "auto",
//         WebkitOverflowScrolling: "touch",
//         // Optimize scrolling for iOS
//         scrollBehavior: "smooth",
//       },
//     }),
//     [isVisible],
//   )

//   return (
//     <div
//       style={modalStyles.overlay}
//       onClick={(e) => {
//         if (e.target === e.currentTarget) handleClose()
//       }}
//     >
//       <div ref={modalRef} style={modalStyles.modal}>
//         {/* Header */}
//         <div
//           style={{
//             padding: "16px 20px",
//             backgroundColor: "#f8f9fa",
//             borderBottom: "1px solid #dee2e6",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <h5 style={{ margin: 0, fontWeight: "bold", fontSize: "16px" }}>
//             Custom Order Total: £{totalCost.toFixed(2)}
//           </h5>
//           <button
//             onClick={handleClose}
//             style={{
//               background: "none",
//               border: "none",
//               fontSize: "24px",
//               cursor: "pointer",
//               padding: "0",
//               width: "24px",
//               height: "24px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//             aria-label="Close"
//           >
//             ×
//           </button>
//         </div>

//         {/* Body */}
//         <div style={modalStyles.scrollArea}>
//           {loading ? (
//             <div style={{ textAlign: "center", padding: "40px 0" }}>
//               <div
//                 style={{
//                   width: "40px",
//                   height: "40px",
//                   border: "3px solid #f3f3f3",
//                   borderTop: "3px solid rgb(232, 65, 53)",
//                   borderRadius: "50%",
//                   animation: "spin 1s linear infinite",
//                   margin: "0 auto 16px",
//                 }}
//               />
//               <p style={{ margin: 0, color: "#666" }}>Loading...</p>
//             </div>
//           ) : (
//             <>
//               <h5 style={{ marginBottom: "16px", fontWeight: "600" }}>Select Your Order</h5>

//               {/* Size Selection */}
//               {addon.length > 0 && (
//                 <div style={{ paddingBottom: "16px", borderBottom: "1px solid #dee2e6", marginBottom: "16px" }}>
//                   {addon.map((menu) => {
//                     const isSelected = selectedSize === menu.type
//                     return (
//                       <div
//                         key={menu.menutypeid}
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "space-between",
//                           padding: "8px",
//                           borderRadius: "6px",
//                           backgroundColor: isSelected ? "#f8f9fa" : "transparent",
//                           marginBottom: "4px",
//                         }}
//                       >
//                         <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//                           <input
//                             type="radio"
//                             name="size-selection"
//                             checked={isSelected}
//                             onChange={() => handleSizeChange(menu.type)}
//                             id={`size-${menu.menutypeid}`}
//                             style={{
//                               margin: 0,
//                               accentColor: "rgb(232, 65, 53)",
//                               width: "18px",
//                               height: "18px",
//                             }}
//                           />
//                           <label
//                             htmlFor={`size-${menu.menutypeid}`}
//                             style={{
//                               margin: 0,
//                               cursor: "pointer",
//                               fontWeight: isSelected ? "bold" : "normal",
//                               color: isSelected ? "rgb(232, 65, 53)" : "inherit",
//                             }}
//                           >
//                             {menu.type}
//                           </label>
//                         </div>
//                         <span style={{ fontWeight: "500" }}>£{menu.cost}</span>
//                       </div>
//                     )
//                   })}
//                 </div>
//               )}

//               {/* Category Selections */}
//               {selectedItem?.menutypecategorys?.map((category) => (
//                 <div key={category.menutypecategoryid} style={{ marginBottom: "20px" }}>
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "center",
//                       marginBottom: "8px",
//                     }}
//                   >
//                     <h6 style={{ margin: 0, fontWeight: "600" }}>{category.name}</h6>
//                     {category?.isrequired === "1" && (
//                       <span style={{ fontSize: "12px", color: "rgb(232, 65, 53)" }}>(1) Required</span>
//                     )}
//                   </div>
//                   <div>
//                     {category?.menutypesubcategorys?.map((subcategory) => (
//                       <div
//                         key={subcategory.menutypesubcategoryid}
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "space-between",
//                           padding: "8px 0",
//                           borderBottom: "1px solid #f0f0f0",
//                         }}
//                       >
//                         <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1 }}>
//                           <input
//                             type="checkbox"
//                             id={`subcategory-${subcategory.menutypesubcategoryid}`}
//                             checked={
//                               selectedOptions[category.menutypecategoryid]?.includes(
//                                 subcategory.menutypesubcategoryid,
//                               ) || false
//                             }
//                             onChange={() =>
//                               handleOptionChange(category.menutypecategoryid, subcategory.menutypesubcategoryid)
//                             }
//                             style={{
//                               margin: 0,
//                               accentColor: "rgb(232, 65, 53)",
//                               width: "18px",
//                               height: "18px",
//                             }}
//                           />
//                           <label
//                             htmlFor={`subcategory-${subcategory.menutypesubcategoryid}`}
//                             style={{ margin: 0, cursor: "pointer", flex: 1 }}
//                           >
//                             {subcategory.name}
//                           </label>
//                         </div>
//                         {Number.parseFloat(subcategory.cost) > 0 && (
//                           <span style={{ color: "#666", fontSize: "14px" }}>£{subcategory.cost}</span>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </>
//           )}
//         </div>

//         {/* Footer */}
//         <div style={{ padding: "16px 20px", borderTop: "1px solid #dee2e6" }}>
//           <button
//             onClick={handleClick}
//             disabled={isProceedDisabled}
//             style={{
//               width: "100%",
//               padding: "12px",
//               backgroundColor: isProceedDisabled ? "#ccc" : "rgb(232, 65, 53)",
//               color: "white",
//               border: "none",
//               borderRadius: "8px",
//               fontSize: "16px",
//               fontWeight: "bold",
//               cursor: isProceedDisabled ? "not-allowed" : "pointer",
//               transition: "background-color 0.2s ease",
//             }}
//           >
//             + Add to Order
//           </button>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//       `}</style>
//     </div>
//   )
// }

// export default AddonPopup


"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { addToCart, chooseAdd } from "../utils/api"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { incrementCount } from "../store/feature/cartSlice"
import { useDispatch, useSelector } from "react-redux"

const AddonPopup = ({ onClose, food, restId }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"))
  const activeTab = useSelector((store) => store.User.activeTab)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const modalRef = useRef(null)

  const [addon, setAddon] = useState([])
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedItem, setSelectedItem] = useState({})
  const [selectedOptions, setSelectedOptions] = useState({})
  const [totalCost, setTotalCost] = useState(0)
  const [loading, setLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  // FORCE IMMEDIATE API CALL WITH NETWORK PRIORITY
  useEffect(() => {
    const fetchWithHighPriority = async () => {
      if (!food?.pkid) {
        setLoading(false)
        return
      }

      try {
        console.log("🚀 STARTING HIGH PRIORITY API CALL")

        // Create high priority fetch request
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 8000)

        const data = {
          catid: food.pkid,
          isdelivery: "1",
        }

        // Use fetch with high priority if supported
        const fetchOptions = {
          signal: controller.signal,
          priority: "high", // Modern browsers
          cache: "no-cache", // Force fresh request
        }

        let res
        try {
          // Try to use high priority fetch
          res = await chooseAdd(data, fetchOptions)
        } catch (error) {
          // Fallback to regular fetch
          console.log("Fallback to regular fetch")
          res = await chooseAdd(data)
        }

        clearTimeout(timeoutId)

        console.log("✅ API RESPONSE:", res)

        if (res?.menutypes && res.menutypes.length > 0) {
          const initialMenu = res.menutypes[0]

          const initialOptions = {}
          initialMenu.menutypecategorys?.forEach((category) => {
            if (category.menutypesubcategorys?.length > 0) {
              initialOptions[category.menutypecategoryid] = category.menutypesubcategorys
                .filter((subcategory) => subcategory.isselected === "1")
                .map((subcategory) => subcategory.menutypesubcategoryid)
            }
          })

          // IMMEDIATE state updates
          setAddon(res.menutypes)
          setSelectedSize(initialMenu.type)
          setSelectedItem(initialMenu)
          setSelectedOptions(initialOptions)

          // Calculate cost immediately
          let cost = Number.parseFloat(initialMenu.cost) || 0
          Object.entries(initialOptions).forEach(([categoryId, selectedIds]) => {
            initialMenu.menutypecategorys?.forEach((category) => {
              if (category.menutypecategoryid === categoryId) {
                category.menutypesubcategorys?.forEach((subcategory) => {
                  if (selectedIds.includes(subcategory.menutypesubcategoryid)) {
                    cost += Number.parseFloat(subcategory.cost) || 0
                  }
                })
              }
            })
          })
          setTotalCost(cost)

          console.log("✅ DATA LOADED SUCCESSFULLY")
        }
      } catch (error) {
        console.error("❌ API ERROR:", error)
        toast.error("Failed to load options")
      } finally {
        setLoading(false)
      }
    }

    // Execute immediately
    fetchWithHighPriority()
  }, [food?.pkid])

  // Show modal immediately
  useEffect(() => {
    setIsVisible(true)

    // Prevent body scroll
    const originalOverflow = document.body.style.overflow
    const originalPosition = document.body.style.position
    const originalWidth = document.body.style.width

    document.body.style.overflow = "hidden"
    document.body.style.position = "fixed"
    document.body.style.width = "100%"

    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.position = originalPosition
      document.body.style.width = originalWidth
    }
  }, [])

  // Update total cost when selections change
  useEffect(() => {
    if (!selectedItem || !selectedItem.cost) return

    let total = Number.parseFloat(selectedItem.cost) || 0

    Object.entries(selectedOptions).forEach(([categoryId, selectedIds]) => {
      selectedItem.menutypecategorys?.forEach((category) => {
        if (category.menutypecategoryid === categoryId) {
          category.menutypesubcategorys?.forEach((subcategory) => {
            if (selectedIds.includes(subcategory.menutypesubcategoryid)) {
              total += Number.parseFloat(subcategory.cost) || 0
            }
          })
        }
      })
    })

    setTotalCost(total)
  }, [selectedOptions, selectedItem])

  const handleSizeChange = useCallback(
    (size) => {
      const selectedMenu = addon.find((menu) => menu.type === size)
      if (!selectedMenu) return

      setSelectedSize(size)
      setSelectedItem(selectedMenu)

      const newOptions = {}
      selectedMenu.menutypecategorys?.forEach((category) => {
        if (category.menutypesubcategorys?.length > 0) {
          newOptions[category.menutypecategoryid] = category.menutypesubcategorys
            .filter((sub) => sub.isselected === "1")
            .map((sub) => sub.menutypesubcategoryid)
        }
      })
      setSelectedOptions(newOptions)
    },
    [addon],
  )

  const handleOptionChange = useCallback(
    (categoryId, subCategoryId) => {
      setSelectedOptions((prevOptions) => {
        const currentSelections = prevOptions[categoryId] || []
        const category = selectedItem?.menutypecategorys?.find((cat) => cat.menutypecategoryid === categoryId)

        if (!category) return prevOptions

        const isMultipleAllowed = category.ismultiple === "1"
        const maxSelections = Number.parseInt(category.multiple, 10) || 0

        let updatedSelections

        if (!isMultipleAllowed || maxSelections === 1) {
          updatedSelections = currentSelections.includes(subCategoryId) ? [] : [subCategoryId]
        } else {
          if (currentSelections.includes(subCategoryId)) {
            updatedSelections = currentSelections.filter((id) => id !== subCategoryId)
          } else {
            updatedSelections =
              maxSelections === 0 || currentSelections.length < maxSelections
                ? [...currentSelections, subCategoryId]
                : currentSelections
          }
        }

        return {
          ...prevOptions,
          [categoryId]: updatedSelections,
        }
      })
    },
    [selectedItem],
  )

  const isProceedDisabled = () => {
    if (loading || !selectedItem) return true

    const requiredCategories = selectedItem.menutypecategorys?.filter((category) => category.isrequired === "1")
    if (!requiredCategories?.length) return false

    return requiredCategories.some((category) => {
      const selections = selectedOptions[category.menutypecategoryid]
      return !selections || selections.length === 0
    })
  }

  const handleClose = useCallback(() => {
    setIsVisible(false)
    setTimeout(() => {
      onClose()
    }, 150)
  }, [onClose])

  const handleClick = useCallback(async () => {
    if (!storedUser) {
      navigate("/login")
      return
    }

    try {
      const allSelectedValues = Object.values(selectedOptions).flat()

      const sendData = {
        userid: storedUser?.userid,
        restId: restId,
        type: activeTab === "Delivery" ? "delivery" : "takeaway",
        catid: food.catid,
        foodid: food.pkid,
        typeid: selectedItem?.menutypeid || "",
        extratopupid: allSelectedValues,
        quantity: "1",
        cartid: "",
        cartdetailid: "",
      }

      const data = await addToCart(sendData)

      if (data.status === "1") {
        toast.success("Item added to cart!")
        dispatch(incrementCount())
      }
    } catch (error) {
      console.error("Error adding to cart:", error)
      toast.error("Something went wrong")
    } finally {
      handleClose()
    }
  }, [storedUser, navigate, selectedOptions, restId, activeTab, food, selectedItem, dispatch, handleClose])

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: `rgba(0, 0, 0, ${isVisible ? 0.5 : 0})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px",
        zIndex: 1050,
        transition: "background-color 0.15s ease",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose()
      }}
    >
      <div
        ref={modalRef}
        style={{
          width: "340px",
          maxHeight: "90vh",
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
          overflow: "hidden",
          transform: `scale(${isVisible ? 1 : 0.95}) translateY(${isVisible ? 0 : "10px"})`,
          opacity: isVisible ? 1 : 0,
          transition: "all 0.15s ease",
          willChange: "transform, opacity",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "16px 20px",
            backgroundColor: "#f8f9fa",
            borderBottom: "1px solid #dee2e6",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h5 style={{ margin: 0, fontWeight: "bold", fontSize: "16px" }}>
            Custom Order Total: £{totalCost.toFixed(2)}
          </h5>
          <button
            onClick={handleClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              padding: "0",
              width: "24px",
              height: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div
          style={{
            padding: "20px",
            maxHeight: "calc(70vh - 140px)",
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {loading ? (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  border: "3px solid #f3f3f3",
                  borderTop: "3px solid rgb(232, 65, 53)",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  margin: "0 auto 12px",
                }}
              />
              <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>Loading options...</p>
            </div>
          ) : (
            <>
              <h5 style={{ marginBottom: "16px", fontWeight: "600" }}>Select Your Order</h5>

              {/* Size Selection */}
              {addon.length > 0 && (
                <div style={{ paddingBottom: "16px", borderBottom: "1px solid #dee2e6", marginBottom: "16px" }}>
                  {addon.map((menu) => {
                    const isSelected = selectedSize === menu.type
                    return (
                      <div
                        key={menu.menutypeid}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "8px",
                          borderRadius: "6px",
                          backgroundColor: isSelected ? "#f8f9fa" : "transparent",
                          marginBottom: "4px",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <input
                            type="radio"
                            name="size-selection"
                            checked={isSelected}
                            onChange={() => handleSizeChange(menu.type)}
                            id={`size-${menu.menutypeid}`}
                            style={{
                              margin: 0,
                              accentColor: "rgb(232, 65, 53)",
                              width: "18px",
                              height: "18px",
                            }}
                          />
                          <label
                            htmlFor={`size-${menu.menutypeid}`}
                            style={{
                              margin: 0,
                              cursor: "pointer",
                              fontWeight: isSelected ? "bold" : "normal",
                              color: isSelected ? "rgb(232, 65, 53)" : "inherit",
                            }}
                          >
                            {menu.type}
                          </label>
                        </div>
                        <span style={{ fontWeight: "500" }}>£{menu.cost}</span>
                      </div>
                    )
                  })}
                </div>
              )}

              {/* Category Selections */}
              {selectedItem?.menutypecategorys?.map((category) => (
                <div key={category.menutypecategoryid} style={{ marginBottom: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "8px",
                    }}
                  >
                    <h6 style={{ margin: 0, fontWeight: "600" }}>{category.name}</h6>
                    {category?.isrequired === "1" && (
                      <span style={{ fontSize: "12px", color: "rgb(232, 65, 53)" }}>(1) Required</span>
                    )}
                  </div>
                  <div>
                    {category?.menutypesubcategorys?.map((subcategory) => (
                      <div
                        key={subcategory.menutypesubcategoryid}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "8px 0",
                          borderBottom: "1px solid #f0f0f0",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1 }}>
                          <input
                            type="checkbox"
                            id={`subcategory-${subcategory.menutypesubcategoryid}`}
                            checked={
                              selectedOptions[category.menutypecategoryid]?.includes(
                                subcategory.menutypesubcategoryid,
                              ) || false
                            }
                            onChange={() =>
                              handleOptionChange(category.menutypecategoryid, subcategory.menutypesubcategoryid)
                            }
                            style={{
                              margin: 0,
                              accentColor: "rgb(232, 65, 53)",
                              width: "18px",
                              height: "18px",
                            }}
                          />
                          <label
                            htmlFor={`subcategory-${subcategory.menutypesubcategoryid}`}
                            style={{ margin: 0, cursor: "pointer", flex: 1 }}
                          >
                            {subcategory.name}
                          </label>
                        </div>
                        {Number.parseFloat(subcategory.cost) > 0 && (
                          <span style={{ color: "#666", fontSize: "14px" }}>£{subcategory.cost}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: "16px 20px", borderTop: "1px solid #dee2e6" }}>
          <button
            onClick={handleClick}
            disabled={isProceedDisabled()}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: isProceedDisabled() ? "#ccc" : "rgb(232, 65, 53)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: isProceedDisabled() ? "not-allowed" : "pointer",
              transition: "background-color 0.2s ease",
            }}
          >
            + Add to Order
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default AddonPopup





