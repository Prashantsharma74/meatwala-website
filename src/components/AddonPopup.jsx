// // // // // // // "use client"

// // // // // // // import { useEffect, useState, useCallback, useRef } from "react"
// // // // // // // import { addToCart, chooseAdd } from "../utils/api"
// // // // // // // import { toast } from "react-toastify"
// // // // // // // import { useNavigate } from "react-router-dom"
// // // // // // // import { incrementCount } from "../store/feature/cartSlice"
// // // // // // // import { useDispatch, useSelector } from "react-redux"

// // // // // // // const AddonPopup = ({ onClose, food, restId }) => {
// // // // // // //   const storedUser = JSON.parse(localStorage.getItem("user"))
// // // // // // //   const activeTab = useSelector((store) => store.User.activeTab)
// // // // // // //   const dispatch = useDispatch()
// // // // // // //   const navigate = useNavigate()
// // // // // // //   const modalRef = useRef(null)

// // // // // // //   const [addon, setAddon] = useState([])
// // // // // // //   const [selectedSize, setSelectedSize] = useState("")
// // // // // // //   const [selectedItem, setSelectedItem] = useState({})
// // // // // // //   const [selectedOptions, setSelectedOptions] = useState({})
// // // // // // //   const [totalCost, setTotalCost] = useState(0)
// // // // // // //   const [loading, setLoading] = useState(true)
// // // // // // //   const [isVisible, setIsVisible] = useState(false)

// // // // // // //   useEffect(() => {
// // // // // // //     const fetchWithHighPriority = async () => {
// // // // // // //       if (!food?.pkid) {
// // // // // // //         setLoading(false)
// // // // // // //         return
// // // // // // //       }

// // // // // // //       try {
// // // // // // //         console.log("🚀 STARTING HIGH PRIORITY API CALL")

// // // // // // //         const controller = new AbortController()
// // // // // // //         const timeoutId = setTimeout(() => controller.abort(), 8000)

// // // // // // //         const data = {
// // // // // // //           catid: food.pkid,
// // // // // // //           isdelivery: "1",
// // // // // // //         }

// // // // // // //         // Use fetch with high priority if supported
// // // // // // //         const fetchOptions = {
// // // // // // //           signal: controller.signal,
// // // // // // //           priority: "high", // Modern browsers
// // // // // // //           cache: "no-cache", // Force fresh request
// // // // // // //         }

// // // // // // //         let res
// // // // // // //         try {
// // // // // // //           // Try to use high priority fetch
// // // // // // //           res = await chooseAdd(data, fetchOptions)
// // // // // // //         } catch (error) {
// // // // // // //           // Fallback to regular fetch
// // // // // // //           console.log("Fallback to regular fetch")
// // // // // // //           res = await chooseAdd(data)
// // // // // // //         }

// // // // // // //         clearTimeout(timeoutId)

// // // // // // //         console.log("✅ API RESPONSE:", res)

// // // // // // //         if (res?.menutypes && res.menutypes.length > 0) {
// // // // // // //           const initialMenu = res.menutypes[0]

// // // // // // //           const initialOptions = {}
// // // // // // //           initialMenu.menutypecategorys?.forEach((category) => {
// // // // // // //             if (category.menutypesubcategorys?.length > 0) {
// // // // // // //               initialOptions[category.menutypecategoryid] = category.menutypesubcategorys
// // // // // // //                 .filter((subcategory) => subcategory.isselected === "1")
// // // // // // //                 .map((subcategory) => subcategory.menutypesubcategoryid)
// // // // // // //             }
// // // // // // //           })

// // // // // // //           // IMMEDIATE state updates
// // // // // // //           setAddon(res.menutypes)
// // // // // // //           setSelectedSize(initialMenu.type)
// // // // // // //           setSelectedItem(initialMenu)
// // // // // // //           setSelectedOptions(initialOptions)

// // // // // // //           // Calculate cost immediately
// // // // // // //           let cost = Number.parseFloat(initialMenu.cost) || 0
// // // // // // //           Object.entries(initialOptions).forEach(([categoryId, selectedIds]) => {
// // // // // // //             initialMenu.menutypecategorys?.forEach((category) => {
// // // // // // //               if (category.menutypecategoryid === categoryId) {
// // // // // // //                 category.menutypesubcategorys?.forEach((subcategory) => {
// // // // // // //                   if (selectedIds.includes(subcategory.menutypesubcategoryid)) {
// // // // // // //                     cost += Number.parseFloat(subcategory.cost) || 0
// // // // // // //                   }
// // // // // // //                 })
// // // // // // //               }
// // // // // // //             })
// // // // // // //           })
// // // // // // //           setTotalCost(cost)

// // // // // // //           console.log("✅ DATA LOADED SUCCESSFULLY")
// // // // // // //         }
// // // // // // //       } catch (error) {
// // // // // // //         console.error("❌ API ERROR:", error)
// // // // // // //         toast.error("Failed to load options")
// // // // // // //       } finally {
// // // // // // //         setLoading(false)
// // // // // // //       }
// // // // // // //     }

// // // // // // //     // Execute immediately
// // // // // // //     fetchWithHighPriority()
// // // // // // //   }, [food?.pkid])

// // // // // // //   // Show modal immediately
// // // // // // //   // useEffect(() => {
// // // // // // //   //   setIsVisible(true)

// // // // // // //   //   // Prevent body scroll
// // // // // // //   //   const originalOverflow = document.body.style.overflow
// // // // // // //   //   const originalPosition = document.body.style.position
// // // // // // //   //   const originalWidth = document.body.style.width

// // // // // // //   //   document.body.style.overflow = "hidden"
// // // // // // //   //   document.body.style.position = "fixed"
// // // // // // //   //   document.body.style.width = "100%"

// // // // // // //   //   return () => {
// // // // // // //   //     document.body.style.overflow = originalOverflow
// // // // // // //   //     document.body.style.position = originalPosition
// // // // // // //   //     document.body.style.width = originalWidth
// // // // // // //   //   }
// // // // // // //   // }, [])

// // // // // // //   useEffect(() => {
// // // // // // //   setIsVisible(true)

// // // // // // //   // ✅ Store current scroll position
// // // // // // //   const scrollY = window.scrollY
// // // // // // //   const body = document.body

// // // // // // //   // ✅ Only hide overflow, don't change position
// // // // // // //   body.style.overflow = 'hidden'
// // // // // // //   body.style.position = 'relative' // Keep relative positioning
// // // // // // //   body.style.top = `-${scrollY}px` // Compensate for hidden scroll

// // // // // // //   return () => {
// // // // // // //     // ✅ Restore styles and scroll position
// // // // // // //     body.style.overflow = ''
// // // // // // //     body.style.position = ''
// // // // // // //     body.style.top = ''

// // // // // // //     // ✅ Restore scroll position
// // // // // // //     window.scrollTo(0, scrollY)
// // // // // // //   }
// // // // // // // }, [])

// // // // // // //   // Update total cost when selections change
// // // // // // //   useEffect(() => {
// // // // // // //     if (!selectedItem || !selectedItem.cost) return

// // // // // // //     let total = Number.parseFloat(selectedItem.cost) || 0

// // // // // // //     Object.entries(selectedOptions).forEach(([categoryId, selectedIds]) => {
// // // // // // //       selectedItem.menutypecategorys?.forEach((category) => {
// // // // // // //         if (category.menutypecategoryid === categoryId) {
// // // // // // //           category.menutypesubcategorys?.forEach((subcategory) => {
// // // // // // //             if (selectedIds.includes(subcategory.menutypesubcategoryid)) {
// // // // // // //               total += Number.parseFloat(subcategory.cost) || 0
// // // // // // //             }
// // // // // // //           })
// // // // // // //         }
// // // // // // //       })
// // // // // // //     })

// // // // // // //     setTotalCost(total)
// // // // // // //   }, [selectedOptions, selectedItem])

// // // // // // //   const handleSizeChange = useCallback(
// // // // // // //     (size) => {
// // // // // // //       const selectedMenu = addon.find((menu) => menu.type === size)
// // // // // // //       if (!selectedMenu) return

// // // // // // //       setSelectedSize(size)
// // // // // // //       setSelectedItem(selectedMenu)

// // // // // // //       const newOptions = {}
// // // // // // //       selectedMenu.menutypecategorys?.forEach((category) => {
// // // // // // //         if (category.menutypesubcategorys?.length > 0) {
// // // // // // //           newOptions[category.menutypecategoryid] = category.menutypesubcategorys
// // // // // // //             .filter((sub) => sub.isselected === "1")
// // // // // // //             .map((sub) => sub.menutypesubcategoryid)
// // // // // // //         }
// // // // // // //       })
// // // // // // //       setSelectedOptions(newOptions)
// // // // // // //     },
// // // // // // //     [addon],
// // // // // // //   )

// // // // // // //   const handleOptionChange = useCallback(
// // // // // // //     (categoryId, subCategoryId) => {
// // // // // // //       setSelectedOptions((prevOptions) => {
// // // // // // //         const currentSelections = prevOptions[categoryId] || []
// // // // // // //         const category = selectedItem?.menutypecategorys?.find((cat) => cat.menutypecategoryid === categoryId)

// // // // // // //         if (!category) return prevOptions

// // // // // // //         const isMultipleAllowed = category.ismultiple === "1"
// // // // // // //         const maxSelections = Number.parseInt(category.multiple, 10) || 0

// // // // // // //         let updatedSelections

// // // // // // //         if (!isMultipleAllowed || maxSelections === 1) {
// // // // // // //           updatedSelections = currentSelections.includes(subCategoryId) ? [] : [subCategoryId]
// // // // // // //         } else {
// // // // // // //           if (currentSelections.includes(subCategoryId)) {
// // // // // // //             updatedSelections = currentSelections.filter((id) => id !== subCategoryId)
// // // // // // //           } else {
// // // // // // //             updatedSelections =
// // // // // // //               maxSelections === 0 || currentSelections.length < maxSelections
// // // // // // //                 ? [...currentSelections, subCategoryId]
// // // // // // //                 : currentSelections
// // // // // // //           }
// // // // // // //         }

// // // // // // //         return {
// // // // // // //           ...prevOptions,
// // // // // // //           [categoryId]: updatedSelections,
// // // // // // //         }
// // // // // // //       })
// // // // // // //     },
// // // // // // //     [selectedItem],
// // // // // // //   )

// // // // // // //   const isProceedDisabled = () => {
// // // // // // //     if (loading || !selectedItem) return true

// // // // // // //     const requiredCategories = selectedItem.menutypecategorys?.filter((category) => category.isrequired === "1")
// // // // // // //     if (!requiredCategories?.length) return false

// // // // // // //     return requiredCategories.some((category) => {
// // // // // // //       const selections = selectedOptions[category.menutypecategoryid]
// // // // // // //       return !selections || selections.length === 0
// // // // // // //     })
// // // // // // //   }

// // // // // // //   const handleClose = useCallback(() => {
// // // // // // //     setIsVisible(false)
// // // // // // //     setTimeout(() => {
// // // // // // //       onClose()
// // // // // // //     }, 150)
// // // // // // //   }, [onClose])

// // // // // // //   const handleClick = useCallback(async () => {
// // // // // // //     if (!storedUser) {
// // // // // // //       navigate("/login")
// // // // // // //       return
// // // // // // //     }

// // // // // // //     try {
// // // // // // //       const allSelectedValues = Object.values(selectedOptions).flat()

// // // // // // //       const sendData = {
// // // // // // //         userid: storedUser?.userid,
// // // // // // //         restId: restId,
// // // // // // //         type: activeTab === "Delivery" ? "delivery" : "takeaway",
// // // // // // //         catid: food.catid,
// // // // // // //         foodid: food.pkid,
// // // // // // //         typeid: selectedItem?.menutypeid || "",
// // // // // // //         extratopupid: allSelectedValues,
// // // // // // //         quantity: "1",
// // // // // // //         cartid: "",
// // // // // // //         cartdetailid: "",
// // // // // // //       }

// // // // // // //       const data = await addToCart(sendData)

// // // // // // //       if (data.status === "1") {
// // // // // // //         toast.success("Item added to cart!")
// // // // // // //         dispatch(incrementCount())
// // // // // // //       }
// // // // // // //     } catch (error) {
// // // // // // //       console.error("Error adding to cart:", error)
// // // // // // //       toast.error("Something went wrong")
// // // // // // //     } finally {
// // // // // // //       handleClose()
// // // // // // //     }
// // // // // // //   }, [storedUser, navigate, selectedOptions, restId, activeTab, food, selectedItem, dispatch, handleClose])

// // // // // // //   return (
// // // // // // //     <div
// // // // // // //       style={{
// // // // // // //         position: "fixed",
// // // // // // //         top: 0,
// // // // // // //         left: 0,
// // // // // // //         right: 0,
// // // // // // //         bottom: 0,
// // // // // // //         backgroundColor: `rgba(0, 0, 0, ${isVisible ? 0.5 : 0})`,
// // // // // // //         display: "flex",
// // // // // // //         alignItems: "center",
// // // // // // //         justifyContent: "center",
// // // // // // //         padding: "10px",
// // // // // // //         zIndex: 1050,
// // // // // // //         transition: "background-color 0.15s ease",
// // // // // // //       }}
// // // // // // //       onClick={(e) => {
// // // // // // //         if (e.target === e.currentTarget) handleClose()
// // // // // // //       }}
// // // // // // //     >
// // // // // // //       <div
// // // // // // //         ref={modalRef}
// // // // // // //         style={{
// // // // // // //           width: "340px",
// // // // // // //           maxHeight: "90vh",
// // // // // // //           backgroundColor: "white",
// // // // // // //           borderRadius: "12px",
// // // // // // //           boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
// // // // // // //           overflow: "hidden",
// // // // // // //           transform: `scale(${isVisible ? 1 : 0.95}) translateY(${isVisible ? 0 : "10px"})`,
// // // // // // //           opacity: isVisible ? 1 : 0,
// // // // // // //           transition: "all 0.15s ease",
// // // // // // //           willChange: "transform, opacity",
// // // // // // //         }}
// // // // // // //       >
// // // // // // //         {/* Header */}
// // // // // // //         <div
// // // // // // //           style={{
// // // // // // //             padding: "16px 20px",
// // // // // // //             backgroundColor: "#f8f9fa",
// // // // // // //             borderBottom: "1px solid #dee2e6",
// // // // // // //             display: "flex",
// // // // // // //             justifyContent: "space-between",
// // // // // // //             alignItems: "center",
// // // // // // //           }}
// // // // // // //         >
// // // // // // //           <h5 style={{ margin: 0, fontWeight: "bold", fontSize: "16px" }}>
// // // // // // //             Custom Order Total: £{totalCost.toFixed(2)}
// // // // // // //           </h5>
// // // // // // //           <button
// // // // // // //             onClick={handleClose}
// // // // // // //             style={{
// // // // // // //               background: "none",
// // // // // // //               border: "none",
// // // // // // //               fontSize: "24px",
// // // // // // //               cursor: "pointer",
// // // // // // //               padding: "0",
// // // // // // //               width: "24px",
// // // // // // //               height: "24px",
// // // // // // //               display: "flex",
// // // // // // //               alignItems: "center",
// // // // // // //               justifyContent: "center",
// // // // // // //             }}
// // // // // // //             aria-label="Close"
// // // // // // //           >
// // // // // // //             ×
// // // // // // //           </button>
// // // // // // //         </div>

// // // // // // //         {/* Body */}
// // // // // // //         <div
// // // // // // //           style={{
// // // // // // //             padding: "20px",
// // // // // // //             maxHeight: "calc(70vh - 140px)",
// // // // // // //             overflowY: "auto",
// // // // // // //             WebkitOverflowScrolling: "touch",
// // // // // // //           }}
// // // // // // //         >
// // // // // // //           {loading ? (
// // // // // // //             <div style={{ textAlign: "center", padding: "20px 0" }}>
// // // // // // //               <div
// // // // // // //                 style={{
// // // // // // //                   width: "30px",
// // // // // // //                   height: "30px",
// // // // // // //                   border: "3px solid #f3f3f3",
// // // // // // //                   borderTop: "3px solid rgb(232, 65, 53)",
// // // // // // //                   borderRadius: "50%",
// // // // // // //                   animation: "spin 1s linear infinite",
// // // // // // //                   margin: "0 auto 12px",
// // // // // // //                 }}
// // // // // // //               />
// // // // // // //               <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>Loading options...</p>
// // // // // // //             </div>
// // // // // // //           ) : (
// // // // // // //             <>
// // // // // // //               <h5 style={{ marginBottom: "16px", fontWeight: "600" }}>Select Your Order</h5>

// // // // // // //               {/* Size Selection */}
// // // // // // //               {addon.length > 0 && (
// // // // // // //                 <div style={{ paddingBottom: "16px", borderBottom: "1px solid #dee2e6", marginBottom: "16px" }}>
// // // // // // //                   {addon.map((menu) => {
// // // // // // //                     const isSelected = selectedSize === menu.type
// // // // // // //                     return (
// // // // // // //                       <div
// // // // // // //                         key={menu.menutypeid}
// // // // // // //                         style={{
// // // // // // //                           display: "flex",
// // // // // // //                           alignItems: "center",
// // // // // // //                           justifyContent: "space-between",
// // // // // // //                           padding: "8px",
// // // // // // //                           borderRadius: "6px",
// // // // // // //                           backgroundColor: isSelected ? "#f8f9fa" : "transparent",
// // // // // // //                           marginBottom: "4px",
// // // // // // //                         }}
// // // // // // //                       >
// // // // // // //                         <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
// // // // // // //                           <input
// // // // // // //                             type="radio"
// // // // // // //                             name="size-selection"
// // // // // // //                             checked={isSelected}
// // // // // // //                             onChange={() => handleSizeChange(menu.type)}
// // // // // // //                             id={`size-${menu.menutypeid}`}
// // // // // // //                             style={{
// // // // // // //                               margin: 0,
// // // // // // //                               accentColor: "rgb(232, 65, 53)",
// // // // // // //                               width: "18px",
// // // // // // //                               height: "18px",
// // // // // // //                             }}
// // // // // // //                           />
// // // // // // //                           <label
// // // // // // //                             htmlFor={`size-${menu.menutypeid}`}
// // // // // // //                             style={{
// // // // // // //                               margin: 0,
// // // // // // //                               cursor: "pointer",
// // // // // // //                               fontWeight: isSelected ? "bold" : "normal",
// // // // // // //                               color: isSelected ? "rgb(232, 65, 53)" : "inherit",
// // // // // // //                             }}
// // // // // // //                           >
// // // // // // //                             {menu.type}
// // // // // // //                           </label>
// // // // // // //                         </div>
// // // // // // //                         <span style={{ fontWeight: "500" }}>£{menu.cost}</span>
// // // // // // //                       </div>
// // // // // // //                     )
// // // // // // //                   })}
// // // // // // //                 </div>
// // // // // // //               )}

// // // // // // //               {/* Category Selections */}
// // // // // // //               {selectedItem?.menutypecategorys?.map((category) => (
// // // // // // //                 <div key={category.menutypecategoryid} style={{ marginBottom: "20px" }}>
// // // // // // //                   <div
// // // // // // //                     style={{
// // // // // // //                       display: "flex",
// // // // // // //                       justifyContent: "space-between",
// // // // // // //                       alignItems: "center",
// // // // // // //                       marginBottom: "8px",
// // // // // // //                     }}
// // // // // // //                   >
// // // // // // //                     <h6 style={{ margin: 0, fontWeight: "600" }}>{category.name}</h6>
// // // // // // //                     {category?.isrequired === "1" && (
// // // // // // //                       <span style={{ fontSize: "12px", color: "rgb(232, 65, 53)" }}>(1) Required</span>
// // // // // // //                     )}
// // // // // // //                   </div>
// // // // // // //                   <div>
// // // // // // //                     {category?.menutypesubcategorys?.map((subcategory) => (
// // // // // // //                       <div
// // // // // // //                         key={subcategory.menutypesubcategoryid}
// // // // // // //                         style={{
// // // // // // //                           display: "flex",
// // // // // // //                           alignItems: "center",
// // // // // // //                           justifyContent: "space-between",
// // // // // // //                           padding: "8px 0",
// // // // // // //                           borderBottom: "1px solid #f0f0f0",
// // // // // // //                         }}
// // // // // // //                       >
// // // // // // //                         <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1 }}>
// // // // // // //                           <input
// // // // // // //                             type="checkbox"
// // // // // // //                             id={`subcategory-${subcategory.menutypesubcategoryid}`}
// // // // // // //                             checked={
// // // // // // //                               selectedOptions[category.menutypecategoryid]?.includes(
// // // // // // //                                 subcategory.menutypesubcategoryid,
// // // // // // //                               ) || false
// // // // // // //                             }
// // // // // // //                             onChange={() =>
// // // // // // //                               handleOptionChange(category.menutypecategoryid, subcategory.menutypesubcategoryid)
// // // // // // //                             }
// // // // // // //                             style={{
// // // // // // //                               margin: 0,
// // // // // // //                               accentColor: "rgb(232, 65, 53)",
// // // // // // //                               width: "18px",
// // // // // // //                               height: "18px",
// // // // // // //                             }}
// // // // // // //                           />
// // // // // // //                           <label
// // // // // // //                             htmlFor={`subcategory-${subcategory.menutypesubcategoryid}`}
// // // // // // //                             style={{ margin: 0, cursor: "pointer", flex: 1 }}
// // // // // // //                           >
// // // // // // //                             {subcategory.name}
// // // // // // //                           </label>
// // // // // // //                         </div>
// // // // // // //                         {Number.parseFloat(subcategory.cost) > 0 && (
// // // // // // //                           <span style={{ color: "#666", fontSize: "14px" }}>£{subcategory.cost}</span>
// // // // // // //                         )}
// // // // // // //                       </div>
// // // // // // //                     ))}
// // // // // // //                   </div>
// // // // // // //                 </div>
// // // // // // //               ))}
// // // // // // //             </>
// // // // // // //           )}
// // // // // // //         </div>

// // // // // // //         {/* Footer */}
// // // // // // //         <div style={{ padding: "16px 20px", borderTop: "1px solid #dee2e6" }}>
// // // // // // //           <button
// // // // // // //             onClick={handleClick}
// // // // // // //             disabled={isProceedDisabled()}
// // // // // // //             style={{
// // // // // // //               width: "100%",
// // // // // // //               padding: "12px",
// // // // // // //               backgroundColor: isProceedDisabled() ? "#ccc" : "rgb(232, 65, 53)",
// // // // // // //               color: "white",
// // // // // // //               border: "none",
// // // // // // //               borderRadius: "8px",
// // // // // // //               fontSize: "16px",
// // // // // // //               fontWeight: "bold",
// // // // // // //               cursor: isProceedDisabled() ? "not-allowed" : "pointer",
// // // // // // //               transition: "background-color 0.2s ease",
// // // // // // //             }}
// // // // // // //           >
// // // // // // //             + Add to Order
// // // // // // //           </button>
// // // // // // //         </div>
// // // // // // //       </div>

// // // // // // //       <style jsx>{`
// // // // // // //         @keyframes spin {
// // // // // // //           0% { transform: rotate(0deg); }
// // // // // // //           100% { transform: rotate(360deg); }
// // // // // // //         }
// // // // // // //       `}</style>
// // // // // // //     </div>
// // // // // // //   )
// // // // // // // }

// // // // // // // export default AddonPopup

// // // // // // "use client"

// // // // // // import { useEffect, useState, useCallback, useRef } from "react"
// // // // // // import { addToCart, chooseAdd } from "../utils/api"
// // // // // // import { toast } from "react-toastify"
// // // // // // import { useNavigate } from "react-router-dom"
// // // // // // import { incrementCount } from "../store/feature/cartSlice"
// // // // // // import { useDispatch, useSelector } from "react-redux"

// // // // // // const AddonPopup = ({ onClose, food, restId }) => {
// // // // // //   const storedUser = JSON.parse(localStorage.getItem("user"))
// // // // // //   const activeTab = useSelector((store) => store.User.activeTab)
// // // // // //   const dispatch = useDispatch()
// // // // // //   const navigate = useNavigate()
// // // // // //   const modalRef = useRef(null)

// // // // // //   // Add this to your existing state declarations
// // // // // //   const [nihariSize, setNihariSize] = useState("")
// // // // // //   const [addon, setAddon] = useState([])
// // // // // //   const [selectedSize, setSelectedSize] = useState("")
// // // // // //   const [selectedItem, setSelectedItem] = useState({})
// // // // // //   const [selectedOptions, setSelectedOptions] = useState({})
// // // // // //   const [totalCost, setTotalCost] = useState(0)
// // // // // //   const [loading, setLoading] = useState(true)
// // // // // //   const [isVisible, setIsVisible] = useState(false)

// // // // // //   // New state for step-by-step UI
// // // // // //   const [openSection, setOpenSection] = useState("size") // size, categories, cutting
// // // // // //   const [cuttingOption, setCuttingOption] = useState("")

// // // // // //   useEffect(() => {
// // // // // //     const fetchWithHighPriority = async () => {
// // // // // //       if (!food?.pkid) {
// // // // // //         setLoading(false)
// // // // // //         return
// // // // // //       }

// // // // // //       try {
// // // // // //         console.log("🚀 STARTING HIGH PRIORITY API CALL")

// // // // // //         const controller = new AbortController()
// // // // // //         const timeoutId = setTimeout(() => controller.abort(), 8000)

