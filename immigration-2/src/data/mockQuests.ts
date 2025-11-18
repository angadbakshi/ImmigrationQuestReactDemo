import { Quest } from '../types/quests';

export const mockQuests: Quest[] = [
  {
    id: 'language-proficiency',
    title: 'Language Mastery',
    description: 'Complete language proficiency requirements for immigration',
    points: 100,
    difficulty: 2,
    completed: false,
    steps: [
      {
        id: 'register-test',
        title: 'Register for Language Test',
        description: 'Sign up for IELTS or CELPIP examination',
        completed: true,
      },
      {
        id: 'prepare',
        title: 'Test Preparation',
        description: 'Complete practice tests and preparation materials',
        completed: false,
      },
      {
        id: 'take-test',
        title: 'Take the Test',
        description: 'Attend and complete the language proficiency test',
        completed: false,
      },
    ],
  },
  {
    id: 'document-collection',
    title: 'Document Collection',
    description: 'Gather all required immigration documents',
    points: 150,
    difficulty: 1,
    completed: false,
    steps: [
      {
        id: 'identification',
        title: 'Identity Documents',
        description: 'Collect passport and identification documents',
        completed: true,
      },
      {
        id: 'education',
        title: 'Educational Documents',
        description: 'Gather diplomas and transcripts',
        completed: true,
      },
      {
        id: 'work',
        title: 'Work Experience',
        description: 'Obtain employment letters and references',
        completed: false,
      },
    ],
  },
  {
    id: 'skills-assessment',
    title: 'Skills Assessment',
    description: 'Complete professional skills evaluation',
    points: 200,
    difficulty: 3,
    completed: false,
    steps: [
      {
        id: 'register-assessment',
        title: 'Register for Assessment',
        description: 'Sign up with relevant assessment authority',
        completed: false,
      },
      {
        id: 'submit-portfolio',
        title: 'Submit Portfolio',
        description: 'Prepare and submit work portfolio',
        completed: false,
      },
      {
        id: 'technical-interview',
        title: 'Technical Interview',
        description: 'Complete technical skills interview',
        completed: false,
      },
    ],
  },
];