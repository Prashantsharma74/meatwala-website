import React from "react";
import "./privacy.css";
import Navbar from "../components/Navbar";
import Delivery from "../components/delivery";
import Footer from "../components/Footer";
import FooterMobileMenu from "../components/FooterMobileMenu";
import { Helmet } from "react-helmet-async";

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title> Meatwala Privacy Policy | Your Data & Security</title>
        <meta
          name="description"
          content="Learn how Meatwala protects your personal information and ensures a secure shopping experience."
        />
      </Helmet>
      <Navbar />
      <section className="section-t-space mytabb overflow-hidden pt-120">
        <Delivery />
      </section>
      <div
        className="containers"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        <h1>Privacy Policy</h1>
        <p>
          This Privacy Policy sets out the basis on which we will process any
          Personal Data that we may collect about you as a visitor to and user
          of our website at{" "}
          <a href="https://www.meatwala.co.uk">www.meatwala.co.uk</a>. This
          policy further sets out how we protect your privacy and your rights in
          respect of our use of your Personal Data. If you are a user of our iOS
          or Android mobile application, please refer to our App Privacy Policy.
        </p>

        <h2 className="mt-3">WHO IS THE DATA CONTROLLER?</h2>
        <p className="mt-1">
          A “data controller” is a person or organisation who alone or jointly
          determines the purposes for which, and the manner in which, any
          personal data is, or is likely to be, processed. In this sense,{" "}
          <strong>Meatwala High Wycombe Ltd</strong>, 6 Shelburne Court, High
          Wycombe, England, HP12 3NH (“Meatwala”, “we”, “us”, “our”) is the data
          controller. If you have any questions about data protection at
          Meatwala High Wycombe Ltd in general, you can reach us by email using{" "}
          <a href="mailto:contact@meatwala.co.uk">contact@meatwala.co.uk</a>.
        </p>

        <h2 className="mt-2">WHAT IS PERSONAL DATA?</h2>
        <p className="mt-1">
          Personal data is any information that relates to an identified or
          identifiable living individual. Different pieces of information, which
          collected together can lead to the identification of a particular
          person, also constitute Personal Data.
        </p>

        <h2 className="mt-3">WHY DO WE HAVE A PRIVACY POLICY?</h2>
        <p className="mt-1">
          The UK’s Data Protection Act (“DPA”) and the EU's General Data
          Protection Regulation (“GDPR”) control how your Personal Data is used
          by us. We are also required to explain which Personal Data we collect
          from you via our website, what we use it for, when we delete it, and
          how your data is protected.
        </p>

        <h2 className="mt-3">
          WHAT ARE THE LEGAL BASES FOR PROCESSING PERSONAL DATA?
        </h2>
        <p className="mt-1">
          All Personal Data that we obtain from you via our website will only be
          processed for the purposes described in more detail below. This is
          done within the framework of the DPA and the GDPR and only if at least
          one of the following applies:
        </p>
        <ul>
          <li>- You have given your consent</li>
          <li>
            - The data is necessary for the fulfilment of a contract /
            pre-contractual measures
          </li>
          <li>
            - The data is necessary for the fulfilment of a legal obligation
          </li>
          <li>
            - The data is necessary to protect the legitimate interests of our
            company, provided that your interests are not overridden
          </li>
        </ul>
        <h2 className="mt-2">WHAT PERSONAL DATA DO WE COLLECT FROM YOU?</h2>
        <h3>Personal Data that you give us:</h3>
        <p className="mt-1">
          This is information about you that you give to us by filling in forms
          on our website (or other forms that we ask you to complete), or
          correspond with us. It may include, for example, your name, address,
          email address and telephone number; information about your business
          relationship with us; and information about your requirements and
          interests. The legal basis for processing is consent and the
          fulfilment of a contract.
        </p>
        <p className="mt-1">
          On our website, we offer users the opportunity to register an account.
          The data is entered into our registration form and transmitted to us
          and stored. The data is not passed on to third parties. The following
          data is collected as part of the registration process:
        </p>
        <ul
          className="d-flex"
          style={{ alignItems: "flex-start", flexDirection: "column" }}
        >
          <li>- Full name and display name</li>
          <li>- Email address</li>
          <li>- Password</li>
          <li>- The IP address of the user</li>
          <li>- Date and time of registration</li>
        </ul>
        <p className="mt-1">
          The legal basis for processing is consent and the fulfilment of a
          contract.
        </p>
        <p className="mt-1">
          We process the Personal Data that you submit to us when you place your
          order and share your order details with the relevant store for
          fulfilment. This Personal Data is necessary to fulfil your order,
          confirm your order and evaluate your order, payment and possible
          refund. The legal basis for this processing of Personal Data is that
          it is necessary for the performance of a contract. We process the
          following Personal Data in the ordering process:
        </p>
        <ul
          className="d-flex"
          style={{ alignItems: "flex-start", flexDirection: "column" }}
        >
          <li>- Name</li>
          <li>- Address data</li>
          <li>- Contact details</li>
          <li>- Order</li>
          <li>- Payment data</li>
          <li>- Comments</li>
          <li>- Your location (if applicable)</li>
        </ul>
        <p className="mt-1">
          If you make a payment your Payment Data will be processed via our
          payment service provider Stripe. Payment data will solely be processed
          through Stripe and we have no access to any Payment Data you may
          submit. The legal basis for the provision of a payment system is the
          establishment and implementation of the contract.
        </p>
        <h3 className="mt-3">
          Personal Data that our website and other systems collect about you:
        </h3>
        <p className="mt-1">
          If you visit our website it will automatically collect some
          information about you and your visit, including the Internet protocol
          (IP) address used to connect your device to the Internet and some
          other information such as the pages on our site that you visit. This
          is used to monitor the performance of the website and improve the
          experience of visitors to the website.
        </p>
        <p className="mt-1">
          We use so-called cookies on our website. Cookies are pieces of
          information that are transmitted from our web server or third-party
          web servers to your web browser and stored there for later retrieval.
          Cookies may be small files or other types of information storage. As
          set out in the UK’s Privacy and Electronic Communications Regulations
          (“PECR”) and the EU’s Privacy and Electronic Communications Directive
          (“PECD”), we need to obtain consent for the use of Non-essential
          Cookies. For further information on the cookies we use, please refer
          to our Cookie Policy.
        </p>
        <p className="mt-1">
          Our website uses a cookie consent tool to obtain your consent to the
          storage of cookies and to document this consent. When you enter our
          website, the following Personal Data is transferred to us:
        </p>
        <ul
          className="d-flex"
          style={{ alignItems: "flex-start", flexDirection: "column" }}
        >
          <li>- Your consent(s) or revocation of your consent(s)</li>
          <li>- Your IP address</li>
          <li>- Information about your browser</li>
          <li>- Information about your device</li>
          <li>- Time of your visit to our website</li>
        </ul>

        <h2 className="mt-3">DATA PROCESSING THROUGH THIRD-PARTY SERVICES</h2>
        <p className="mt-1">
          We use content or service offers of third-party providers on the basis
          of our legitimate interests in order to integrate their content and
          services ("content"). This always requires that the third-party
          providers of this content are aware of the IP address of the user, as
          without the IP address they would not be able to send the content to
          their browser. The IP address is therefore necessary for the display
          of this content.
        </p>
        <p className="mt-1">
          The following provides an overview of third-party providers and their
          content, together with links to their privacy policies, which contain
          further information on the processing of data and so-called opt-out
          measures, if any:
        </p>
        <ul
          className="d-flex"
          style={{ alignItems: "flex-start", flexDirection: "column" }}
        >
          <li>- Hosting: Hostinger</li>
          <li>- Analytics: Google Analytics by Google</li>
          <li>
            - Fonts: Google Fonts by Google, and Font Awesome of Fonticons Inc.
          </li>
          <li>- Maps: Google Maps by Google</li>
        </ul>

        <h2 className="mt-3">HOW WILL WE USE YOUR PERSONAL DATA?</h2>
        <p className="mt-1">
          We will only process your Personal Data as necessary so that we can
          pursue the purposes described above and where we have a legal basis
          for such processing. Where our lawful basis for processing is that
          such processing is necessary to pursue our legitimate interests, we
          will only process your Personal Data where we have concluded that our
          processing does not prejudice you or your privacy in a way that would
          override our legitimate interest. In exceptional circumstances, we may
          also be required by law to disclose or otherwise process your Personal
          Data.
        </p>

        <h2 className="mt-3">CHANGE OF PURPOSE</h2>
        <p className="mt-1">
          We will only use your Personal Data for the purposes for which we
          collected it as detailed above, unless we reasonably consider that we
          need to use it for another reason and that reason is compatible with
          the original purpose. If we need to use your Personal Data for an
          unrelated purpose, we will notify you and we will explain the legal
          basis which allows us to do so.
        </p>
        <h2 className="mt-3">DISCLOSURES OF YOUR PERSONAL DATA</h2>
        <p className="mt-1">
          Your Personal Data will be shared internally to ensure the efficient
          operation of our business and to provide the highest quality of client
          services.
        </p>
        <p className="mt-1">
          Where required, we will disclose your Personal Data to:
        </p>
        <ul
          className="d-flex"
          style={{ alignItems: "flex-start", flexDirection: "column" }}
        >
          <li>
            - Any regulatory or governmental authority, law enforcement agency,
            or similar body
          </li>
          <li>
            - Service providers who assist with website operation, marketing,
            IT, and administration
          </li>
          <li>
            - Professional advisers such as lawyers, auditors, accountants, and
            insurers
          </li>
          <li>- Financial institutions providing finance to us</li>
          <li>- External auditors performing independent checks</li>
        </ul>

        <h2 className="mt-3">MARKETING</h2>
        <p className="mt-1">
          With your consent, we may process your Personal Data for marketing
          purposes. You may give consent by opting in via a form or through
          interactions with our services. Our marketing efforts may include
          emails or other communication channels.
        </p>
        <p className="mt-1">
          Every marketing message will provide an option to unsubscribe or opt
          out.
        </p>

        <h2 className="mt-3">HOW WILL WE USE YOUR PERSONAL DATA?</h2>
        <p className="mt-1">
          We will only process your Personal Data as necessary so that we can
          pursue the purposes described above and where we have a legal basis
          for such processing.
        </p>

        <h2 className="mt-3">CHANGE OF PURPOSE</h2>
        <p className="mt-1">
          We will only use your Personal Data for the purposes for which we
          collected it, unless we reasonably consider that we need to use it for
          another reason that is compatible with the original purpose.
        </p>
        <h2 className="mt-3">ADVERTISING</h2>
        <p className="mt-1">
          We would like to show you interesting advertising outside of our
          website and use various third-party tools and cookies for this
          purpose. These collect and process information about your activities
          on our website - for example, which products you are interested in or
          which pages you visit. By knowing what you are looking for and how you
          use our website, we can adapt our advertising to your needs. This
          increases the likelihood that you will see suitable and relevant
          advertisements outside our website.
        </p>
        <p className="mt-1">
          We also analyse this data to evaluate the relevance of the
          advertisements and to optimise them for you. The tools we use may
          establish a connection to their servers when you visit our website.
          Some personal data that may be processed by third-party providers
          include:
        </p>
        <ul
          className="d-flex"
          style={{ alignItems: "flex-start", flexDirection: "column" }}
        >
          <li>
            - HTTP header information (e.g., IP address, web browser, website
            URL, date and time)
          </li>
          <li>
            - Measuring pixel-specific data (e.g., pixel ID and cookie ID)
          </li>
          <li>
            - Additional information about visits to our website (e.g., orders
            placed, products clicked on)
          </li>
        </ul>
        <p className="mt-1">
          The legal bases for processing are our legitimate interest and your
          consent in case of cookies. For further information, please refer to
          our Cookie Policy.
        </p>

        <h2 className="mt-3">HOW LONG DO WE KEEP YOUR PERSONAL DATA?</h2>
        <p className="mt-1">
          We will delete your Personal Data when we no longer need such data,
          for instance where:
        </p>
        <ul
          className="d-flex"
          style={{ alignItems: "flex-start", flexDirection: "column" }}
        >
          <li>
            - It is no longer necessary to fulfil the purposes for which we
            collected it
          </li>
          <li>- We believe that your Personal Data is inaccurate</li>
          <li>
            - You have informed us that you no longer consent to our processing
            of your Personal Data
          </li>
        </ul>
        <p className="mt-1">
          However, there are legal or regulatory requirements that may require
          us to retain your Personal Data for a specified period. In such cases,
          we will retain your Personal Data as required.
        </p>

        <h2 className="mt-3">HOW WE SECURE YOUR PERSONAL DATA</h2>
        <p className="mt-1">
          We take appropriate organisational, technical, and physical measures
          to help safeguard against accidental or unlawful destruction, loss,
          alteration, and unauthorised disclosure of, or access to, the Personal
          Data we collect and process. However, no method of collection,
          storage, or transmission is 100% secure. You are solely responsible
          for protecting your password, limiting access to your devices, and
          signing out of websites after your sessions.
        </p>

        <h2 className="mt-3">LINKED SITES</h2>
        <p className="mt-1">
          For your convenience, there may be hyperlinks on our website that link
          to other websites. We are not responsible for, and this Privacy Policy
          does not apply to, the privacy practices of any linked websites or
          companies that we do not own or control. These websites may collect
          additional information beyond what we collect.
        </p>
        <p className="mt-1">
          We do not endorse any of these linked websites, their products,
          services, or content. We encourage you to review the Privacy Policy of
          each linked website you visit.
        </p>
        <h3 className="mt-3">
          Updating your information and withdrawing your consent
        </h3>
        <p className="mt-1">
          If you believe that the information we hold about you is inaccurate or
          request its rectification, deletion, or object to legitimate interest
          processing, please do so by contacting us.
        </p>

        <h3 className="mt-3">Access Request</h3>
        <p className="mt-1">
          In the event you want to make a Data Subject Access Request, please
          contact us. We will respond to requests regarding access and
          correction as soon as reasonably possible. Should we not be able to
          respond to your request within thirty (30) days, we will tell you why
          and when we will be able to respond to your request. If we are unable
          to provide you with any Personal Data or to make a correction
          requested by you, we will tell you why.
        </p>

        <h3 className="mt-3">Complaint to a supervisory authority</h3>
        <p className="mt-1">
          The supervisory authority in the UK is the Information Commissioner's
          Office (ICO) (<a href="https://www.ico.org.uk">www.ico.org.uk</a>). We
          would, however, appreciate the chance to deal with your concerns
          before you approach the ICO or any other supervisory authority.
        </p>

        <h3 className="mt-3">What we do not do</h3>
        <ul
          className="d-flex"
          style={{ alignItems: "flex-start", flexDirection: "column" }}
        >
          <li>- We do not request Personal Data from minors and children;</li>
          <li>
            - We do not process special category data without obtaining prior
            specific consent; and
          </li>
          <li>
            - We do not use Automated decision-making including profiling.
          </li>
        </ul>

        <h2 className="mt-3">HELP AND COMPLAINTS</h2>
        <p className="mt-1">
          If you have any questions about this policy or the information we hold
          about you please contact us by email using{" "}
          <a href="mailto:contact@meatwala.co.uk">contact@meatwala.co.uk</a>.
        </p>

        <h2 className="mt-3">CHANGES</h2>
        <p className="mt-1">
          The first version of this policy was issued on Monday, 12th of August,
          2024 and is the current version. Any prior versions are invalid and if
          we make changes to this policy, we will revise the effective date.
        </p>
      </div>
      <Footer />
      <FooterMobileMenu />
    </>
  );
};

export default PrivacyPolicy;
