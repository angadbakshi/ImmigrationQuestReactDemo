import { ImmigrationProgram } from '../../types/programs';

export const federalSkilledTradesProgram: ImmigrationProgram = {
  id: 'federal-skilled-trades',
  name: 'Federal Skilled Trades Program',
  type: 'work',
  description: 'For skilled trades workers who want to immigrate to Canada permanently through Express Entry',
  requirements: [
    'Valid job offer for 1 year OR certificate of qualification',
    'Language ability: CLB 5 (speaking/listening), CLB 4 (reading/writing)',
    '2 years of full-time work experience in skilled trade',
    'Meet job requirements for skilled trade occupation',
    'Skilled trade in NOC TEER 2 or 3 categories'
  ],
  estimatedTimeframe: '6-12 months',
  difficulty: 2,
  processingTime: '6 months',
  fees: {
    application: 850,
    processing: 515, // Right of PR fee
    other: 385, // Biometrics ($85) + Medical (~$300)
  },
  benefits: [
    'Permanent residence status',
    'Work in your trade anywhere in Canada',
    'Include family members',
    'Access to healthcare and social benefits',
    'Path to citizenship after 3 years'
  ],
  steps: [
    {
      id: 'language-test',
      title: 'Language Testing',
      description: 'Complete English/French language proficiency test',
      status: 'pending',
      estimatedTime: '4-6 weeks',
      requirements: [
        'CLB 5 in speaking and listening',
        'CLB 4 in reading and writing',
        'IELTS/CELPIP for English',
        'TEF/TCF for French'
      ],
      documents: [
        'Valid passport for identification',
        'Test registration confirmation',
        'Language test results',
        'Score interpretation guide'
      ],
      tasks: [
        'Choose test (IELTS/CELPIP)',
        'Register for test date',
        'Complete preparation course',
        'Take language test'
      ]
    },
    {
      id: 'trade-qualification',
      title: 'Trade Qualification',
      description: 'Obtain certificate of qualification or job offer',
      status: 'pending',
      estimatedTime: '2-3 months',
      requirements: [
        'Certificate from provincial/territorial authority',
        'OR valid job offer for 1 year',
        'Trade experience documentation',
        'Skills assessment if required'
      ],
      documents: [
        'Trade certification/qualification',
        'Job offer letter (if applicable)',
        'Employment contracts',
        'Reference letters'
      ],
      tasks: [
        'Apply for trade certification',
        'OR secure job offer',
        'Get experience verified',
        'Complete skills assessment'
      ]
    },
    {
      id: 'work-experience',
      title: 'Work Experience Verification',
      description: 'Document skilled trades experience',
      status: 'pending',
      estimatedTime: '4-6 weeks',
      requirements: [
        '2 years full-time experience',
        'Experience within last 5 years',
        'Detailed job duties',
        'Employer verification'
      ],
      documents: [
        'Reference letters from employers',
        'Pay stubs or tax documents',
        'Apprenticeship records',
        'Trade licenses/certificates'
      ],
      tasks: [
        'Get detailed reference letters',
        'Collect pay documentation',
        'Verify employment dates',
        'Organize trade certifications'
      ]
    },
    {
      id: 'express-entry-profile',
      title: 'Express Entry Profile',
      description: 'Create and submit Express Entry profile',
      status: 'pending',
      estimatedTime: '1-2 weeks',
      requirements: [
        'Valid passport',
        'Language test results',
        'Trade qualification/job offer',
        'Work experience letters',
        'Proof of funds'
      ],
      documents: [
        'Personal identification',
        'Trade credentials',
        'Language test scores',
        'Employment records',
        'Bank statements'
      ],
      tasks: [
        'Gather all documents',
        'Calculate CRS score',
        'Create IRCC account',
        'Submit EE profile'
      ]
    },
    {
      id: 'ita-submission',
      title: 'ITA Application',
      description: 'Submit complete PR application after receiving ITA',
      status: 'pending',
      estimatedTime: '60 days',
      requirements: [
        'Invitation to Apply (ITA)',
        'Medical examination',
        'Police certificates',
        'Application fees paid'
      ],
      documents: [
        'Application forms',
        'Supporting documents',
        'Medical exam results',
        'Police clearances',
        'Photos (IRCC specs)'
      ],
      tasks: [
        'Complete medical exam',
        'Get police certificates',
        'Fill application forms',
        'Pay required fees',
        'Submit complete application'
      ]
    },
    {
      id: 'post-submission',
      title: 'Post-Submission Phase',
      description: 'Monitor application and respond to requests',
      status: 'pending',
      estimatedTime: '6 months',
      requirements: [
        'Application acknowledgment',
        'Biometrics submission',
        'Additional document requests',
        'Status updates'
      ],
      documents: [
        'Biometrics confirmation',
        'Additional documents',
        'Correspondence from IRCC',
        'Status updates'
      ],
      tasks: [
        'Complete biometrics',
        'Monitor application status',
        'Respond to requests promptly',
        'Prepare for approval'
      ]
    }
  ]
};