// // // // // //         const data = {
// // // // // //           catid: food.pkid,
// // // // // //           isdelivery: "1",
// // // // // //         }

// // // // // //         const fetchOptions = {
// // // // // //           signal: controller.signal,
// // // // // //           priority: "high",
// // // // // //           cache: "no-cache",
// // // // // //         }

// // // // // //         let res
// // // // // //         try {
// // // // // //           res = await chooseAdd(data, fetchOptions)
// // // // // //         } catch (error) {
// // // // // //           console.log("Fallback to regular fetch")
// // // // // //           res = await chooseAdd(data)
// // // // // //         }

// // // // // //         clearTimeout(timeoutId)

// // // // // //         console.log("✅ API RESPONSE:", res)

// // // // // //         if (res?.menutypes && res.menutypes.length > 0) {
// // // // // //           const initialMenu = res.menutypes[0]

// // // // // //           const initialOptions = {}
// // // // // //           initialMenu.menutypecategorys?.forEach((category) => {
// // // // // //             if (category.menutypesubcategorys?.length > 0) {
// // // // // //               initialOptions[category.menutypecategoryid] = category.menutypesubcategorys
// // // // // //                 .filter((subcategory) => subcategory.isselected === "1")
// // // // // //                 .map((subcategory) => subcategory.menutypesubcategoryid)
// // // // // //             }
// // // // // //           })

// // // // // //           setAddon(res.menutypes)
// // // // // //           setSelectedSize(initialMenu.type)
// // // // // //           setSelectedItem(initialMenu)
// // // // // //           setSelectedOptions(initialOptions)

// // // // // //           let cost = Number.parseFloat(initialMenu.cost) || 0
// // // // // //           Object.entries(initialOptions).forEach(([categoryId, selectedIds]) => {
// // // // // //             initialMenu.menutypecategorys?.forEach((category) => {
// // // // // //               if (category.menutypecategoryid === categoryId) {
// // // // // //                 category.menutypesubcategorys?.forEach((subcategory) => {
// // // // // //                   if (selectedIds.includes(subcategory.menutypesubcategoryid)) {
// // // // // //                     cost += Number.parseFloat(subcategory.cost) || 0
// // // // // //                   }
// // // // // //                 })
// // // // // //               }
// // // // // //             })
// // // // // //           })
// // // // // //           setTotalCost(cost)

// // // // // //           console.log("✅ DATA LOADED SUCCESSFULLY")
// // // // // //         }
// // // // // //       } catch (error) {
// // // // // //         console.error("❌ API ERROR:", error)
// // // // // //         toast.error("Failed to load options")
// // // // // //       } finally {
// // // // // //         setLoading(false)
// // // // // //       }
// // // // // //     }

// // // // // //     fetchWithHighPriority()
// // // // // //   }, [food?.pkid])

// // // // // //   useEffect(() => {
// // // // // //     setIsVisible(true)

// // // // // //     const scrollY = window.scrollY
// // // // // //     const body = document.body

// // // // // //     body.style.overflow = 'hidden'
// // // // // //     body.style.position = 'relative'
// // // // // //     body.style.top = `-${scrollY}px`

// // // // // //     return () => {
// // // // // //       body.style.overflow = ''
// // // // // //       body.style.position = ''
// // // // // //       body.style.top = ''
// // // // // //       window.scrollTo(0, scrollY)
// // // // // //     }
// // // // // //   }, [])

// // // // // //   useEffect(() => {
// // // // // //     if (!selectedItem || !selectedItem.cost) return

// // // // // //     let total = Number.parseFloat(selectedItem.cost) || 0

// // // // // //     Object.entries(selectedOptions).forEach(([categoryId, selectedIds]) => {
// // // // // //       selectedItem.menutypecategorys?.forEach((category) => {
// // // // // //         if (category.menutypecategoryid === categoryId) {
// // // // // //           category.menutypesubcategorys?.forEach((subcategory) => {
// // // // // //             if (selectedIds.includes(subcategory.menutypesubcategoryid)) {
// // // // // //               total += Number.parseFloat(subcategory.cost) || 0
// // // // // //             }
// // // // // //           })
// // // // // //         }
// // // // // //       })
// // // // // //     })

// // // // // //     setTotalCost(total)
// // // // // //   }, [selectedOptions, selectedItem])

// // // // // //   const handleSizeChange = useCallback(
// // // // // //     (size) => {
// // // // // //       const selectedMenu = addon.find((menu) => menu.type === size)
// // // // // //       if (!selectedMenu) return

// // // // // //       setSelectedSize(size)
// // // // // //       setSelectedItem(selectedMenu)

// // // // // //       const newOptions = {}
// // // // // //       selectedMenu.menutypecategorys?.forEach((category) => {
// // // // // //         if (category.menutypesubcategorys?.length > 0) {
// // // // // //           newOptions[category.menutypecategoryid] = category.menutypesubcategorys
// // // // // //             .filter((sub) => sub.isselected === "1")
// // // // // //             .map((sub) => sub.menutypesubcategoryid)
// // // // // //         }
// // // // // //       })
// // // // // //       setSelectedOptions(newOptions)

// // // // // //       // Auto-advance to next section if size is selected
// // // // // //       if (selectedMenu.menutypecategorys?.length > 0) {
// // // // // //         setOpenSection("categories")
// // // // // //       }
// // // // // //     },
// // // // // //     [addon],
// // // // // //   )

// // // // // //   const handleOptionChange = useCallback(
// // // // // //     (categoryId, subCategoryId) => {
// // // // // //       setSelectedOptions((prevOptions) => {
// // // // // //         const currentSelections = prevOptions[categoryId] || []
// // // // // //         const category = selectedItem?.menutypecategorys?.find((cat) => cat.menutypecategoryid === categoryId)

// // // // // //         if (!category) return prevOptions

// // // // // //         const isMultipleAllowed = category.ismultiple === "1"
// // // // // //         const maxSelections = Number.parseInt(category.multiple, 10) || 0

// // // // // //         let updatedSelections

// // // // // //         if (!isMultipleAllowed || maxSelections === 1) {
// // // // // //           updatedSelections = currentSelections.includes(subCategoryId) ? [] : [subCategoryId]
// // // // // //         } else {
// // // // // //           if (currentSelections.includes(subCategoryId)) {
// // // // // //             updatedSelections = currentSelections.filter((id) => id !== subCategoryId)
// // // // // //           } else {
// // // // // //             updatedSelections =
// // // // // //               maxSelections === 0 || currentSelections.length < maxSelections
// // // // // //                 ? [...currentSelections, subCategoryId]
// // // // // //                 : currentSelections
// // // // // //           }
// // // // // //         }

// // // // // //         return {
// // // // // //           ...prevOptions,
// // // // // //           [categoryId]: updatedSelections,
// // // // // //         }
// // // // // //       })
// // // // // //     },
// // // // // //     [selectedItem],
// // // // // //   )

// // // // // //   const toggleSection = (section) => {
// // // // // //     setOpenSection(openSection === section ? "" : section)
// // // // // //   }

// // // // // //   const isProceedDisabled = () => {
// // // // // //     if (loading || !selectedItem) return true

// // // // // //     const requiredCategories = selectedItem.menutypecategorys?.filter((category) => category.isrequired === "1")
// // // // // //     if (!requiredCategories?.length) return false

// // // // // //     return requiredCategories.some((category) => {
// // // // // //       const selections = selectedOptions[category.menutypecategoryid]
// // // // // //       return !selections || selections.length === 0
// // // // // //     })
// // // // // //   }

// // // // // //   const handleClose = useCallback(() => {
// // // // // //     setIsVisible(false)
// // // // // //     setTimeout(() => {
// // // // // //       onClose()
// // // // // //     }, 150)
// // // // // //   }, [onClose])

// // // // // //   const handleClick = useCallback(async () => {
// // // // // //     if (!storedUser) {
// // // // // //       navigate("/login")
// // // // // //       return
// // // // // //     }

// // // // // //     try {
// // // // // //       const allSelectedValues = Object.values(selectedOptions).flat()

// // // // // //       const sendData = {
// // // // // //         userid: storedUser?.userid,
// // // // // //         restId: restId,
// // // // // //         type: activeTab === "Delivery" ? "delivery" : "takeaway",
// // // // // //         catid: food.catid,
// // // // // //         foodid: food.pkid,
// // // // // //         typeid: selectedItem?.menutypeid || "",
// // // // // //         extratopupid: allSelectedValues,
// // // // // //         quantity: "1",
// // // // // //         cartid: "",
// // // // // //         cartdetailid: "",
// // // // // //       }

// // // // // //       const data = await addToCart(sendData)

// // // // // //       if (data.status === "1") {
// // // // // //         toast.success("Item added to cart!")
// // // // // //         dispatch(incrementCount())
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error("Error adding to cart:", error)
// // // // // //       toast.error("Something went wrong")
// // // // // //     } finally {
// // // // // //       handleClose()
// // // // // //     }
// // // // // //   }, [storedUser, navigate, selectedOptions, restId, activeTab, food, selectedItem, dispatch, handleClose])

// // // // // //   // Group categories by type for better organization
// // // // // //   const fatCategories = selectedItem?.menutypecategorys?.filter(cat =>
// // // // // //     cat.name.toLowerCase().includes('fat') || cat.name.toLowerCase().includes('lean')
// // // // // //   ) || []

// // // // // //   const otherCategories = selectedItem?.menutypecategorys?.filter(cat =>
// // // // // //     !cat.name.toLowerCase().includes('fat') && !cat.name.toLowerCase().includes('lean')
// // // // // //   ) || []

// // // // // //   return (
// // // // // //     <div
// // // // // //       style={{
// // // // // //         position: "fixed",
// // // // // //         top: 0,
// // // // // //         left: 0,
// // // // // //         right: 0,
// // // // // //         bottom: 0,
// // // // // //         backgroundColor: `rgba(0, 0, 0, ${isVisible ? 0.5 : 0})`,
// // // // // //         display: "flex",
// // // // // //         alignItems: "center",
// // // // // //         justifyContent: "center",
// // // // // //         padding: "10px",
// // // // // //         zIndex: 1050,
// // // // // //         transition: "background-color 0.15s ease",
// // // // // //       }}
// // // // // //       onClick={(e) => {
// // // // // //         if (e.target === e.currentTarget) handleClose()
// // // // // //       }}
// // // // // //     >
// // // // // //       <div
// // // // // //         ref={modalRef}
// // // // // //         style={{
// // // // // //           width: "380px",
// // // // // //           maxHeight: "85vh",
// // // // // //           backgroundColor: "white",
// // // // // //           borderRadius: "16px",
// // // // // //           boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
// // // // // //           overflow: "hidden",
// // // // // //           transform: `scale(${isVisible ? 1 : 0.95}) translateY(${isVisible ? 0 : "10px"})`,
// // // // // //           opacity: isVisible ? 1 : 0,
// // // // // //           transition: "all 0.15s ease",
// // // // // //         }}
// // // // // //       >
// // // // // //         {/* Header */}
// // // // // //         <div
// // // // // //           style={{
// // // // // //             padding: "20px 24px",
// // // // // //             backgroundColor: "#e84135",
// // // // // //             color: "white",
// // // // // //             borderBottom: "1px solid #dee2e6",
// // // // // //           }}
// // // // // //         >
// // // // // //           <div className="d-flex justify-content-between align-items-center">
// // // // // //             <div>
// // // // // //               <h5 style={{ margin: 0, fontWeight: "bold", fontSize: "18px" }}>Customize Your Order</h5>
// // // // // //               <p style={{ margin: "4px 0 0 0", fontSize: "14px", opacity: 0.9 }}>
// // // // // //                 Total: £{totalCost.toFixed(2)}
// // // // // //               </p>
// // // // // //             </div>
// // // // // //             <button
// // // // // //               onClick={handleClose}
// // // // // //               style={{
// // // // // //                 background: "none",
// // // // // //                 border: "none",
// // // // // //                 fontSize: "24px",
// // // // // //                 color: "white",
// // // // // //                 cursor: "pointer",
// // // // // //                 padding: "0",
// // // // // //                 width: "24px",
// // // // // //                 height: "24px",
// // // // // //                 display: "flex",
// // // // // //                 alignItems: "center",
// // // // // //                 justifyContent: "center",
// // // // // //               }}
// // // // // //               aria-label="Close"
// // // // // //             >
// // // // // //               ×
// // // // // //             </button>
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         {/* Body */}
// // // // // //         <div
// // // // // //           style={{
// // // // // //             padding: "0",
// // // // // //             maxHeight: "calc(70vh - 140px)",
// // // // // //             overflowY: "auto",
// // // // // //             WebkitOverflowScrolling: "touch",
// // // // // //           }}
// // // // // //         >
// // // // // //           {loading ? (
// // // // // //             <div style={{ textAlign: "center", padding: "40px 20px" }}>
// // // // // //               <div
// // // // // //                 style={{
// // // // // //                   width: "40px",
// // // // // //                   height: "40px",
// // // // // //                   border: "3px solid #f3f3f3",
// // // // // //                   borderTop: "3px solid #e84135",
// // // // // //                   borderRadius: "50%",
// // // // // //                   animation: "spin 1s linear infinite",
// // // // // //                   margin: "0 auto 16px",
// // // // // //                 }}
// // // // // //               />
// // // // // //               <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>Loading options...</p>
// // // // // //             </div>
// // // // // //           ) : (
// // // // // //             <div style={{ padding: "0" }}>
              
// // // // // //               {/* Step 1: Size Selection */}
// // // // // //               <div style={{ borderBottom: "1px solid #f0f0f0" }}>
// // // // // //                 <div
// // // // // //                   style={{
// // // // // //                     padding: "16px 20px",
// // // // // //                     backgroundColor: openSection === "size" ? "#f8f9fa" : "white",
// // // // // //                     cursor: "pointer",
// // // // // //                     display: "flex",
// // // // // //                     justifyContent: "space-between",
// // // // // //                     alignItems: "center",
// // // // // //                   }}
// // // // // //                   onClick={() => toggleSection("size")}
// // // // // //                 >
// // // // // //                   <div>
// // // // // //                     <h6 style={{ margin: 0, fontWeight: "600", color: "#333" }}>1. Choose Size & Price</h6>
// // // // // //                     <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#666" }}>
// // // // // //                       {selectedSize || "Select your preferred size"}
// // // // // //                     </p>
// // // // // //                   </div>
// // // // // //                   <i
// // // // // //                     className={`ri-arrow-down-s-line`}
// // // // // //                     style={{
// // // // // //                       fontSize: "18px",
// // // // // //                       color: "#666",
// // // // // //                       transform: openSection === "size" ? "rotate(180deg)" : "rotate(0deg)",
// // // // // //                       transition: "transform 0.2s ease"
// // // // // //                     }}
// // // // // //                   />
// // // // // //                 </div>

// // // // // //                 {openSection === "size" && (
// // // // // //                   <div style={{ padding: "0 20px 16px 20px", backgroundColor: "#f8f9fa" }}>
// // // // // //                     {addon.map((menu) => {
// // // // // //                       const isSelected = selectedSize === menu.type
// // // // // //                       return (
// // // // // //                         <div
// // // // // //                           key={menu.menutypeid}
// // // // // //                           style={{
// // // // // //                             display: "flex",
// // // // // //                             alignItems: "center",
// // // // // //                             justifyContent: "space-between",
// // // // // //                             padding: "12px",
// // // // // //                             borderRadius: "8px",
// // // // // //                             backgroundColor: isSelected ? "#e84135" : "white",
// // // // // //                             marginBottom: "8px",
// // // // // //                             border: isSelected ? "2px solid #e84135" : "1px solid #ddd",
// // // // // //                             cursor: "pointer",
// // // // // //                             transition: "all 0.2s ease",
// // // // // //                           }}
// // // // // //                           onClick={() => handleSizeChange(menu.type)}
// // // // // //                         >
// // // // // //                           <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
// // // // // //                             <div
// // // // // //                               style={{
// // // // // //                                 width: "20px",
// // // // // //                                 height: "20px",
// // // // // //                                 borderRadius: "50%",
// // // // // //                                 border: isSelected ? "none" : "2px solid #ddd",
// // // // // //                                 backgroundColor: isSelected ? "white" : "transparent",
// // // // // //                                 display: "flex",
// // // // // //                                 alignItems: "center",
// // // // // //                                 justifyContent: "center",
// // // // // //                               }}
// // // // // //                             >
// // // // // //                               {isSelected && (
// // // // // //                                 <div
// // // // // //                                   style={{
// // // // // //                                     width: "8px",
// // // // // //                                     height: "8px",
// // // // // //                                     borderRadius: "50%",
// // // // // //                                     backgroundColor: "#e84135",
// // // // // //                                   }}
// // // // // //                                 />
// // // // // //                               )}
// // // // // //                             </div>
// // // // // //                             <span
// // // // // //                               style={{
// // // // // //                                 fontWeight: isSelected ? "600" : "500",
// // // // // //                                 color: isSelected ? "white" : "#333",
// // // // // //                               }}
// // // // // //                             >
// // // // // //                               {menu.type}
// // // // // //                             </span>
// // // // // //                           </div>
// // // // // //                           <span
// // // // // //                             style={{
// // // // // //                               fontWeight: "600",
// // // // // //                               color: isSelected ? "white" : "#e84135",
// // // // // //                             }}
// // // // // //                           >
// // // // // //                             £{menu.cost}
// // // // // //                           </span>
// // // // // //                         </div>
// // // // // //                       )
// // // // // //                     })}
// // // // // //                   </div>
// // // // // //                 )}
// // // // // //               </div>

// // // // // //               {/* Step 2: Fat Options */}
// // // // // //               {otherCategories.length > 0 && (
// // // // // //                 <div style={{ borderBottom: "1px solid #f0f0f0" }}>
// // // // // //                   <div
// // // // // //                     style={{
// // // // // //                       padding: "16px 20px",
// // // // // //                       backgroundColor: openSection === "other" ? "#f8f9fa" : "white",
// // // // // //                       cursor: "pointer",
// // // // // //                       display: "flex",
// // // // // //                       justifyContent: "space-between",
// // // // // //                       alignItems: "center",
// // // // // //                     }}
// // // // // //                     onClick={() => toggleSection("other")}
// // // // // //                   >
// // // // // //                     <div>
// // // // // //                       <h6 style={{ margin: 0, fontWeight: "600", color: "#333" }}>2. Choose One</h6>
// // // // // //                       <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#666" }}>
// // // // // //                         Select your preferred option
// // // // // //                       </p>
// // // // // //                     </div>
// // // // // //                     <i
// // // // // //                       className={`ri-arrow-down-s-line`}
// // // // // //                       style={{
// // // // // //                         fontSize: "18px",
// // // // // //                         color: "#666",
// // // // // //                         transform: openSection === "other" ? "rotate(180deg)" : "rotate(0deg)",
// // // // // //                         transition: "transform 0.2s ease"
// // // // // //                       }}
// // // // // //                     />
// // // // // //                   </div>

// // // // // //                   {openSection === "other" && (
// // // // // //                     <div style={{ padding: "0 20px 16px 20px", backgroundColor: "#f8f9fa" }}>
// // // // // //                       {otherCategories.map((category) => (
// // // // // //                         <div key={category.menutypecategoryid} style={{ marginBottom: "16px" }}>
// // // // // //                           <h6 style={{ margin: "0 0 12px 0", fontWeight: "600", fontSize: "14px" }}>
// // // // // //                             {category.name}
// // // // // //                             <span style={{ fontSize: "12px", color: "#e84135", marginLeft: "8px" }}>
// // // // // //                               (1) Required
// // // // // //                             </span>
// // // // // //                           </h6>
// // // // // //                           <div>
// // // // // //                             {category?.menutypesubcategorys
// // // // // //                               ?.filter(subcategory =>
// // // // // //                                 subcategory.name.toLowerCase().includes('fat') ||
// // // // // //                                 subcategory.name.toLowerCase().includes('with') ||
// // // // // //                                 subcategory.name.toLowerCase().includes('without')
// // // // // //                               )
// // // // // //                               .map((subcategory) => {
// // // // // //                                 const isSelected = selectedOptions[category.menutypecategoryid]?.includes(
// // // // // //                                   subcategory.menutypesubcategoryid
// // // // // //                                 )
// // // // // //                                 return (
// // // // // //                                   <div
// // // // // //                                     key={subcategory.menutypesubcategoryid}
// // // // // //                                     style={{
// // // // // //                                       display: "flex",
// // // // // //                                       alignItems: "center",
// // // // // //                                       justifyContent: "space-between",
// // // // // //                                       padding: "12px",
// // // // // //                                       borderRadius: "8px",
// // // // // //                                       backgroundColor: isSelected ? "#e84135" : "white",
// // // // // //                                       marginBottom: "8px",
// // // // // //                                       border: isSelected ? "2px solid #e84135" : "1px solid #ddd",
// // // // // //                                       cursor: "pointer",
// // // // // //                                       transition: "all 0.2s ease",
// // // // // //                                     }}
// // // // // //                                     onClick={() => handleOptionChange(category.menutypecategoryid, subcategory.menutypesubcategoryid)}
// // // // // //                                   >
// // // // // //                                     <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
// // // // // //                                       <div
// // // // // //                                         style={{
// // // // // //                                           width: "20px",
// // // // // //                                           height: "20px",
// // // // // //                                           borderRadius: "50%",
// // // // // //                                           border: isSelected ? "none" : "2px solid #ddd",
// // // // // //                                           backgroundColor: isSelected ? "white" : "transparent",
// // // // // //                                           display: "flex",
// // // // // //                                           alignItems: "center",
// // // // // //                                           justifyContent: "center",
// // // // // //                                         }}
// // // // // //                                       >
// // // // // //                                         {isSelected && (
// // // // // //                                           <div
// // // // // //                                             style={{
// // // // // //                                               width: "8px",
// // // // // //                                               height: "8px",
// // // // // //                                               borderRadius: "50%",
// // // // // //                                               backgroundColor: "#e84135",
// // // // // //                                             }}
// // // // // //                                           />
// // // // // //                                         )}
// // // // // //                                       </div>
// // // // // //                                       <span
// // // // // //                                         style={{
// // // // // //                                           fontWeight: isSelected ? "600" : "500",
// // // // // //                                           color: isSelected ? "white" : "#333",
// // // // // //                                         }}
// // // // // //                                       >
// // // // // //                                         {subcategory.name}
// // // // // //                                       </span>
// // // // // //                                     </div>
// // // // // //                                     {Number.parseFloat(subcategory.cost) > 0 && (
// // // // // //                                       <span
// // // // // //                                         style={{
// // // // // //                                           fontWeight: "600",
// // // // // //                                           color: isSelected ? "white" : "#e84135",
// // // // // //                                         }}
// // // // // //                                       >
// // // // // //                                         +£{subcategory.cost}
// // // // // //                                       </span>
// // // // // //                                     )}
// // // // // //                                   </div>
// // // // // //                                 )
// // // // // //                               })}
// // // // // //                           </div>
// // // // // //                         </div>
// // // // // //                       ))}

// // // // // //                       {/* Fallback in case no fat options are found in API */}
// // // // // //                       {otherCategories.length === 0 || otherCategories.every(cat =>
// // // // // //                         !cat.menutypesubcategorys?.some(sub =>
// // // // // //                           sub.name.toLowerCase().includes('fat') ||
// // // // // //                           sub.name.toLowerCase().includes('with') ||
// // // // // //                           sub.name.toLowerCase().includes('without')
// // // // // //                         )
// // // // // //                       ) && (
// // // // // //                           <div style={{ marginBottom: "16px" }}>
// // // // // //                             <h6 style={{ margin: "0 0 12px 0", fontWeight: "600", fontSize: "14px" }}>
// // // // // //                               Fat Options
// // // // // //                               <span style={{ fontSize: "12px", color: "#e84135", marginLeft: "8px" }}>
// // // // // //                                 (1) Required
// // // // // //                               </span>
// // // // // //                             </h6>
// // // // // //                             <div>
// // // // // //                               {[
// // // // // //                                 { id: "with-fat", name: "With Fat", price: 0 },
// // // // // //                                 { id: "without-fat", name: "Without Fat", price: 0 },
// // // // // //                               ].map((option) => {
// // // // // //                                 // Check if this option is selected by matching name
// // // // // //                                 const isSelected = otherCategories.some(category =>
// // // // // //                                   selectedOptions[category.menutypecategoryid]?.some(selectedId => {
// // // // // //                                     const selectedSub = category.menutypesubcategorys?.find(sub =>
// // // // // //                                       sub.menutypesubcategoryid === selectedId
// // // // // //                                     )
// // // // // //                                     return selectedSub?.name.toLowerCase() === option.name.toLowerCase()
// // // // // //                                   })
// // // // // //                                 )

