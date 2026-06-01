import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const SimplePage = ({ title, subtitle, content }: { title: string; subtitle: string; content: string }) => (
  <div className="bg-background min-h-screen">
    <Navbar />
    <section className="pt-28 pb-12 bg-gradient-hero">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
          <p className="text-white/60 text-lg">{subtitle}</p>
        </motion.div>
      </div>
    </section>
    <section className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose">
        <div className="rounded-2xl border border-border bg-card p-8">
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{content}</p>
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

const PRIVACY_CONTENT = `Last updated: June 1, 2025

1. Information We Collect
We collect information you provide directly to us, such as when you create an account, submit a startup idea, book a mentor session, or contact us for support.

Types of information collected:
- Account information (name, email, phone)
- Startup and business information
- Payment information (processed securely by third parties)
- Usage data and analytics
- Communications and correspondence

2. How We Use Your Information
We use the information we collect to:
- Provide, maintain, and improve our services
- Match you with relevant mentors, investors, and co-founders
- Send transactional and marketing communications
- Monitor and analyze usage patterns
- Protect against fraudulent or illegal activity

3. Information Sharing
We do not sell, trade, or otherwise transfer your personally identifiable information to third parties without your consent, except as described in this policy.

4. Data Security
We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

5. Your Rights
You have the right to access, correct, or delete your personal data at any time through your account settings or by contacting us at privacy@zerotoone.in.

6. Contact Us
For privacy-related inquiries: privacy@zerotoone.in`;

const TERMS_CONTENT = `Last updated: June 1, 2025

1. Acceptance of Terms
By accessing or using ZeroToOne, you agree to be bound by these Terms of Service and our Privacy Policy.

2. Description of Service
ZeroToOne provides an AI-powered startup building, entrepreneurship learning, and business execution platform.

3. User Accounts
You must register for an account to access certain features. You are responsible for maintaining the confidentiality of your account credentials.

4. Acceptable Use
You agree not to use ZeroToOne to:
- Upload false or misleading information
- Engage in fraudulent fundraising activity
- Spam other users or mentors
- Violate any applicable laws

5. Intellectual Property
All content on ZeroToOne, including text, graphics, and software, is the property of ZeroToOne Technologies Pvt. Ltd.

6. Limitation of Liability
ZeroToOne shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform.

7. Governing Law
These terms are governed by the laws of India, and disputes will be resolved in the courts of Bangalore, Karnataka.

8. Contact
For legal inquiries: legal@zerotoone.in`;

export const PrivacyPage = () => <SimplePage title="Privacy Policy" subtitle="How we collect, use, and protect your data" content={PRIVACY_CONTENT} />;
export const TermsPage = () => <SimplePage title="Terms & Conditions" subtitle="Rules and guidelines for using ZeroToOne" content={TERMS_CONTENT} />;
export const CookiesPage = () => <SimplePage title="Cookie Policy" subtitle="How we use cookies to improve your experience" content="We use cookies to personalize your experience, analyze traffic, and serve relevant ads. You can control cookie settings in your browser." />;
export const RefundPage = () => <SimplePage title="Refund Policy" subtitle="Our commitment to fair and transparent refunds" content="We offer a 7-day money-back guarantee on all paid plans. Contact support@zerotoone.in within 7 days of purchase for a full refund. No questions asked." />;
export const CareersPage = () => <SimplePage title="Careers at ZeroToOne" subtitle="Join our mission to empower India's founders" content="We are hiring passionate people who believe in the potential of Indian entrepreneurs. Send your resume to careers@zerotoone.in" />;
export const PartnersPage = () => <SimplePage title="Partner with ZeroToOne" subtitle="Build together, grow together" content="We partner with accelerators, incubators, VCs, and corporate innovation labs. Reach out at partnerships@zerotoone.in" />;
export const HelpPage = () => <SimplePage title="Help Center" subtitle="Get support and answers to your questions" content="Browse our FAQ or contact our support team at support@zerotoone.in. Average response time: 4 hours." />;
export const GuidelinesPage = () => <SimplePage title="Community Guidelines" subtitle="Creating a safe and supportive founder community" content="ZeroToOne's community is built on respect, authenticity, and mutual support. Be kind, be honest, and add value. Spam, harassment, and misleading content will result in immediate removal." />;
