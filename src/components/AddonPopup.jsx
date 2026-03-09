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

              {currentItem?.menutypecategorys?.map((category, index) => (
                <div key={category.menutypecategoryid} style={{ marginBottom: "24px" }}>

                  <h6 style={{ margin: "0 0 16px 0", fontWeight: "600", fontSize: "16px" }}>
                    {index + 2}. {category.name}

                    {category.isrequired === "1" && (
                      <span style={{ fontSize: "12px", color: "#e84135", marginLeft: "8px" }}>
                        (Required)
                      </span>
                    )}
                  </h6>

                  <div>
                    {category.menutypesubcategorys?.map((subcategory) => {
                      const isSelected =
                        selectedOptions[category.menutypecategoryid]?.includes(
                          subcategory.menutypesubcategoryid
                        )

                      const isDisabled = !selectedSize

                      return (
                        <div
                          key={subcategory.menutypesubcategoryid}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "16px",
                            borderRadius: "12px",
                            backgroundColor: isSelected ? "#e84135" : "white",
                            marginBottom: "12px",
                            border: "1px solid #ddd",
                            cursor: isDisabled ? "not-allowed" : "pointer",
                          }}
                          onClick={() =>
                            !isDisabled &&
                            handleOptionChange(
                              category.menutypecategoryid,
                              subcategory.menutypesubcategoryid,
                              category.name
                            )
                          }
                        >
                          <span
                            style={{
                              color: isSelected ? "white" : "#333",
                            }}
                          >
                            {subcategory.name}
                          </span>

                          {Number(subcategory.cost) > 0 && (
                            <span
                              style={{
                                color: isSelected ? "white" : "#e84135",
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
              ))}

              {/* Choose One Section - Always visible if category exists */}
              {/* {chooseOneCategory && (
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
              )} */}

              {/* Cutting Section - Always visible if category exists */}
              {/* {cuttingCategory && (
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
              )} */}
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