// // // // // //                                 return (
// // // // // //                                   <div
// // // // // //                                     key={option.id}
// // // // // //                                     style={{
// // // // // //                                       display: "flex",
// // // // // //                                       alignItems: "center",
// // // // // //                                       justifyContent: "space-between",
// // // // // //                                       padding: "12px",
// // // // // //                                       borderRadius: "8px",
// // // // // //                                       backgroundColor: isSelected ? "#e84135" : "white",
// // // // // //                                       marginBottom: "8px",
// // // // // //                                       border: isSelected ? "2px solid #e84135" : "1px solid #ddd",
// // // // // //                                       cursor: "pointer",
// // // // // //                                       transition: "all 0.2s ease",
// // // // // //                                     }}
// // // // // //                                     onClick={() => {
// // // // // //                                       // Find the actual category and subcategory IDs for fat options
// // // // // //                                       const fatCategory = otherCategories.find(cat =>
// // // // // //                                         cat.menutypesubcategorys?.some(sub =>
// // // // // //                                           sub.name.toLowerCase().includes('fat')
// // // // // //                                         )
// // // // // //                                       )
// // // // // //                                       if (fatCategory) {
// // // // // //                                         const fatSubcategory = fatCategory.menutypesubcategorys?.find(sub =>
// // // // // //                                           sub.name.toLowerCase().includes(option.name.toLowerCase().includes('with') ? 'with' : 'without')
// // // // // //                                         )
// // // // // //                                         if (fatSubcategory) {
// // // // // //                                           handleOptionChange(fatCategory.menutypecategoryid, fatSubcategory.menutypesubcategoryid)
// // // // // //                                         }
// // // // // //                                       }
// // // // // //                                     }}
// // // // // //                                   >
// // // // // //                                     <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
// // // // // //                                       <div
// // // // // //                                         style={{
// // // // // //                                           width: "20px",
// // // // // //                                           height: "20px",
// // // // // //                                           borderRadius: "50%",
// // // // // //                                           border: isSelected ? "none" : "2px solid #ddd",
// // // // // //                                           backgroundColor: isSelected ? "white" : "transparent",
// // // // // //                                           display: "flex",
// // // // // //                                           alignItems: "center",
// // // // // //                                           justifyContent: "center",
// // // // // //                                         }}
// // // // // //                                       >
// // // // // //                                         {isSelected && (
// // // // // //                                           <div
// // // // // //                                             style={{
// // // // // //                                               width: "8px",
// // // // // //                                               height: "8px",
// // // // // //                                               borderRadius: "50%",
// // // // // //                                               backgroundColor: "#e84135",
// // // // // //                                             }}
// // // // // //                                           />
// // // // // //                                         )}
// // // // // //                                       </div>
// // // // // //                                       <span
// // // // // //                                         style={{
// // // // // //                                           fontWeight: isSelected ? "600" : "500",
// // // // // //                                           color: isSelected ? "white" : "#333",
// // // // // //                                         }}
// // // // // //                                       >
// // // // // //                                         {option.name}
// // // // // //                                       </span>
// // // // // //                                     </div>
// // // // // //                                     {option.price > 0 && (
// // // // // //                                       <span
// // // // // //                                         style={{
// // // // // //                                           fontWeight: "600",
// // // // // //                                           color: isSelected ? "white" : "#e84135",
// // // // // //                                         }}
// // // // // //                                       >
// // // // // //                                         +£{option.price.toFixed(2)}
// // // // // //                                       </span>
// // // // // //                                     )}
// // // // // //                                   </div>
// // // // // //                                 )
// // // // // //                               })}
// // // // // //                             </div>
// // // // // //                           </div>
// // // // // //                         )}
// // // // // //                     </div>
// // // // // //                   )}
// // // // // //                 </div>
// // // // // //               )}

// // // // // //               {/* Step 3: Other Options */}
// // // // // //               {otherCategories.length > 0 && (
// // // // // //                 <div style={{ borderBottom: "1px solid #f0f0f0" }}>
// // // // // //                   <div
// // // // // //                     style={{
// // // // // //                       padding: "16px 20px",
// // // // // //                       backgroundColor: openSection === "other" ? "#f8f9fa" : "white",
// // // // // //                       cursor: "pointer",
// // // // // //                       display: "flex",
// // // // // //                       justifyContent: "space-between",
// // // // // //                       alignItems: "center",
// // // // // //                     }}
// // // // // //                     onClick={() => toggleSection("other")}
// // // // // //                   >
// // // // // //                     <div>
// // // // // //                       <h6 style={{ margin: 0, fontWeight: "600", color: "#333" }}>2. Additional Options</h6>
// // // // // //                       <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#666" }}>
// // // // // //                         Customize your order further
// // // // // //                       </p>
// // // // // //                     </div>
// // // // // //                     <i
// // // // // //                       className={`ri-arrow-down-s-line`}
// // // // // //                       style={{
// // // // // //                         fontSize: "18px",
// // // // // //                         color: "#666",
// // // // // //                         transform: openSection === "other" ? "rotate(180deg)" : "rotate(0deg)",
// // // // // //                         transition: "transform 0.2s ease"
// // // // // //                       }}
// // // // // //                     />
// // // // // //                   </div>

// // // // // //                   {openSection === "other" && (
// // // // // //                     <div style={{ padding: "0 20px 16px 20px", backgroundColor: "#f8f9fa" }}>
// // // // // //                       {otherCategories.map((category) => (
// // // // // //                         <div key={category.menutypecategoryid} style={{ marginBottom: "16px" }}>
// // // // // //                           <h6 style={{ margin: "0 0 12px 0", fontWeight: "600", fontSize: "14px" }}>
// // // // // //                             {/* {category.name} */}
// // // // // //                             {category?.isrequired === "1" && (
// // // // // //                               <span style={{ fontSize: "12px", color: "#e84135", marginLeft: "8px" }}>
// // // // // //                                 (Required)
// // // // // //                               </span>
// // // // // //                             )}
// // // // // //                           </h6>
// // // // // //                           <div>
// // // // // //                             {category?.menutypesubcategorys?.map((subcategory) => {
// // // // // //                               const isSelected = selectedOptions[category.menutypecategoryid]?.includes(
// // // // // //                                 subcategory.menutypesubcategoryid
// // // // // //                               )
// // // // // //                               return (
// // // // // //                                 <div
// // // // // //                                   key={subcategory.menutypesubcategoryid}
// // // // // //                                   style={{
// // // // // //                                     display: "flex",
// // // // // //                                     alignItems: "center",
// // // // // //                                     justifyContent: "space-between",
// // // // // //                                     padding: "10px 12px",
// // // // // //                                     borderRadius: "6px",
// // // // // //                                     backgroundColor: isSelected ? "#e84135" : "white",
// // // // // //                                     marginBottom: "6px",
// // // // // //                                     border: isSelected ? "2px solid #e84135" : "1px solid #ddd",
// // // // // //                                     cursor: "pointer",
// // // // // //                                     transition: "all 0.2s ease",
// // // // // //                                   }}
// // // // // //                                   onClick={() => handleOptionChange(category.menutypecategoryid, subcategory.menutypesubcategoryid)}
// // // // // //                                 >
// // // // // //                                   <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
// // // // // //                                     <div
// // // // // //                                       style={{
// // // // // //                                         width: "18px",
// // // // // //                                         height: "18px",
// // // // // //                                         borderRadius: "4px",
// // // // // //                                         border: isSelected ? "none" : "2px solid #ddd",
// // // // // //                                         backgroundColor: isSelected ? "white" : "transparent",
// // // // // //                                         display: "flex",
// // // // // //                                         alignItems: "center",
// // // // // //                                         justifyContent: "center",
// // // // // //                                       }}
// // // // // //                                     >
// // // // // //                                       {isSelected && (
// // // // // //                                         <i className="ri-check-line" style={{ fontSize: "12px", color: "#e84135" }} />
// // // // // //                                       )}
// // // // // //                                     </div>
// // // // // //                                     <span
// // // // // //                                       style={{
// // // // // //                                         fontWeight: isSelected ? "600" : "500",
// // // // // //                                         color: isSelected ? "white" : "#333",
// // // // // //                                         fontSize: "14px",
// // // // // //                                       }}
// // // // // //                                     >
// // // // // //                                       {subcategory.name}
// // // // // //                                     </span>
// // // // // //                                   </div>
// // // // // //                                   {Number.parseFloat(subcategory.cost) > 0 && (
// // // // // //                                     <span
// // // // // //                                       style={{
// // // // // //                                         fontWeight: "600",
// // // // // //                                         color: isSelected ? "white" : "#e84135",
// // // // // //                                         fontSize: "14px",
// // // // // //                                       }}
// // // // // //                                     >
// // // // // //                                       +£{subcategory.cost}
// // // // // //                                     </span>
// // // // // //                                   )}
// // // // // //                                 </div>
// // // // // //                               )
// // // // // //                             })}
// // // // // //                           </div>
// // // // // //                         </div>
// // // // // //                       ))}
// // // // // //                     </div>
// // // // // //                   )}
// // // // // //                 </div>
// // // // // //               )}

// // // // // //               {/* Step 4: Cutting Options */}
// // // // // //               <div style={{ borderBottom: "1px solid #f0f0f0" }}>
// // // // // //                 <div
// // // // // //                   style={{
// // // // // //                     padding: "16px 20px",
// // // // // //                     backgroundColor: openSection === "cutting" ? "#f8f9fa" : "white",
// // // // // //                     cursor: "pointer",
// // // // // //                     display: "flex",
// // // // // //                     justifyContent: "space-between",
// // // // // //                     alignItems: "center",
// // // // // //                   }}
// // // // // //                   onClick={() => toggleSection("cutting")}
// // // // // //                 >
// // // // // //                   <div>
// // // // // //                     <h6 style={{ margin: 0, fontWeight: "600", color: "#333" }}>4. Cutting Style</h6>
// // // // // //                     <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#666" }}>
// // // // // //                       {cuttingOption || "Choose how you want it cut"}
// // // // // //                     </p>
// // // // // //                   </div>
// // // // // //                   <i
// // // // // //                     className={`ri-arrow-down-s-line`}
// // // // // //                     style={{
// // // // // //                       fontSize: "18px",
// // // // // //                       color: "#666",
// // // // // //                       transform: openSection === "cutting" ? "rotate(180deg)" : "rotate(0deg)",
// // // // // //                       transition: "transform 0.2s ease"
// // // // // //                     }}
// // // // // //                   />
// // // // // //                 </div>

// // // // // //                 {openSection === "cutting" && (
// // // // // //                   <div style={{ padding: "0 20px 16px 20px", backgroundColor: "#f8f9fa" }}>
// // // // // //                     <div style={{ marginBottom: "16px" }}>
// // // // // //                       <h6 style={{ margin: "0 0 12px 0", fontWeight: "600", fontSize: "14px" }}>
// // // // // //                         Cutting (Required)
// // // // // //                         <span style={{ fontSize: "12px", color: "#e84135", marginLeft: "8px" }}>
// // // // // //                           (Required)
// // // // // //                         </span>
// // // // // //                       </h6>
// // // // // //                       <div>
// // // // // //                         {[
// // // // // //                           { id: "whole", name: "Whole", price: 0 },
// // // // // //                           { id: "small-pieces", name: "Small Pieces", price: 0 },
// // // // // //                           { id: "medium-pieces", name: "Medium Pieces", price: 0 },
// // // // // //                         ].map((option) => {
// // // // // //                           const isSelected = cuttingOption === option.name
// // // // // //                           return (
// // // // // //                             <div
// // // // // //                               key={option.id}
// // // // // //                               style={{
// // // // // //                                 display: "flex",
// // // // // //                                 alignItems: "center",
// // // // // //                                 justifyContent: "space-between",
// // // // // //                                 padding: "12px",
// // // // // //                                 borderRadius: "8px",
// // // // // //                                 backgroundColor: isSelected ? "#e84135" : "white",
// // // // // //                                 marginBottom: "8px",
// // // // // //                                 border: isSelected ? "2px solid #e84135" : "1px solid #ddd",
// // // // // //                                 cursor: "pointer",
// // // // // //                                 transition: "all 0.2s ease",
// // // // // //                               }}
// // // // // //                               onClick={() => setCuttingOption(option.name)}
// // // // // //                             >
// // // // // //                               <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
// // // // // //                                 <div
// // // // // //                                   style={{
// // // // // //                                     width: "20px",
// // // // // //                                     height: "20px",
// // // // // //                                     borderRadius: "50%",
// // // // // //                                     border: isSelected ? "none" : "2px solid #ddd",
// // // // // //                                     backgroundColor: isSelected ? "white" : "transparent",
// // // // // //                                     display: "flex",
// // // // // //                                     alignItems: "center",
// // // // // //                                     justifyContent: "center",
// // // // // //                                   }}
// // // // // //                                 >
// // // // // //                                   {isSelected && (
// // // // // //                                     <div
// // // // // //                                       style={{
// // // // // //                                         width: "8px",
// // // // // //                                         height: "8px",
// // // // // //                                         borderRadius: "50%",
// // // // // //                                         backgroundColor: "#e84135",
// // // // // //                                       }}
// // // // // //                                     />
// // // // // //                                   )}
// // // // // //                                 </div>
// // // // // //                                 <span
// // // // // //                                   style={{
// // // // // //                                     fontWeight: isSelected ? "600" : "500",
// // // // // //                                     color: isSelected ? "white" : "#333",
// // // // // //                                   }}
// // // // // //                                 >
// // // // // //                                   {option.name}
// // // // // //                                 </span>
// // // // // //                               </div>
// // // // // //                               {option.price > 0 && (
// // // // // //                                 <span
// // // // // //                                   style={{
// // // // // //                                     fontWeight: "600",
// // // // // //                                     color: isSelected ? "white" : "#e84135",
// // // // // //                                   }}
// // // // // //                                 >
// // // // // //                                   +£{option.price.toFixed(2)}
// // // // // //                                 </span>
// // // // // //                               )}
// // // // // //                             </div>
// // // // // //                           )
// // // // // //                         })}
// // // // // //                       </div>
// // // // // //                     </div>

// // // // // //                     {/* Nihari Size Section */}
// // // // // //                     <div>
// // // // // //                       <h6 style={{ margin: "0 0 12px 0", fontWeight: "600", fontSize: "14px" }}>
// // // // // //                         Nihari Size
// // // // // //                       </h6>
// // // // // //                       <div>
// // // // // //                         {[
// // // // // //                           { id: "whole-nihari", name: "Whole", price: 0 },
// // // // // //                           { id: "small-nihari", name: "Small Pieces", price: 0 },
// // // // // //                           { id: "medium-nihari", name: "Medium Pieces", price: 0 },
// // // // // //                         ].map((option) => {
// // // // // //                           const isSelected = nihariSize === option.name
// // // // // //                           return (
// // // // // //                             <div
// // // // // //                               key={option.id}
// // // // // //                               style={{
// // // // // //                                 display: "flex",
// // // // // //                                 alignItems: "center",
// // // // // //                                 justifyContent: "space-between",
// // // // // //                                 padding: "12px",
// // // // // //                                 borderRadius: "8px",
// // // // // //                                 backgroundColor: isSelected ? "#e84135" : "white",
// // // // // //                                 marginBottom: "8px",
// // // // // //                                 border: isSelected ? "2px solid #e84135" : "1px solid #ddd",
// // // // // //                                 cursor: "pointer",
// // // // // //                                 transition: "all 0.2s ease",
// // // // // //                               }}
// // // // // //                               onClick={() => setNihariSize(option.name)}
// // // // // //                             >
// // // // // //                               <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
// // // // // //                                 <div
// // // // // //                                   style={{
// // // // // //                                     width: "20px",
// // // // // //                                     height: "20px",
// // // // // //                                     borderRadius: "50%",
// // // // // //                                     border: isSelected ? "none" : "2px solid #ddd",
// // // // // //                                     backgroundColor: isSelected ? "white" : "transparent",
// // // // // //                                     display: "flex",
// // // // // //                                     alignItems: "center",
// // // // // //                                     justifyContent: "center",
// // // // // //                                   }}
// // // // // //                                 >
// // // // // //                                   {isSelected && (
// // // // // //                                     <div
// // // // // //                                       style={{
// // // // // //                                         width: "8px",
// // // // // //                                         height: "8px",
// // // // // //                                         borderRadius: "50%",
// // // // // //                                         backgroundColor: "#e84135",
// // // // // //                                       }}
// // // // // //                                     />
// // // // // //                                   )}
// // // // // //                                 </div>
// // // // // //                                 <span
// // // // // //                                   style={{
// // // // // //                                     fontWeight: isSelected ? "600" : "500",
// // // // // //                                     color: isSelected ? "white" : "#333",
// // // // // //                                   }}
// // // // // //                                 >
// // // // // //                                   {option.name}
// // // // // //                                 </span>
// // // // // //                               </div>
// // // // // //                               {option.price > 0 && (
// // // // // //                                 <span
// // // // // //                                   style={{
// // // // // //                                     fontWeight: "600",
// // // // // //                                     color: isSelected ? "white" : "#e84135",
// // // // // //                                   }}
// // // // // //                                 >
// // // // // //                                   +£{option.price.toFixed(2)}
// // // // // //                                 </span>
// // // // // //                               )}
// // // // // //                             </div>
// // // // // //                           )
// // // // // //                         })}
// // // // // //                       </div>
// // // // // //                     </div>
// // // // // //                   </div>
// // // // // //                 )}
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           )}
// // // // // //         </div>

// // // // // //         {/* Footer */}
// // // // // //         <div style={{ padding: "20px 24px", borderTop: "1px solid #dee2e6", backgroundColor: "#f8f9fa" }}>
// // // // // //           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
// // // // // //             <span style={{ fontWeight: "600", color: "#333" }}>Total:</span>
// // // // // //             <span style={{ fontWeight: "bold", fontSize: "18px", color: "#e84135" }}>£{totalCost.toFixed(2)}</span>
// // // // // //           </div>
// // // // // //           <button
// // // // // //             onClick={handleClick}
// // // // // //             disabled={isProceedDisabled()}
// // // // // //             style={{
// // // // // //               width: "100%",
// // // // // //               padding: "14px",
// // // // // //               backgroundColor: isProceedDisabled() ? "#ccc" : "#e84135",
// // // // // //               color: "white",
// // // // // //               border: "none",
// // // // // //               borderRadius: "12px",
// // // // // //               fontSize: "16px",
// // // // // //               fontWeight: "bold",
// // // // // //               cursor: isProceedDisabled() ? "not-allowed" : "pointer",
// // // // // //               transition: "all 0.2s ease",
// // // // // //               boxShadow: isProceedDisabled() ? "none" : "0 4px 12px rgba(232, 65, 53, 0.3)",
// // // // // //             }}
// // // // // //           >
// // // // // //             {isProceedDisabled() ? "Select Required Options" : "+ Add to Order"}
// // // // // //           </button>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       <style jsx>{`
// // // // // //         @keyframes spin {
// // // // // //           0% { transform: rotate(0deg); }
// // // // // //           100% { transform: rotate(360deg); }
// // // // // //         }
// // // // // //       `}</style>
// // // // // //     </div>
// // // // // //   )
// // // // // // }

// // // // // // export default AddonPopup

// // // // // "use client"

// // // // // import { useEffect, useState, useCallback, useRef } from "react"
// // // // // import { addToCart, chooseAdd } from "../utils/api"
// // // // // import { toast } from "react-toastify"
// // // // // import { useNavigate } from "react-router-dom"
// // // // // import { incrementCount } from "../store/feature/cartSlice"
// // // // // import { useDispatch, useSelector } from "react-redux"

// // // // // const AddonPopup = ({ onClose, food, restId }) => {
// // // // //   const storedUser = JSON.parse(localStorage.getItem("user"))
// // // // //   const activeTab = useSelector((store) => store.User.activeTab)
// // // // //   const dispatch = useDispatch()
// // // // //   const navigate = useNavigate()
// // // // //   const modalRef = useRef(null)

// // // // //   const [addon, setAddon] = useState([])
// // // // //   const [selectedSize, setSelectedSize] = useState("")
// // // // //   const [selectedItem, setSelectedItem] = useState({})
// // // // //   const [selectedOptions, setSelectedOptions] = useState({})
// // // // //   const [totalCost, setTotalCost] = useState(0)
// // // // //   const [loading, setLoading] = useState(true)
// // // // //   const [isVisible, setIsVisible] = useState(false)
  
// // // // //   // New state for step-by-step UI
// // // // //   const [openSection, setOpenSection] = useState("size")

// // // // //   useEffect(() => {
// // // // //     const fetchWithHighPriority = async () => {
// // // // //       if (!food?.pkid) {
// // // // //         setLoading(false)
// // // // //         return
// // // // //       }

// // // // //       try {
// // // // //         const controller = new AbortController()
// // // // //         const timeoutId = setTimeout(() => controller.abort(), 8000)

// // // // //         const data = {
// // // // //           catid: food.pkid,
// // // // //           isdelivery: "1",
// // // // //         }

// // // // //         const fetchOptions = {
// // // // //           signal: controller.signal,
// // // // //           priority: "high",
// // // // //           cache: "no-cache",
// // // // //         }

// // // // //         let res
// // // // //         try {
// // // // //           res = await chooseAdd(data, fetchOptions)
// // // // //         } catch (error) {
// // // // //           console.log("Fallback to regular fetch")
// // // // //           res = await chooseAdd(data)
// // // // //         }

// // // // //         clearTimeout(timeoutId)

// // // // //         if (res?.menutypes && res.menutypes.length > 0) {
// // // // //           const initialMenu = res.menutypes[0]

// // // // //           // Set initial selections based on API data
// // // // //           const initialOptions = {}
// // // // //           initialMenu.menutypecategorys?.forEach((category) => {
// // // // //             if (category.menutypesubcategorys?.length > 0) {
// // // // //               // For radio button categories (Choose One), select the first option by default
// // // // //               if (category.ismultiple === "0") {
// // // // //                 const firstSubcategory = category.menutypesubcategorys[0]
// // // // //                 initialOptions[category.menutypecategoryid] = [firstSubcategory.menutypesubcategoryid]
// // // // //               }
// // // // //             }
// // // // //           })

// // // // //           setAddon(res.menutypes)
// // // // //           setSelectedSize(initialMenu.type)
// // // // //           setSelectedItem(initialMenu)
// // // // //           setSelectedOptions(initialOptions)

// // // // //           // Calculate initial cost
// // // // //           let cost = Number.parseFloat(initialMenu.cost) || 0
// // // // //           Object.entries(initialOptions).forEach(([categoryId, selectedIds]) => {
// // // // //             initialMenu.menutypecategorys?.forEach((category) => {
// // // // //               if (category.menutypecategoryid === categoryId) {
// // // // //                 category.menutypesubcategorys?.forEach((subcategory) => {
// // // // //                   if (selectedIds.includes(subcategory.menutypesubcategoryid)) {
// // // // //                     cost += Number.parseFloat(subcategory.cost) || 0
// // // // //                   }
// // // // //                 })
// // // // //               }
// // // // //             })
// // // // //           })
// // // // //           setTotalCost(cost)
// // // // //         }
// // // // //       } catch (error) {
// // // // //         console.error("❌ API ERROR:", error)
// // // // //         toast.error("Failed to load options")
// // // // //       } finally {
// // // // //         setLoading(false)
// // // // //       }
// // // // //     }

// // // // //     fetchWithHighPriority()
// // // // //   }, [food?.pkid])

// // // // //   useEffect(() => {
// // // // //     setIsVisible(true)

// // // // //     const scrollY = window.scrollY
// // // // //     const body = document.body

// // // // //     body.style.overflow = 'hidden'
// // // // //     body.style.position = 'relative'
// // // // //     body.style.top = `-${scrollY}px`

// // // // //     return () => {
// // // // //       body.style.overflow = ''
// // // // //       body.style.position = ''
// // // // //       body.style.top = ''
// // // // //       window.scrollTo(0, scrollY)
// // // // //     }
// // // // //   }, [])

// // // // //   useEffect(() => {
// // // // //     if (!selectedItem || !selectedItem.cost) return

// // // // //     let total = Number.parseFloat(selectedItem.cost) || 0

// // // // //     Object.entries(selectedOptions).forEach(([categoryId, selectedIds]) => {
// // // // //       selectedItem.menutypecategorys?.forEach((category) => {
// // // // //         if (category.menutypecategoryid === categoryId) {
// // // // //           category.menutypesubcategorys?.forEach((subcategory) => {
// // // // //             if (selectedIds.includes(subcategory.menutypesubcategoryid)) {
// // // // //               total += Number.parseFloat(subcategory.cost) || 0
// // // // //             }
// // // // //           })
// // // // //         }
// // // // //       })
// // // // //     })

// // // // //     setTotalCost(total)
// // // // //   }, [selectedOptions, selectedItem])

// // // // //   const handleSizeChange = useCallback(
// // // // //     (size) => {
// // // // //       const selectedMenu = addon.find((menu) => menu.type === size)
// // // // //       if (!selectedMenu) return

// // // // //       setSelectedSize(size)
// // // // //       setSelectedItem(selectedMenu)

// // // // //       // Reset options when size changes and set defaults
// // // // //       const newOptions = {}
// // // // //       selectedMenu.menutypecategorys?.forEach((category) => {
// // // // //         if (category.menutypesubcategorys?.length > 0) {
// // // // //           // For radio button categories, select the first option by default
// // // // //           if (category.ismultiple === "0") {
// // // // //             const firstSubcategory = category.menutypesubcategorys[0]
// // // // //             newOptions[category.menutypecategoryid] = [firstSubcategory.menutypesubcategoryid]
// // // // //           }
// // // // //         }
// // // // //       })
// // // // //       setSelectedOptions(newOptions)
      
// // // // //       // Auto-advance to next section
// // // // //       setOpenSection("chooseOne")
// // // // //     },
// // // // //     [addon],
// // // // //   )

// // // // //   const handleOptionChange = useCallback(
// // // // //     (categoryId, subCategoryId) => {
// // // // //       setSelectedOptions((prevOptions) => {
// // // // //         const currentSelections = prevOptions[categoryId] || []
// // // // //         const category = selectedItem?.menutypecategorys?.find((cat) => cat.menutypecategoryid === categoryId)

