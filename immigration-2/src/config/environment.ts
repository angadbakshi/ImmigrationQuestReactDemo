export const isDevelopment = import.meta.env.DEV;
export const isProduction = import.meta.env.PROD;

export const config = {
  useMockData: isDevelopment,
  features: {
    enableOnboarding: true,
    enableMockUsers: isDevelopment,
  },
  mockUsers: [
    {
      email: 'sarah.chen@example.com',
      password: 'password123',
      profile: {
        name: 'Sarah Chen',
        type: 'spousal',
        description: 'Married to Canadian citizen'
      }
    },
    {
      email: 'raj.patel@example.com',
      password: 'password123',
      profile: {
        name: 'Raj Patel',
        type: 'skilled-worker',
        description: 'Software Engineer with job offer'
      }
    }
  ]
};