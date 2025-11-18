import { ImmigrationProgram } from '../../types/programs';

export const startupVisaProgram: ImmigrationProgram = {
  id: 'startup-visa',
  name: 'Start-up Visa Program',
  type: 'startup',
  description: 'For entrepreneurs who want to start a business in Canada and receive permanent residence',
  requirements: [
    'Support from designated organization',
    'Sufficient settlement funds',
    'Language proficiency (CLB 5)',
    'Business ownership/control',
    'Business incorporation'
  ],
  estimatedTimeframe: '12-16 months',
  difficulty: 3,
  processingTime: '12-16 months',
  fees: {
    application: 2075,
    processing: 500,
    other: 230, // Biometrics and business registration
  },
  benefits: [
    'Permanent residence for founders',
    'No minimum investment requirement',
    'Include family members',
    'Access to startup ecosystem',
    'Business support services'
  ],
  steps: [
    {
      id: 'business-plan',
      title: 'Business Plan Development',
      description: 'Create comprehensive business plan',
      status: 'pending',
      estimatedTime: '2-3 months',
      requirements: [
        'Market analysis',
        'Financial projections',
        'Implementation strategy',
        'Team composition'
      ],
      documents: [
        'Business plan document',
        'Financial statements',
        'Market research data',
        'Team resumes'
      ],
      tasks: [
        'Research market',
        'Develop financials',
        'Write business plan',
        'Prepare pitch deck'
      ]
    },
    // Additional steps...
  ],
};