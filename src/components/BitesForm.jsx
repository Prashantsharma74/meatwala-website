import React, { useState } from "react";
import "./BitesForm.css";
import Swal from "sweetalert2";
import { insertbitesforbussiness } from "../utils/api";
import Donate from "../assets/buffer.jpg"
const BitesForm = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Phone: "",
    Email: "",
    Organisation: "",
    Address: "",
    City: "",
    Postcode: "",
    Nominate: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "Phone") {
      // Ensure only digits and max 10 characters
      if (!/^\d*$/.test(value) || value.length > 10) {
        return;
      }
    }

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validate = () => {
    let newErrors = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = `${key} is required`;
      }
    });

    // Additional validation
    if (formData.Email && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.Email)) {
      newErrors.Email = "Invalid email address";
    }

    if (formData.Phone && (!/^\d{10}$/.test(formData.Phone))) {
      newErrors.Phone = "Phone number must be exactly 10 digits";
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const response = await insertbitesforbussiness(formData);

        if (response.success === "0") {
          // Show error alert for duplicate email using SweetAlert2
          Swal.fire({
            title: response.returnmsg || "Duplicate Email",
            text: "The email you entered already exists.",
            icon: "warning",
            confirmButtonText: "OK",
            confirmButtonColor: "rgb(232, 65, 53)",})
        } else {
          // Show success alert using SweetAlert2
          Swal.fire({
            title: "Success!",
            text: "Form submitted successfully!",
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "rgb(232, 65, 53)",
          });

          // Reset form data
          setFormData({
            Name: "",
            Phone: "",
            Email: "",
            Organisation: "",
            Address: "",
            City: "",
            Postcode: "",
            Nominate: "",
          });

          setErrors({});
        }

      } catch (error) {
        console.error("Error submitting form:", error);

        // Show error alert using SweetAlert2
        Swal.fire({
          title: "Error!",
          text: "Failed to submit the form. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "rgb(232, 65, 53)",
        });
      }
    }
  };

  return (
    <div className="contain" id="contain">
      <div className="py-3">
        <div className="row">
          <div className="col-12 col-md-6 logo-section d-flex align-items-center justify-content-start mb-3 mb-md-0 d-none d-md-flex">

            <h2 className="text-white text-center text-md-start">
              Enter Your Business Details & Sign Up Today.
            </h2>

            <img
              src={`${Donate}`}
              alt="Business Logo"
              className="img-fluid me-3 mt-3"
              style={{ width: "100%", height: "60vh" }}
            />
          </div>


          <div className="col-12 col-md-6">
            <form
              onSubmit={handleSubmit}
              className="d-flex flex-column align-items-center"
            >
              {[
                { label: "Full name", name: "Name", type: "text", placeholder: "Full name" },
                { label: "Phone", name: "Phone", type: "tel", placeholder: "Phone", maxLength: 10, pattern: "[0-9]*" },
                { label: "Email", name: "Email", type: "email", placeholder: "Email" },
                { label: "Organisation", name: "Organisation", type: "text", placeholder: "Organisation Name" },
                { label: "Address", name: "Address", type: "text", placeholder: "Address" },
                { label: "City", name: "City", type: "text", placeholder: "City" },
                { label: "Post Code", name: "Postcode", type: "text", placeholder: "Post Code" },
              ].map(({ label, name, type, placeholder }) => (
                <div className="mb-3 w-100" key={name}>
                  <label className="form-label text-light">{label} *</label>
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className={`form-control ${errors[name] ? "is-invalid" : ""}`}
                    // style={{ width: "450px" }}
                    placeholder={placeholder}
                  />
                  {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
                </div>
              ))}
              <div className="mb-3 w-100">
                <label className="form-label text-light">Message </label>
                <textarea
                  name="Nominate"
                  value={formData.Nominate}
                  onChange={handleChange}
                  className={`form-control`}
                  rows="3"
                  // style={{ width: "450px" }}
                  placeholder="Add message"
                ></textarea>
              </div>
              <button type="submit" className="btn hover-effect mt-3" style={{ backgroundColor: "rgb(232, 65, 53)", color: "white" }} >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BitesForm;
