import React from "react";
import "./privacy.css";
import Navbar from "../components/Navbar";
import Delivery from "../components/delivery";
import Footer from "../components/Footer";
import FooterMobileMenu from "../components/FooterMobileMenu";
import { Helmet } from "react-helmet-async";

const Cookie = () => {
  return (
    <>
      <Helmet>
        <title>Meatwala Cookies Policy | How We Use Cookies</title>
        <meta
          name="description"
          content="Find out how Meatwala uses cookies to enhance your browsing experience and provide better services."
        />
      </Helmet>
      <Navbar />
      <div className="div-t-space mytabb overflow-hidden pt-120 ">
        <Delivery />
      </div>
      <div
        className="containers"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        <h2>Cookie Policy</h2>
        <p>
          This Cookie Policy applies to our use of cookies and other similar
          technologies on our website at{" "}
          <a href="https://www.meatwala.co.uk" target="_blank">
            <strong> www.meatwala.co.uk</strong>
          </a>
          . The purpose of this policy is to provide you with information about
          what cookies are and how they work. It also explains what cookies we
          use, what they do and how you can control what cookies we use when you
          visit our website.
        </p>

        <h3 className="mt-3">WHO IS THE DATA CONTROLLER?</h3>
        <p className="mt-1">
          A “data controller” is a person or organisation who alone or jointly
          determines the purposes for which, and the manner in which, any
          personal data is, or is likely to be, processed. In this sense,
          Meatwala High Wycombe Ltd, 6 Shelburne Court, High Wycombe, England,
          HP12 3NH, “Meatwala”, "we", "us", "our" is the data controller. If you
          have any questions about cookies or about data protection at
          [Meatwala] in general, you can reach us by email using{" "}
          <a href="mailto:contact@meatwala.co.uk">
            <strong>contact@meatwala.co.uk</strong>
          </a>
          .
        </p>

        <h3 className="mt-3">WHY DO WE HAVE A COOKIE POLICY?</h3>
        <p className="mt-1">
          In accordance with the UK’s Privacy and Electronic Communications
          Regulations (“PECR”) and the EU’s Privacy and Electronic
          Communications Directive (“PECD”), we need to inform you about the
          cookies we use and obtain your consent when using certain types of
          cookies, namely Functional, Performance, Analytics, and Advertising
          Cookies.
        </p>

        <h3 className="mt-3">WHAT IS A COOKIE?</h3>
        <p className="mt-1">
          Cookies are text files containing small amounts of information which
          are downloaded to your device (e.g. computer, smartphone, electronic
          device which accesses the internet) when you visit a website. Cookies
          can be useful because they allow a website to recognise a user’s
          device, preferences and generally help to improve your online
          experience.
        </p>

        <h3 className="mt-3">WHAT TYPES OF COOKIES DO WE USE?</h3>
        <p className="mt-1">
          There are three types of cookies that we use, Necessary Cookies,
          Analytics Cookies, and Marketing Cookies. These cookies perform
          different functions as explained below in the relevant cookies divs.
        </p>

        <h3 className="mt-3">Necessary Cookies</h3>
        <p className="mt-1">
          Necessary cookies are essential in order to provide you with the
          services you request on our website and in order that we can comply
          with legal obligations. We do not need to ask for your consent in
          order to use these cookies as without them we would not be able to
          provide the services requested by you. These are always active on the
          Website.
        </p>

        <h3 className="mt-3">Analytics Cookies</h3>
        <p className="mt-1">
          Analytics cookies collect information about things like how many
          people visit our Website, what parts of the Website people look at and
          how many new visitors we have to the Website. These cookies help us to
          monitor how effective our Website is and to improve it, tailoring it
          to our visitors. Analytics cookies are only used if you consent to it
          in our Cookie Consent Tool.
        </p>

        <h3 className="mt-3">Marketing/Advertising Cookies</h3>
        <p className="mt-1">
          Marketing cookies help us provide you with personalised and relevant
          services or advertising, and track the effectiveness of our digital
          marketing activities. They are capable of tracking your browser across
          other websites and building up a profile of your interests. This may
          impact the content and messages you see on other websites you visit.
          Advertising cookies are only used if you consent to it in the Cookie
          Consent Tool.
        </p>
        <div id="cookie-consent">
          <h3 className="mt-3">CONSENT</h3>
          <p className="mt-1">
            Necessary Cookies will always be active on your device, but we ask
            for your consent to place Analytics Cookies and other similar
            technologies on your device. If at any time you want to change your
            cookie settings, including withdrawing your consent to this
            processing, we would encourage you to do this via the links below.
            You may need to refresh the page before the changes to the settings
            take effect.
          </p>

          <h3 className="mt-3">THE COOKIES WE USE</h3>

          <h3 className="mt-2">Google Analytics</h3>
          <p className="mt-1">
            We use Google Analytics, a web analysis service of Google. Google
            Analytics uses a specific form of cookie, which is stored on your
            device and enables an analysis of your use of our website. The
            cookies set by Google Analytics for measurement are different for
            each visitor (i.e. there is not a single Google Analytics cookie ID
            that is used on all sites using Google Analytics). The information
            about your use of our website generated by the cookie is generally
            transmitted to a Google server in the USA and stored there.
          </p>
          <p className="mt-1">
            Google uses this information on our behalf to analyse your use of
            this website in order to compile reports on website activities and
            provide additional services related to website and internet use. The
            IP address transmitted by your browser in the context of Google
            Analytics is not merged with other data. In the configuration of
            Google Analytics, we ensured that Google receives this data as a
            processor and is therefore not allowed to use this data for its own
            purposes.
          </p>
          <p className="mt-1">
            In relation to the data transfer into the USA, Google’s processing
            agreement for Google Analytics can be read{" "}
            <a href="https://www.google.com/analytics/terms/" target="_blank">
              here
            </a>
            . You can disable tracking by Google Analytics with future effect by
            downloading and installing the Google Analytics Opt-out Browser
            Add-on for your current web browser following{" "}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank">
              this link
            </a>
            .
          </p>

          <h3 className="mt-3">Pixel Cookies and Tags</h3>
          <p className="mt-1">
            We use so-called Pixel Cookies and Tags (“Pixel Cookies”). A Pixel
            Cookie is an advertising tool and typically consists of a JavaScript
            code snippet that allows us to understand and track visitors'
            activity on our website. For this purpose, Pixel Cookies collect and
            process information about visitors of our website and the device
            used (so-called event data).
          </p>
          <p className="mt-1">
            Event data collected through Pixel Cookies is used for targeting our
            advertisements and improving ad delivery and personalised
            advertising. For this purpose, the event data collected on our
            website by means of Pixel Cookies is transmitted to the relevant
            operator of the Pixel Cookie and in part, also stored on your
            device. However, this only happens with your consent, and we and the
            relevant operator of the Pixel Cookie are considered joint
            controllers. Nonetheless, for the subsequent processing of the
            transmitted Event Data, the relevant operator of the Pixel Cookie is
            the sole controller.
          </p>
          <p className="mt-1">
            For more information about how the relevant operator of the Pixel
            Cookie processes personal data, including the legal basis on which
            they rely on and how you can exercise your rights, please refer to
            the following Privacy Policies:
            <ul>
              <li>
                <a
                  href="https://www.facebook.com/privacy/explanation"
                  target="_blank"
                >
                  <strong> Facebook</strong> &nbsp;
                </a>
              </li>
              <li>
                <a
                  href="https://help.instagram.com/155833707900388"
                  target="_blank"
                >
                  <strong>Instagram</strong> &nbsp;
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/legal/privacy-policy?lang=en"
                  target="_blank"
                >
                  <strong>TikTok</strong> &nbsp;
                </a>
              </li>
            </ul>
          </p>

          <h3 className="mt-3">Google Ads</h3>
          <p className="mt-1">
            We use Google Ads, an online advertising service provided by Google.
            Google Ads enables us to show advertisements in the Google search
            engine or on third-party websites when the user enters certain
            search terms on Google (keyword targeting). Furthermore, targeted
            advertisements can be shown on the basis of user data available to
            Google (e.g. location data and interests) (target group targeting).
            With the help of Google Ads, we can evaluate this data
            quantitatively, for example, which search terms have led to the
            display of our advertisements and how many ads have resulted in
            corresponding clicks. The use of this service is based on your
            consent.
          </p>

          <h3 className="mt-3">Google Ads Remarketing</h3>
          <p className="mt-1">
            We also use the remarketing functions of Google Ads. Google Ads
            Remarketing allows us to assign people who interact with our
            advertisements and website to specific target groups and to display
            interest-based advertising to them within the Google advertising
            network.
          </p>
          <p className="mt-1">
            Further, the advertising target groups created by us using Google
            Ads Remarketing can be linked to Google's cross-device functions.
            This means that interest-based, personalised advertising (that is
            advertising that has been adapted to you depending on your previous
            usage and surfing behaviour) can also be displayed on another of
            your end devices (e.g. tablet or PC). The use of this service is
            based on your consent.
          </p>

          <h3 className="mt-3">Google Conversion Tracking</h3>
          <p className="mt-1">
            We also use Google Conversion Tracking. With the help of Google
            conversion tracking, we and Google can recognise whether the user
            has performed certain actions. For example, we can evaluate which
            buttons on our website were clicked how often and which products
            were viewed or purchased particularly frequently. This information
            is used to create conversion statistics. We also learn the total
            number of users who clicked on our ads and what actions they took.
            We do not receive any information with which we can personally
            identify the user. Google itself uses cookies or comparable
            recognition technologies for identification. The use of this service
            is based on your consent.
          </p>
        </div>
        <div id="block-cookies">
          <h3 className="mt-3">
            HOW TO BLOCK COOKIES AND THE CONSEQUENCES OF THIS
          </h3>
          <p className="mt-1">
            If you want to block all cookies, you may be able to do this through
            the settings in your browser for each browser you use and each
            device you use to access the internet (Google Chrome, Mozilla
            Firefox, Microsoft Edge, Opera, Safari).
          </p>
          <p className="mt-1">
            We also offer a Cookie Consent Tool when you first visit our
            website. This tool allows you to specify your preference about
            cookies. You can accept or reject them or access this Cookie Policy
            before giving your consent to cookies or rejecting them. This
            permits you to make an informed decision about the cookies we use.
            You are free to accept or reject cookies, but note that after
            rejecting them, browsing our website might be less user-friendly and
            the relevant content might be affected.
          </p>
          <p className="mt-1">
            In addition, if you do not wish to participate in advertising
            personalisation or retargeting/tracking, you can object to
            behavioural advertising at the following websites:
            <ul>
              <li>
                <a
                  href="https://www.youronlinechoices.com/uk/your-ad-choices"
                  target="_blank"
                >
                  Your Online Choices
                </a>
              </li>
              <li>
                <a href="https://www.aboutads.info/choices" target="_blank">
                  Digital Advertising Alliance of Canada
                </a>
              </li>
              <li>
                <a
                  href="https://www.networkadvertising.org/choices/"
                  target="_blank"
                >
                  Network Advertising Initiative
                </a>
              </li>
              <li>
                <a href="https://www.aboutads.info/choices" target="_blank">
                  AdChoices
                </a>
              </li>
              <li>
                <a href="https://www.edaa.eu/" target="_blank">
                  European Interactive Digital Advertising Alliance (Europe
                  only)
                </a>
              </li>
              <li>
                <a href="https://adssettings.google.com" target="_blank">
                  Google Ad Settings
                </a>
              </li>
            </ul>
          </p>
        </div>

        <div id="help-complaints">
          <h3 className="mt-3">HELP AND COMPLAINTS</h3>
          <p className="mt-1">
            If you have any questions about this policy or the information we
            hold about you, please contact us by email at{" "}
            <a href="mailto:contact@meatwala.co.uk">contact@meatwala.co.uk</a>.
          </p>
        </div>

        <div id="changes">
          <h3 className="mt-3">CHANGES</h3>
          <p className="mt-1">
            The first version of this policy was issued on Monday, 12th of
            August, 2024 and is the current version. Any prior versions are
            invalid, and if we make changes to this policy, we will revise the
            effective date.
          </p>
        </div>
      </div>
      <FooterMobileMenu />
      <Footer />
    </>
  );
};

export default Cookie;
