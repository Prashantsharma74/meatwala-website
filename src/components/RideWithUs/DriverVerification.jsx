import React, { useState,useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import backImage from '../../assets/deliveryboymeatwala.jpeg'
import Navbar from "../Navbar"
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { useNavigate } from "react-router-dom";
const DriverForms = () => {
  const [showFirstForm, setShowFirstForm] = useState(true);
  const [showSecondForm, setShowSecondForm] = useState(false);

  const [vehicleFormData, setVehicleFormData] = useState({
    email: "",
    servicetype: "",
    brand: "",
    vehiclemodel: "",
    manufacturer: "",
    numberplate: "",
    color: "",
    image: null,
  });

  const [certificateFormData, setCertificateFormData] = useState({
    email: "",
    insurance: null,
    drivinglincese: null,
    tranportofpeplelincence: null,
  });

  const navigate = useNavigate()
  const handleVehicleChange = (e) => {
    const { name, value, files } = e.target;
    setVehicleFormData({
      ...vehicleFormData,
      [name]: files ? files[0] : value,
    });
  };

  const handleCertificateChange = (e) => {
    const { name, files } = e.target;
    setCertificateFormData({
      ...certificateFormData,
      [name]: files[0],
    });
  };

  
  const handleVehicleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(vehicleFormData).forEach((key) => {
      formData.append(key, vehicleFormData[key]);
    });

    try {
      const response = await axios.post(
        "https://partnermeatwala.com/api/drivermaster/insertdrivervehical",
        formData
      );
      if (response.data.success === "1") {
        // Replaced alert with SweetAlert2
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Vehicle details submitted successfully!',
          confirmButtonText: 'OK',
          confirmButtonColor: "rgb(232, 65, 53)",
        });
        setShowFirstForm(false);
        setShowSecondForm(true);
      } else {
        // Replaced alert with SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Error: ${response.data.returnmsg}`,
          confirmButtonText: 'OK',
          confirmButtonColor: "rgb(232, 65, 53)",
        });
      }
    } catch (error) {
      console.error("Error submitting vehicle details:", error);
      // Replaced alert with SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while submitting vehicle details.',
        confirmButtonText: 'OK',
        confirmButtonColor: "rgb(232, 65, 53)",
      });
    }
  };

  const handleCertificateSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(certificateFormData).forEach((key) => {
      formData.append(key, certificateFormData[key]);
    });

    try {
      const response = await axios.post(
        "https://partnermeatwala.com/api/drivermaster/uploaddrivercertificate",
        formData
      );
      if (response.data.success === "1") {
        // Replaced alert with SweetAlert2
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Certificates submitted successfully!',
          confirmButtonText: 'OK',
          confirmButtonColor: "rgb(232, 65, 53)",
        });
        setShowSecondForm(false);
        navigate("/become-a-rider")
        
      } else {
        // Replaced alert with SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Error: ${response.data.returnmsg}`,
          confirmButtonText: 'OK',
          confirmButtonColor: "rgb(232, 65, 53)",
        });
      }
    } catch (error) {
      console.error("Error submitting certificates:", error);
      // Replaced alert with SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while submitting certificates.',
        confirmButtonText: 'OK',
        confirmButtonColor: "rgb(232, 65, 53)",
      });
    }
  };

  const formContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f8f9fa",
  };

  const formStyle = {
    width: "450px",
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  };

  const inputStyle = {
    width: "100%",
    marginBottom: "10px",
    padding: "12px",
    borderRadius: "5px",
    border: "1px solid #ddd",
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    background: "linear-gradient(to right, #00bff3, #007bff)",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  };
  const labelStyle = {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  };
  const backgroundStyle = {
    backgroundImage: `url(${backImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: "15px 15px 15px 15px", // top right bottom left

    };

    useEffect(() => {
      // Disable body scroll
      disableBodyScroll(document.body);
  
      // Enable scroll when component is unmounted
      return () => {
        enableBodyScroll(document.body);
      };
    }, []);
  return (

    
    <>
    <Navbar/>
    <div style={backgroundStyle}>
      {showFirstForm && (
        // <div style={formContainerStyle}>
          <form style={formStyle} onSubmit={handleVehicleSubmit}>
            <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
              Enter Vehicle Details
            </h3>
            <input
              type="text"
              name="email"
              placeholder="email"
              style={inputStyle}
              onChange={handleVehicleChange}
            />
            {/* <input
              type="text"
              name="servicetype"
              placeholder="Service Type"
              style={inputStyle}
              onChange={handleVehicleChange}
            />
            <input
              type="text"
              name="brand"
              placeholder="Brand"
              style={inputStyle}
              onChange={handleVehicleChange}
            /> */}
            <input
              type="text"
              name="vehiclemodel"
              placeholder="Vehicle Model"
              style={inputStyle}
              onChange={handleVehicleChange}
            />
            <input
              type="text"
              name="manufacturer"
              placeholder="Manufacturer"
              style={inputStyle}
              onChange={handleVehicleChange}
            />
            <input
              type="text"
              name="numberplate"
              placeholder="Number Plate"
              style={inputStyle}
              onChange={handleVehicleChange}
            />
            <input
              type="text"
              name="color"
              placeholder="Color"
              style={inputStyle}
              onChange={handleVehicleChange}
            />
            <input
              type="file"
              name="image"
              style={inputStyle}
              onChange={handleVehicleChange}
            />
            <button type="submit" style={buttonStyle}>
              Submit Vehicle Details
            </button>
          </form>
        // </div>
      )}

      {showSecondForm && (
        <div style={formContainerStyle}>
          <form style={formStyle} onSubmit={handleCertificateSubmit}>
            <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
              email
            </h3>
            <label style={labelStyle} htmlFor="email">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              style={inputStyle}
              onChange={handleCertificateChange}
            />
            <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
              Upload Certificates
            </h3>
            <label style={labelStyle} htmlFor="insurance">
              Upload Insurance
            </label>
            <input
              type="file"
              name="insurance"
              id="insurance"
              style={inputStyle}
              onChange={handleCertificateChange}
            />
            <label style={labelStyle} htmlFor="drivinglincese">
              Upload Driving License
            </label>
            <input
              type="file"
              name="drivinglincese"
              id="drivinglincese"
              style={inputStyle}
              onChange={handleCertificateChange}
            />
            <label style={labelStyle} htmlFor="tranportofpeplelincence">
              Upload Transport of People License
            </label>
            <input
              type="file"
              name="tranportofpeplelincence"
              id="tranportofpeplelincence"
              style={inputStyle}
              onChange={handleCertificateChange}
            />
            <button type="submit" style={buttonStyle}>
              Submit Certificates
            </button>
          </form>
        </div>
      )}
    </div>
    </>
  );
};

export default DriverForms;