// // // // //         if (!category) return prevOptions

// // // // //         const isMultipleAllowed = category.ismultiple === "1"
// // // // //         const maxSelections = Number.parseInt(category.multiple, 10) || 0

// // // // //         let updatedSelections

// // // // //         if (!isMultipleAllowed || maxSelections === 1) {
// // // // //           // Radio button behavior - only one selection allowed
// // // // //           updatedSelections = [subCategoryId]
// // // // //         } else {
// // // // //           // Checkbox behavior - multiple selections allowed
// // // // //           if (currentSelections.includes(subCategoryId)) {
// // // // //             updatedSelections = currentSelections.filter((id) => id !== subCategoryId)
// // // // //           } else {
// // // // //             updatedSelections =
// // // // //               maxSelections === 0 || currentSelections.length < maxSelections
// // // // //                 ? [...currentSelections, subCategoryId]
// // // // //                 : currentSelections
// // // // //           }
// // // // //         }

// // // // //         return {
// // // // //           ...prevOptions,
// // // // //           [categoryId]: updatedSelections,
// // // // //         }
// // // // //       })
// // // // //     },
// // // // //     [selectedItem],
// // // // //   )

// // // // //   const toggleSection = (section) => {
// // // // //     setOpenSection(openSection === section ? "" : section)
// // // // //   }

// // // // //   const isProceedDisabled = () => {
// // // // //     if (loading || !selectedItem) return true

// // // // //     const requiredCategories = selectedItem.menutypecategorys?.filter((category) => category.isrequired === "1")
// // // // //     if (!requiredCategories?.length) return false

// // // // //     return requiredCategories.some((category) => {
// // // // //       const selections = selectedOptions[category.menutypecategoryid]
// // // // //       return !selections || selections.length === 0
// // // // //     })
// // // // //   }

// // // // //   const handleClose = useCallback(() => {
// // // // //     setIsVisible(false)
// // // // //     setTimeout(() => {
// // // // //       onClose()
// // // // //     }, 150)
// // // // //   }, [onClose])

// // // // //   const handleClick = useCallback(async () => {
// // // // //     if (!storedUser) {
// // // // //       navigate("/login")
// // // // //       return
// // // // //     }

// // // // //     try {
// // // // //       const allSelectedValues = Object.values(selectedOptions).flat()

// // // // //       const sendData = {
// // // // //         userid: storedUser?.userid,
// // // // //         restId: restId,
// // // // //         type: activeTab === "Delivery" ? "delivery" : "takeaway",
// // // // //         catid: food.catid,
// // // // //         foodid: food.pkid,
// // // // //         typeid: selectedItem?.menutypeid || "",
// // // // //         extratopupid: allSelectedValues,
// // // // //         quantity: "1",
// // // // //         cartid: "",
// // // // //         cartdetailid: "",
// // // // //       }

// // // // //       const data = await addToCart(sendData)

// // // // //       if (data.status === "1") {
// // // // //         toast.success("Item added to cart!")
// // // // //         dispatch(incrementCount())
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error("Error adding to cart:", error)
// // // // //       toast.error("Something went wrong")
// // // // //     } finally {
// // // // //       handleClose()
// // // // //     }
// // // // //   }, [storedUser, navigate, selectedOptions, restId, activeTab, food, selectedItem, dispatch, handleClose])

// // // // //   // Get specific categories from the selected item
// // // // //   const chooseOneCategory = selectedItem?.menutypecategorys?.find(cat => 
// // // // //     cat.name === "Choose One"
// // // // //   )
  
// // // // //   const cuttingCategory = selectedItem?.menutypecategorys?.find(cat => 
// // // // //     cat.name === "Cutting"
// // // // //   )

// // // // //   return (
// // // // //     <div
// // // // //       style={{
// // // // //         position: "fixed",
// // // // //         top: 0,
// // // // //         left: 0,
// // // // //         right: 0,
// // // // //         bottom: 0,
// // // // //         backgroundColor: `rgba(0, 0, 0, ${isVisible ? 0.5 : 0})`,
// // // // //         display: "flex",
// // // // //         alignItems: "center",
// // // // //         justifyContent: "center",
// // // // //         padding: "10px",
// // // // //         zIndex: 1050,
// // // // //         transition: "background-color 0.15s ease",
// // // // //       }}
// // // // //       onClick={(e) => {
// // // // //         if (e.target === e.currentTarget) handleClose()
// // // // //       }}
// // // // //     >
// // // // //       <div
// // // // //         ref={modalRef}
// // // // //         style={{
// // // // //           width: "380px",
// // // // //           maxHeight: "85vh",
// // // // //           backgroundColor: "white",
// // // // //           borderRadius: "16px",
// // // // //           boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
// // // // //           overflow: "hidden",
// // // // //           transform: `scale(${isVisible ? 1 : 0.95}) translateY(${isVisible ? 0 : "10px"})`,
// // // // //           opacity: isVisible ? 1 : 0,
// // // // //           transition: "all 0.15s ease",
// // // // //         }}
// // // // //       >
// // // // //         {/* Header */}
// // // // //         <div
// // // // //           style={{
// // // // //             padding: "20px 24px",
// // // // //             backgroundColor: "#e84135",
// // // // //             color: "white",
// // // // //             borderBottom: "1px solid #dee2e6",
// // // // //           }}
// // // // //         >
// // // // //           <div className="d-flex justify-content-between align-items-center">
// // // // //             <div>
// // // // //               <h5 style={{ margin: 0, fontWeight: "bold", fontSize: "18px" }}>Customize Your Order</h5>
// // // // //               <p style={{ margin: "4px 0 0 0", fontSize: "14px", opacity: 0.9 }}>
// // // // //                 Total: £{totalCost.toFixed(2)}
// // // // //               </p>
// // // // //             </div>
// // // // //             <button
// // // // //               onClick={handleClose}
// // // // //               style={{
// // // // //                 background: "none",
// // // // //                 border: "none",
// // // // //                 fontSize: "24px",
// // // // //                 color: "white",
// // // // //                 cursor: "pointer",
// // // // //                 padding: "0",
// // // // //                 width: "24px",
// // // // //                 height: "24px",
// // // // //                 display: "flex",
// // // // //                 alignItems: "center",
// // // // //                 justifyContent: "center",
// // // // //               }}
// // // // //               aria-label="Close"
// // // // //             >
// // // // //               ×
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* Body */}
// // // // //         <div
// // // // //           style={{
// // // // //             padding: "0",
// // // // //             maxHeight: "calc(70vh - 140px)",
// // // // //             overflowY: "auto",
// // // // //             WebkitOverflowScrolling: "touch",
// // // // //           }}
// // // // //         >
// // // // //           {loading ? (
// // // // //             <div style={{ textAlign: "center", padding: "40px 20px" }}>
// // // // //               <div
// // // // //                 style={{
// // // // //                   width: "40px",
// // // // //                   height: "40px",
// // // // //                   border: "3px solid #f3f3f3",
// // // // //                   borderTop: "3px solid #e84135",
// // // // //                   borderRadius: "50%",
// // // // //                   animation: "spin 1s linear infinite",
// // // // //                   margin: "0 auto 16px",
// // // // //                 }}
// // // // //               />
// // // // //               <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>Loading options...</p>
// // // // //             </div>
// // // // //           ) : (
// // // // //             <div style={{ padding: "0" }}>
// // // // //               {/* Step 1: Size Selection */}
// // // // //               <div style={{ borderBottom: "1px solid #f0f0f0" }}>
// // // // //                 <div
// // // // //                   style={{
// // // // //                     padding: "16px 20px",
// // // // //                     backgroundColor: openSection === "size" ? "#f8f9fa" : "white",
// // // // //                     cursor: "pointer",
// // // // //                     display: "flex",
// // // // //                     justifyContent: "space-between",
// // // // //                     alignItems: "center",
// // // // //                   }}
// // // // //                   onClick={() => toggleSection("size")}
// // // // //                 >
// // // // //                   <div>
// // // // //                     <h6 style={{ margin: 0, fontWeight: "600", color: "#333" }}>1. Choose Size & Price</h6>
// // // // //                     <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#666" }}>
// // // // //                       {selectedSize || "Select your preferred size"}
// // // // //                     </p>
// // // // //                   </div>
// // // // //                   <i 
// // // // //                     className={`ri-arrow-down-s-line`} 
// // // // //                     style={{ 
// // // // //                       fontSize: "18px", 
// // // // //                       color: "#666",
// // // // //                       transform: openSection === "size" ? "rotate(180deg)" : "rotate(0deg)",
// // // // //                       transition: "transform 0.2s ease"
// // // // //                     }}
// // // // //                   />
// // // // //                 </div>
                
// // // // //                 {openSection === "size" && (
// // // // //                   <div style={{ padding: "0 20px 16px 20px", backgroundColor: "#f8f9fa" }}>
// // // // //                     {addon.map((menu) => {
// // // // //                       const isSelected = selectedSize === menu.type
// // // // //                       return (
// // // // //                         <div
// // // // //                           key={menu.menutypeid}
// // // // //                           style={{
// // // // //                             display: "flex",
// // // // //                             alignItems: "center",
// // // // //                             justifyContent: "space-between",
// // // // //                             padding: "12px",
// // // // //                             borderRadius: "8px",
// // // // //                             backgroundColor: isSelected ? "#e84135" : "white",
// // // // //                             marginBottom: "8px",
// // // // //                             border: isSelected ? "2px solid #e84135" : "1px solid #ddd",
// // // // //                             cursor: "pointer",
// // // // //                             transition: "all 0.2s ease",
// // // // //                           }}
// // // // //                           onClick={() => handleSizeChange(menu.type)}
// // // // //                         >
// // // // //                           <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
// // // // //                             <div
// // // // //                               style={{
// // // // //                                 width: "20px",
// // // // //                                 height: "20px",
// // // // //                                 borderRadius: "50%",
// // // // //                                 border: isSelected ? "none" : "2px solid #ddd",
// // // // //                                 backgroundColor: isSelected ? "white" : "transparent",
// // // // //                                 display: "flex",
// // // // //                                 alignItems: "center",
// // // // //                                 justifyContent: "center",
// // // // //                               }}
// // // // //                             >
// // // // //                               {isSelected && (
// // // // //                                 <div
// // // // //                                   style={{
// // // // //                                     width: "8px",
// // // // //                                     height: "8px",
// // // // //                                     borderRadius: "50%",
// // // // //                                     backgroundColor: "#e84135",
// // // // //                                   }}
// // // // //                                 />
// // // // //                               )}
// // // // //                             </div>
// // // // //                             <span
// // // // //                               style={{
// // // // //                                 fontWeight: isSelected ? "600" : "500",
// // // // //                                 color: isSelected ? "white" : "#333",
// // // // //                               }}
// // // // //                             >
// // // // //                               {menu.type}
// // // // //                             </span>
// // // // //                           </div>
// // // // //                           <span
// // // // //                             style={{
// // // // //                               fontWeight: "600",
// // // // //                               color: isSelected ? "white" : "#e84135",
// // // // //                             }}
// // // // //                           >
// // // // //                             £{menu.cost}
// // // // //                           </span>
// // // // //                         </div>
// // // // //                       )
// // // // //                     })}
// // // // //                   </div>
// // // // //                 )}
// // // // //               </div>

// // // // //               {/* Step 2: Choose One (With Fat/Without Fat) */}
// // // // //               {chooseOneCategory && (
// // // // //                 <div style={{ borderBottom: "1px solid #f0f0f0" }}>
// // // // //                   <div
// // // // //                     style={{
// // // // //                       padding: "16px 20px",
// // // // //                       backgroundColor: openSection === "chooseOne" ? "#f8f9fa" : "white",
// // // // //                       cursor: "pointer",
// // // // //                       display: "flex",
// // // // //                       justifyContent: "space-between",
// // // // //                       alignItems: "center",
// // // // //                     }}
// // // // //                     onClick={() => toggleSection("chooseOne")}
// // // // //                   >
// // // // //                     <div>
// // // // //                       <h6 style={{ margin: 0, fontWeight: "600", color: "#333" }}>2. Choose One</h6>
// // // // //                       <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#666" }}>
// // // // //                         Select your preferred option
// // // // //                       </p>
// // // // //                     </div>
// // // // //                     <i 
// // // // //                       className={`ri-arrow-down-s-line`} 
// // // // //                       style={{ 
// // // // //                         fontSize: "18px", 
// // // // //                         color: "#666",
// // // // //                         transform: openSection === "chooseOne" ? "rotate(180deg)" : "rotate(0deg)",
// // // // //                         transition: "transform 0.2s ease"
// // // // //                       }}
// // // // //                     />
// // // // //                   </div>
                  
// // // // //                   {openSection === "chooseOne" && (
// // // // //                     <div style={{ padding: "0 20px 16px 20px", backgroundColor: "#f8f9fa" }}>
// // // // //                       <div style={{ marginBottom: "16px" }}>
// // // // //                         <h6 style={{ margin: "0 0 12px 0", fontWeight: "600", fontSize: "14px" }}>
// // // // //                           {chooseOneCategory.name}
// // // // //                           <span style={{ fontSize: "12px", color: "#e84135", marginLeft: "8px" }}>
// // // // //                             (1) Required
// // // // //                           </span>
// // // // //                         </h6>
// // // // //                         <div>
// // // // //                           {chooseOneCategory.menutypesubcategorys?.map((subcategory) => {
// // // // //                             const isSelected = selectedOptions[chooseOneCategory.menutypecategoryid]?.includes(
// // // // //                               subcategory.menutypesubcategoryid
// // // // //                             )
// // // // //                             return (
// // // // //                               <div
// // // // //                                 key={subcategory.menutypesubcategoryid}
// // // // //                                 style={{
// // // // //                                   display: "flex",
// // // // //                                   alignItems: "center",
// // // // //                                   justifyContent: "space-between",
// // // // //                                   padding: "12px",
// // // // //                                   borderRadius: "8px",
// // // // //                                   backgroundColor: isSelected ? "#e84135" : "white",
// // // // //                                   marginBottom: "8px",
// // // // //                                   border: isSelected ? "2px solid #e84135" : "1px solid #ddd",
// // // // //                                   cursor: "pointer",
// // // // //                                   transition: "all 0.2s ease",
// // // // //                                 }}
// // // // //                                 onClick={() => handleOptionChange(chooseOneCategory.menutypecategoryid, subcategory.menutypesubcategoryid)}
// // // // //                               >
// // // // //                                 <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
// // // // //                                   <div
// // // // //                                     style={{
// // // // //                                       width: "20px",
// // // // //                                       height: "20px",
// // // // //                                       borderRadius: "50%",
// // // // //                                       border: isSelected ? "none" : "2px solid #ddd",
// // // // //                                       backgroundColor: isSelected ? "white" : "transparent",
// // // // //                                       display: "flex",
// // // // //                                       alignItems: "center",
// // // // //                                       justifyContent: "center",
// // // // //                                     }}
// // // // //                                   >
// // // // //                                     {isSelected && (
// // // // //                                       <div
// // // // //                                         style={{
// // // // //                                           width: "8px",
// // // // //                                           height: "8px",
// // // // //                                           borderRadius: "50%",
// // // // //                                           backgroundColor: "#e84135",
// // // // //                                         }}
// // // // //                                       />
// // // // //                                     )}
// // // // //                                   </div>
// // // // //                                   <span
// // // // //                                     style={{
// // // // //                                       fontWeight: isSelected ? "600" : "500",
// // // // //                                       color: isSelected ? "white" : "#333",
// // // // //                                     }}
// // // // //                                   >
// // // // //                                     {subcategory.name}
// // // // //                                   </span>
// // // // //                                 </div>
// // // // //                                 {Number.parseFloat(subcategory.cost) > 0 && (
// // // // //                                   <span
// // // // //                                     style={{
// // // // //                                       fontWeight: "600",
// // // // //                                       color: isSelected ? "white" : "#e84135",
// // // // //                                     }}
// // // // //                                   >
// // // // //                                     +£{subcategory.cost}
// // // // //                                   </span>
// // // // //                                 )}
// // // // //                               </div>
// // // // //                             )
// // // // //                           })}
// // // // //                         </div>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   )}
// // // // //                 </div>
// // // // //               )}

// // // // //               {/* Step 3: Cutting Options */}
// // // // //               {cuttingCategory && (
// // // // //                 <div style={{ borderBottom: "1px solid #f0f0f0" }}>
// // // // //                   <div
// // // // //                     style={{
// // // // //                       padding: "16px 20px",
// // // // //                       backgroundColor: openSection === "cutting" ? "#f8f9fa" : "white",
// // // // //                       cursor: "pointer",
// // // // //                       display: "flex",
// // // // //                       justifyContent: "space-between",
// // // // //                       alignItems: "center",
// // // // //                     }}
// // // // //                     onClick={() => toggleSection("cutting")}
// // // // //                   >
// // // // //                     <div>
// // // // //                       <h6 style={{ margin: 0, fontWeight: "600", color: "#333" }}>3. Cutting Style</h6>
// // // // //                       <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#666" }}>
// // // // //                         Choose how you want it cut
// // // // //                       </p>
// // // // //                     </div>
// // // // //                     <i 
// // // // //                       className={`ri-arrow-down-s-line`} 
// // // // //                       style={{ 
// // // // //                         fontSize: "18px", 
// // // // //                         color: "#666",
// // // // //                         transform: openSection === "cutting" ? "rotate(180deg)" : "rotate(0deg)",
// // // // //                         transition: "transform 0.2s ease"
// // // // //                       }}
// // // // //                     />
// // // // //                   </div>
                  
// // // // //                   {openSection === "cutting" && (
// // // // //                     <div style={{ padding: "0 20px 16px 20px", backgroundColor: "#f8f9fa" }}>
// // // // //                       <div style={{ marginBottom: "16px" }}>
// // // // //                         <h6 style={{ margin: "0 0 12px 0", fontWeight: "600", fontSize: "14px" }}>
// // // // //                           {cuttingCategory.name}
// // // // //                           <span style={{ fontSize: "12px", color: "#e84135", marginLeft: "8px" }}>
// // // // //                             (1) Required
// // // // //                           </span>
// // // // //                         </h6>
// // // // //                         <div>
// // // // //                           {cuttingCategory.menutypesubcategorys
// // // // //                             ?.filter(subcategory => subcategory.name !== "Nihari Size") // Filter out the "Nihari Size" header
// // // // //                             .map((subcategory) => {
// // // // //                               const isSelected = selectedOptions[cuttingCategory.menutypecategoryid]?.includes(
// // // // //                                 subcategory.menutypesubcategoryid
// // // // //                               )
// // // // //                               return (
// // // // //                                 <div
// // // // //                                   key={subcategory.menutypesubcategoryid}
// // // // //                                   style={{
// // // // //                                     display: "flex",
// // // // //                                     alignItems: "center",
// // // // //                                     justifyContent: "space-between",
// // // // //                                     padding: "12px",
// // // // //                                     borderRadius: "8px",
// // // // //                                     backgroundColor: isSelected ? "#e84135" : "white",
// // // // //                                     marginBottom: "8px",
// // // // //                                     border: isSelected ? "2px solid #e84135" : "1px solid #ddd",
// // // // //                                     cursor: "pointer",
// // // // //                                     transition: "all 0.2s ease",
// // // // //                                   }}
// // // // //                                   onClick={() => handleOptionChange(cuttingCategory.menutypecategoryid, subcategory.menutypesubcategoryid)}
// // // // //                                 >
// // // // //                                   <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
// // // // //                                     <div
// // // // //                                       style={{
// // // // //                                         width: "20px",
// // // // //                                         height: "20px",
// // // // //                                         borderRadius: "50%",
// // // // //                                         border: isSelected ? "none" : "2px solid #ddd",
// // // // //                                         backgroundColor: isSelected ? "white" : "transparent",
// // // // //                                         display: "flex",
// // // // //                                         alignItems: "center",
// // // // //                                         justifyContent: "center",
// // // // //                                       }}
// // // // //                                     >
// // // // //                                       {isSelected && (
// // // // //                                         <div
// // // // //                                           style={{
// // // // //                                             width: "8px",
// // // // //                                             height: "8px",
// // // // //                                             borderRadius: "50%",
// // // // //                                             backgroundColor: "#e84135",
// // // // //                                           }}
// // // // //                                         />
// // // // //                                       )}
// // // // //                                     </div>
// // // // //                                     <span
// // // // //                                       style={{
// // // // //                                         fontWeight: isSelected ? "600" : "500",
// // // // //                                         color: isSelected ? "white" : "#333",
// // // // //                                       }}
// // // // //                                     >
// // // // //                                       {subcategory.name}
// // // // //                                     </span>
// // // // //                                   </div>
// // // // //                                   {Number.parseFloat(subcategory.cost) > 0 && (
// // // // //                                     <span
// // // // //                                       style={{
// // // // //                                         fontWeight: "600",
// // // // //                                         color: isSelected ? "white" : "#e84135",
// // // // //                                       }}
// // // // //                                     >
// // // // //                                       +£{subcategory.cost}
// // // // //                                     </span>
// // // // //                                   )}
// // // // //                                 </div>
// // // // //                               )
// // // // //                             })}
// // // // //                         </div>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   )}
// // // // //                 </div>
// // // // //               )}
// // // // //             </div>
// // // // //           )}
// // // // //         </div>

// // // // //         {/* Footer */}
// // // // //         <div style={{ padding: "20px 24px", borderTop: "1px solid #dee2e6", backgroundColor: "#f8f9fa" }}>
// // // // //           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
// // // // //             <span style={{ fontWeight: "600", color: "#333" }}>Total:</span>
// // // // //             <span style={{ fontWeight: "bold", fontSize: "18px", color: "#e84135" }}>£{totalCost.toFixed(2)}</span>
// // // // //           </div>
// // // // //           <button
// // // // //             onClick={handleClick}
// // // // //             disabled={isProceedDisabled()}
// // // // //             style={{
// // // // //               width: "100%",
// // // // //               padding: "14px",
// // // // //               backgroundColor: isProceedDisabled() ? "#ccc" : "#e84135",
// // // // //               color: "white",
// // // // //               border: "none",
// // // // //               borderRadius: "12px",
// // // // //               fontSize: "16px",
// // // // //               fontWeight: "bold",
// // // // //               cursor: isProceedDisabled() ? "not-allowed" : "pointer",
// // // // //               transition: "all 0.2s ease",
// // // // //               boxShadow: isProceedDisabled() ? "none" : "0 4px 12px rgba(232, 65, 53, 0.3)",
// // // // //             }}
// // // // //           >
// // // // //             {isProceedDisabled() ? "Select Required Options" : "+ Add to Order"}
// // // // //           </button>
// // // // //         </div>
// // // // //       </div>

// // // // //       <style jsx>{`
// // // // //         @keyframes spin {
// // // // //           0% { transform: rotate(0deg); }
// // // // //           100% { transform: rotate(360deg); }
// // // // //         }
// // // // //       `}</style>
// // // // //     </div>
// // // // //   )
// // // // // }

// // // // // export default AddonPopup

// // // // "use client"

// // // // import { useEffect, useState, useCallback, useRef } from "react"
// // // // import { addToCart, chooseAdd } from "../utils/api"
// // // // import { toast } from "react-toastify"
// // // // import { useNavigate } from "react-router-dom"
// // // // import { incrementCount } from "../store/feature/cartSlice"
// // // // import { useDispatch, useSelector } from "react-redux"

// // // // const AddonPopup = ({ onClose, food, restId }) => {
// // // //   const storedUser = JSON.parse(localStorage.getItem("user"))
// // // //   const activeTab = useSelector((store) => store.User.activeTab)
// // // //   const dispatch = useDispatch()
// // // //   const navigate = useNavigate()
// // // //   const modalRef = useRef(null)

// // // //   const [addon, setAddon] = useState([])
// // // //   const [selectedSize, setSelectedSize] = useState("")
// // // //   const [selectedItem, setSelectedItem] = useState({})
// // // //   const [selectedOptions, setSelectedOptions] = useState({})
// // // //   const [totalCost, setTotalCost] = useState(0)
// // // //   const [loading, setLoading] = useState(true)
// // // //   const [isVisible, setIsVisible] = useState(false)
  
// // // //   // New state for step-by-step UI - start with size selection open
// // // //   const [currentStep, setCurrentStep] = useState("size")

// // // //   useEffect(() => {
// // // //     const fetchWithHighPriority = async () => {
// // // //       if (!food?.pkid) {
// // // //         setLoading(false)
// // // //         return
// // // //       }

// // // //       try {
// // // //         const controller = new AbortController()
// // // //         const timeoutId = setTimeout(() => controller.abort(), 8000)

// // // //         const data = {
// // // //           catid: food.pkid,
// // // //           isdelivery: "1",
// // // //         }

// // // //         const fetchOptions = {
// // // //           signal: controller.signal,
// // // //           priority: "high",
// // // //           cache: "no-cache",
// // // //         }

// // // //         let res
// // // //         try {
// // // //           res = await chooseAdd(data, fetchOptions)
// // // //         } catch (error) {
// // // //           console.log("Fallback to regular fetch")
// // // //           res = await chooseAdd(data)
// // // //         }

// // // //         clearTimeout(timeoutId)

