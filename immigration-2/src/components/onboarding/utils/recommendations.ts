import { OnboardingFormData } from '../types';

interface ProgramScore {
  program: string;
  score: number;
  probability: 'low' | 'medium' | 'high';
  timeline: string;
  description: string;
}

export const calculateProgramRecommendations = (data: OnboardingFormData): ProgramScore[] => {
  const scores: ProgramScore[] = [];

  // Spousal Sponsorship Program
  if (data.maritalStatus === 'married' && data.spouseCanadian) {
    scores.push({
      program: 'Spousal Sponsorship Program',
      score: 100,
      probability: 'high',
      timeline: '12-14 months',
      description: 'As you are married to a Canadian citizen/PR, you are eligible for spousal sponsorship.'
    });
  }

  // Federal Skilled Worker Program
  if (data.educationLevel && data.yearsExperience) {
    const fswScore = calculateFSWScore(data);
    scores.push({
      program: 'Federal Skilled Worker Program',
      score: fswScore,
      probability: getProbability(fswScore),
      timeline: '6-12 months',
      description: getDescription('fsw', fswScore)
    });
  }

  // Provincial Nominee Program
  if (data.hasJobOffer) {
    const pnpScore = calculatePNPScore(data);
    scores.push({
      program: 'Provincial Nominee Program',
      score: pnpScore,
      probability: getProbability(pnpScore),
      timeline: '12-18 months',
      description: getDescription('pnp', pnpScore)
    });
  }

  return scores.sort((a, b) => b.score - a.score);
};

const calculateFSWScore = (data: OnboardingFormData): number => {
  let score = 0;

  // Education (max 25 points)
  if (data.educationLevel === 'phd') score += 25;
  else if (data.educationLevel === 'masters') score += 23;
  else if (data.educationLevel === 'bachelors') score += 21;

  // Work Experience (max 15 points)
  if (data.yearsExperience === '5+') score += 15;
  else if (data.yearsExperience === '3-5') score += 13;
  else if (data.yearsExperience === '1-2') score += 9;

  // Language (max 28 points)
  if (data.scores) {
    const avgScore = Object.values(data.scores)
      .reduce((sum, score) => sum + Number(score), 0) / 4;
    if (avgScore >= 8) score += 28;
    else if (avgScore >= 7) score += 23;
    else if (avgScore >= 6) score += 17;
  }

  return score;
};

const calculatePNPScore = (data: OnboardingFormData): number => {
  let score = 0;

  // Job Offer (max 30 points)
  if (data.hasJobOffer) score += 30;

  // Education (max 25 points)
  if (data.studiedInCanada) score += 25;
  else if (data.educationLevel === 'masters' || data.educationLevel === 'phd') score += 23;
  else if (data.educationLevel === 'bachelors') score += 20;

  return score;
};

const getProbability = (score: number): 'low' | 'medium' | 'high' => {
  if (score >= 70) return 'high';
  if (score >= 50) return 'medium';
  return 'low';
};

const getDescription = (program: string, score: number): string => {
  if (program === 'fsw') {
    if (score >= 70) {
      return 'Based on your education and work experience, you have a strong chance of qualifying.';
    }
    return 'You may need to improve your qualifications to increase your chances.';
  }

  if (program === 'pnp') {
    if (score >= 70) {
      return 'Your job offer makes you eligible for provincial nomination.';
    }
    return 'Consider securing a job offer to improve your chances.';
  }

  return '';
};