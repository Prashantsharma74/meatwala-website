import React, { useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { insertrestaurantwholesale } from '../utils/api';
import Donate from "../assets/donatemeatwala.jpeg";

const WholesaleForm = () => {
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    restaurantname: '',
    address: '',
    country: '',
    city: '',
    postcode: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required.';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone number must be 10 digits.';
    if (!formData.email.trim()) newErrors.email = 'Email is required.';
    else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.email)) newErrors.email = 'Invalid email format.';
    if (!formData.restaurantname.trim()) newErrors.restaurantname = 'Organisation Name is required.';
    if (!formData.address.trim()) newErrors.address = 'Address is required.';
    if (!formData.country.trim()) newErrors.country = 'Country is required.';
    if (!formData.city.trim()) newErrors.city = 'City is required.';
    if (!formData.postcode.trim()) newErrors.postcode = 'Postcode is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      // Ensure only digits and max 10 characters
      if (!/^\d*$/.test(value) || value.length > 10) {
        return;
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      Swal.fire({
        icon: 'error',
        title: 'Form Submission Failed',
        text: 'Please correct the errors and try again.',
        confirmButtonColor: "rgb(232, 65, 53)",
      });
      return;
    }

    try {
      const res = await insertrestaurantwholesale(formData);
      Swal.fire({
        icon: 'success',
        title: 'Application Submitted',
        text: 'Your application has been submitted successfully!',
        confirmButtonColor: "rgb(232, 65, 53)",
      });

      // Reset form after successful submission
      setFormData({
        name: '',
        phone: '',
        email: '',
        restaurantname: '',
        address: '',
        country: '',
        city: '',
        postcode: '',
      });
    } catch (error) {
      console.error('Unable to Process.');
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: 'An error occurred. Please try again later.',
        confirmButtonColor: "rgb(232, 65, 53)",
      });
    }
  };

  return (
    <div className="contain" id="contain" style={{ paddingBottom: '0px' }}>
      <div className="py-3">
        <div className="row">
           <div
            className="col-12 col-md-6 logo-section d-flex flex-column align-items-start justify-content-center mb-3 mb-md-0 d-none d-md-flex"
            style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "8px" }}
          >
            <h2
              className="text-dark text-center text-md-start mb-4"
              style={{ fontWeight: "600", fontSize: "1.8rem", lineHeight: "1.5" }}
            >
              Enter Your Business Details & Sign Up Today.
            </h2>
            <img
              src={`${Donate}`}
              alt="Business Logo"
              className="img-fluid mt-3"
              style={{
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                width: "100%",
                height: "60vh",
                objectFit: "cover",
              }}
            />
          </div>

          <div className="col-12 col-md-6">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="d-flex flex-column align-items-center"
            >
              {[
                { label: 'Name', name: 'name', type: 'text', placeholder: 'Name' },
                { label: 'Phone', name: 'phone', type: 'number', placeholder: 'Phone', maxLength: 10, pattern: "[0-9]*" },
                { label: 'Email', name: 'email', type: 'email', placeholder: 'Email' },
                { label: 'Restaurant Name', name: 'restaurantname', type: 'text', placeholder: 'Restaurant Name' },
                { label: 'Address', name: 'address', type: 'text', placeholder: 'Address' },
                { label: 'Country', name: 'country', type: 'text', placeholder: 'Country' },
                { label: 'City', name: 'city', type: 'text', placeholder: 'City' },
                { label: 'Postcode', name: 'postcode', type: 'text', placeholder: 'Postcode' },
              ].map(({ label, name, type, placeholder }) => (
                <div className="mb-3 w-100" key={name}>
                  <label className="form-label text-light">{label} *</label>
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className={`form-control ${errors[name] ? 'is-invalid' : ''}`}
                    placeholder={placeholder}
                  />
                  {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
                </div>
              ))}

              <button
                type="submit"
                className="btn mt-3 w-100"
                style={{ backgroundColor: 'rgb(232, 65, 53)', color: 'white' }}
              >
                Apply
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WholesaleForm;