// // // //         if (res?.menutypes && res.menutypes.length > 0) {
// // // //           // Don't select any options by default
// // // //           setAddon(res.menutypes)
// // // //           setSelectedSize("")
// // // //           setSelectedItem({})
// // // //           setSelectedOptions({})
// // // //           setTotalCost(0)
// // // //         }
// // // //       } catch (error) {
// // // //         console.error("❌ API ERROR:", error)
// // // //         toast.error("Failed to load options")
// // // //       } finally {
// // // //         setLoading(false)
// // // //       }
// // // //     }

// // // //     fetchWithHighPriority()
// // // //   }, [food?.pkid])

// // // //   useEffect(() => {
// // // //     setIsVisible(true)

// // // //     const scrollY = window.scrollY
// // // //     const body = document.body

// // // //     body.style.overflow = 'hidden'
// // // //     body.style.position = 'relative'
// // // //     body.style.top = `-${scrollY}px`

// // // //     return () => {
// // // //       body.style.overflow = ''
// // // //       body.style.position = ''
// // // //       body.style.top = ''
// // // //       window.scrollTo(0, scrollY)
// // // //     }
// // // //   }, [])

// // // //   useEffect(() => {
// // // //     if (!selectedItem || !selectedItem.cost) return

// // // //     let total = Number.parseFloat(selectedItem.cost) || 0

// // // //     Object.entries(selectedOptions).forEach(([categoryId, selectedIds]) => {
// // // //       selectedItem.menutypecategorys?.forEach((category) => {
// // // //         if (category.menutypecategoryid === categoryId) {
// // // //           category.menutypesubcategorys?.forEach((subcategory) => {
// // // //             if (selectedIds.includes(subcategory.menutypesubcategoryid)) {
// // // //               total += Number.parseFloat(subcategory.cost) || 0
// // // //             }
// // // //           })
// // // //         }
// // // //       })
// // // //     })

// // // //     setTotalCost(total)
// // // //   }, [selectedOptions, selectedItem])

// // // //   const handleSizeChange = useCallback(
// // // //     (size) => {
// // // //       const selectedMenu = addon.find((menu) => menu.type === size)
// // // //       if (!selectedMenu) return

// // // //       setSelectedSize(size)
// // // //       setSelectedItem(selectedMenu)

// // // //       // Reset options when size changes
// // // //       setSelectedOptions({})
      
// // // //       // Auto-advance to next section
// // // //       const chooseOneCategory = selectedMenu.menutypecategorys?.find(cat => 
// // // //         cat.name === "Choose One"
// // // //       )
// // // //       if (chooseOneCategory) {
// // // //         setCurrentStep("chooseOne")
// // // //       } else {
// // // //         // If no "Choose One" category, check for cutting category
// // // //         const cuttingCategory = selectedMenu.menutypecategorys?.find(cat => 
// // // //           cat.name === "Cutting"
// // // //         )
// // // //         if (cuttingCategory) {
// // // //           setCurrentStep("cutting")
// // // //         } else {
// // // //           setCurrentStep("complete")
// // // //         }
// // // //       }
// // // //     },
// // // //     [addon],
// // // //   )

// // // //   const handleOptionChange = useCallback(
// // // //     (categoryId, subCategoryId, categoryName) => {
// // // //       setSelectedOptions((prevOptions) => {
// // // //         const currentSelections = prevOptions[categoryId] || []
// // // //         const category = selectedItem?.menutypecategorys?.find((cat) => cat.menutypecategoryid === categoryId)

// // // //         if (!category) return prevOptions

// // // //         const isMultipleAllowed = category.ismultiple === "1"
// // // //         const maxSelections = Number.parseInt(category.multiple, 10) || 0

// // // //         let updatedSelections

// // // //         if (!isMultipleAllowed || maxSelections === 1) {
// // // //           // Radio button behavior - only one selection allowed
// // // //           updatedSelections = [subCategoryId]
// // // //         } else {
// // // //           // Checkbox behavior - multiple selections allowed
// // // //           if (currentSelections.includes(subCategoryId)) {
// // // //             updatedSelections = currentSelections.filter((id) => id !== subCategoryId)
// // // //           } else {
// // // //             updatedSelections =
// // // //               maxSelections === 0 || currentSelections.length < maxSelections
// // // //                 ? [...currentSelections, subCategoryId]
// // // //                 : currentSelections
// // // //           }
// // // //         }

// // // //         const newOptions = {
// // // //           ...prevOptions,
// // // //           [categoryId]: updatedSelections,
// // // //         }

// // // //         // Auto-advance to next step after selection
// // // //         setTimeout(() => {
// // // //           if (categoryName === "Choose One") {
// // // //             const cuttingCategory = selectedItem?.menutypecategorys?.find(cat => 
// // // //               cat.name === "Cutting"
// // // //             )
// // // //             if (cuttingCategory) {
// // // //               setCurrentStep("cutting")
// // // //             } else {
// // // //               setCurrentStep("complete")
// // // //             }
// // // //           } else if (categoryName === "Cutting") {
// // // //             setCurrentStep("complete")
// // // //           }
// // // //         }, 300)

// // // //         return newOptions
// // // //       })
// // // //     },
// // // //     [selectedItem],
// // // //   )

// // // //   const isProceedDisabled = () => {
// // // //     if (loading || !selectedItem) return true

// // // //     const requiredCategories = selectedItem.menutypecategorys?.filter((category) => category.isrequired === "1")
// // // //     if (!requiredCategories?.length) return false

// // // //     return requiredCategories.some((category) => {
// // // //       const selections = selectedOptions[category.menutypecategoryid]
// // // //       return !selections || selections.length === 0
// // // //     })
// // // //   }

// // // //   const handleClose = useCallback(() => {
// // // //     setIsVisible(false)
// // // //     setTimeout(() => {
// // // //       onClose()
// // // //     }, 150)
// // // //   }, [onClose])

// // // //   const handleClick = useCallback(async () => {
// // // //     if (!storedUser) {
// // // //       navigate("/login")
// // // //       return
// // // //     }

// // // //     try {
// // // //       const allSelectedValues = Object.values(selectedOptions).flat()

// // // //       const sendData = {
// // // //         userid: storedUser?.userid,
// // // //         restId: restId,
// // // //         type: activeTab === "Delivery" ? "delivery" : "takeaway",
// // // //         catid: food.catid,
// // // //         foodid: food.pkid,
// // // //         typeid: selectedItem?.menutypeid || "",
// // // //         extratopupid: allSelectedValues,
// // // //         quantity: "1",
// // // //         cartid: "",
// // // //         cartdetailid: "",
// // // //       }

// // // //       const data = await addToCart(sendData)

// // // //       if (data.status === "1") {
// // // //         toast.success("Item added to cart!")
// // // //         dispatch(incrementCount())
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error adding to cart:", error)
// // // //       toast.error("Something went wrong")
// // // //     } finally {
// // // //       handleClose()
// // // //     }
// // // //   }, [storedUser, navigate, selectedOptions, restId, activeTab, food, selectedItem, dispatch, handleClose])

// // // //   // Get specific categories from the selected item
// // // //   const chooseOneCategory = selectedItem?.menutypecategorys?.find(cat => 
// // // //     cat.name === "Choose One"
// // // //   )
  
// // // //   const cuttingCategory = selectedItem?.menutypecategorys?.find(cat => 
// // // //     cat.name === "Cutting"
// // // //   )

// // // //   // Step progress indicator
// // // //   const getStepStatus = (step) => {
// // // //     if (step === "size") {
// // // //       return selectedSize ? "completed" : "current"
// // // //     } else if (step === "chooseOne") {
// // // //       if (!chooseOneCategory) return "skipped"
// // // //       const hasSelection = selectedOptions[chooseOneCategory?.menutypecategoryid]?.length > 0
// // // //       if (currentStep === "chooseOne") return "current"
// // // //       return hasSelection ? "completed" : "pending"
// // // //     } else if (step === "cutting") {
// // // //       if (!cuttingCategory) return "skipped"
// // // //       const hasSelection = selectedOptions[cuttingCategory?.menutypecategoryid]?.length > 0
// // // //       if (currentStep === "cutting") return "current"
// // // //       return hasSelection ? "completed" : "pending"
// // // //     }
// // // //     return "pending"
// // // //   }

// // // //   return (
// // // //     <div
// // // //       style={{
// // // //         position: "fixed",
// // // //         top: 0,
// // // //         left: 0,
// // // //         right: 0,
// // // //         bottom: 0,
// // // //         backgroundColor: `rgba(0, 0, 0, ${isVisible ? 0.5 : 0})`,
// // // //         display: "flex",
// // // //         alignItems: "center",
// // // //         justifyContent: "center",
// // // //         padding: "10px",
// // // //         zIndex: 1050,
// // // //         transition: "background-color 0.15s ease",
// // // //       }}
// // // //       onClick={(e) => {
// // // //         if (e.target === e.currentTarget) handleClose()
// // // //       }}
// // // //     >
// // // //       <div
// // // //         ref={modalRef}
// // // //         style={{
// // // //           width: "380px",
// // // //           maxHeight: "85vh",
// // // //           backgroundColor: "white",
// // // //           borderRadius: "16px",
// // // //           boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
// // // //           overflow: "hidden",
// // // //           transform: `scale(${isVisible ? 1 : 0.95}) translateY(${isVisible ? 0 : "10px"})`,
// // // //           opacity: isVisible ? 1 : 0,
// // // //           transition: "all 0.15s ease",
// // // //         }}
// // // //       >
// // // //         {/* Header */}
// // // //         <div
// // // //           style={{
// // // //             padding: "20px 24px",
// // // //             backgroundColor: "#e84135",
// // // //             color: "white",
// // // //             borderBottom: "1px solid #dee2e6",
// // // //           }}
// // // //         >
// // // //           <div className="d-flex justify-content-between align-items-center">
// // // //             <div>
// // // //               <h5 style={{ margin: 0, fontWeight: "bold", fontSize: "18px" }}>Customize Your Order</h5>
// // // //               <p style={{ margin: "4px 0 0 0", fontSize: "14px", opacity: 0.9 }}>
// // // //                 Total: £{totalCost.toFixed(2)}
// // // //               </p>
// // // //             </div>
// // // //             <button
// // // //               onClick={handleClose}
// // // //               style={{
// // // //                 background: "none",
// // // //                 border: "none",
// // // //                 fontSize: "24px",
// // // //                 color: "white",
// // // //                 cursor: "pointer",
// // // //                 padding: "0",
// // // //                 width: "24px",
// // // //                 height: "24px",
// // // //                 display: "flex",
// // // //                 alignItems: "center",
// // // //                 justifyContent: "center",
// // // //               }}
// // // //               aria-label="Close"
// // // //             >
// // // //               ×
// // // //             </button>
// // // //           </div>
// // // //         </div>

// // // //         {/* Body */}
// // // //         <div
// // // //           style={{
// // // //             padding: "0",
// // // //             maxHeight: "calc(70vh - 140px)",
// // // //             overflowY: "auto",
// // // //             WebkitOverflowScrolling: "touch",
// // // //           }}
// // // //         >
// // // //           {loading ? (
// // // //             <div style={{ textAlign: "center", padding: "40px 20px" }}>
// // // //               <div
// // // //                 style={{
// // // //                   width: "40px",
// // // //                   height: "40px",
// // // //                   border: "3px solid #f3f3f3",
// // // //                   borderTop: "3px solid #e84135",
// // // //                   borderRadius: "50%",
// // // //                   animation: "spin 1s linear infinite",
// // // //                   margin: "0 auto 16px",
// // // //                 }}
// // // //               />
// // // //               <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>Loading options...</p>
// // // //             </div>
// // // //           ) : (
// // // //             <div style={{ padding: "20px" }}>
// // // //               {/* Step Progress Indicator */}
// // // //               <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
// // // //                 <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
// // // //                   {/* Size Step */}
// // // //                   <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
// // // //                     <div
// // // //                       style={{
// // // //                         width: "24px",
// // // //                         height: "24px",
// // // //                         borderRadius: "50%",
// // // //                         backgroundColor: getStepStatus("size") === "completed" ? "#e84135" : 
// // // //                                         getStepStatus("size") === "current" ? "#e84135" : "#ddd",
// // // //                         color: "white",
// // // //                         display: "flex",
// // // //                         alignItems: "center",
// // // //                         justifyContent: "center",
// // // //                         fontSize: "12px",
// // // //                         fontWeight: "bold",
// // // //                       }}
// // // //                     >
// // // //                       {getStepStatus("size") === "completed" ? "✓" : "1"}
// // // //                     </div>
// // // //                     <div style={{ marginLeft: "8px", flex: 1 }}>
// // // //                       <div style={{ fontSize: "12px", fontWeight: "600", color: "#333" }}>Size</div>
// // // //                       <div style={{ fontSize: "10px", color: "#666" }}>Choose portion</div>
// // // //                     </div>
// // // //                   </div>

// // // //                   {/* Choose One Step */}
// // // //                   {chooseOneCategory && (
// // // //                     <>
// // // //                       <div style={{ width: "20px", height: "2px", backgroundColor: getStepStatus("chooseOne") !== "pending" ? "#e84135" : "#ddd", margin: "0 8px" }} />
// // // //                       <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
// // // //                         <div
// // // //                           style={{
// // // //                             width: "24px",
// // // //                             height: "24px",
// // // //                             borderRadius: "50%",
// // // //                             backgroundColor: getStepStatus("chooseOne") === "completed" ? "#e84135" : 
// // // //                                             getStepStatus("chooseOne") === "current" ? "#e84135" : "#ddd",
// // // //                             color: "white",
// // // //                             display: "flex",
// // // //                             alignItems: "center",
// // // //                             justifyContent: "center",
// // // //                             fontSize: "12px",
// // // //                             fontWeight: "bold",
// // // //                           }}
// // // //                         >
// // // //                           {getStepStatus("chooseOne") === "completed" ? "✓" : "2"}
// // // //                         </div>
// // // //                         <div style={{ marginLeft: "8px", flex: 1 }}>
// // // //                           <div style={{ fontSize: "12px", fontWeight: "600", color: "#333" }}>Options</div>
// // // //                           <div style={{ fontSize: "10px", color: "#666" }}>Choose one</div>
// // // //                         </div>
// // // //                       </div>
// // // //                     </>
// // // //                   )}

// // // //                   {/* Cutting Step */}
// // // //                   {cuttingCategory && (
// // // //                     <>
// // // //                       <div style={{ width: "20px", height: "2px", backgroundColor: getStepStatus("cutting") !== "pending" ? "#e84135" : "#ddd", margin: "0 8px" }} />
// // // //                       <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
// // // //                         <div
// // // //                           style={{
// // // //                             width: "24px",
// // // //                             height: "24px",
// // // //                             borderRadius: "50%",
// // // //                             backgroundColor: getStepStatus("cutting") === "completed" ? "#e84135" : 
// // // //                                             getStepStatus("cutting") === "current" ? "#e84135" : "#ddd",
// // // //                             color: "white",
// // // //                             display: "flex",
// // // //                             alignItems: "center",
// // // //                             justifyContent: "center",
// // // //                             fontSize: "12px",
// // // //                             fontWeight: "bold",
// // // //                           }}
// // // //                         >
// // // //                           {getStepStatus("cutting") === "completed" ? "✓" : "3"}
// // // //                         </div>
// // // //                         <div style={{ marginLeft: "8px", flex: 1 }}>
// // // //                           <div style={{ fontSize: "12px", fontWeight: "600", color: "#333" }}>Cutting</div>
// // // //                           <div style={{ fontSize: "10px", color: "#666" }}>Cut style</div>
// // // //                         </div>
// // // //                       </div>
// // // //                     </>
// // // //                   )}
// // // //                 </div>
// // // //               </div>

// // // //               {/* Step 1: Size Selection - Always visible when current step */}
// // // //               {currentStep === "size" && (
// // // //                 <div style={{ marginBottom: "24px" }}>
// // // //                   <h6 style={{ margin: "0 0 16px 0", fontWeight: "600", color: "#333", fontSize: "16px" }}>
// // // //                     1. Choose Size & Price
// // // //                   </h6>
// // // //                   <div>
// // // //                     {addon.map((menu) => {
// // // //                       const isSelected = selectedSize === menu.type
// // // //                       return (
// // // //                         <div
// // // //                           key={menu.menutypeid}
// // // //                           style={{
// // // //                             display: "flex",
// // // //                             alignItems: "center",
// // // //                             justifyContent: "space-between",
// // // //                             padding: "16px",
// // // //                             borderRadius: "12px",
// // // //                             backgroundColor: isSelected ? "#e84135" : "white",
// // // //                             marginBottom: "12px",
// // // //                             border: isSelected ? "2px solid #e84135" : "1px solid #ddd",
// // // //                             cursor: "pointer",
// // // //                             transition: "all 0.2s ease",
// // // //                           }}
// // // //                           onClick={() => handleSizeChange(menu.type)}
// // // //                         >
// // // //                           <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
// // // //                             <div
// // // //                               style={{
// // // //                                 width: "20px",
// // // //                                 height: "20px",
// // // //                                 borderRadius: "50%",
// // // //                                 border: isSelected ? "none" : "2px solid #ddd",
// // // //                                 backgroundColor: isSelected ? "white" : "transparent",
// // // //                                 display: "flex",
// // // //                                 alignItems: "center",
// // // //                                 justifyContent: "center",
// // // //                               }}
// // // //                             >
// // // //                               {isSelected && (
// // // //                                 <div
// // // //                                   style={{
// // // //                                     width: "8px",
// // // //                                     height: "8px",
// // // //                                     borderRadius: "50%",
// // // //                                     backgroundColor: "#e84135",
// // // //                                   }}
// // // //                                 />
// // // //                               )}
// // // //                             </div>
// // // //                             <span
// // // //                               style={{
// // // //                                 fontWeight: isSelected ? "600" : "500",
// // // //                                 color: isSelected ? "white" : "#333",
// // // //                                 fontSize: "14px",
// // // //                               }}
// // // //                             >
// // // //                               {menu.type}
// // // //                             </span>
// // // //                           </div>
// // // //                           <span
// // // //                             style={{
// // // //                               fontWeight: "600",
// // // //                               color: isSelected ? "white" : "#e84135",
// // // //                               fontSize: "14px",
// // // //                             }}
// // // //                           >
// // // //                             £{menu.cost}
// // // //                           </span>
// // // //                         </div>
// // // //                       )
// // // //                     })}
// // // //                   </div>
// // // //                 </div>
// // // //               )}

// // // //               {/* Step 2: Choose One - Show when it's the current step */}
// // // //               {chooseOneCategory && currentStep === "chooseOne" && (
// // // //                 <div style={{ marginBottom: "24px" }}>
// // // //                   <h6 style={{ margin: "0 0 16px 0", fontWeight: "600", color: "#333", fontSize: "16px" }}>
// // // //                     2. Choose One
// // // //                     <span style={{ fontSize: "12px", color: "#e84135", marginLeft: "8px" }}>
// // // //                       (Required)
// // // //                     </span>
// // // //                   </h6>
// // // //                   <div>
// // // //                     {chooseOneCategory.menutypesubcategorys?.map((subcategory) => {
// // // //                       const isSelected = selectedOptions[chooseOneCategory.menutypecategoryid]?.includes(
// // // //                         subcategory.menutypesubcategoryid
// // // //                       )
// // // //                       return (
// // // //                         <div
// // // //                           key={subcategory.menutypesubcategoryid}
// // // //                           style={{
// // // //                             display: "flex",
// // // //                             alignItems: "center",
// // // //                             justifyContent: "space-between",
// // // //                             padding: "16px",
// // // //                             borderRadius: "12px",
// // // //                             backgroundColor: isSelected ? "#e84135" : "white",
// // // //                             marginBottom: "12px",
// // // //                             border: isSelected ? "2px solid #e84135" : "1px solid #ddd",
// // // //                             cursor: "pointer",
// // // //                             transition: "all 0.2s ease",
// // // //                           }}
// // // //                           onClick={() => handleOptionChange(chooseOneCategory.menutypecategoryid, subcategory.menutypesubcategoryid, "Choose One")}
// // // //                         >
// // // //                           <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
// // // //                             <div
// // // //                               style={{
// // // //                                 width: "20px",
// // // //                                 height: "20px",
// // // //                                 borderRadius: "50%",
// // // //                                 border: isSelected ? "none" : "2px solid #ddd",
// // // //                                 backgroundColor: isSelected ? "white" : "transparent",
// // // //                                 display: "flex",
// // // //                                 alignItems: "center",
// // // //                                 justifyContent: "center",
// // // //                               }}
// // // //                             >
// // // //                               {isSelected && (
// // // //                                 <div
// // // //                                   style={{
// // // //                                     width: "8px",
// // // //                                     height: "8px",
// // // //                                     borderRadius: "50%",
// // // //                                     backgroundColor: "#e84135",
// // // //                                   }}
// // // //                                 />
// // // //                               )}
// // // //                             </div>
// // // //                             <span
// // // //                               style={{
// // // //                                 fontWeight: isSelected ? "600" : "500",
// // // //                                 color: isSelected ? "white" : "#333",
// // // //                                 fontSize: "14px",
// // // //                               }}
// // // //                             >
// // // //                               {subcategory.name}
// // // //                             </span>
// // // //                           </div>
// // // //                           {Number.parseFloat(subcategory.cost) > 0 && (
// // // //                             <span
// // // //                               style={{
// // // //                                 fontWeight: "600",
// // // //                                 color: isSelected ? "white" : "#e84135",
// // // //                                 fontSize: "14px",
// // // //                               }}
// // // //                             >
// // // //                               +£{subcategory.cost}
// // // //                             </span>
// // // //                           )}
// // // //                         </div>
// // // //                       )
// // // //                     })}
// // // //                   </div>
// // // //                 </div>
// // // //               )}

// // // //               {/* Step 3: Cutting Options - Show when it's the current step */}
// // // //               {cuttingCategory && currentStep === "cutting" && (
// // // //                 <div style={{ marginBottom: "24px" }}>
// // // //                   <h6 style={{ margin: "0 0 16px 0", fontWeight: "600", color: "#333", fontSize: "16px" }}>
// // // //                     3. Cutting Style
// // // //                     <span style={{ fontSize: "12px", color: "#e84135", marginLeft: "8px" }}>
// // // //                       (Required)
// // // //                     </span>
// // // //                   </h6>
// // // //                   <div>
// // // //                     {cuttingCategory.menutypesubcategorys
// // // //                       ?.filter(subcategory => subcategory.name !== "Nihari Size")
// // // //                       .map((subcategory) => {
// // // //                         const isSelected = selectedOptions[cuttingCategory.menutypecategoryid]?.includes(
// // // //                           subcategory.menutypesubcategoryid
// // // //                         )
// // // //                         return (
// // // //                           <div
// // // //                             key={subcategory.menutypesubcategoryid}
// // // //                             style={{
// // // //                               display: "flex",
// // // //                               alignItems: "center",
// // // //                               justifyContent: "space-between",
// // // //                               padding: "16px",
// // // //                               borderRadius: "12px",
// // // //                               backgroundColor: isSelected ? "#e84135" : "white",
// // // //                               marginBottom: "12px",
// // // //                               border: isSelected ? "2px solid #e84135" : "1px solid #ddd",
// // // //                               cursor: "pointer",
// // // //                               transition: "all 0.2s ease",
// // // //                             }}
// // // //                             onClick={() => handleOptionChange(cuttingCategory.menutypecategoryid, subcategory.menutypesubcategoryid, "Cutting")}
// // // //                           >
// // // //                             <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
// // // //                               <div
// // // //                                 style={{
// // // //                                   width: "20px",
// // // //                                   height: "20px",
// // // //                                   borderRadius: "50%",
// // // //                                   border: isSelected ? "none" : "2px solid #ddd",
// // // //                                   backgroundColor: isSelected ? "white" : "transparent",
// // // //                                   display: "flex",
// // // //                                   alignItems: "center",
// // // //                                   justifyContent: "center",
// // // //                                 }}
// // // //                               >
// // // //                                 {isSelected && (
// // // //                                   <div
// // // //                                     style={{
// // // //                                       width: "8px",
// // // //                                       height: "8px",
// // // //                                       borderRadius: "50%",
// // // //                                       backgroundColor: "#e84135",
// // // //                                     }}
// // // //                                   />
// // // //                                 )}
// // // //                               </div>
// // // //                               <span
// // // //                                 style={{
// // // //                                   fontWeight: isSelected ? "600" : "500",
// // // //                                   color: isSelected ? "white" : "#333",
// // // //                                   fontSize: "14px",
// // // //                                 }}
// // // //                               >
// // // //                                 {subcategory.name}
// // // //                               </span>
// // // //                             </div>
// // // //                             {Number.parseFloat(subcategory.cost) > 0 && (
// // // //                               <span
// // // //                                 style={{
// // // //                                   fontWeight: "600",
// // // //                                   color: isSelected ? "white" : "#e84135",
// // // //                                   fontSize: "14px",
// // // //                                 }}
// // // //                               >
// // // //                                 +£{subcategory.cost}
// // // //                               </span>
// // // //                             )}
// // // //                           </div>
// // // //                         )
// // // //                       })}
// // // //                   </div>
// // // //                 </div>
// // // //               )}

// // // //               {/* Completion State */}
// // // //               {currentStep === "complete" && (
// // // //                 <div style={{ textAlign: "center", padding: "40px 20px" }}>
// // // //                   <div style={{ fontSize: "48px", color: "#e84135", marginBottom: "16px" }}>✓</div>
// // // //                   <h6 style={{ margin: "0 0 8px 0", fontWeight: "600", color: "#333" }}>All Set!</h6>
// // // //                   <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
// // // //                     Your customization is complete. Ready to add to cart.
// // // //                   </p>
// // // //                 </div>
// // // //               )}
// // // //             </div>
// // // //           )}
// // // //         </div>

