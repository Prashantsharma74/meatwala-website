import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendOtp, resetState } from "../store/feature/userSlice";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast, ToastContainer } from "react-toastify";
import FooterMobileMenu from "../components/FooterMobileMenu";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, success, error, status } = useSelector(
    (state) => state.User
  );

  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    if (status == "1") {
      navigate("/otp");
    } else if (status == "0") {
      dispatch(resetState());
      toast.error("Mobile Number is Invalid");
    }
  }, [status, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate if the phone number is valid before dispatching OTP
    if (phoneNumber && phoneNumber.length >= 10) {
      dispatch(sendOtp({ mobileno: "+" + phoneNumber }));
    } else {
      toast.error("Please enter a valid mobile number.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Customer Login – Manage Your Halal Meat Orders | Meatwala</title>
        <meta
          name="description"
          content="Sign in to your Meatwala account to track your halal meat orders, manage preferences, and enjoy seamless shopping."
        />
      </Helmet>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .react-tel-input {
              width: 100%;
            }
            @media (max-width: 600px) {
              .react-tel-input {
                width: 100%;
              }
            }
          `,
        }}
      />
      {/* login page start */}
      <section className="section-b-space pt-120">
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="pb-2 pt-2">
                    <strong>LOGIN</strong>
                  </h5>
                </div>
                <div className="card-body">
                  <form className="auth-form" onSubmit={handleSubmit}>
                    <h5>Enter your mobile number to get OTP</h5>
                    <div className="form-group">
                      <label className="form-label fw-semibold dark-text">
                        Mobile Number
                      </label>
                      <div className="d-flex gap-3">
                        <PhoneInput
                          country={"gb"} // Default country
                          value={phoneNumber}
                          onChange={(phone) => setPhoneNumber(phone)}
                          inputProps={{
                            name: "mobile",
                            required: true,
                            className: "form-control form-control-submit",
                          }}
                        />
                      </div>
                    </div>
                    {/* <button className="btn theme-btn w-100 mt-4" type="submit">
                      Send OTP
                    </button> */}
                    <button
                      className="btn theme-btn w-100 mt-4 d-inline-flex align-items-center justify-content-center"
                      type="submit"
                      disabled={loading}
                      aria-busy={loading}
                      aria-live="polite"
                    >
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          />
                          Sending…
                        </>
                      ) : (
                        "Send OTP"
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
      {/* login page end */}
      <FooterMobileMenu />
    </>
  );
};

export default Login;
