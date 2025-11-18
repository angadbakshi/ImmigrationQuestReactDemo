import { ImmigrationProgram } from '../../types/programs';

export const skilledWorkerProgram: ImmigrationProgram = {
  id: 'federal-skilled-worker',
  name: 'Federal Skilled Worker Program',
  type: 'work',
  description: 'For skilled workers with foreign work experience who want to immigrate to Canada permanently through Express Entry',
  requirements: [
    'Minimum score of 67/100 on FSWP grid',
    'CLB 7 language proficiency (IELTS/CELPIP)',
    '1 year continuous skilled work experience (NOC TEER 0, 1, 2, or 3)',
    'Educational Credential Assessment (ECA)',
    'Proof of settlement funds'
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
    'Permanent residence upon arrival',
    'Work anywhere in Canada',
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
        'Minimum CLB 7 in all abilities',
        'IELTS/CELPIP for English',
        'TEF/TCF for French',
        'Results valid for 2 years'
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
      id: 'education-assessment',
      title: 'Education Assessment',
      description: 'Get foreign credentials assessed through ECA',
      status: 'pending',
      estimatedTime: '2-3 months',
      requirements: [
        'Original transcripts',
        'Degree certificates',
        'Course descriptions',
        'ECA from designated organization'
      ],
      documents: [
        'University transcripts',
        'Degree certificates',
        'Certified translations',
        'ECA report'
      ],
      tasks: [
        'Choose ECA provider (WES/IQAS)',
        'Submit educational documents',
        'Get translations if needed',
        'Pay assessment fees'
      ]
    },
    {
      id: 'work-experience',
      title: 'Work Experience Verification',
      description: 'Document skilled work experience',
      status: 'pending',
      estimatedTime: '4-6 weeks',
      requirements: [
        'Continuous full-time work (1 year)',
        'NOC TEER 0, 1, 2, or 3 occupation',
        'Detailed job duties',
        'Employment verification'
      ],
      documents: [
        'Reference letters from employers',
        'Pay stubs or tax documents',
        'Employment contracts',
        'Job descriptions'
      ],
      tasks: [
        'Get detailed reference letters',
        'Collect pay documentation',
        'Match duties to NOC codes',
        'Verify employment dates'
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
        'ECA report',
        'Work experience letters',
        'Proof of funds'
      ],
      documents: [
        'Personal identification',
        'Educational credentials',
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