// // // //         {/* Footer */}
// // // //         <div style={{ padding: "20px 24px", borderTop: "1px solid #dee2e6", backgroundColor: "#f8f9fa" }}>
// // // //           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
// // // //             <span style={{ fontWeight: "600", color: "#333" }}>Total:</span>
// // // //             <span style={{ fontWeight: "bold", fontSize: "18px", color: "#e84135" }}>£{totalCost.toFixed(2)}</span>
// // // //           </div>
// // // //           <button
// // // //             onClick={handleClick}
// // // //             disabled={isProceedDisabled()}
// // // //             style={{
// // // //               width: "100%",
// // // //               padding: "14px",
// // // //               backgroundColor: isProceedDisabled() ? "#ccc" : "#e84135",
// // // //               color: "white",
// // // //               border: "none",
// // // //               borderRadius: "12px",
// // // //               fontSize: "16px",
// // // //               fontWeight: "bold",
// // // //               cursor: isProceedDisabled() ? "not-allowed" : "pointer",
// // // //               transition: "all 0.2s ease",
// // // //               boxShadow: isProceedDisabled() ? "none" : "0 4px 12px rgba(232, 65, 53, 0.3)",
// // // //             }}
// // // //           >
// // // //             {isProceedDisabled() ? "Select Required Options" : "+ Add to Order"}
// // // //           </button>
// // // //         </div>
// // // //       </div>

// // // //       <style jsx>{`
// // // //         @keyframes spin {
// // // //           0% { transform: rotate(0deg); }
// // // //           100% { transform: rotate(360deg); }
// // // //         }
// // // //       `}</style>
// // // //     </div>
// // // //   )
// // // // }

// // // // export default AddonPopup

// // // "use client"

// // // import { useEffect, useState, useCallback, useRef } from "react"
// // // import { addToCart, chooseAdd } from "../utils/api"
// // // import { toast } from "react-toastify"
// // // import { useNavigate } from "react-router-dom"
// // // import { incrementCount } from "../store/feature/cartSlice"
// // // import { useDispatch, useSelector } from "react-redux"

// // // const AddonPopup = ({ onClose, food, restId }) => {
// // //   const storedUser = JSON.parse(localStorage.getItem("user"))
// // //   const activeTab = useSelector((store) => store.User.activeTab)
// // //   const dispatch = useDispatch()
// // //   const navigate = useNavigate()
// // //   const modalRef = useRef(null)

// // //   const [addon, setAddon] = useState([])
// // //   const [selectedSize, setSelectedSize] = useState("")
// // //   const [selectedItem, setSelectedItem] = useState({})
// // //   const [selectedOptions, setSelectedOptions] = useState({})
// // //   const [totalCost, setTotalCost] = useState(0)
// // //   const [loading, setLoading] = useState(true)
// // //   const [isVisible, setIsVisible] = useState(false)
  
// // //   // Refs for auto-scrolling
// // //   const sizeSectionRef = useRef(null)
// // //   const chooseOneSectionRef = useRef(null)
// // //   const cuttingSectionRef = useRef(null)

// // //   useEffect(() => {
// // //     const fetchWithHighPriority = async () => {
// // //       if (!food?.pkid) {
// // //         setLoading(false)
// // //         return
// // //       }

// // //       try {
// // //         const controller = new AbortController()
// // //         const timeoutId = setTimeout(() => controller.abort(), 8000)

// // //         const data = {
// // //           catid: food.pkid,
// // //           isdelivery: "1",
// // //         }

// // //         const fetchOptions = {
// // //           signal: controller.signal,
// // //           priority: "high",
// // //           cache: "no-cache",
// // //         }

// // //         let res
// // //         try {
// // //           res = await chooseAdd(data, fetchOptions)
// // //         } catch (error) {
// // //           console.log("Fallback to regular fetch")
// // //           res = await chooseAdd(data)
// // //         }

// // //         clearTimeout(timeoutId)

// // //         if (res?.menutypes && res.menutypes.length > 0) {
// // //           // Don't select any options by default
// // //           setAddon(res.menutypes)
// // //           setSelectedSize("")
// // //           setSelectedItem({})
// // //           setSelectedOptions({})
// // //           setTotalCost(0)
// // //         }
// // //       } catch (error) {
// // //         console.error("❌ API ERROR:", error)
// // //         toast.error("Failed to load options")
// // //       } finally {
// // //         setLoading(false)
// // //       }
// // //     }

// // //     fetchWithHighPriority()
// // //   }, [food?.pkid])

// // //   useEffect(() => {
// // //     setIsVisible(true)

// // //     const scrollY = window.scrollY
// // //     const body = document.body

// // //     body.style.overflow = 'hidden'
// // //     body.style.position = 'relative'
// // //     body.style.top = `-${scrollY}px`

// // //     return () => {
// // //       body.style.overflow = ''
// // //       body.style.position = ''
// // //       body.style.top = ''
// // //       window.scrollTo(0, scrollY)
// // //     }
// // //   }, [])

// // //   useEffect(() => {
// // //     if (!selectedItem || !selectedItem.cost) return

// // //     let total = Number.parseFloat(selectedItem.cost) || 0

// // //     Object.entries(selectedOptions).forEach(([categoryId, selectedIds]) => {
// // //       selectedItem.menutypecategorys?.forEach((category) => {
// // //         if (category.menutypecategoryid === categoryId) {
// // //           category.menutypesubcategorys?.forEach((subcategory) => {
// // //             if (selectedIds.includes(subcategory.menutypesubcategoryid)) {
// // //               total += Number.parseFloat(subcategory.cost) || 0
// // //             }
// // //           })
// // //         }
// // //       })
// // //     })

// // //     setTotalCost(total)
// // //   }, [selectedOptions, selectedItem])

// // //   const handleSizeChange = useCallback(
// // //     (size) => {
// // //       const selectedMenu = addon.find((menu) => menu.type === size)
// // //       if (!selectedMenu) return

// // //       setSelectedSize(size)
// // //       setSelectedItem(selectedMenu)

// // //       // Reset options when size changes
// // //       setSelectedOptions({})
      
// // //       // Auto-scroll to next section if available
// // //       setTimeout(() => {
// // //         const chooseOneCategory = selectedMenu.menutypecategorys?.find(cat => 
// // //           cat.name === "Choose One"
// // //         )
// // //         if (chooseOneCategory && chooseOneSectionRef.current) {
// // //           chooseOneSectionRef.current.scrollIntoView({ 
// // //             behavior: 'smooth', 
// // //             block: 'start' 
// // //           })
// // //         } else {
// // //           const cuttingCategory = selectedMenu.menutypecategorys?.find(cat => 
// // //             cat.name === "Cutting"
// // //           )
// // //           if (cuttingCategory && cuttingSectionRef.current) {
// // //             cuttingSectionRef.current.scrollIntoView({ 
// // //               behavior: 'smooth', 
// // //               block: 'start' 
// // //             })
// // //           }
// // //         }
// // //       }, 300)
// // //     },
// // //     [addon],
// // //   )

// // //   const handleOptionChange = useCallback(
// // //     (categoryId, subCategoryId, categoryName) => {
// // //       setSelectedOptions((prevOptions) => {
// // //         const currentSelections = prevOptions[categoryId] || []
// // //         const category = selectedItem?.menutypecategorys?.find((cat) => cat.menutypecategoryid === categoryId)

// // //         if (!category) return prevOptions

// // //         const isMultipleAllowed = category.ismultiple === "1"
// // //         const maxSelections = Number.parseInt(category.multiple, 10) || 0

// // //         let updatedSelections

// // //         if (!isMultipleAllowed || maxSelections === 1) {
// // //           // Radio button behavior - only one selection allowed
// // //           updatedSelections = [subCategoryId]
// // //         } else {
// // //           // Checkbox behavior - multiple selections allowed
// // //           if (currentSelections.includes(subCategoryId)) {
// // //             updatedSelections = currentSelections.filter((id) => id !== subCategoryId)
// // //           } else {
// // //             updatedSelections =
// // //               maxSelections === 0 || currentSelections.length < maxSelections
// // //                 ? [...currentSelections, subCategoryId]
// // //                 : currentSelections
// // //           }
// // //         }

// // //         const newOptions = {
// // //           ...prevOptions,
// // //           [categoryId]: updatedSelections,
// // //         }

// // //         // Auto-scroll to next section after selection
// // //         setTimeout(() => {
// // //           if (categoryName === "Choose One") {
// // //             const cuttingCategory = selectedItem?.menutypecategorys?.find(cat => 
// // //               cat.name === "Cutting"
// // //             )
// // //             if (cuttingCategory && cuttingSectionRef.current) {
// // //               cuttingSectionRef.current.scrollIntoView({ 
// // //                 behavior: 'smooth', 
// // //                 block: 'start' 
// // //               })
// // //             }
// // //           }
// // //         }, 300)

// // //         return newOptions
// // //       })
// // //     },
// // //     [selectedItem],
// // //   )

// // //   const isProceedDisabled = () => {
// // //     if (loading || !selectedItem) return true

// // //     const requiredCategories = selectedItem.menutypecategorys?.filter((category) => category.isrequired === "1")
// // //     if (!requiredCategories?.length) return false

// // //     return requiredCategories.some((category) => {
// // //       const selections = selectedOptions[category.menutypecategoryid]
// // //       return !selections || selections.length === 0
// // //     })
// // //   }

// // //   const handleClose = useCallback(() => {
// // //     setIsVisible(false)
// // //     setTimeout(() => {
// // //       onClose()
// // //     }, 150)
// // //   }, [onClose])

// // //   const handleClick = useCallback(async () => {
// // //     if (!storedUser) {
// // //       navigate("/login")
// // //       return
// // //     }

// // //     try {
// // //       const allSelectedValues = Object.values(selectedOptions).flat()

// // //       const sendData = {
// // //         userid: storedUser?.userid,
// // //         restId: restId,
// // //         type: activeTab === "Delivery" ? "delivery" : "takeaway",
// // //         catid: food.catid,
// // //         foodid: food.pkid,
// // //         typeid: selectedItem?.menutypeid || "",
// // //         extratopupid: allSelectedValues,
// // //         quantity: "1",
// // //         cartid: "",
// // //         cartdetailid: "",
// // //       }

// // //       const data = await addToCart(sendData)

// // //       if (data.status === "1") {
// // //         toast.success("Item added to cart!")
// // //         dispatch(incrementCount())
// // //       }
// // //     } catch (error) {
// // //       console.error("Error adding to cart:", error)
// // //       toast.error("Something went wrong")
// // //     } finally {
// // //       handleClose()
// // //     }
// // //   }, [storedUser, navigate, selectedOptions, restId, activeTab, food, selectedItem, dispatch, handleClose])

// // //   // Get specific categories from the selected item
// // //   const chooseOneCategory = selectedItem?.menutypecategorys?.find(cat => 
// // //     cat.name === "Choose One"
// // //   )
  
// // //   const cuttingCategory = selectedItem?.menutypecategorys?.find(cat => 
// // //     cat.name === "Cutting"
// // //   )

// // //   return (
// // //     <div
// // //       style={{
// // //         position: "fixed",
// // //         top: 0,
// // //         left: 0,
// // //         right: 0,
// // //         bottom: 0,
// // //         backgroundColor: `rgba(0, 0, 0, ${isVisible ? 0.5 : 0})`,
// // //         display: "flex",
// // //         alignItems: "center",
// // //         justifyContent: "center",
// // //         padding: "10px",
// // //         zIndex: 1050,
// // //         transition: "background-color 0.15s ease",
// // //       }}
// // //       onClick={(e) => {
// // //         if (e.target === e.currentTarget) handleClose()
// // //       }}
// // //     >
// // //       <div
// // //         ref={modalRef}
// // //         style={{
// // //           width: "380px",
// // //           maxHeight: "85vh",
// // //           backgroundColor: "white",
// // //           borderRadius: "16px",
// // //           boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
// // //           overflow: "hidden",
// // //           transform: `scale(${isVisible ? 1 : 0.95}) translateY(${isVisible ? 0 : "10px"})`,
// // //           opacity: isVisible ? 1 : 0,
// // //           transition: "all 0.15s ease",
// // //         }}
// // //       >
// // //         {/* Header */}
// // //         <div
// // //           style={{
// // //             padding: "20px 24px",
// // //             backgroundColor: "#e84135",
// // //             color: "white",
// // //             borderBottom: "1px solid #dee2e6",
// // //           }}
// // //         >
// // //           <div className="d-flex justify-content-between align-items-center">
// // //             <div>
// // //               <h5 style={{ margin: 0, fontWeight: "bold", fontSize: "18px" }}>Customize Your Order</h5>
// // //               <p style={{ margin: "4px 0 0 0", fontSize: "14px", opacity: 0.9 }}>
// // //                 Total: £{totalCost.toFixed(2)}
// // //               </p>
// // //             </div>
// // //             <button
// // //               onClick={handleClose}
// // //               style={{
// // //                 background: "none",
// // //                 border: "none",
// // //                 fontSize: "24px",
// // //                 color: "white",
// // //                 cursor: "pointer",
// // //                 padding: "0",
// // //                 width: "24px",
// // //                 height: "24px",
// // //                 display: "flex",
// // //                 alignItems: "center",
// // //                 justifyContent: "center",
// // //               }}
// // //               aria-label="Close"
// // //             >
// // //               ×
// // //             </button>
// // //           </div>
// // //         </div>

// // //         {/* Body */}
// // //         <div
// // //           style={{
// // //             padding: "0",
// // //             maxHeight: "calc(70vh - 140px)",
// // //             overflowY: "auto",
// // //             WebkitOverflowScrolling: "touch",
// // //           }}
// // //         >
// // //           {loading ? (
// // //             <div style={{ textAlign: "center", padding: "40px 20px" }}>
// // //               <div
// // //                 style={{
// // //                   width: "40px",
// // //                   height: "40px",
// // //                   border: "3px solid #f3f3f3",
// // //                   borderTop: "3px solid #e84135",
// // //                   borderRadius: "50%",
// // //                   animation: "spin 1s linear infinite",
// // //                   margin: "0 auto 16px",
// // //                 }}
// // //               />
// // //               <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>Loading options...</p>
// // //             </div>
// // //           ) : (
// // //             <div style={{ padding: "20px" }}>
// // //               {/* Size Selection Section */}
// // //               <div ref={sizeSectionRef} style={{ marginBottom: "24px" }}>
// // //                 <h6 style={{ margin: "0 0 16px 0", fontWeight: "600", color: "#333", fontSize: "16px" }}>
// // //                   1. Choose Size & Price
// // //                   {!selectedSize && (
// // //                     <span style={{ fontSize: "12px", color: "#e84135", marginLeft: "8px" }}>
// // //                       (Required)
// // //                     </span>
// // //                   )}
// // //                 </h6>
// // //                 <div>
// // //                   {addon.map((menu) => {
// // //                     const isSelected = selectedSize === menu.type
// // //                     return (
// // //                       <div
// // //                         key={menu.menutypeid}
// // //                         style={{
// // //                           display: "flex",
// // //                           alignItems: "center",
// // //                           justifyContent: "space-between",
// // //                           padding: "16px",
// // //                           borderRadius: "12px",
// // //                           backgroundColor: isSelected ? "#e84135" : "white",
// // //                           marginBottom: "12px",
// // //                           border: isSelected ? "2px solid #e84135" : "1px solid #ddd",
// // //                           cursor: "pointer",
// // //                           transition: "all 0.2s ease",
// // //                         }}
// // //                         onClick={() => handleSizeChange(menu.type)}
// // //                       >
// // //                         <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
// // //                           <div
// // //                             style={{
// // //                               width: "20px",
// // //                               height: "20px",
// // //                               borderRadius: "50%",
// // //                               border: isSelected ? "none" : "2px solid #ddd",
// // //                               backgroundColor: isSelected ? "white" : "transparent",
// // //                               display: "flex",
// // //                               alignItems: "center",
// // //                               justifyContent: "center",
// // //                             }}
// // //                           >
// // //                             {isSelected && (
// // //                               <div
// // //                                 style={{
// // //                                   width: "8px",
// // //                                   height: "8px",
// // //                                   borderRadius: "50%",
// // //                                   backgroundColor: "#e84135",
// // //                                 }}
// // //                               />
// // //                             )}
// // //                           </div>
// // //                           <span
// // //                             style={{
// // //                               fontWeight: isSelected ? "600" : "500",
// // //                               color: isSelected ? "white" : "#333",
// // //                               fontSize: "14px",
// // //                             }}
// // //                           >
// // //                             {menu.type}
// // //                           </span>
// // //                         </div>
// // //                         <span
// // //                           style={{
// // //                             fontWeight: "600",
// // //                             color: isSelected ? "white" : "#e84135",
// // //                             fontSize: "14px",
// // //                           }}
// // //                         >
// // //                           £{menu.cost}
// // //                         </span>
// // //                       </div>
// // //                     )
// // //                   })}
// // //                 </div>
// // //               </div>

// // //               {/* Choose One Section - Only show if category exists and size is selected */}
// // //               {chooseOneCategory && selectedSize && (
// // //                 <div ref={chooseOneSectionRef} style={{ marginBottom: "24px" }}>
// // //                   <h6 style={{ margin: "0 0 16px 0", fontWeight: "600", color: "#333", fontSize: "16px" }}>
// // //                     2. Choose One
// // //                     <span style={{ fontSize: "12px", color: "#e84135", marginLeft: "8px" }}>
// // //                       (Required)
// // //                     </span>
// // //                   </h6>
// // //                   <div>
// // //                     {chooseOneCategory.menutypesubcategorys?.map((subcategory) => {
// // //                       const isSelected = selectedOptions[chooseOneCategory.menutypecategoryid]?.includes(
// // //                         subcategory.menutypesubcategoryid
// // //                       )
// // //                       return (
// // //                         <div
// // //                           key={subcategory.menutypesubcategoryid}
// // //                           style={{
// // //                             display: "flex",
// // //                             alignItems: "center",
// // //                             justifyContent: "space-between",
// // //                             padding: "16px",
// // //                             borderRadius: "12px",
// // //                             backgroundColor: isSelected ? "#e84135" : "white",
// // //                             marginBottom: "12px",
// // //                             border: isSelected ? "2px solid #e84135" : "1px solid #ddd",
// // //                             cursor: "pointer",
// // //                             transition: "all 0.2s ease",
// // //                           }}
// // //                           onClick={() => handleOptionChange(chooseOneCategory.menutypecategoryid, subcategory.menutypesubcategoryid, "Choose One")}
// // //                         >
// // //                           <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
// // //                             <div
// // //                               style={{
// // //                                 width: "20px",
// // //                                 height: "20px",
// // //                                 borderRadius: "50%",
// // //                                 border: isSelected ? "none" : "2px solid #ddd",
// // //                                 backgroundColor: isSelected ? "white" : "transparent",
// // //                                 display: "flex",
// // //                                 alignItems: "center",
// // //                                 justifyContent: "center",
// // //                               }}
// // //                             >
// // //                               {isSelected && (
// // //                                 <div
// // //                                   style={{
// // //                                     width: "8px",
// // //                                     height: "8px",
// // //                                     borderRadius: "50%",
// // //                                     backgroundColor: "#e84135",
// // //                                   }}
// // //                                 />
// // //                               )}
// // //                             </div>
// // //                             <span
// // //                               style={{
// // //                                 fontWeight: isSelected ? "600" : "500",
// // //                                 color: isSelected ? "white" : "#333",
// // //                                 fontSize: "14px",
// // //                               }}
// // //                             >
// // //                               {subcategory.name}
// // //                             </span>
// // //                           </div>
// // //                           {Number.parseFloat(subcategory.cost) > 0 && (
// // //                             <span
// // //                               style={{
// // //                                 fontWeight: "600",
// // //                                 color: isSelected ? "white" : "#e84135",
// // //                                 fontSize: "14px",
// // //                               }}
// // //                             >
// // //                               +£{subcategory.cost}
// // //                             </span>
// // //                           )}
// // //                         </div>
// // //                       )
// // //                     })}
// // //                   </div>
// // //                 </div>
// // //               )}

// // //               {/* Cutting Section - Only show if category exists and size is selected */}
// // //               {cuttingCategory && selectedSize && (
// // //                 <div ref={cuttingSectionRef} style={{ marginBottom: "24px" }}>
// // //                   <h6 style={{ margin: "0 0 16px 0", fontWeight: "600", color: "#333", fontSize: "16px" }}>
// // //                     3. Cutting Style
// // //                     <span style={{ fontSize: "12px", color: "#e84135", marginLeft: "8px" }}>
// // //                       (Required)
// // //                     </span>
// // //                   </h6>
// // //                   <div>
// // //                     {cuttingCategory.menutypesubcategorys
// // //                       ?.filter(subcategory => subcategory.name !== "Nihari Size")
// // //                       .map((subcategory) => {
// // //                         const isSelected = selectedOptions[cuttingCategory.menutypecategoryid]?.includes(
// // //                           subcategory.menutypesubcategoryid
// // //                         )
// // //                         return (
// // //                           <div
// // //                             key={subcategory.menutypesubcategoryid}
// // //                             style={{
// // //                               display: "flex",
// // //                               alignItems: "center",
// // //                               justifyContent: "space-between",
// // //                               padding: "16px",
// // //                               borderRadius: "12px",
// // //                               backgroundColor: isSelected ? "#e84135" : "white",
// // //                               marginBottom: "12px",
// // //                               border: isSelected ? "2px solid #e84135" : "1px solid #ddd",
// // //                               cursor: "pointer",
// // //                               transition: "all 0.2s ease",
// // //                             }}
// // //                             onClick={() => handleOptionChange(cuttingCategory.menutypecategoryid, subcategory.menutypesubcategoryid, "Cutting")}
// // //                           >
// // //                             <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
// // //                               <div
// // //                                 style={{
// // //                                   width: "20px",
// // //                                   height: "20px",
// // //                                   borderRadius: "50%",
// // //                                   border: isSelected ? "none" : "2px solid #ddd",
// // //                                   backgroundColor: isSelected ? "white" : "transparent",
// // //                                   display: "flex",
// // //                                   alignItems: "center",
// // //                                   justifyContent: "center",
// // //                                 }}
// // //                               >
// // //                                 {isSelected && (
// // //                                   <div
// // //                                     style={{
// // //                                       width: "8px",
// // //                                       height: "8px",
// // //                                       borderRadius: "50%",
// // //                                       backgroundColor: "#e84135",
// // //                                     }}
// // //                                   />
// // //                                 )}
// // //                               </div>
// // //                               <span
// // //                                 style={{
// // //                                   fontWeight: isSelected ? "600" : "500",
// // //                                   color: isSelected ? "white" : "#333",
// // //                                   fontSize: "14px",
// // //                                 }}
// // //                               >
// // //                                 {subcategory.name}
// // //                               </span>
// // //                             </div>
// // //                             {Number.parseFloat(subcategory.cost) > 0 && (
// // //                               <span
// // //                                 style={{
// // //                                   fontWeight: "600",
// // //                                   color: isSelected ? "white" : "#e84135",
// // //                                   fontSize: "14px",
// // //                                 }}
// // //                               >
// // //                                 +£{subcategory.cost}
// // //                               </span>
// // //                             )}
// // //                           </div>
// // //                         )
// // //                       })}
// // //                   </div>
// // //                 </div>
// // //               )}
// // //             </div>
// // //           )}
// // //         </div>

// // //         {/* Footer */}
// // //         <div style={{ padding: "20px 24px", borderTop: "1px solid #dee2e6", backgroundColor: "#f8f9fa" }}>
// // //           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
// // //             <span style={{ fontWeight: "600", color: "#333" }}>Total:</span>
// // //             <span style={{ fontWeight: "bold", fontSize: "18px", color: "#e84135" }}>£{totalCost.toFixed(2)}</span>
// // //           </div>
// // //           <button
// // //             onClick={handleClick}
// // //             disabled={isProceedDisabled()}
// // //             style={{
// // //               width: "100%",
// // //               padding: "14px",
// // //               backgroundColor: isProceedDisabled() ? "#ccc" : "#e84135",
// // //               color: "white",
// // //               border: "none",
// // //               borderRadius: "12px",
// // //               fontSize: "16px",
// // //               fontWeight: "bold",
// // //               cursor: isProceedDisabled() ? "not-allowed" : "pointer",
// // //               transition: "all 0.2s ease",
// // //               boxShadow: isProceedDisabled() ? "none" : "0 4px 12px rgba(232, 65, 53, 0.3)",
// // //             }}
// // //           >
// // //             {isProceedDisabled() ? "Select Required Options" : "+ Add to Order"}
// // //           </button>
// // //         </div>
// // //       </div>

// // //       <style jsx>{`
// // //         @keyframes spin {
// // //           0% { transform: rotate(0deg); }
// // //           100% { transform: rotate(360deg); }
// // //         }
// // //       `}</style>
// // //     </div>
// // //   )
// // // }

// // // export default AddonPopup

// // "use client"

// // import { useEffect, useState, useCallback, useRef } from "react"
// // import { addToCart, chooseAdd } from "../utils/api"
// // import { toast } from "react-toastify"
// // import { useNavigate } from "react-router-dom"
// // import { incrementCount } from "../store/feature/cartSlice"
// // import { useDispatch, useSelector } from "react-redux"

