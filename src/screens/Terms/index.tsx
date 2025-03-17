import { motion } from "framer-motion";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-black text-white flex mt-[60px] md:mt-20 flex-col items-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl p-6 rounded-lg shadow-lg text-center"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-center text-white">
          Andromeda Finance - Privacy Policy
        </h1>
        <p className="text-sm text-gray-400 text-center mt-2">
          Last Updated: March 2025
        </p>

        <div className="mt-6 space-y-6 text-gray-300 max-h-[70vh] overflow-y-auto p-4 rounded-lg scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700 scrollbar-thumb-rounded scroll-smooth">
          <h2 className="text-xl font-semibold text-white">
            Commitment to data protection
          </h2>
          <p>
            No personal data is collected, except for wallet address that is not
            identifiable in the first place since we're not tracking
            geolocation, browser and OS information on an individual level. IP
            Addresses will not be tracked at all.
          </p>
          <p>
            Geolocation, browser and OS information will be treated as
            aggregated and combined information for our product to improve
            further.
          </p>
          <p>
            In the next sections, we explain when and how we process personal
            data about you when you visit our platform.
          </p>

          <h2 className="text-xl font-semibold text-white">
            Legal Bases of Data Processing
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Consent - Art. 6 (1) a) and Art. 7 GDPR</li>
            <li>Contractual fulfillment - Art. 6 (1) b) GDPR</li>
            <li>Legal obligations - Art. 6 (1) c) GDPR</li>
            <li>Legitimate interests - Art. 6 (1) f) GDPR</li>
          </ul>

          <h2 className="text-xl font-semibold text-white">
            Cookies and Similar Technologies
          </h2>
          <p>
            We use session-related cookies to enhance user experience. Analytics
            services like Google Analytics, Mixpanel, and CrazyEgg help us
            improve the platform. Users can opt out using their respective
            privacy settings.
          </p>

          <h2 className="text-xl font-semibold text-white">Analytics</h2>
          <p>
            We use Google Analytics, Mixpanel, and CrazyEgg for analyzing user
            interactions. Data collected remains anonymized, and users can opt
            out of tracking through their settings.
          </p>

          <h2 className="text-xl font-semibold text-white">
            Security and Confidentiality
          </h2>
          <p>
            We protect user data with industry-standard firewalls and
            encryption. Access to personal data is restricted and secured.
          </p>

          <h2 className="text-xl font-semibold text-white">
            Personal Data and Children
          </h2>
          <p>
            Services are intended for users 18 and above. No data from minors is
            collected without parental consent.
          </p>

          <h2 className="text-xl font-semibold text-white">
            Social Media & External Links
          </h2>
          <p>
            We maintain presences on Twitter, Medium, Discord, and Telegram.
            Users should review third-party terms when engaging with these
            platforms.
          </p>

          <h2 className="text-xl font-semibold text-white">
            Obligation to Provide Data
          </h2>
          <p>
            You are not obliged to provide data, but certain services require
            agreeing to our privacy policy before use.
          </p>

          <h2 className="text-xl font-semibold text-white">
            Changes & Complaints
          </h2>
          <p>
            We may update this policy periodically. If you have concerns, please
            contact us.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default TermsPage;
