import React from 'react';
import Footer from '../components/Footer';
import FooterMobileMenu from '../components/FooterMobileMenu';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import phone from '../assets/phone.svg';

const NotFound = () => {
  return (
    <>
      {/* Header section start */}
      <Navbar />
      {/* login page start */}
      <>
        {/* login page start */}
        <section className="section-b-space pt-120">
          <div className="container mt-5">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="row">
                  <div className="col-lg-4 texxt-center">
                    <img src={phone} alt="404 image" />
                  </div>
                  <div className="col-lg-8">
                    <h1 style={{ color: "rgb(232, 65, 53)" }} className="mb-3">
                      {" "}
                      Page Not Found
                    </h1>
                    <p className="mb-2" style={{ fontSize: 18 }}>
                      The page you're looking for might have been renamed, removed, or
                      perhaps it just never existed in the first place.
                    </p>
                    <p className="mb-2" style={{ fontSize: 18 }}>
                      Click the button below and we'll get you back on track.
                    </p>
                    <Link
                      to={"/"}
                      className="btn btn-primary mt-3"
                      style={{
                        background: "rgb(232, 65, 53)",
                        border: "rgb(232, 65, 53)"
                      }}
                    >
                      <i className="fa fa-home me-2" />
                      Back To Home
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>



      </>

      {/* login page end */}
      {/* footer section starts */}
      <Footer />
      {/* footer section end */}
      {/* mobile fix menu start */}
      <FooterMobileMenu />
      {/* mobile fix menu end */}

    </>
  );
}

export default NotFound;