// // const AddonPopup = ({ onClose, food, restId }) => {
// //   const storedUser = JSON.parse(localStorage.getItem("user"))
// //   const activeTab = useSelector((store) => store.User.activeTab)
// //   const dispatch = useDispatch()
// //   const navigate = useNavigate()
// //   const modalRef = useRef(null)

// //   const [addon, setAddon] = useState([])
// //   const [selectedSize, setSelectedSize] = useState("")
// //   const [selectedItem, setSelectedItem] = useState({})
// //   const [selectedOptions, setSelectedOptions] = useState({})
// //   const [totalCost, setTotalCost] = useState(0)
// //   const [loading, setLoading] = useState(true)
// //   const [isVisible, setIsVisible] = useState(false)
  
// //   // Refs for auto-scrolling
// //   const sizeSectionRef = useRef(null)
// //   const chooseOneSectionRef = useRef(null)
// //   const cuttingSectionRef = useRef(null)

// //   useEffect(() => {
// //     const fetchWithHighPriority = async () => {
// //       if (!food?.pkid) {
// //         setLoading(false)
// //         return
// //       }

// //       try {
// //         const controller = new AbortController()
// //         const timeoutId = setTimeout(() => controller.abort(), 8000)

// //         const data = {
// //           catid: food.pkid,
// //           isdelivery: "1",
// //         }

// //         const fetchOptions = {
// //           signal: controller.signal,
// //           priority: "high",
// //           cache: "no-cache",
// //         }

// //         let res
// //         try {
// //           res = await chooseAdd(data, fetchOptions)
// //         } catch (error) {
// //           console.log("Fallback to regular fetch")
// //           res = await chooseAdd(data)
// //         }

// //         clearTimeout(timeoutId)

// //         if (res?.menutypes && res.menutypes.length > 0) {
// //           // Don't select any options by default
// //           setAddon(res.menutypes)
// //           setSelectedSize("")
// //           setSelectedItem({})
// //           setSelectedOptions({})
// //           setTotalCost(0)
// //         }
// //       } catch (error) {
// //         console.error("❌ API ERROR:", error)
// //         toast.error("Failed to load options")
// //       } finally {
// //         setLoading(false)
// //       }
// //     }

// //     fetchWithHighPriority()
// //   }, [food?.pkid])

// //   useEffect(() => {
// //     setIsVisible(true)

// //     const scrollY = window.scrollY
// //     const body = document.body

// //     body.style.overflow = 'hidden'
// //     body.style.position = 'relative'
// //     body.style.top = `-${scrollY}px`

// //     return () => {
// //       body.style.overflow = ''
// //       body.style.position = ''
// //       body.style.top = ''
// //       window.scrollTo(0, scrollY)
// //     }
// //   }, [])

// //   useEffect(() => {
// //     if (!selectedItem || !selectedItem.cost) return

// //     let total = Number.parseFloat(selectedItem.cost) || 0

// //     Object.entries(selectedOptions).forEach(([categoryId, selectedIds]) => {
// //       selectedItem.menutypecategorys?.forEach((category) => {
// //         if (category.menutypecategoryid === categoryId) {
// //           category.menutypesubcategorys?.forEach((subcategory) => {
// //             if (selectedIds.includes(subcategory.menutypesubcategoryid)) {
// //               total += Number.parseFloat(subcategory.cost) || 0
// //             }
// //           })
// //         }
// //       })
// //     })

// //     setTotalCost(total)
// //   }, [selectedOptions, selectedItem])

// //   const handleSizeChange = useCallback(
// //     (size) => {
// //       const selectedMenu = addon.find((menu) => menu.type === size)
// //       if (!selectedMenu) return

// //       setSelectedSize(size)
// //       setSelectedItem(selectedMenu)

// //       // Reset options when size changes
// //       setSelectedOptions({})
      
// //       // Auto-scroll to next section if available
// //       setTimeout(() => {
// //         const chooseOneCategory = selectedMenu.menutypecategorys?.find(cat => 
// //           cat.name === "Choose One"
// //         )
// //         if (chooseOneCategory && chooseOneSectionRef.current) {
// //           chooseOneSectionRef.current.scrollIntoView({ 
// //             behavior: 'smooth', 
// //             block: 'start' 
// //           })
// //         } else {
// //           const cuttingCategory = selectedMenu.menutypecategorys?.find(cat => 
// //             cat.name === "Cutting"
// //           )
// //           if (cuttingCategory && cuttingSectionRef.current) {
// //             cuttingSectionRef.current.scrollIntoView({ 
// //               behavior: 'smooth', 
// //               block: 'start' 
// //             })
// //           }
// //         }
// //       }, 300)
// //     },
// //     [addon],
// //   )

// //   const handleOptionChange = useCallback(
// //     (categoryId, subCategoryId, categoryName) => {
// //       setSelectedOptions((prevOptions) => {
// //         const currentSelections = prevOptions[categoryId] || []
// //         const category = selectedItem?.menutypecategorys?.find((cat) => cat.menutypecategoryid === categoryId)

// //         if (!category) return prevOptions

// //         const isMultipleAllowed = category.ismultiple === "1"
// //         const maxSelections = Number.parseInt(category.multiple, 10) || 0

// //         let updatedSelections

// //         if (!isMultipleAllowed || maxSelections === 1) {
// //           // Radio button behavior - only one selection allowed
// //           updatedSelections = [subCategoryId]
// //         } else {
// //           // Checkbox behavior - multiple selections allowed
// //           if (currentSelections.includes(subCategoryId)) {
// //             updatedSelections = currentSelections.filter((id) => id !== subCategoryId)
// //           } else {
// //             updatedSelections =
// //               maxSelections === 0 || currentSelections.length < maxSelections
// //                 ? [...currentSelections, subCategoryId]
// //                 : currentSelections
// //           }
// //         }

// //         const newOptions = {
// //           ...prevOptions,
// //           [categoryId]: updatedSelections,
// //         }

// //         // Auto-scroll to next section after selection
// //         setTimeout(() => {
// //           if (categoryName === "Choose One") {
// //             const cuttingCategory = selectedItem?.menutypecategorys?.find(cat => 
// //               cat.name === "Cutting"
// //             )
// //             if (cuttingCategory && cuttingSectionRef.current) {
// //               cuttingSectionRef.current.scrollIntoView({ 
// //                 behavior: 'smooth', 
// //                 block: 'start' 
// //               })
// //             }
// //           }
// //         }, 300)

// //         return newOptions
// //       })
// //     },
// //     [selectedItem],
// //   )

// //   const isProceedDisabled = () => {
// //     if (loading || !selectedItem) return true

// //     const requiredCategories = selectedItem.menutypecategorys?.filter((category) => category.isrequired === "1")
// //     if (!requiredCategories?.length) return false

// //     return requiredCategories.some((category) => {
// //       const selections = selectedOptions[category.menutypecategoryid]
// //       return !selections || selections.length === 0
// //     })
// //   }

// //   const handleClose = useCallback(() => {
// //     setIsVisible(false)
// //     setTimeout(() => {
// //       onClose()
// //     }, 150)
// //   }, [onClose])

// //   const handleClick = useCallback(async () => {
// //     if (!storedUser) {
// //       navigate("/login")
// //       return
// //     }

// //     try {
// //       const allSelectedValues = Object.values(selectedOptions).flat()

// //       const sendData = {
// //         userid: storedUser?.userid,
// //         restId: restId,
// //         type: activeTab === "Delivery" ? "delivery" : "takeaway",
// //         catid: food.catid,
// //         foodid: food.pkid,
// //         typeid: selectedItem?.menutypeid || "",
// //         extratopupid: allSelectedValues,
// //         quantity: "1",
// //         cartid: "",
// //         cartdetailid: "",
// //       }

// //       const data = await addToCart(sendData)

// //       if (data.status === "1") {
// //         toast.success("Item added to cart!")
// //         dispatch(incrementCount())
// //       }
// //     } catch (error) {
// //       console.error("Error adding to cart:", error)
// //       toast.error("Something went wrong")
// //     } finally {
// //       handleClose()
// //     }
// //   }, [storedUser, navigate, selectedOptions, restId, activeTab, food, selectedItem, dispatch, handleClose])

// //   // Get specific categories from the selected item
// //   const chooseOneCategory = selectedItem?.menutypecategorys?.find(cat => 
// //     cat.name === "Choose One"
// //   )
  
// //   const cuttingCategory = selectedItem?.menutypecategorys?.find(cat => 
// //     cat.name === "Cutting"
// //   )

// //   return (
// //     <div
// //       style={{
// //         position: "fixed",
// //         top: 0,
// //         left: 0,
// //         right: 0,
// //         bottom: 0,
// //         backgroundColor: `rgba(0, 0, 0, ${isVisible ? 0.5 : 0})`,
// //         display: "flex",
// //         alignItems: "center",
// //         justifyContent: "center",
// //         padding: "10px",
// //         zIndex: 1050,
// //         transition: "background-color 0.15s ease",
// //       }}
// //       onClick={(e) => {
// //         if (e.target === e.currentTarget) handleClose()
// //       }}
// //     >
// //       <div
// //         ref={modalRef}
// //         style={{
// //           width: "380px",
// //           maxHeight: "85vh",
// //           backgroundColor: "white",
// //           borderRadius: "16px",
// //           boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
// //           overflow: "hidden",
// //           transform: `scale(${isVisible ? 1 : 0.95}) translateY(${isVisible ? 0 : "10px"})`,
// //           opacity: isVisible ? 1 : 0,
// //           transition: "all 0.15s ease",
// //         }}
// //       >
// //         {/* Header */}
// //         <div
// //           style={{
// //             padding: "20px 24px",
// //             backgroundColor: "#e84135",
// //             color: "white",
// //             borderBottom: "1px solid #dee2e6",
// //           }}
// //         >
// //           <div className="d-flex justify-content-between align-items-center">
// //             <div>
// //               <h5 style={{ margin: 0, fontWeight: "bold", fontSize: "18px" }}>Customize Your Order</h5>
// //               <p style={{ margin: "4px 0 0 0", fontSize: "14px", opacity: 0.9 }}>
// //                 Total: £{totalCost.toFixed(2)}
// //               </p>
// //             </div>
// //             <button
// //               onClick={handleClose}
// //               style={{
// //                 background: "none",
// //                 border: "none",
// //                 fontSize: "24px",
// //                 color: "white",
// //                 cursor: "pointer",
// //                 padding: "0",
// //                 width: "24px",
// //                 height: "24px",
// //                 display: "flex",
// //                 alignItems: "center",
// //                 justifyContent: "center",
// //               }}
// //               aria-label="Close"
// //             >
// //               ×
// //             </button>
// //           </div>
// //         </div>

// //         {/* Body */}
// //         <div
// //           style={{
// //             padding: "0",
// //             maxHeight: "calc(70vh - 140px)",
// //             overflowY: "auto",
// //             WebkitOverflowScrolling: "touch",
// //           }}
// //         >
// //           {loading ? (
// //             <div style={{ textAlign: "center", padding: "40px 20px" }}>
// //               <div
// //                 style={{
// //                   width: "40px",
// //                   height: "40px",
// //                   border: "3px solid #f3f3f3",
// //                   borderTop: "3px solid #e84135",
// //                   borderRadius: "50%",
// //                   animation: "spin 1s linear infinite",
// //                   margin: "0 auto 16px",
// //                 }}
// //               />
// //               <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>Loading options...</p>
// //             </div>
// //           ) : (
// //             <div style={{ padding: "20px" }}>
// //               {/* Size Selection Section - Always visible */}
// //               <div ref={sizeSectionRef} style={{ marginBottom: "24px" }}>
// //                 <h6 style={{ margin: "0 0 16px 0", fontWeight: "600", color: "#333", fontSize: "16px" }}>
// //                   1. Choose Size & Price
// //                   {!selectedSize && (
// //                     <span style={{ fontSize: "12px", color: "#e84135", marginLeft: "8px" }}>
// //                       (Required)
// //                     </span>
// //                   )}
// //                 </h6>
// //                 <div>
// //                   {addon.map((menu) => {
// //                     const isSelected = selectedSize === menu.type
// //                     return (
// //                       <div
// //                         key={menu.menutypeid}
// //                         style={{
// //                           display: "flex",
// //                           alignItems: "center",
// //                           justifyContent: "space-between",
// //                           padding: "16px",
// //                           borderRadius: "12px",
// //                           backgroundColor: isSelected ? "#e84135" : "white",
// //                           marginBottom: "12px",
// //                           border: isSelected ? "2px solid #e84135" : "1px solid #ddd",
// //                           cursor: "pointer",
// //                           transition: "all 0.2s ease",
// //                         }}
// //                         onClick={() => handleSizeChange(menu.type)}
// //                       >
// //                         <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
// //                           <div
// //                             style={{
// //                               width: "20px",
// //                               height: "20px",
// //                               borderRadius: "50%",
// //                               border: isSelected ? "none" : "2px solid #ddd",
// //                               backgroundColor: isSelected ? "white" : "transparent",
// //                               display: "flex",
// //                               alignItems: "center",
// //                               justifyContent: "center",
// //                             }}
// //                           >
// //                             {isSelected && (
// //                               <div
// //                                 style={{
// //                                   width: "8px",
// //                                   height: "8px",
// //                                   borderRadius: "50%",
// //                                   backgroundColor: "#e84135",
// //                                 }}
// //                               />
// //                             )}
// //                           </div>
// //                           <span
// //                             style={{
// //                               fontWeight: isSelected ? "600" : "500",
// //                               color: isSelected ? "white" : "#333",
// //                               fontSize: "14px",
// //                             }}
// //                           >
// //                             {menu.type}
// //                           </span>
// //                         </div>
// //                         <span
// //                           style={{
// //                             fontWeight: "600",
// //                             color: isSelected ? "white" : "#e84135",
// //                             fontSize: "14px",
// //                           }}
// //                         >
// //                           £{menu.cost}
// //                         </span>
// //                       </div>
// //                     )
// //                   })}
// //                 </div>
// //               </div>

// //               {/* Choose One Section - Always visible if category exists */}
// //               {chooseOneCategory && (
// //                 <div 
// //                   ref={chooseOneSectionRef} 
// //                   style={{ 
// //                     marginBottom: "24px",
// //                     opacity: selectedSize ? 1 : 0.6
// //                   }}
// //                 >
// //                   <h6 style={{ margin: "0 0 16px 0", fontWeight: "600", color: "#333", fontSize: "16px" }}>
// //                     2. Choose One
// //                     <span style={{ fontSize: "12px", color: "#e84135", marginLeft: "8px" }}>
// //                       (Required)
// //                     </span>
// //                   </h6>
// //                   <div>
// //                     {chooseOneCategory.menutypesubcategorys?.map((subcategory) => {
// //                       const isSelected = selectedOptions[chooseOneCategory.menutypecategoryid]?.includes(
// //                         subcategory.menutypesubcategoryid
// //                       )
// //                       const isDisabled = !selectedSize
                      
// //                       return (
// //                         <div
// //                           key={subcategory.menutypesubcategoryid}
// //                           style={{
// //                             display: "flex",
// //                             alignItems: "center",
// //                             justifyContent: "space-between",
// //                             padding: "16px",
// //                             borderRadius: "12px",
// //                             backgroundColor: isSelected ? "#e84135" : (isDisabled ? "#f8f9fa" : "white"),
// //                             marginBottom: "12px",
// //                             border: isSelected ? "2px solid #e84135" : (isDisabled ? "1px solid #eee" : "1px solid #ddd"),
// //                             cursor: isDisabled ? "not-allowed" : "pointer",
// //                             transition: "all 0.2s ease",
// //                           }}
// //                           onClick={() => !isDisabled && handleOptionChange(chooseOneCategory.menutypecategoryid, subcategory.menutypesubcategoryid, "Choose One")}
// //                         >
// //                           <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
// //                             <div
// //                               style={{
// //                                 width: "20px",
// //                                 height: "20px",
// //                                 borderRadius: "50%",
// //                                 border: isSelected ? "none" : (isDisabled ? "2px solid #eee" : "2px solid #ddd"),
// //                                 backgroundColor: isSelected ? "white" : "transparent",
// //                                 display: "flex",
// //                                 alignItems: "center",
// //                                 justifyContent: "center",
// //                               }}
// //                             >
// //                               {isSelected && (
// //                                 <div
// //                                   style={{
// //                                     width: "8px",
// //                                     height: "8px",
// //                                     borderRadius: "50%",
// //                                     backgroundColor: "#e84135",
// //                                   }}
// //                                 />
// //                               )}
// //                             </div>
// //                             <span
// //                               style={{
// //                                 fontWeight: isSelected ? "600" : "500",
// //                                 color: isSelected ? "white" : (isDisabled ? "#999" : "#333"),
// //                                 fontSize: "14px",
// //                               }}
// //                             >
// //                               {subcategory.name}
// //                             </span>
// //                           </div>
// //                           {Number.parseFloat(subcategory.cost) > 0 && (
// //                             <span
// //                               style={{
// //                                 fontWeight: "600",
// //                                 color: isSelected ? "white" : (isDisabled ? "#ccc" : "#e84135"),
// //                                 fontSize: "14px",
// //                               }}
// //                             >
// //                               +£{subcategory.cost}
// //                             </span>
// //                           )}
// //                         </div>
// //                       )
// //                     })}
// //                   </div>
// //                 </div>
// //               )}

// //               {/* Cutting Section - Always visible if category exists */}
// //               {cuttingCategory && (
// //                 <div 
// //                   ref={cuttingSectionRef} 
// //                   style={{ 
// //                     marginBottom: "24px",
// //                     opacity: selectedSize ? 1 : 0.6
// //                   }}
// //                 >
// //                   <h6 style={{ margin: "0 0 16px 0", fontWeight: "600", color: "#333", fontSize: "16px" }}>
// //                     3. Cutting Style
// //                     <span style={{ fontSize: "12px", color: "#e84135", marginLeft: "8px" }}>
// //                       (Required)
// //                     </span>
// //                   </h6>
// //                   <div>
// //                     {cuttingCategory.menutypesubcategorys
// //                       ?.filter(subcategory => subcategory.name !== "Nihari Size")
// //                       .map((subcategory) => {
// //                         const isSelected = selectedOptions[cuttingCategory.menutypecategoryid]?.includes(
// //                           subcategory.menutypesubcategoryid
// //                         )
// //                         const isDisabled = !selectedSize
                        
// //                         return (
// //                           <div
// //                             key={subcategory.menutypesubcategoryid}
// //                             style={{
// //                               display: "flex",
// //                               alignItems: "center",
// //                               justifyContent: "space-between",
// //                               padding: "16px",
// //                               borderRadius: "12px",
// //                               backgroundColor: isSelected ? "#e84135" : (isDisabled ? "#f8f9fa" : "white"),
// //                               marginBottom: "12px",
// //                               border: isSelected ? "2px solid #e84135" : (isDisabled ? "1px solid #eee" : "1px solid #ddd"),
// //                               cursor: isDisabled ? "not-allowed" : "pointer",
// //                               transition: "all 0.2s ease",
// //                             }}
// //                             onClick={() => !isDisabled && handleOptionChange(cuttingCategory.menutypecategoryid, subcategory.menutypesubcategoryid, "Cutting")}
// //                           >
// //                             <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
// //                               <div
// //                                 style={{
// //                                   width: "20px",
// //                                   height: "20px",
// //                                   borderRadius: "50%",
// //                                   border: isSelected ? "none" : (isDisabled ? "2px solid #eee" : "2px solid #ddd"),
// //                                   backgroundColor: isSelected ? "white" : "transparent",
// //                                   display: "flex",
// //                                   alignItems: "center",
// //                                   justifyContent: "center",
// //                                 }}
// //                               >
// //                                 {isSelected && (
// //                                   <div
// //                                     style={{
// //                                       width: "8px",
// //                                       height: "8px",
// //                                       borderRadius: "50%",
// //                                       backgroundColor: "#e84135",
// //                                     }}
// //                                   />
// //                                 )}
// //                               </div>
// //                               <span
// //                                 style={{
// //                                   fontWeight: isSelected ? "600" : "500",
// //                                   color: isSelected ? "white" : (isDisabled ? "#999" : "#333"),
// //                                   fontSize: "14px",
// //                                 }}
// //                               >
// //                                 {subcategory.name}
// //                               </span>
// //                             </div>
// //                             {Number.parseFloat(subcategory.cost) > 0 && (
// //                               <span
// //                                 style={{
// //                                   fontWeight: "600",
// //                                   color: isSelected ? "white" : (isDisabled ? "#ccc" : "#e84135"),
// //                                   fontSize: "14px",
// //                                 }}
// //                               >
// //                                 +£{subcategory.cost}
// //                               </span>
// //                             )}
// //                           </div>
// //                         )
// //                       })}
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
// //           )}
// //         </div>

// //         {/* Footer */}
// //         <div style={{ padding: "20px 24px", borderTop: "1px solid #dee2e6", backgroundColor: "#f8f9fa" }}>
// //           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
// //             <span style={{ fontWeight: "600", color: "#333" }}>Total:</span>
// //             <span style={{ fontWeight: "bold", fontSize: "18px", color: "#e84135" }}>£{totalCost.toFixed(2)}</span>
// //           </div>
// //           <button
// //             onClick={handleClick}
// //             disabled={isProceedDisabled()}
// //             style={{
// //               width: "100%",
// //               padding: "14px",
// //               backgroundColor: isProceedDisabled() ? "#ccc" : "#e84135",
// //               color: "white",
// //               border: "none",
// //               borderRadius: "12px",
// //               fontSize: "16px",
// //               fontWeight: "bold",
// //               cursor: isProceedDisabled() ? "not-allowed" : "pointer",
// //               transition: "all 0.2s ease",
// //               boxShadow: isProceedDisabled() ? "none" : "0 4px 12px rgba(232, 65, 53, 0.3)",
// //             }}
// //           >
// //             {isProceedDisabled() ? "Select Required Options" : "+ Add to Order"}
// //           </button>
// //         </div>
// //       </div>

// //       <style jsx>{`
// //         @keyframes spin {
// //           0% { transform: rotate(0deg); }
// //           100% { transform: rotate(360deg); }
// //         }
// //       `}</style>
// //     </div>
// //   )
// // }

// // export default AddonPopup

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

//   const [addon, setAddon] = useState([])
//   const [selectedSize, setSelectedSize] = useState("")
//   const [selectedItem, setSelectedItem] = useState({})
//   const [selectedOptions, setSelectedOptions] = useState({})
//   const [totalCost, setTotalCost] = useState(0)
//   const [loading, setLoading] = useState(true)
//   const [isVisible, setIsVisible] = useState(false)
  
//   // Refs for sections
//   const sizeSectionRef = useRef(null)
//   const chooseOneSectionRef = useRef(null)
//   const cuttingSectionRef = useRef(null)

//   useEffect(() => {
//     const fetchWithHighPriority = async () => {
//       if (!food?.pkid) {
//         setLoading(false)
//         return
//       }

//       try {
//         const controller = new AbortController()
//         const timeoutId = setTimeout(() => controller.abort(), 8000)

//         const data = {
//           catid: food.pkid,
//           isdelivery: "1",
//         }

//         const fetchOptions = {
//           signal: controller.signal,
//           priority: "high",
//           cache: "no-cache",
//         }

//         let res
//         try {
//           res = await chooseAdd(data, fetchOptions)
//         } catch (error) {
//           console.log("Fallback to regular fetch")
//           res = await chooseAdd(data)
//         }

//         clearTimeout(timeoutId)

//         if (res?.menutypes && res.menutypes.length > 0) {
//           setAddon(res.menutypes)
//           setSelectedSize("")
//           setSelectedItem({})
//           setSelectedOptions({})
//           setTotalCost(0)
//         }
//       } catch (error) {
//         console.error("❌ API ERROR:", error)
//         toast.error("Failed to load options")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchWithHighPriority()
//   }, [food?.pkid])

//   useEffect(() => {
//     setIsVisible(true)

//     const scrollY = window.scrollY
//     const body = document.body

//     body.style.overflow = 'hidden'
//     body.style.position = 'relative'
//     body.style.top = `-${scrollY}px`

//     return () => {
//       body.style.overflow = ''
//       body.style.position = ''
//       body.style.top = ''
//       window.scrollTo(0, scrollY)
//     }
//   }, [])

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

//   const handleSizeChange = useCallback(
//     (size) => {
//       const selectedMenu = addon.find((menu) => menu.type === size)
//       if (!selectedMenu) return

//       setSelectedSize(size)
//       setSelectedItem(selectedMenu)
//       setSelectedOptions({})
//     },
//     [addon],
//   )

//   const handleOptionChange = useCallback(
//     (categoryId, subCategoryId, categoryName) => {
//       setSelectedOptions((prevOptions) => {
//         const currentSelections = prevOptions[categoryId] || []
//         const category = selectedItem?.menutypecategorys?.find((cat) => cat.menutypecategoryid === categoryId)

//         if (!category) return prevOptions

//         const isMultipleAllowed = category.ismultiple === "1"
//         const maxSelections = Number.parseInt(category.multiple, 10) || 0

//         let updatedSelections

//         if (!isMultipleAllowed || maxSelections === 1) {
//           // Radio button behavior - only one selection allowed
//           updatedSelections = [subCategoryId]
//         } else {
//           // Checkbox behavior - multiple selections allowed
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

