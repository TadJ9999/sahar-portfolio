// ============================================================
// CONTENT — this is the only file you need to edit.
// main.js renders everything below into the page.
// ============================================================

export const profile = {
  name: 'Sahar Adnan',
  title: 'Data Analyst',
  location: 'West Palm Beach, FL',
  email: 'saharadnanj@gmail.com',
  linkedin: 'https://www.linkedin.com/in/saharadnan',
  github: '',            // e.g. 'https://github.com/yourname' — shown once set
  resumeUrl: '',         // e.g. './Sahar-Adnan-Resume.pdf' placed in public/ — shown once set
  headline: 'Messy data, made legible.',
  lead: 'SQL, Tableau, and Power BI reporting for teams that need an answer, not a spreadsheet. Five years across data analytics, data operations, and IT, currently on data operations at NextEra Energy Resources.',
  contactLead: 'Open to data analyst and data operations roles. The fastest way to reach me is email.',
};

// The four passes every dataset gets. Shown in the hero diagram and the Method section.
export const pipeline = [
  {
    name: 'Sources',
    tools: 'SQL · Excel · system exports',
    desc: 'Pull from the systems people actually use, then reconcile them into one set.',
  },
  {
    name: 'Clean',
    tools: 'Validation · deduplication · preprocessing',
    desc: 'Where most errors die. Cleaning procedures cut dataset errors by 25% at Dimention X.',
  },
  {
    name: 'Model',
    tools: 'Joins · pivot tables · summary statistics',
    desc: 'Shape the data to the question being asked, not the other way round.',
  },
  {
    name: 'Report',
    tools: 'Tableau · Power BI · Excel',
    desc: 'Dashboards and reports that non-technical teams read without a walkthrough.',
  },
];

// Work. A `metric` draws a small before/after chart; leave it out for a card without one.
// `draft: true` hides a card until it is ready.
export const projects = [
  {
    title: 'Cleaner production data',
    org: 'Dimention X · Data Analyst',
    dates: '2024 – 2025',
    desc: 'Cleaning and preprocessing procedures for the datasets behind stakeholder reporting.',
    metric: { label: 'Dataset errors', before: 100, after: 75, delta: '−25%' },
    tools: ['SQL', 'Excel'],
  },
  {
    title: 'One reporting view from many sources',
    org: 'Dimention X · IT Specialist in Analytics',
    dates: '2023 – 2024',
    desc: 'Large datasets consolidated from multiple systems, so reports stopped disagreeing with each other.',
    metric: { label: 'Data errors', before: 100, after: 80, delta: '−20%' },
    tools: ['SQL', 'Excel'],
  },
  {
    title: 'Training that stuck',
    org: 'Dimention X',
    dates: '2023',
    desc: 'Technical manuals and sessions on data-analysis software for non-technical staff.',
    metric: { label: 'Staff proficiency', before: 80, after: 100, delta: '+25%' },
    tools: ['Documentation', 'Training'],
  },
  {
    title: 'Dashboards people actually open',
    org: 'Dimention X · Data Analyst',
    dates: '2024 – 2025',
    desc: 'Tableau dashboards and reports, plus Excel pivot-table models, to track and communicate key metrics.',
    tools: ['Tableau', 'Excel'],
  },
  {
    title: 'Data operations at NextEra Energy Resources',
    org: 'NextEra Energy Resources · Data Operations Analyst',
    dates: '2026 – present',
    desc: 'TODO: what the data is, who uses it, and one result with a number.',
    tools: ['SQL', 'Power BI'],
    draft: true,
  },
];

export const experience = [
  {
    role: 'Data Operations Analyst',
    org: 'NextEra Energy Resources',
    place: 'Juno Beach, FL',
    dates: 'Jan 2026 – Present',
    bullets: [
      // TODO: add two or three bullets. What you own day to day, one result with a number, the tools.
    ],
  },
  {
    role: 'Data Analyst',
    org: 'Dimention X Inc.',
    place: 'McLean, VA',
    dates: 'May 2024 – Jun 2025',
    bullets: [
      'Analyzed large datasets to surface trends, patterns, and actionable insights for business stakeholders.',
      'Queried and manipulated production databases in SQL, enforcing data accuracy and consistency.',
      'Built Tableau dashboards and reports and Excel pivot-table models to track and communicate key metrics.',
      'Implemented data cleaning and preprocessing procedures that cut dataset errors by 25%.',
    ],
  },
  {
    role: 'IT Specialist in Analytics',
    org: 'Dimention X Inc.',
    place: 'McLean, VA',
    dates: 'Jul 2023 – Apr 2024',
    bullets: [
      'Consolidated and cleaned large datasets from multiple sources, improving reporting accuracy and reducing data errors by 20%.',
      'Wrote technical manuals and trained staff on data-analysis software, raising proficiency among non-technical staff by 25%.',
      'Supported employees and clients, managed the employee user database, and implemented new networking systems.',
    ],
  },
  {
    role: 'Information Technology Administrator',
    org: 'Datawiz Corporation',
    place: 'Chantilly, VA',
    dates: 'Sep 2021 – Apr 2023',
    bullets: [
      'Installed and maintained hardware and software, and managed Windows security features protecting confidential information.',
      'Ran weekly server checks, monitored email usage, and administered user accounts and credentials to maintain data integrity.',
    ],
  },
  {
    role: 'Data Analytics Intern',
    org: 'GAMA Engineering Ltd.',
    place: '',
    dates: 'May 2021 – Aug 2021',
    bullets: [
      'Queried databases in SQL to run ETL and produce table summary statistics.',
      'Analyzed and visualized datasets in SQL, Tableau, and Excel; reported bugs and issues with recommended fixes.',
    ],
  },
  {
    role: 'IT Helpdesk Support and Computer Lab Assistant',
    org: 'University of North Texas Libraries',
    place: 'Denton, TX',
    dates: 'Aug 2017 – May 2021',
    bullets: [
      'Supported about 200 students per day with hardware, software, and network issues across Microsoft Office and Adobe suites.',
      'Reimaged and encrypted classroom laptops, maintained the equipment checkout database, and reported on recurring errors.',
    ],
  },
];

export const skillGroups = [
  { name: 'Analysis and BI', items: ['SQL', 'Tableau', 'Power BI', 'Excel (pivot tables)', 'Data visualization', 'Dashboards and reporting'] },
  { name: 'Data operations', items: ['Data pipelines', 'Data cleaning and preprocessing', 'Multi-source consolidation', 'Data quality checks', 'ETL'] },
  { name: 'Tools and IT', items: ['Jira', 'Windows administration', 'Networking', 'User database administration', 'Technical documentation', 'Training'] },
];

export const certs = [
  { name: 'Google Data Analytics Certificate', issuer: 'Google' },
  { name: 'Foundations of Project Management', issuer: 'Google' },
  { name: 'Learning Data Analytics: Foundations', issuer: 'LinkedIn Learning' },
  { name: 'SQL Course', issuer: '' },
];

export const education = [
  { school: 'University of North Texas', detail: 'B.S., Computer Engineering', dates: '2021', note: 'Dean’s List (Spring 2019), President’s List (Spring 2016)' },
];

export const languages = 'English (native), Urdu (native), Turkish (elementary), Spanish (elementary)';
