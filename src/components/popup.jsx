import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CityPopup = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [cities, setCities] = useState([]);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const popularCities = [
    { name: "High Wycombe", icon: "\uD83C\uDFE1", id:1 },
    { name: "Aylesbury", icon: "\uD83C\uDFF0",id:3},
    { name: "Reading", icon: "\uD83C\uDFE1",id:11 },
    { name: "Oxford", icon: "\uD83C\uDFEF",id:12 },
    // { name: "Luton", icon: "\uD83C\uDFF0" },
    // { name: "Slough", icon: "\uD83C\uDFEB" },
  ];

  useEffect(() => {
    fetchCities();
  }, []);


  const fetchCities = async () => {
    try {
      const response = await axios.get(
        "https://partnermeatwala.com/api/customer/getcountrywisecity"
      );
      if (response.data.success === "1") {
        const country = response.data.countries.find(
          (c) => c.countryname === "United Kingdom"
        );
        if (country) {
          const cityList = country.cities.map((city) => ({
            id: city.cityid,
            name: city.cityname.trim(),
          }));
          setCities(cityList);
        }
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  return (
    <>
      <Link
        href="#"
        onClick={openModal}
        style={{
          color: "#e84135",
          borderBottom: "1px solid #e84135",
        }}
      >
        More Cities...
      </Link>

      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              padding: "20px",
              maxWidth: "900px",
              width: "90%",
              maxHeight: "80vh",
              overflowY: "auto",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #ddd",
                paddingBottom: "10px",
                marginBottom: "15px",
              }}
            >
              <h4 style={{ margin: 0, fontSize: "18px", color: "#e84135" }}>
                Select Your City
              </h4>
              <button
                onClick={closeModal}
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              >
                ✖
              </button>
            </div>
            <div>
              <h5
                style={{
                  margin: "10px 0",
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#e84135",
                  textAlign: "center",
                }}
              >
                Popular Cities
              </h5>
              <ul
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                  gap: "10px",
                  marginBottom: "15px",
                  listStyleType: "none",
                  padding: 0,
                }}
              >
                {popularCities.map((city) => (
                  <li
                    key={city.id}
                    style={{
                      textAlign: "center",
                      background: "#f9f9f9",
                      borderRadius: "6px",
                      padding: "10px",
                      cursor: "pointer",
                      transition: "background 0.3s",
                    }}
                  >
                    <Link
                      to={`/near-me/${encodeURIComponent(city.name)}/${city.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                      onClick={closeModal}
                    >
                      <div style={{ fontSize: "24px" }}>{city.icon}</div>
                      <div style={{ marginTop: "5px", fontSize: "14px" }}>
                        {city.name}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              <h5
                style={{
                  margin: "10px 0",
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#e84135",
                  textAlign: "center",
                }}
              >
                Other Cities
              </h5>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                  gap: "10px",
                  marginBottom: "15px",
                  overflowX: "auto",
                }}
              >
                {cities.map((city) => (
                  <div
                    key={city.id}
                    style={{
                      textAlign: "center",
                      padding: "5px 5px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      background: "#f9f9f9",
                      fontSize: "14px",
                      cursor: "pointer",
                      transition: "background 0.3s",
                    }}
                  >
                    <Link
                      to={`/near-me/${encodeURIComponent(city.name)}/${city.id}`}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                      }}
                      onClick={closeModal}
                    >
                      {city.name}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CityPopup;
