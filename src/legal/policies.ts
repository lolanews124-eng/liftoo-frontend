export type PolicySection = {
  heading: string;
  body: string[];
  bullets?: string[];
};

export type PolicyDoc = {
  slug: string;
  title: string;
  summary: string;
  lastUpdated: string;
  sections: PolicySection[];
};

export const LEGAL_POLICIES: PolicyDoc[] = [
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    summary: 'How we collect, use, and protect your personal data.',
    lastUpdated: '30 May 2026',
    sections: [
      {
        heading: '1. Introduction',
        body: [
          'Liftoo ("we", "us", "our") operates a platform that connects customers with trained shopping assistants for malls, markets, and exhibitions. This Privacy Policy explains how we handle personal information when you use the Liftoo mobile app, customer website, and related services.',
          'By using Liftoo, you agree to the collection and use of information as described in this policy.',
        ],
      },
      {
        heading: '2. Information we collect',
        body: ['We may collect the following categories of information:'],
        bullets: [
          'Account data: name, mobile number, profile photo, and role (customer or assistant).',
          'Identity & verification (assistants): government ID, address proof, bank details, and documents submitted for KYC.',
          'Booking data: venue, date/time, service category, duration, special instructions, and booking status.',
          'Location data: saved addresses; live GPS location when assistants go online or during active jobs (with your permission).',
          'Payment & wallet: transaction history, wallet balance, promo/referral usage, and payment method metadata (we do not store full card or UPI PIN details).',
          'Communications: in-app chat messages tied to bookings, support tickets, and notifications.',
          'Device & usage: app version, device type, IP address, crash logs, and analytics to improve reliability.',
        ],
      },
      {
        heading: '3. How we use your information',
        body: ['We use personal data to:'],
        bullets: [
          'Create and manage your account and authenticate you via OTP or linked sign-in methods.',
          'Match customers with available assistants and fulfil bookings.',
          'Process payments, wallet credits, referrals, and refunds where applicable.',
          'Enable booking-scoped chat and customer support.',
          'Verify assistant identity, conduct background checks, and manage payouts.',
          'Send service updates, booking alerts, and promotional messages (you may opt out of marketing).',
          'Prevent fraud, enforce our policies, and comply with legal obligations.',
        ],
      },
      {
        heading: '4. Sharing of information',
        body: [
          'We share limited data only when necessary:',
        ],
        bullets: [
          'Between customers and assistants during an active or upcoming booking (name, phone, location relevant to the job, chat).',
          'With payment processors and banking partners to complete transactions and assistant payouts.',
          'With cloud hosting, SMS/OTP, maps, and analytics providers under contractual safeguards.',
          'With law enforcement or regulators when required by applicable law.',
          'We do not sell your personal data to third-party advertisers.',
        ],
      },
      {
        heading: '5. Data retention',
        body: [
          'We retain account and booking records while your account is active and for a reasonable period thereafter for legal, tax, and dispute-resolution purposes. Assistant KYC documents are retained as required by law and internal compliance policies. You may request deletion subject to exceptions described in our Terms.',
        ],
      },
      {
        heading: '6. Security',
        body: [
          'We use industry-standard measures including encrypted connections (HTTPS), secure token storage on devices, access controls, and audit logging. No method of transmission over the internet is 100% secure; we continuously work to protect your data.',
        ],
      },
      {
        heading: '7. Your rights',
        body: ['Depending on applicable law, you may have the right to:'],
        bullets: [
          'Access, correct, or update your profile information in the app.',
          'Request deletion of your account and associated data (see Account Deletion Policy).',
          'Withdraw location or notification permissions via device settings.',
          'Lodge a complaint with a data protection authority in your jurisdiction.',
        ],
      },
      {
        heading: '8. Children',
        body: [
          'Liftoo is not intended for users under 18 years of age. We do not knowingly collect data from children.',
        ],
      },
      {
        heading: '9. Changes & contact',
        body: [
          'We may update this policy from time to time. Material changes will be posted on this page with an updated date.',
          'Contact: privacy@liftoo.in | Liftoo Support via the in-app Help section.',
        ],
      },
    ],
  },
  {
    slug: 'terms-of-service',
    title: 'Terms of Service',
    summary: 'Rules for using the Liftoo platform as a customer or user.',
    lastUpdated: '30 May 2026',
    sections: [
      {
        heading: '1. Agreement',
        body: [
          'These Terms of Service ("Terms") govern your access to and use of Liftoo services. If you do not agree, do not use the platform.',
        ],
      },
      {
        heading: '2. Our service',
        body: [
          'Liftoo provides a technology platform that connects customers with independent shopping assistants. Liftoo is not the employer of assistants and does not itself perform shopping or carrying services. Assistants are independent service providers responsible for their conduct on each job.',
        ],
      },
      {
        heading: '3. Eligibility & account',
        body: ['To use Liftoo you must:'],
        bullets: [
          'Be at least 18 years old and capable of entering a binding contract.',
          'Provide accurate registration information and keep your account secure.',
          'Use only one account per person unless we approve otherwise.',
          'Not share OTP codes or allow others to access your account.',
        ],
      },
      {
        heading: '4. Bookings & payments',
        body: [
          'When you request a booking, you agree to pay the displayed fare including applicable taxes, surge, or add-ons. Prices may vary by location, duration, and demand. Payment may be made via wallet, UPI, or cash as offered in the app. Failed or disputed payments may result in account restrictions.',
        ],
      },
      {
        heading: '5. Customer responsibilities',
        body: ['As a customer you agree to:'],
        bullets: [
          'Provide accurate pickup/venue details and be reachable during the booking.',
          'Treat assistants with respect and comply with venue rules.',
          'Not request unlawful, unsafe, or prohibited activities.',
          'Report issues promptly through the app or support channels.',
        ],
      },
      {
        heading: '6. Cancellations & refunds',
        body: [
          'Cancellation fees and refund eligibility are defined in our Refund & Cancellation Policy, which is incorporated into these Terms by reference.',
        ],
      },
      {
        heading: '7. Ratings & content',
        body: [
          'Reviews and chat content must be honest and lawful. We may remove content that violates our Acceptable Use Policy or these Terms.',
        ],
      },
      {
        heading: '8. Limitation of liability',
        body: [
          'To the maximum extent permitted by law, Liftoo is not liable for indirect, incidental, or consequential damages. Our total liability for any claim relating to a booking is limited to the amount you paid for that booking, except where law requires otherwise.',
        ],
      },
      {
        heading: '9. Termination',
        body: [
          'We may suspend or terminate accounts that violate these Terms, pose safety risks, or engage in fraud. You may stop using Liftoo at any time and request account deletion.',
        ],
      },
      {
        heading: '10. Governing law',
        body: [
          'These Terms are governed by the laws of India. Disputes shall be subject to the exclusive jurisdiction of courts in India unless mandatory consumer protection law provides otherwise.',
          'Contact: legal@liftoo.in',
        ],
      },
    ],
  },
  {
    slug: 'refund-cancellation',
    title: 'Refund & Cancellation Policy',
    summary: 'When bookings can be cancelled and how refunds are processed.',
    lastUpdated: '30 May 2026',
    sections: [
      {
        heading: '1. Overview',
        body: [
          'This policy applies to customer bookings on Liftoo. Refund timelines depend on payment method and bank/UPI processing times (typically 5–7 business days after approval).',
        ],
      },
      {
        heading: '2. Customer cancellation',
        body: ['Cancellation charges depend on how close to the scheduled start time you cancel:'],
        bullets: [
          'More than 30 minutes before start: full refund to wallet or original payment method.',
          '15–30 minutes before start: 50% of booking fee may be retained; remainder refunded.',
          'Less than 15 minutes before start or after assistant is assigned and en route: up to 100% may be retained except at Liftoo\'s discretion for genuine emergencies.',
          'No-show (customer unavailable at venue): no refund.',
        ],
      },
      {
        heading: '3. Assistant or platform cancellation',
        body: [
          'If an assistant cancels or fails to arrive, or Liftoo cancels due to unavailability, you will receive a full refund or free rebooking credit. Repeated platform-side failures may include additional wallet credit at our discretion.',
        ],
      },
      {
        heading: '4. Service issues',
        body: [
          'If the service was not delivered as described (assistant did not arrive, left early without cause, or serious misconduct occurred), contact support within 24 hours with booking details. We will investigate and may offer partial or full refunds or wallet credits.',
        ],
      },
      {
        heading: '5. Wallet & promo credits',
        body: [
          'Refunds to Liftoo Wallet are instant. Referral or promotional credits are non-withdrawable and may expire per campaign terms. Cash payments refunded approved amounts to wallet unless otherwise arranged.',
        ],
      },
      {
        heading: '6. Chargebacks',
        body: [
          'Unjustified payment chargebacks may lead to account suspension. Please contact support before disputing with your bank.',
        ],
      },
      {
        heading: '7. Contact',
        body: ['Refund requests: support@liftoo.in or in-app Help & Support with your booking ID.'],
      },
    ],
  },
  {
    slug: 'assistant-partner-agreement',
    title: 'Assistant Partner Agreement',
    summary: 'Terms for individuals providing services through Liftoo as assistants.',
    lastUpdated: '30 May 2026',
    sections: [
      {
        heading: '1. Independent contractor status',
        body: [
          'By registering as a Liftoo Assistant, you acknowledge that you are an independent contractor, not an employee, agent, or partner of Liftoo. You control when to go online and which jobs to accept, subject to platform rules.',
        ],
      },
      {
        heading: '2. Eligibility & verification',
        body: ['You must:'],
        bullets: [
          'Be 18+ and legally permitted to work in India.',
          'Complete identity verification (KYC) including valid ID, address proof, and bank account for payouts.',
          'Pass background checks and maintain accurate profile information.',
          'Keep documents up to date; expired verification may pause job access.',
        ],
      },
      {
        heading: '3. Service standards',
        body: ['While on a job you agree to:'],
        bullets: [
          'Arrive on time, wear identifiable presentation as guided by Liftoo, and follow customer reasonable instructions within scope.',
          'Handle customer belongings with care; report incidents immediately.',
          'Not engage in theft, harassment, discrimination, or illegal activity.',
          'Use in-app chat and status updates rather than sharing personal contact details unnecessarily.',
        ],
      },
      {
        heading: '4. Earnings & payouts',
        body: [
          'Earnings per job are shown before acceptance. Platform fees, taxes, and adjustments may apply. Payouts are transferred to your verified bank account on the schedule shown in the app. Liftoo may withhold amounts for disputed bookings, chargebacks, or policy violations.',
        ],
      },
      {
        heading: '5. Location & online status',
        body: [
          'When you go online, you consent to sharing approximate location with the platform for matching and safety. Disable online mode when not available to work.',
        ],
      },
      {
        heading: '6. Termination',
        body: [
          'Liftoo may deactivate assistants for failed verification, low ratings, safety complaints, or Terms violations. You may stop using assistant mode at any time; outstanding payouts will be settled per policy.',
        ],
      },
      {
        heading: '7. Insurance & liability',
        body: [
          'You are responsible for your own insurance where required. Liftoo does not guarantee a minimum number of jobs. You accept liability for your actions during service delivery to the extent permitted by law.',
        ],
      },
      {
        heading: '8. Contact',
        body: ['Assistant support: partners@liftoo.in'],
      },
    ],
  },
  {
    slug: 'acceptable-use',
    title: 'Acceptable Use Policy',
    summary: 'Standards for chat, reviews, and platform behaviour.',
    lastUpdated: '30 May 2026',
    sections: [
      {
        heading: '1. Purpose',
        body: [
          'This policy sets rules for all users to keep Liftoo safe and respectful, especially in booking chat, reviews, and support interactions.',
        ],
      },
      {
        heading: '2. Prohibited conduct',
        body: ['You must not:'],
        bullets: [
          'Harass, threaten, abuse, or discriminate against any person.',
          'Send spam, scams, or unsolicited commercial messages.',
          'Share obscene, violent, or illegal content.',
          'Attempt to circumvent payments or take jobs off-platform.',
          'Impersonate Liftoo staff or other users.',
          'Upload malware or attempt unauthorized access to systems.',
          'Use the platform for any unlawful purpose.',
        ],
      },
      {
        heading: '3. Chat & communications',
        body: [
          'Booking chat is for coordinating the service only. Personal harassment or sharing sensitive information unrelated to the job is prohibited. We may monitor or review reports of chat abuse for safety investigations.',
        ],
      },
      {
        heading: '4. Reviews',
        body: [
          'Reviews must reflect genuine experiences. Fake, paid, or retaliatory reviews may be removed and accounts penalized.',
        ],
      },
      {
        heading: '5. Enforcement',
        body: [
          'Violations may result in content removal, booking cancellation, temporary suspension, or permanent account termination. Serious cases may be reported to authorities.',
        ],
      },
    ],
  },
  {
    slug: 'account-deletion',
    title: 'Account Deletion Policy',
    summary: 'How to delete your account and what happens to your data.',
    lastUpdated: '30 May 2026',
    sections: [
      {
        heading: '1. How to request deletion',
        body: [
          'You may request account deletion via in-app Help & Support or by emailing delete@liftoo.in from your registered email or phone-verified request. We will verify your identity before processing.',
        ],
      },
      {
        heading: '2. What is deleted',
        body: ['After a successful deletion request we will remove or anonymize:'],
        bullets: [
          'Profile information, saved addresses, and notification preferences.',
          'Access tokens and active sessions.',
          'Marketing contact details where legally permissible.',
        ],
      },
      {
        heading: '3. What we may retain',
        body: ['We may retain certain records when required by law or legitimate business needs:'],
        bullets: [
          'Booking and payment records for tax, accounting, and dispute resolution (typically up to 7 years where required).',
          'Assistant KYC records as mandated by regulations.',
          'Anonymized analytics that cannot identify you.',
          'Information needed for ongoing legal claims or fraud prevention.',
        ],
      },
      {
        heading: '4. Processing time',
        body: [
          'Deletion is usually completed within 30 days of verification. You will receive confirmation when done. Wallet balances must be withdrawn or resolved before deletion where applicable.',
        ],
      },
    ],
  },
  {
    slug: 'cookie-policy',
    title: 'Cookie Policy',
    summary: 'How the Liftoo website uses cookies and similar technologies.',
    lastUpdated: '30 May 2026',
    sections: [
      {
        heading: '1. What are cookies',
        body: [
          'Cookies are small text files stored on your browser when you visit our customer website. They help us keep you signed in and improve your experience.',
        ],
      },
      {
        heading: '2. Cookies we use',
        body: ['We use:'],
        bullets: [
          'Essential cookies: authentication tokens and session state required for login and booking.',
          'Preference cookies: remember settings such as referral codes during signup.',
          'Analytics cookies (if enabled): understand usage patterns to improve the site.',
        ],
      },
      {
        heading: '3. Managing cookies',
        body: [
          'You can block or delete cookies in your browser settings. Disabling essential cookies may prevent you from using logged-in features on the website.',
        ],
      },
      {
        heading: '4. Mobile app',
        body: [
          'The Liftoo mobile app uses secure local storage and device identifiers rather than browser cookies. See our Privacy Policy for details.',
        ],
      },
    ],
  },
];

export function getPolicyBySlug(slug: string): PolicyDoc | undefined {
  return LEGAL_POLICIES.find((p) => p.slug === slug);
}

export const POLICY_SLUGS = LEGAL_POLICIES.map((p) => p.slug);