//   const isProceedDisabled = () => {
//     if (loading || !selectedItem) return true

//     const requiredCategories = selectedItem.menutypecategorys?.filter((category) => category.isrequired === "1")
//     if (!requiredCategories?.length) return false

//     return requiredCategories.some((category) => {
//       const selections = selectedOptions[category.menutypecategoryid]
//       return !selections || selections.length === 0
//     })
//   }

//   const handleClose = useCallback(() => {
//     setIsVisible(false)
//     setTimeout(() => {
//       onClose()
//     }, 150)
//   }, [onClose])

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

//   // Get all categories from the selected item or from first addon item if none selected
//   const currentItem = selectedItem || addon[0]
  
//   const chooseOneCategory = currentItem?.menutypecategorys?.find(cat => 
//     cat.name === "Choose One"
//   )
  
//   const cuttingCategory = currentItem?.menutypecategorys?.find(cat => 
//     cat.name === "Cutting"
//   )

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
//         transition: "background-color 0.15s ease",
//       }}
//       onClick={(e) => {
//         if (e.target === e.currentTarget) handleClose()
//       }}
//     >
//       <div
//         ref={modalRef}
//         style={{
//           width: "380px",
//           maxHeight: "85vh",
//           backgroundColor: "white",
//           borderRadius: "16px",
//           boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
//           overflow: "hidden",
//           transform: `scale(${isVisible ? 1 : 0.95}) translateY(${isVisible ? 0 : "10px"})`,
//           opacity: isVisible ? 1 : 0,
//           transition: "all 0.15s ease",
//         }}
//       >
//         {/* Header */}
//         <div
//           style={{
//             padding: "20px 24px",
//             backgroundColor: "#e84135",
//             color: "white",
//             borderBottom: "1px solid #dee2e6",
//           }}
//         >
//           <div className="d-flex justify-content-between align-items-center">
//             <div>
//               <h5 style={{ margin: 0, fontWeight: "bold", fontSize: "18px" }}>Customize Your Order</h5>
//               <p style={{ margin: "4px 0 0 0", fontSize: "14px", opacity: 0.9 }}>
//                 Total: £{totalCost.toFixed(2)}
//               </p>
//             </div>
//             <button
//               onClick={handleClose}
//               style={{
//                 background: "none",
//                 border: "none",
//                 fontSize: "24px",
//                 color: "white",
//                 cursor: "pointer",
//                 padding: "0",
//                 width: "24px",
//                 height: "24px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//               aria-label="Close"
//             >
//               ×
//             </button>
//           </div>
//         </div>

//         {/* Body */}
//         <div
//           style={{
//             padding: "0",
//             maxHeight: "calc(70vh - 140px)",
//             overflowY: "auto",
//             WebkitOverflowScrolling: "touch",
//           }}
//         >
//           {loading ? (
//             <div style={{ textAlign: "center", padding: "40px 20px" }}>
//               <div
//                 style={{
//                   width: "40px",
//                   height: "40px",
//                   border: "3px solid #f3f3f3",
//                   borderTop: "3px solid #e84135",
//                   borderRadius: "50%",
//                   animation: "spin 1s linear infinite",
//                   margin: "0 auto 16px",
//                 }}
//               />
//               <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>Loading options...</p>
//             </div>
//           ) : (
//             <div style={{ padding: "20px" }}>
//               {/* Size Selection Section - Always visible */}
//               <div ref={sizeSectionRef} style={{ marginBottom: "24px" }}>
//                 <h6 style={{ margin: "0 0 16px 0", fontWeight: "600", color: "#333", fontSize: "16px" }}>
//                   1. Choose Size & Price
//                   <span style={{ fontSize: "12px", color: "#e84135", marginLeft: "8px" }}>
//                     (Required)
//                   </span>
//                 </h6>
//                 <div>
//                   {addon.map((menu) => {
//                     const isSelected = selectedSize === menu.type
//                     return (
//                       <div
//                         key={menu.menutypeid}
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "space-between",
//                           padding: "16px",
//                           borderRadius: "12px",
//                           backgroundColor: isSelected ? "#e84135" : "white",
//                           marginBottom: "12px",
//                           border: isSelected ? "2px solid #e84135" : "1px solid #ddd",
//                           cursor: "pointer",
//                           transition: "all 0.2s ease",
//                         }}
//                         onClick={() => handleSizeChange(menu.type)}
//                       >
//                         <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
//                           <div
//                             style={{
//                               width: "20px",
//                               height: "20px",
//                               borderRadius: "50%",
//                               border: isSelected ? "none" : "2px solid #ddd",
//                               backgroundColor: isSelected ? "white" : "transparent",
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "center",
//                             }}
//                           >
//                             {isSelected && (
//                               <div
//                                 style={{
//                                   width: "8px",
//                                   height: "8px",
//                                   borderRadius: "50%",
//                                   backgroundColor: "#e84135",
//                                 }}
//                               />
//                             )}
//                           </div>
//                           <span
//                             style={{
//                               fontWeight: isSelected ? "600" : "500",
//                               color: isSelected ? "white" : "#333",
//                               fontSize: "14px",
//                             }}
//                           >
//                             {menu.type}
//                           </span>
//                         </div>
//                         <span
//                           style={{
//                             fontWeight: "600",
//                             color: isSelected ? "white" : "#e84135",
//                             fontSize: "14px",
//                           }}
//                         >
//                           £{menu.cost}
//                         </span>
//                       </div>
//                     )
//                   })}
//                 </div>
//               </div>

//               {/* Choose One Section - Always visible if category exists */}
//               {chooseOneCategory && (
//                 <div 
//                   ref={chooseOneSectionRef} 
//                   style={{ 
//                     marginBottom: "24px",
//                     opacity: selectedSize ? 1 : 0.6
//                   }}
//                 >
//                   <h6 style={{ margin: "0 0 16px 0", fontWeight: "600", color: "#333", fontSize: "16px" }}>
//                     2. Choose One
//                     <span style={{ fontSize: "12px", color: "#e84135", marginLeft: "8px" }}>
//                       (Required)
//                     </span>
//                   </h6>
//                   <div>
//                     {chooseOneCategory.menutypesubcategorys?.map((subcategory) => {
//                       const isSelected = selectedOptions[chooseOneCategory.menutypecategoryid]?.includes(
//                         subcategory.menutypesubcategoryid
//                       )
//                       const isDisabled = !selectedSize
                      
//                       return (
//                         <div
//                           key={subcategory.menutypesubcategoryid}
//                           style={{
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "space-between",
//                             padding: "16px",
//                             borderRadius: "12px",
//                             backgroundColor: isSelected ? "#e84135" : (isDisabled ? "#f8f9fa" : "white"),
//                             marginBottom: "12px",
//                             border: isSelected ? "2px solid #e84135" : (isDisabled ? "1px solid #eee" : "1px solid #ddd"),
//                             cursor: isDisabled ? "not-allowed" : "pointer",
//                             transition: "all 0.2s ease",
//                           }}
//                           onClick={() => !isDisabled && handleOptionChange(chooseOneCategory.menutypecategoryid, subcategory.menutypesubcategoryid, "Choose One")}
//                         >
//                           <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
//                             <div
//                               style={{
//                                 width: "20px",
//                                 height: "20px",
//                                 borderRadius: "50%",
//                                 border: isSelected ? "none" : (isDisabled ? "2px solid #eee" : "2px solid #ddd"),
//                                 backgroundColor: isSelected ? "white" : "transparent",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "center",
//                               }}
//                             >
//                               {isSelected && (
//                                 <div
//                                   style={{
//                                     width: "8px",
//                                     height: "8px",
//                                     borderRadius: "50%",
//                                     backgroundColor: "#e84135",
//                                   }}
//                                 />
//                               )}
//                             </div>
//                             <span
//                               style={{
//                                 fontWeight: isSelected ? "600" : "500",
//                                 color: isSelected ? "white" : (isDisabled ? "#999" : "#333"),
//                                 fontSize: "14px",
//                               }}
//                             >
//                               {subcategory.name}
//                             </span>
//                           </div>
//                           {Number.parseFloat(subcategory.cost) > 0 && (
//                             <span
//                               style={{
//                                 fontWeight: "600",
//                                 color: isSelected ? "white" : (isDisabled ? "#ccc" : "#e84135"),
//                                 fontSize: "14px",
//                               }}
//                             >
//                               +£{subcategory.cost}
//                             </span>
//                           )}
//                         </div>
//                       )
//                     })}
//                   </div>
//                 </div>
//               )}

//               {/* Cutting Section - Always visible if category exists */}
//               {cuttingCategory && (
//                 <div 
//                   ref={cuttingSectionRef} 
//                   style={{ 
//                     marginBottom: "24px",
//                     opacity: selectedSize ? 1 : 0.6
//                   }}
//                 >
//                   <h6 style={{ margin: "0 0 16px 0", fontWeight: "600", color: "#333", fontSize: "16px" }}>
//                     3. Cutting Style
//                     <span style={{ fontSize: "12px", color: "#e84135", marginLeft: "8px" }}>
//                       (Required)
//                     </span>
//                   </h6>
//                   <div>
//                     {cuttingCategory.menutypesubcategorys
//                       ?.filter(subcategory => subcategory.name !== "Nihari Size")
//                       .map((subcategory) => {
//                         const isSelected = selectedOptions[cuttingCategory.menutypecategoryid]?.includes(
//                           subcategory.menutypesubcategoryid
//                         )
//                         const isDisabled = !selectedSize
                        
//                         return (
//                           <div
//                             key={subcategory.menutypesubcategoryid}
//                             style={{
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "space-between",
//                               padding: "16px",
//                               borderRadius: "12px",
//                               backgroundColor: isSelected ? "#e84135" : (isDisabled ? "#f8f9fa" : "white"),
//                               marginBottom: "12px",
//                               border: isSelected ? "2px solid #e84135" : (isDisabled ? "1px solid #eee" : "1px solid #ddd"),
//                               cursor: isDisabled ? "not-allowed" : "pointer",
//                               transition: "all 0.2s ease",
//                             }}
//                             onClick={() => !isDisabled && handleOptionChange(cuttingCategory.menutypecategoryid, subcategory.menutypesubcategoryid, "Cutting")}
//                           >
//                             <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
//                               <div
//                                 style={{
//                                   width: "20px",
//                                   height: "20px",
//                                   borderRadius: "50%",
//                                   border: isSelected ? "none" : (isDisabled ? "2px solid #eee" : "2px solid #ddd"),
//                                   backgroundColor: isSelected ? "white" : "transparent",
//                                   display: "flex",
//                                   alignItems: "center",
//                                   justifyContent: "center",
//                                 }}
//                               >
//                                 {isSelected && (
//                                   <div
//                                     style={{
//                                       width: "8px",
//                                       height: "8px",
//                                       borderRadius: "50%",
//                                       backgroundColor: "#e84135",
//                                     }}
//                                   />
//                                 )}
//                               </div>
//                               <span
//                                 style={{
//                                   fontWeight: isSelected ? "600" : "500",
//                                   color: isSelected ? "white" : (isDisabled ? "#999" : "#333"),
//                                   fontSize: "14px",
//                                 }}
//                               >
//                                 {subcategory.name}
//                               </span>
//                             </div>
//                             {Number.parseFloat(subcategory.cost) > 0 && (
//                               <span
//                                 style={{
//                                   fontWeight: "600",
//                                   color: isSelected ? "white" : (isDisabled ? "#ccc" : "#e84135"),
//                                   fontSize: "14px",
//                                 }}
//                               >
//                                 +£{subcategory.cost}
//                               </span>
//                             )}
//                           </div>
//                         )
//                       })}
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <div style={{ padding: "20px 24px", borderTop: "1px solid #dee2e6", backgroundColor: "#f8f9fa" }}>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
//             <span style={{ fontWeight: "600", color: "#333" }}>Total:</span>
//             <span style={{ fontWeight: "bold", fontSize: "18px", color: "#e84135" }}>£{totalCost.toFixed(2)}</span>
//           </div>
//           <button
//             onClick={handleClick}
//             disabled={isProceedDisabled()}
//             style={{
//               width: "100%",
//               padding: "14px",
//               backgroundColor: isProceedDisabled() ? "#ccc" : "#e84135",
//               color: "white",
//               border: "none",
//               borderRadius: "12px",
//               fontSize: "16px",
//               fontWeight: "bold",
//               cursor: isProceedDisabled() ? "not-allowed" : "pointer",
//               transition: "all 0.2s ease",
//               boxShadow: isProceedDisabled() ? "none" : "0 4px 12px rgba(232, 65, 53, 0.3)",
//             }}
//           >
//             {isProceedDisabled() ? "Select Required Options" : "+ Add to Order"}
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
  
  // Refs for sections
  const sizeSectionRef = useRef(null)
  const chooseOneSectionRef = useRef(null)
  const cuttingSectionRef = useRef(null)
  const modalBodyRef = useRef(null)

  useEffect(() => {
    const fetchWithHighPriority = async () => {
      if (!food?.pkid) {
        setLoading(false)
        return
      }

      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 8000)

        const data = {
          catid: food.pkid,
          isdelivery: "1",
        }

        const fetchOptions = {
          signal: controller.signal,
          priority: "high",
          cache: "no-cache",
        }

        let res
        try {
          res = await chooseAdd(data, fetchOptions)
        } catch (error) {
          console.log("Fallback to regular fetch")
          res = await chooseAdd(data)
        }

        clearTimeout(timeoutId)

        if (res?.menutypes && res.menutypes.length > 0) {
          setAddon(res.menutypes)
          setSelectedSize("")
          setSelectedItem({})
          setSelectedOptions({})
          setTotalCost(0)
        }
      } catch (error) {
        console.error("❌ API ERROR:", error)
        toast.error("Failed to load options")
      } finally {
        setLoading(false)
      }
    }

    fetchWithHighPriority()
  }, [food?.pkid])

  useEffect(() => {
    setIsVisible(true)

    const scrollY = window.scrollY
    const body = document.body

    body.style.overflow = 'hidden'
    body.style.position = 'relative'
    body.style.top = `-${scrollY}px`

    return () => {
      body.style.overflow = ''
      body.style.position = ''
      body.style.top = ''
      window.scrollTo(0, scrollY)
    }
  }, [])

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

  // Function to scroll to next section
  const scrollToNextSection = useCallback((currentSection) => {
    let nextSection = null
    
    if (currentSection === 'size') {
      nextSection = chooseOneSectionRef.current
    } else if (currentSection === 'chooseOne') {
      nextSection = cuttingSectionRef.current
    }
    
    if (nextSection && modalBodyRef.current) {
      // Calculate the position relative to the modal body
      const modalBody = modalBodyRef.current
      const sectionTop = nextSection.offsetTop - modalBody.offsetTop - 20 // 20px offset for better visibility
      
      modalBody.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      })
    }
  }, [])

  const handleSizeChange = useCallback(
    (size) => {
      const selectedMenu = addon.find((menu) => menu.type === size)
      if (!selectedMenu) return

      setSelectedSize(size)
      setSelectedItem(selectedMenu)
      setSelectedOptions({})
      
      // Scroll to Choose One section after selection
      setTimeout(() => {
        scrollToNextSection('size')
      }, 300)
    },
    [addon, scrollToNextSection],
  )

  const handleOptionChange = useCallback(
    (categoryId, subCategoryId, categoryName) => {
      setSelectedOptions((prevOptions) => {
        const currentSelections = prevOptions[categoryId] || []
        const category = selectedItem?.menutypecategorys?.find((cat) => cat.menutypecategoryid === categoryId)

        if (!category) return prevOptions

        const isMultipleAllowed = category.ismultiple === "1"
        const maxSelections = Number.parseInt(category.multiple, 10) || 0

        let updatedSelections

        if (!isMultipleAllowed || maxSelections === 1) {
          // Radio button behavior - only one selection allowed
          updatedSelections = [subCategoryId]
        } else {
          // Checkbox behavior - multiple selections allowed
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

      // Scroll to next section based on current category
      setTimeout(() => {
        if (categoryName === "Choose One") {
          scrollToNextSection('chooseOne')
        }
        // For Cutting section, no need to scroll further as it's the last section
      }, 300)
    },
    [selectedItem, scrollToNextSection],
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

  // Get all categories from the selected item or from first addon item if none selected
  const currentItem = selectedItem || addon[0]
  
  const chooseOneCategory = currentItem?.menutypecategorys?.find(cat => 
    cat.name === "Choose One"
  )
  
  const cuttingCategory = currentItem?.menutypecategorys?.find(cat => 
    cat.name === "Cutting"
  )

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
        alignItems: "flex-start",
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
          width: "380px",
          maxHeight: "85vh",
          backgroundColor: "white",
          borderRadius: "16px",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
          overflow: "hidden",
          transform: `scale(${isVisible ? 1 : 0.95}) translateY(${isVisible ? 0 : "10px"})`,
          opacity: isVisible ? 1 : 0,
          transition: "all 0.15s ease",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 24px",
            backgroundColor: "#e84135",
            color: "white",
            borderBottom: "1px solid #dee2e6",
          }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5 style={{ margin: 0, fontWeight: "bold", fontSize: "18px" }}>Customize Your Order</h5>
              <p style={{ margin: "4px 0 0 0", fontSize: "14px", opacity: 0.9 }}>
                Total: £{totalCost.toFixed(2)}
              </p>
            </div>
            <button
              onClick={handleClose}
              style={{
                background: "none",
                border: "none",
                fontSize: "24px",
                color: "white",
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
        </div>

        {/* Body */}
        <div
          ref={modalBodyRef}
          style={{
            padding: "0",
            maxHeight: "calc(70vh - 140px)",
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {loading ? (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  border: "3px solid #f3f3f3",
                  borderTop: "3px solid #e84135",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  margin: "0 auto 16px",
                }}
              />
              <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>Loading options...</p>
            </div>
          ) : (
            <div style={{ padding: "20px" }}>
              {/* Size Selection Section - Always visible */}
              <div ref={sizeSectionRef} style={{ marginBottom: "24px" }}>
                <h6 style={{ margin: "0 0 16px 0", fontWeight: "600", color: "#333", fontSize: "16px" }}>
                  1. Choose Size & Price
                  <span style={{ fontSize: "12px", color: "#e84135", marginLeft: "8px" }}>
                    (Required)
                  </span>
                </h6>
                <div>
                  {addon.map((menu) => {
                    const isSelected = selectedSize === menu.type
                    return (
                      <div
                        key={menu.menutypeid}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "16px",
                          borderRadius: "12px",
                          backgroundColor: isSelected ? "#e84135" : "white",
                          marginBottom: "12px",
                          border: isSelected ? "2px solid #e84135" : "1px solid #ddd",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                        onClick={() => handleSizeChange(menu.type)}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <div
                            style={{
                              width: "20px",
                              height: "20px",
                              borderRadius: "50%",
                              border: isSelected ? "none" : "2px solid #ddd",
                              backgroundColor: isSelected ? "white" : "transparent",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {isSelected && (
                              <div
                                style={{
                                  width: "8px",
                                  height: "8px",
                                  borderRadius: "50%",
                                  backgroundColor: "#e84135",
                                }}
                              />
                            )}
                          </div>
                          <span
                            style={{
                              fontWeight: isSelected ? "600" : "500",
                              color: isSelected ? "white" : "#333",
                              fontSize: "14px",
                            }}
                          >
                            {menu.type}
                          </span>
                        </div>
                        <span
                          style={{
                            fontWeight: "600",
                            color: isSelected ? "white" : "#e84135",
                            fontSize: "14px",
                          }}
                        >
                          £{menu.cost}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Choose One Section - Always visible if category exists */}
              {chooseOneCategory && (
                <div 
                  ref={chooseOneSectionRef} 
                  style={{ 
                    marginBottom: "24px",
                    opacity: selectedSize ? 1 : 0.6
                  }}
                >
                  <h6 style={{ margin: "0 0 16px 0", fontWeight: "600", color: "#333", fontSize: "16px" }}>
                    2. Choose One
                    <span style={{ fontSize: "12px", color: "#e84135", marginLeft: "8px" }}>
                      (Required)
                    </span>
                  </h6>
                  <div>
                    {chooseOneCategory.menutypesubcategorys?.map((subcategory) => {
                      const isSelected = selectedOptions[chooseOneCategory.menutypecategoryid]?.includes(
                        subcategory.menutypesubcategoryid
                      )
                      const isDisabled = !selectedSize
                      
                      return (
                        <div
                          key={subcategory.menutypesubcategoryid}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "16px",
                            borderRadius: "12px",
                            backgroundColor: isSelected ? "#e84135" : (isDisabled ? "#f8f9fa" : "white"),
                            marginBottom: "12px",
                            border: isSelected ? "2px solid #e84135" : (isDisabled ? "1px solid #eee" : "1px solid #ddd"),
                            cursor: isDisabled ? "not-allowed" : "pointer",
                            transition: "all 0.2s ease",
                          }}
                          onClick={() => !isDisabled && handleOptionChange(chooseOneCategory.menutypecategoryid, subcategory.menutypesubcategoryid, "Choose One")}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <div
                              style={{
                                width: "20px",
                                height: "20px",
                                borderRadius: "50%",
                                border: isSelected ? "none" : (isDisabled ? "2px solid #eee" : "2px solid #ddd"),
                                backgroundColor: isSelected ? "white" : "transparent",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {isSelected && (
                                <div
                                  style={{
                                    width: "8px",
                                    height: "8px",
                                    borderRadius: "50%",
                                    backgroundColor: "#e84135",
                                  }}
                                />
                              )}
                            </div>
                            <span
                              style={{
                                fontWeight: isSelected ? "600" : "500",
                                color: isSelected ? "white" : (isDisabled ? "#999" : "#333"),
                                fontSize: "14px",
                              }}
                            >
                              {subcategory.name}
                            </span>
                          </div>
                          {Number.parseFloat(subcategory.cost) > 0 && (
                            <span
                              style={{
                                fontWeight: "600",
                                color: isSelected ? "white" : (isDisabled ? "#ccc" : "#e84135"),
                                fontSize: "14px",
                              }}
                            >
                              +£{subcategory.cost}
                            </span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Cutting Section - Always visible if category exists */}
              {cuttingCategory && (
                <div 
                  ref={cuttingSectionRef} 
                  style={{ 
                    marginBottom: "24px",
                    opacity: selectedSize ? 1 : 0.6
                  }}
                >
                  <h6 style={{ margin: "0 0 16px 0", fontWeight: "600", color: "#333", fontSize: "16px" }}>
                    3. Cutting Style
                    <span style={{ fontSize: "12px", color: "#e84135", marginLeft: "8px" }}>
                      (Required)
                    </span>
                  </h6>
                  <div>
                    {cuttingCategory.menutypesubcategorys
                      ?.filter(subcategory => subcategory.name !== "Nihari Size")
                      .map((subcategory) => {
                        const isSelected = selectedOptions[cuttingCategory.menutypecategoryid]?.includes(
                          subcategory.menutypesubcategoryid
                        )
                        const isDisabled = !selectedSize
                        
                        return (
                          <div
                            key={subcategory.menutypesubcategoryid}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              padding: "16px",
                              borderRadius: "12px",
                              backgroundColor: isSelected ? "#e84135" : (isDisabled ? "#f8f9fa" : "white"),
                              marginBottom: "12px",
                              border: isSelected ? "2px solid #e84135" : (isDisabled ? "1px solid #eee" : "1px solid #ddd"),
                              cursor: isDisabled ? "not-allowed" : "pointer",
                              transition: "all 0.2s ease",
                            }}
                            onClick={() => !isDisabled && handleOptionChange(cuttingCategory.menutypecategoryid, subcategory.menutypesubcategoryid, "Cutting")}
                          >
                            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                              <div
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  borderRadius: "50%",
                                  border: isSelected ? "none" : (isDisabled ? "2px solid #eee" : "2px solid #ddd"),
                                  backgroundColor: isSelected ? "white" : "transparent",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                {isSelected && (
                                  <div
                                    style={{
                                      width: "8px",
                                      height: "8px",
                                      borderRadius: "50%",
                                      backgroundColor: "#e84135",
                                    }}
                                  />
                                )}
                              </div>
                              <span
                                style={{
                                  fontWeight: isSelected ? "600" : "500",
                                  color: isSelected ? "white" : (isDisabled ? "#999" : "#333"),
                                  fontSize: "14px",
                                }}
                              >
                                {subcategory.name}
                              </span>
                            </div>
                            {Number.parseFloat(subcategory.cost) > 0 && (
                              <span
                                style={{
                                  fontWeight: "600",
                                  color: isSelected ? "white" : (isDisabled ? "#ccc" : "#e84135"),
                                  fontSize: "14px",
                                }}
                              >
                                +£{subcategory.cost}
                              </span>
                            )}
                          </div>
                        )
                      })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: "20px 24px", borderTop: "1px solid #dee2e6", backgroundColor: "#f8f9fa" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span style={{ fontWeight: "600", color: "#333" }}>Total:</span>
            <span style={{ fontWeight: "bold", fontSize: "18px", color: "#e84135" }}>£{totalCost.toFixed(2)}</span>
          </div>
          <button
            onClick={handleClick}
            disabled={isProceedDisabled()}
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: isProceedDisabled() ? "#ccc" : "#e84135",
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: isProceedDisabled() ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
              boxShadow: isProceedDisabled() ? "none" : "0 4px 12px rgba(232, 65, 53, 0.3)",
            }}
          >
            {isProceedDisabled() ? "Select Required Options" : "+ Add to Order"}
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