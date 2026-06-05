export const SITE_INFO = {
  city: 'Patna',
  state: 'Bihar',
  country: 'India',
  displayAddress: 'Patna, Bihar, India',
  shortAddress: 'Patna, Bihar',
  email: 'contact@liftoo.in',
  phone: '+919470024607',
  serviceArea: 'Patna and nearby areas in Bihar',
  siteUrl: import.meta.env.VITE_SITE_URL ?? 'https://liftoo.in',
  playStoreUrl:
    'https://play.google.com/store/apps/details?id=com.liftoo.liftoo_mobile&pcampaignid=web_share',
} as const;

export const PATNA_VENUES = [
  'P&M Mall',
  'City Centre Mall',
  'Unity One Mall',
  'Maurya Lok',
  'Patna One',
  'Boring Road Market',
  'Fraser Road',
  'Khaitan Market',
  'Patliputra Colony',
  'Kankarbagh Market',
  'Bailey Road',
  'Hartali More',
] as const;
