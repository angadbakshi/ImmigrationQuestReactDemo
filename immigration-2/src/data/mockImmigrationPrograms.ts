import { ImmigrationProgram } from '../types/programs';
import {
  skilledWorkerProgram,
  studyPermitProgram,
  startupVisaProgram,
  spousalSponsorshipProgram,
  federalSkilledTradesProgram,
  ontarioImmigrantNomineeProgram,
  selfEmployedProgram
} from './programs';

export const mockImmigrationPrograms: ImmigrationProgram[] = [
  // Economic Immigration
  skilledWorkerProgram,
  federalSkilledTradesProgram,
  
  // Provincial Programs
  ontarioImmigrantNomineeProgram,
  
  // Business Immigration
  startupVisaProgram,
  selfEmployedProgram,
  
  // Family Sponsorship
  spousalSponsorshipProgram,
  
  // Study Programs
  studyPermitProgram
];