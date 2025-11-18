import { ImmigrationProgram } from '../../../../immigration-2/src/types/programs';
import { generateUUID } from '../uuid';
import { 
  skilledWorkerProgram,
  studyPermitProgram,
  startupVisaProgram,
  spousalSponsorshipProgram,
  federalSkilledTradesProgram,
  ontarioImmigrantNomineeProgram,
  selfEmployedProgram
} from '../../../../immigration-2/src/data/programs';

// Create a mapping of original IDs to UUIDs
const programUUIDs = {
  'federal-skilled-worker': generateUUID(),
  'study-permit': generateUUID(),
  'startup-visa': generateUUID(),
  'spousal-sponsorship': generateUUID(),
  'federal-skilled-trades': generateUUID(),
  'oinp': generateUUID(),
  'self-employed': generateUUID(),
};

// Map programs with proper UUIDs
export const programSeedData: ImmigrationProgram[] = [
  { ...skilledWorkerProgram, id: programUUIDs['federal-skilled-worker'] },
  { ...studyPermitProgram, id: programUUIDs['study-permit'] },
  { ...startupVisaProgram, id: programUUIDs['startup-visa'] },
  { ...spousalSponsorshipProgram, id: programUUIDs['spousal-sponsorship'] },
  { ...federalSkilledTradesProgram, id: programUUIDs['federal-skilled-trades'] },
  { ...ontarioImmigrantNomineeProgram, id: programUUIDs['oinp'] },
  { ...selfEmployedProgram, id: programUUIDs['self-employed'] },
];

// Export mapping for reference in other parts of the application
export const programIdMapping = programUUIDs;