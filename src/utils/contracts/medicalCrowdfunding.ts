import { Address } from 'viem';

export enum CampaignStatus {
  PENDING = 0,
  APPROVED = 1,
  REJECTED = 2,
  ACTIVE = 3,
  COMPLETED = 4
}

export interface DocumentConsent {
  shareDiagnosisReport: boolean;
  shareDoctorsLetter: boolean;
  shareMedicalBills: boolean;
  shareAdmissionDoc: boolean;
  shareGovernmentID: boolean;
  sharePatientPhoto: boolean;
}

export interface CampaignDocuments {
  diagnosisReportIPFS: string;
  doctorsLetterIPFS: string;
  medicalBillsIPFS: string;
  admissionDocIPFS: string;
  governmentIDIPFS: string;
  patientPhotoIPFS: string;
}

export interface GuardianDetails {
  guardian: Address;
  guardianGovernmentID: string;
  guardianFullName: string;
  guardianMobileNumber: string;
  guardianResidentialAddress: string;
}

export interface PatientDetails {
  fullName: string;
  dateOfBirth: string;
  contactInfo: string;
  residenceLocation: string;
}

export interface Proposal {
  proposedFee: bigint;
  startTime: bigint;
  endTime: bigint;
  yesVotes: bigint;
  noVotes: bigint;
  executed: boolean;
}

export interface Campaign {
  patient: Address;
  guardian: Address;
  amountNeededUSD: bigint;
  duration: bigint;
  startTime: bigint;
  patientDetails: PatientDetails;
  comment: string;
  status: CampaignStatus;
  consent: DocumentConsent;
  documents: CampaignDocuments;
  patientGuardian: GuardianDetails;
  votingEndTime: bigint;
  healthYesVotes: bigint;
  healthNoVotes: bigint;
  daoYesVotes: bigint;
  daoNoVotes: bigint;
  appealCount: bigint;
  donatedAmount: bigint;
  totalFeeCollected: bigint;
  amountReceivedUSD: bigint;
  feesDistributed: boolean;
}

export interface CampaignBasicInfo {
  id: number;
  patient: Address;
  amountNeededUSD: bigint;
  donatedAmount: bigint;
  status: CampaignStatus;
  healthYesVotes: bigint;
  healthNoVotes: bigint;
  feesDistributed: boolean;
}

export const campaignStatusFromNumber = (status: number): CampaignStatus => {
  return status as CampaignStatus;
};

export const MEDICAL_CROWDFUNDING_ABI = [
  // Paste the entire ABI here, as provided in your message
] as const;
