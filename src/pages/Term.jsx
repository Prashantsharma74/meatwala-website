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
      <div className="div-t-space overflow-hidden pt-120">
        <Delivery />
      </div>
 
   <div class="tos-container">
  <div class="tos-wrapper">
    <div class="tos-content">
      <div class="tos-main">
 
        {/* <!-- Header Section --> */}
       
 
        {/* <!-- About Us Section --> */}
          <div class="tos-header-top">
            <h1 class="tos-title">Terms of Service</h1>
            <div class="tos-divider"></div>
            <p class="tos-intro">
              Please read these Terms of Service carefully before ordering. By using our website or mobile
              applications, you agree to be bound by these terms and conditions.
            </p>
          </div>
          <div class="tos-last-updated">
            <p><strong>Last Updated:</strong> Monday, 9th of December, 2024</p>
          </div>
        <div class="tos-section tos-about-us">
          <h2 class="tos-section-title">
            <span class="tos-section-number">1</span> About Us
          </h2>
          <div class="company-info">
            <h3 class="company-info-title">Company Information</h3>
            <div class="company-info-details">
              <div class="company-info-item">
                <p><strong>Company Name:</strong><br /> Meatwala High Wycombe Ltd</p>
              </div>
              <div class="company-info-item">
                <p><strong>Address:</strong><br /> 6 Shelburne Court, High Wycombe, England, HP12 3NH</p>
              </div>
              <div class="company-info-item">
                <p><strong>Contact Email:</strong> <a href="mailto:contact@meatwala.co.uk">contact@meatwala.co.uk</a></p>
              </div>
            </div>
          </div>
 
          <div class="tos-about-list">
            <ul>
              <li>We are referred to as <strong>"Meatwala"</strong>, <strong>"we"</strong>, <strong>"us"</strong>, and <strong>"our"</strong>.</li>
              <li>The Meatwala High Wycombe Ltd logo, marks, emblems, and images are the copyright of Meatwala High Wycombe Ltd, © 2024 All Rights Reserved.</li>
            </ul>
          </div>
 
          <div class="tos-additional-terms">
            <h4>Additional Terms Apply:</h4>
            <div class="tos-additional-terms-lists">
              <div>
                <ul>
                  <li>Privacy Policy (Website)</li>
                  <li>Cookie Policy (Website)</li>
                </ul>
              </div>
              <div>
                <ul>
                  <li>App Privacy Policy (Mobile)</li>
                  <li>EULA (Mobile Applications)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
 
        {/* <!-- Our Services Section --> */}
        <div class="tos-section tos-services">
          <h2 class="tos-section-title">
            <span class="tos-section-number">2</span> Our Services
          </h2>
          <div class="tos-text">
            <p>
              Meatwala High Wycombe Ltd provides on-demand delivery services via a mobile application and website.
              Our platform connects you with local halal meat and grocery partners, and independent contractor
              drivers for delivery services. We are not a retail store, halal meat and grocery store, food
              delivery service, merchandise delivery service, or food preparation entity.
            </p>
          </div>
        </div>
 
        {/* <!-- Service Availability Section --> */}
        <div class="tos-section tos-service-availability">
          <h2 class="tos-section-title">
            <span class="tos-section-number">3</span> Service Availability
          </h2>
          <div class="tos-text">
            <p>
              We offer ordering and delivery services from our halal meat and grocery partners. Each partner has a
              prescribed delivery area to ensure products reach you at their best quality.
            </p>
            <div class="tos-note">
              <p><strong>Note:</strong> If you live outside our delivery areas, you will be notified that online
              ordering is not available. Operating hours vary depending on local trading conditions and partner
              availability.</p>
            </div>
          </div>
        </div>
 
        {/* <!-- Orders Section --> */}
        <div class="tos-section tos-orders">
          <h2 class="tos-section-title">
            <span class="tos-section-number">4</span> Orders
          </h2>
 
          <div class="order-confirmation">
            <h3 class="subsection-title">Order Confirmation</h3>
            <p>
              Minimum order values are set by individual partners. When you place an order, a confirmation email
              will be sent to you. The contract is formed between you and the partner when you receive this
              confirmation.
            </p>
          </div>
 
          <div class="order-info">
            <p>
              Please ensure you provide a correct email address and accurate delivery address and telephone
              number. We aim to deliver within 55 minutes, and you can track your order through our website or
              app.
            </p>
          </div>
 
          <div class="delivery-policy">
            <h3 class="subsection-title">Important Delivery Policy</h3>
            <p>
              If you do not respond within 5 minutes of our driver reaching your address, we reserve the right to
              leave the premises. You will still be charged for the order plus delivery.
            </p>
          </div>
        </div>
 
        {/* <!-- Cancellation Section --> */}
        <div class="tos-section tos-cancellation">
          <h2 class="tos-section-title">
            <span class="tos-section-number">5</span> Cancellation Policy
          </h2>
 
          <div class="free-cancellation">
            <h3 class="subsection-title">Free Cancellation</h3>
            <p>
              You may cancel an order without charge before the store starts preparing it. Cancel immediately
              through your account under orders via our application.
            </p>
          </div>
 
          <div class="cancel-info">
            <p>
              If you cancel after preparation has started, you will be charged the full price for items. If the
              driver has been dispatched, you will also be charged for delivery. We may cancel orders at any time
              without charge to you.
            </p>
          </div>
        </div>
 
        {/* <!-- Price and Payment Section --> */}
        <div class="tos-section tos-pricing-payment">
          <h2 class="tos-section-title">
            <span class="tos-section-number">6</span> Price and Payment
          </h2>
 
          <div class="pricing-info">
            <p>
              Prices include VAT and are subject to change, but changes won't affect confirmed orders except for
              obvious pricing mistakes. We accept credit and debit card payments through our service.
            </p>
          </div>
 
          <div class="payment-processing">
            <h3 class="subsection-title">Payment Processing</h3>
            <p>
              Payment is made directly to Meatwala High Wycombe Ltd and passed to partners. We may charge a
              delivery fee, which will be shown before you complete your order.
            </p>
          </div>
        </div>
 
        {/* <!-- Age Requirements Section --> */}
        <div class="tos-section tos-access-requirements">
          <h2 class="tos-section-title">
            <span class="tos-section-number">7</span> Access Requirements
          </h2>
 
          <div class="age-requirement">
            <h3 class="subsection-title">Age Requirement</h3>
            <p>
              You must be over 18 years of age to order services. Our drivers will request ID from anyone who
              appears under 18 and will refuse delivery if appropriate ID is not shown.
            </p>
          </div>
 
          <div class="access-info">
            <p>
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
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="allergies-text">
              <h3>Important Notice</h3>
              <p>
                If you have allergies, allergic reactions, or dietary restrictions, please contact us before
                placing an order to ensure your safety and satisfaction.
              </p>
            </div>
          </div>
        </div>
 
        {/* <!-- Limitation of Liability Section --> */}
        <div class="tos-section tos-liability">
          <h2 class="tos-section-title">
            <span class="tos-section-number">8</span> Limitation of Liability
          </h2>
 
          <div class="liability-info">
            <p>
              We have taken every care in preparing our services. However, we are not responsible for errors,
              omissions, or technical problems you may experience.
            </p>
          </div>
 
          <div class="liability-details">
            <div class="not-liable">
              <h5>We Are Not Liable For:</h5>
              <ul>
                <li>Loss of profits, sales, or revenue</li>
                <li>Business interruption</li>
                <li>Loss of data or information</li>
                <li>Indirect or consequential losses</li>
              </ul>
            </div>
 
            <div class="remain-liable">
              <h5>We Remain Liable For:</h5>
              <ul>
                <li>Death or personal injury from negligence</li>
                <li>Fraud or fraudulent misrepresentation</li>
                <li>Matters prohibited by law</li>
              </ul>
            </div>
          </div>
        </div>
 
        {/* <!-- Governing Law Section --> */}
        <div class="tos-section tos-governing-law">
          <h2 class="tos-section-title">
            <span class="tos-section-number">9</span> Governing Law
          </h2>
 
          <div class="governing-law-text">
            <p>
              These Terms are governed by the laws of England and Wales. Any disputes must first be addressed
              through good faith discussions for sixty (60) days before proceeding to the exclusive jurisdiction
              of the courts of England and Wales.
            </p>
            <p>
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