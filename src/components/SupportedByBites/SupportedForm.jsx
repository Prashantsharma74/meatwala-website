import React, { useRef, useState } from "react";
import Swal from "sweetalert2";
import { insertSupportedBybites } from "../../utils/api";
import Donate from "../../assets/donate3.jpeg";

const SupportedForm = () => {
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    bussinessname: "",
    bussinessaddress: "",
    bussinesstype: "",
    city: "",
    postcode: "",
    message: "",
    acknowledge: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!formData) {
      console.error("formData is undefined!");
      return false;
    }

    const newErrors = {};

    if (!formData.firstName?.trim())
      newErrors.firstname = "First Name is required.";
    if (!formData.lastName?.trim())
      newErrors.lastname = "Last Name is required.";
    if (!formData.phone?.trim()) newErrors.phone = "Phone number is required.";
    else if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone number must be 10 digits.";
    if (!formData.email?.trim()) newErrors.email = "Email is required.";
    else if (
      !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.email)
    )
      newErrors.email = "Invalid email format.";
    if (!formData.bussinessname?.trim())
      newErrors.bussinessname = "Business Name is required.";
    if (!formData.bussinessaddress?.trim())
      newErrors.bussinessaddress = "Business Address is required.";
    if (!formData.bussinesstype?.trim())
      newErrors.bussinesstype = "Business Type is required.";
    if (!formData.city?.trim()) newErrors.city = "City is required.";
    if (!formData.postcode?.trim())
      newErrors.postcode = "Postcode is required.";
    if (!formData.message?.trim()) newErrors.message = "Message is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      if (!/^\d*$/.test(value) || value.length > 10) return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      Swal.fire({
        icon: "error",
        title: "Form Submission Failed",
        text: "Please correct the errors and try again.",
        confirmButtonColor: "rgb(232, 65, 53)",
      });
      return;
    }
    setLoading(true);
    try {
      const response = await insertSupportedBybites(formData);

      if (response.success === "1") {
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "Application Submitted",
          text: "Your application has been submitted successfully!",
          confirmButtonColor: "rgb(232, 65, 53)",
        });
      }

      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        organisationName: "",
        address: "",
        city: "",
        postcode: "",
        message: "",
        acknowledge: false,
      });
    } catch (error) {
      console.error("Unable to Process.");
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "An error occurred. Please try again later.",
        confirmButtonColor: "rgb(232, 65, 53)",
      });
    }
  };

  return (
    <div className="contain" id="contain" style={{ paddingBottom: "0px" }}>
      <div className="py-3">
        <div className="row">
          <div
            className="col-12 col-md-6 logo-section d-flex flex-column align-items-start justify-content-center mb-3 mb-md-0 d-none d-md-flex"
            style={{
              backgroundColor: "#f8f9fa",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <h2
              className="text-dark text-center text-md-start mb-4"
              style={{
                fontWeight: "600",
                fontSize: "1.8rem",
                lineHeight: "1.5",
              }}
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
                {
                  label: "First Name",
                  name: "firstName",
                  type: "text",
                  placeholder: "First Name",
                },
                {
                  label: "Last Name",
                  name: "lastName",
                  type: "text",
                  placeholder: "Last Name",
                },
                {
                  label: "Phone",
                  name: "phone",
                  type: "number",
                  placeholder: "Phone",
                  maxLength: 10,
                  pattern: "[0-9]*",
                },
                {
                  label: "Email",
                  name: "email",
                  type: "email",
                  placeholder: "Email",
                },
                {
                  label: "Organisation Name",
                  name: "bussinessname",
                  type: "text",
                  placeholder: "Business Name",
                },
                {
                  label: "Organisation Address",
                  name: "bussinessaddress",
                  type: "text",
                  placeholder: "Business Address",
                },
                {
                  label: "Organisation Type",
                  name: "bussinesstype",
                  type: "text",
                  placeholder: "Business Type",
                },
                {
                  label: "City",
                  name: "city",
                  type: "text",
                  placeholder: "City",
                },
                {
                  label: "Postcode",
                  name: "postcode",
                  type: "text",
                  placeholder: "Postcode",
                },
              ].map(({ label, name, type, placeholder }) => (
                <div className="mb-3 w-100" key={name}>
                  <label className="form-label text-light">{label} *</label>
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className={`form-control ${
                      errors[name] ? "is-invalid" : ""
                    }`}
                    placeholder={placeholder}
                  />
                  {errors[name] && (
                    <div className="invalid-feedback">{errors[name]}</div>
                  )}
                </div>
              ))}

              <div className="mb-3 w-100">
                <label className="form-label text-light">
                  Please tell us about the project that you would like to
                  nominate *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className={`form-control ${
                    errors.message ? "is-invalid" : ""
                  }`}
                  placeholder="Enter details about your project"
                ></textarea>
                {errors.message && (
                  <div className="invalid-feedback">{errors.message}</div>
                )}
              </div>

              <button
                type="submit"
                className="btn mt-3 w-100"
                style={{ backgroundColor: "rgb(232, 65, 53)", color: "white" }}
              >
                {loading ? (
                  <span>
                    <i className="fa fa-spinner fa-spin"></i> Applying...
                  </span>
                ) : (
                  "Apply"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportedForm;
