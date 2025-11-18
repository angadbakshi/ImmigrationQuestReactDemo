import { ImmigrationProgram } from '../../types/programs';

export const spousalSponsorshipProgram: ImmigrationProgram = {
  id: 'spousal-sponsorship',
  name: 'Spousal Sponsorship Program',
  type: 'family',
  description: 'For citizens or permanent residents sponsoring their spouse or common-law partner for permanent residency in Canada',
  requirements: [
    'Valid marriage certificate from India',
    'Sponsor must be Canadian citizen',
    'Minimum income requirements (LICO)',
    'No criminal record for both parties',
    'Genuine relationship proof'
  ],
  estimatedTimeframe: '12-14 months',
  difficulty: 2,
  processingTime: '12 months',
  fees: {
    application: 1050, // Sponsorship fee: $75 + Principal applicant fee: $475 + Right of PR: $500
    processing: 500,
    other: 200, // Biometrics fee
  },
  benefits: [
    'Family reunification in Canada',
    'Open work permit eligibility while application processes',
    'Access to healthcare once PR is approved',
    'Path to Canadian citizenship after 3 years',
    'Social Insurance Number (SIN) upon arrival'
  ],
  steps: [
    {
      id: 'relationship-validation',
      title: 'Relationship Documentation',
      description: 'Gather comprehensive evidence of genuine relationship',
      status: 'pending',
      estimatedTime: '4-6 weeks',
      requirements: [
        'Original marriage certificate from India',
        'Marriage photos and ceremony evidence',
        'Proof of ongoing communication',
        'Joint financial responsibilities'
      ],
      documents: [
        'Marriage certificate (with certified translation)',
        'Wedding photos and videos',
        'WhatsApp/call history (minimum 1 year)',
        'Joint bank accounts/property (if any)',
        'Travel history and boarding passes',
        'Affidavits from family members'
      ],
      tasks: [
        'Get marriage certificate authenticated',
        'Organize photos chronologically',
        'Export chat histories',
        'Collect travel documentation'
      ]
    },
    {
      id: 'sponsor-eligibility',
      title: 'Sponsor Requirements',
      description: 'Canadian sponsor documentation',
      status: 'pending',
      estimatedTime: '2-3 weeks',
      requirements: [
        'Proof of Canadian citizenship',
        'Income verification',
        'Residency proof',
        'No social assistance'
      ],
      documents: [
        'Canadian passport/citizenship card',
        'T4s and NOAs for last 3 years',
        'Employment letter',
        'Utility bills/lease agreement',
        'Credit score report'
      ],
      tasks: [
        'Request tax documents from CRA',
        'Get employment letter',
        'Collect residency proof',
        'Check credit score'
      ]
    },
    {
      id: 'applicant-documentation',
      title: 'Applicant Documentation',
      description: 'Indian spouse required documents',
      status: 'pending',
      estimatedTime: '6-8 weeks',
      requirements: [
        'Valid passport',
        'Birth certificate',
        'Police clearance',
        'Education credentials',
        'Photos per specifications'
      ],
      documents: [
        'Indian passport (minimum 2 years validity)',
        'Birth certificate with translation',
        'Police clearance from India',
        'Educational degrees',
        'Language test results (if available)',
        'Professional certifications',
        'Passport size photos (IRCC specifications)'
      ],
      tasks: [
        'Apply for police clearance',
        'Get documents translated',
        'Take biometric photos',
        'Gather educational documents'
      ]
    },
    {
      id: 'medical-examination',
      title: 'Medical Examination',
      description: 'Complete immigration medical exam in India',
      status: 'pending',
      estimatedTime: '3-4 weeks',
      requirements: [
        'Panel physician examination',
        'Medical tests and X-rays',
        'Vaccination records'
      ],
      documents: [
        'Medical examination results',
        'Chest X-ray results',
        'Blood test reports',
        'Vaccination history',
        'Previous medical records'
      ],
      tasks: [
        'Find approved panel physician in India',
        'Schedule examination',
        'Complete required tests',
        'Get vaccination updates if needed'
      ]
    },
    {
      id: 'application-submission',
      title: 'Application Submission',
      description: 'Submit complete application package',
      status: 'pending',
      estimatedTime: '2-3 weeks',
      requirements: [
        'All forms completed',
        'Documents organized',
        'Fees paid',
        'Courier service'
      ],
      documents: [
        'IMM1344 (Application to Sponsor)',
        'IMM5532 (Relationship Information)',
        'IMM5669 (Schedule A)',
        'IMM5406 (Additional Family Info)',
        'All supporting documents',
        'Payment receipts'
      ],
      tasks: [
        'Complete all IRCC forms',
        'Organize documents per checklist',
        'Pay application fees',
        'Arrange secure courier'
      ]
    },
    {
      id: 'post-submission',
      title: 'Post Submission Phase',
      description: 'Track and respond to IRCC requests',
      status: 'pending',
      estimatedTime: '8-12 months',
      requirements: [
        'Application acknowledgment',
        'Biometrics completion',
        'Additional document requests',
        'Interview preparation'
      ],
      documents: [
        'Acknowledgment of Receipt (AOR)',
        'Biometrics instruction letter',
        'Additional documents as requested',
        'Work permit application (optional)'
      ],
      tasks: [
        'Complete biometrics',
        'Apply for work permit',
        'Monitor application status',
        'Prepare for potential interview'
      ]
    }
  ]
};