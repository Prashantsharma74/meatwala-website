import Navbar from "../components/Navbar"
import Delivery from "../components/delivery"
import Footer from "../components/Footer"
import FooterMobileMenu from "../components/FooterMobileMenu"
import { Helmet } from "react-helmet-async"
import './terms.css'

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Meatwala Terms of Service | Know Your Rights</title>
        <meta
          name="description"
          content="Read Meatwala's terms of service to understand our policies, ordering process & delivery guidelines."
        />
      </Helmet>
      <Navbar />
      <div className="div-t-space overflow-hidden">
        <Delivery />
      </div>

      <div class="tos-container">
        <div class="tos-wrapper">
          <div class="tos-content">
            <div class="tos-main">
              <div class="tos-header-top">
                <h1 class="tos-title" style={{ fontSize: "30px" }}>Terms of Service</h1>
                <div class="tos-divider"></div>
                <p class="tos-intro">
                  Please read these Terms of Service carefully before ordering. By using our website or mobile
                  applications, you agree to be bound by these terms and conditions.
                </p>
              </div>
              <div class="tos-last-updated">
                <p><strong>Last Updated:</strong> Monday, 25th of August, 2025</p>
              </div>
              <div class="tos-section tos-about-us">
                <h2 class="tos-section-title">
                  <span class="tos-section-number">1:-</span>About Us
                </h2>
                <div class="company-info">
                  {/* <h3 class="company-info-title mt-2">Company Information</h3> */}
                  <div class="company-info-item">
                    <p className="mx-4"><strong>Company Name:</strong>- Meatwala Group Ltd</p>
                  </div>
                  <div class="company-info-item">
                    <p className="mx-4"><strong>Contact Email:</strong>- <a href="mailto:contact@meatwala.co.uk" style={{ border: "none" }}>contact@meatwala.co.uk</a></p>
                  </div>
                </div>

                <ul>
                  <li style={{ fontSize: "15px" }} className="mx-4">We are referred to as <strong>"Meatwala"</strong>, <strong>"we"</strong>, <strong>"us"</strong> and <strong>"our"</strong>.</li>
                  <li style={{ fontSize: "15px" }} className="mx-4">The Meatwala High Wycombe Ltd logo, marks, emblems, and images are the copyright of Meatwala High Wycombe Ltd, © 2024 All Rights Reserved.</li>
                </ul>

                <div class="tos-additional-terms mt-2">
                  <h4 className="fw-bold">Additional Terms Apply:</h4>
                  <ul style={{ display: "flex", alignItems: 'flex-start', justifyContent: "flex-start", flexDirection: "column" }}>
                    <li>- Privacy Policy (Website)</li>
                    <li>- Cookie Policy (Website)</li>
                    <li>- App Privacy Policy (Mobile)</li>
                    <li>- EULA (Mobile Applications)</li>
                  </ul>
                </div>
              </div>

              <div class="tos-section tos-services">
                <h2 class="tos-section-title">
                  <span class="tos-section-number">2:-</span>Our Services
                </h2>
                <div class="tos-text">
                  <p className="mx-4">
                    Meatwala High Wycombe Ltd provides on-demand delivery services via a mobile application and website.
                    Our platform connects you with local halal meat and grocery partners, and independent contractor
                    drivers for delivery services. We are not a retail store, halal meat and grocery store, food
                    delivery service, merchandise delivery service, or food preparation entity.
                  </p>
                </div>
              </div>

              <div class="tos-section tos-service-availability">
                <h2 class="tos-section-title">
                  <span class="tos-section-number">3:-</span>Service Availability
                </h2>
                <div class="tos-text">
                  <p className="mx-4">
                    We offer ordering and delivery services from our halal meat and grocery partners. Each partner has a
                    prescribed delivery area to ensure products reach you at their best quality.
                  </p>
                  <div class="tos-note">
                    <p className="mx-4"><strong>Note:</strong> If you live outside our delivery areas, you will be notified that online
                      ordering is not available. Operating hours vary depending on local trading conditions and partner
                      availability.</p>
                  </div>
                </div>
              </div>

              <div class="tos-section tos-orders">
                <h2 class="tos-section-title">
                  <span class="tos-section-number">4:-</span>Orders
                </h2>

                <div class="order-confirmation">
                  <h5 className="mt-2 fw-bold">- Order Confirmation</h5>
                  <p className="mx-3">
                    Minimum order values are set by individual partners. When you place an order, a confirmation email
                    will be sent to you. The contract is formed between you and the partner when you receive this
                    confirmation.
                  </p>
                </div>

                <div class="order-info">
                  <p className="mx-3">
                    Please ensure you provide a correct email address and accurate delivery address and telephone
                    number. We aim to deliver within 55 minutes, and you can track your order through our website or
                    app.
                  </p>
                </div>

                <div class="delivery-policy">
                  <h5 class="mt-2 fw-bold">- Important Delivery Policy</h5>
                  <p className="mx-3">
                    If you do not respond within 5 minutes of our driver reaching your address, we reserve the right to
                    leave the premises. You will still be charged for the order plus delivery.
                  </p>
                </div>
              </div>

              {/* <!-- Cancellation Section --> */}
              <div class="tos-section tos-cancellation">
                <h2 class="tos-section-title">
                  <span class="tos-section-number">5:-</span>Cancellation Policy
                </h2>

                <div class="free-cancellation">
                  <h5 class="mt-2 fw-bold">- Free Cancellation</h5>
                  <p className="mx-3">
                    You may cancel an order without charge before the store starts preparing it. Cancel immediately
                    through your account under orders via our application.
                  </p>
                </div>

                <div class="cancel-info">
                  <p className="mx-3">
                    If you cancel after preparation has started, you will be charged the full price for items. If the
                    driver has been dispatched, you will also be charged for delivery. We may cancel orders at any time
                    without charge to you.
                  </p>
                </div>
              </div>

              {/* <!-- Price and Payment Section --> */}
              <div class="tos-section tos-pricing-payment">
                <h2 class="tos-section-title">
                  <span class="tos-section-number">6:-</span>Price and Payment
                </h2>

                <div class="pricing-info">
                  <p className="mx-4">
                    Prices include VAT and are subject to change, but changes won't affect confirmed orders except for
                    obvious pricing mistakes. We accept credit and debit card payments through our service.
                  </p>
                </div>

                <div class="payment-processing">
                  <h5 class="fw-bold">- Payment Processing</h5>
                  <p className="mx-4">
                    Payment is made directly to Meatwala High Wycombe Ltd and passed to partners. We may charge a
                    delivery fee, which will be shown before you complete your order.
                  </p>
                </div>
              </div>

              {/* <!-- Age Requirements Section --> */}
              <div class="tos-section tos-access-requirements">
                <h2 class="tos-section-title">
                  <span class="tos-section-number">7:-</span>Access Requirements
                </h2>

                <div class="age-requirement">
                  <h5 class="fw-bold">- Age Requirement</h5>
                  <p className="mx-4">
                    You must be over 18 years of age to order services. Our drivers will request ID from anyone who
                    appears under 18 and will refuse delivery if appropriate ID is not shown.
                  </p>
                </div>

                <div class="access-info">
                  <p className="mx-4">
                    We reserve the right to withdraw access to our services without notice. You are responsible for
                    maintaining the confidentiality of your login details and any activities under your account.
                  </p>
                </div>
              </div>

              {/* <!-- Allergies Section --> */}
              <div class="tos-section tos-allergies">
                <h2 class="tos-section-title">
                  <span class="tos-section-number">!</span> Allergies & Dietary Requirements
                </h2>

                <div class="allergies-notice-wrapper">
                  <div class="allergies-icon">
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="allergies-text">
                    <h3 className="fw-bold mt-2">Important Notice</h3>
                    <p className="mx-4">
                      If you have allergies, allergic reactions, or dietary restrictions, please contact us before
                      placing an order to ensure your safety and satisfaction.
                    </p>
                  </div>
                </div>
              </div>

              {/* <!-- Limitation of Liability Section --> */}
              <div class="tos-section tos-liability">
                <h2 class="tos-section-title">
                  <span class="tos-section-number">8:- </span>Limitation of Liability
                </h2>

                <div class="liability-info">
                  <p className="mx-4">
                    We have taken every care in preparing our services. However, we are not responsible for errors,
                    omissions, or technical problems you may experience.
                  </p>
                </div>

                <div class="liability-details">
                  <div class="">
                    <h5 className="mx-4 fw-bold">We Are Not Liable For:</h5>
                    <ul className="mx-4 d-flex" style={{flexDirection:"column"}}>
                      <li>- Loss of profits, sales, or revenue</li>
                      <li>- Business interruption</li>
                      <li>- Loss of data or information</li>
                      <li>- Indirect or consequential losses</li>
                    </ul>
                  </div>

                  <div class=" mt-2">
                    <h5 className="mx-4 fw-bold">We Remain Liable For:</h5>
                    <ul className="mx-4 d-flex" style={{flexDirection:"column"}}>
                      <li>- Death or personal injury from negligence</li>
                      <li>- Fraud or fraudulent misrepresentation</li>
                      <li>- Matters prohibited by law</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* <!-- Governing Law Section --> */}
              <div class="tos-section tos-governing-law">
                <h2 class="tos-section-title">
                  <span class="tos-section-number">9:-</span>Governing Law
                </h2>

                <div class="governing-law-text">
                  <p className="mx-4">
                    These Terms are governed by the laws of England and Wales. Any disputes must first be addressed
                    through good faith discussions for sixty (60) days before proceeding to the exclusive jurisdiction
                    of the courts of England and Wales.
                  </p>
                  <p className="mx-4">
                    These Terms constitute the entire agreement between us and supersede all prior agreements and
                    understandings.
                  </p>
                </div>
              </div>

              {/* <!-- Footer --> */}
              <footer class="tos-footer">
                <div class="footer-contact">
                  <h3>Need Help?</h3>
                  <p>If you have questions about these terms, please don't hesitate to contact us.</p>
                  <a class="footer-contact-link" href="mailto:contact@meatwala.co.uk" aria-label="Contact Us via email">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    Contact Us
                  </a>
                </div>
                <div class="footer-copyright">
                  <p>© 2024 Meatwala High Wycombe Ltd. All Rights Reserved.</p>
                </div>
              </footer>

            </div>
          </div>
        </div>
      </div>

      <FooterMobileMenu />
      <Footer />
    </>
  )
}

export default Terms