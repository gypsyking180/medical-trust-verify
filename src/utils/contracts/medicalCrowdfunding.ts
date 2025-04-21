
// Define types for the MedicalCrowdfunding contract

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
  guardian: string; // address
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

export interface Campaign {
  patient: string; // address
  guardian: string; // address
  AmountNeededUSD: number;
  duration: number;
  startTime: number;
  patientDetails: PatientDetails;
  donors: string[]; // address[]
  comment: string;
  status: CampaignStatus;
  consent: DocumentConsent;
  documents: CampaignDocuments;
  patientGuardian: GuardianDetails;
  votingEndTime: number;
  healthYesVotes: number;
  healthNoVotes: number;
  daoYesVotes: number;
  daoNoVotes: number;
  appealCount: number;
  donatedAmount: number;
  totalFeeCollected: number;
  amountReceivedUSD: number;
  healthParticipantCount: number;
  daoParticipantCount: number;
  feesDistributed: boolean;
}

export interface Proposal {
  proposedFee: number;
  startTime: number;
  endTime: number;
  yesVotes: number;
  noVotes: number;
  executed: boolean;
}

export interface CampaignBasicInfo {
  patient: string;
  amountNeededUSD: number;
  donatedAmount: number;
  status: CampaignStatus;
  healthYesVotes: number;
  healthNoVotes: number;
  feesDistributed: boolean;
}

// ABI for the MedicalCrowdfunding contract
// This is a simplified ABI with just the functions we'll use
export const MEDICAL_CROWDFUNDING_ABI = [
  {
    "type": "function",
    "name": "createCampaign",
    "inputs": [
      { "name": "_AmountNeededUSD", "type": "uint256" },
      { "name": "_duration", "type": "uint256" },
      { "name": "_comment", "type": "string" },
      { 
        "name": "_patientDetails", 
        "type": "tuple",
        "components": [
          { "name": "fullName", "type": "string" },
          { "name": "dateOfBirth", "type": "string" },
          { "name": "contactInfo", "type": "string" },
          { "name": "residenceLocation", "type": "string" }
        ]
      },
      {
        "name": "_consent",
        "type": "tuple",
        "components": [
          { "name": "shareDiagnosisReport", "type": "bool" },
          { "name": "shareDoctorsLetter", "type": "bool" },
          { "name": "shareMedicalBills", "type": "bool" },
          { "name": "shareAdmissionDoc", "type": "bool" },
          { "name": "shareGovernmentID", "type": "bool" },
          { "name": "sharePatientPhoto", "type": "bool" }
        ]
      },
      {
        "name": "_documents",
        "type": "tuple",
        "components": [
          { "name": "diagnosisReportIPFS", "type": "string" },
          { "name": "doctorsLetterIPFS", "type": "string" },
          { "name": "medicalBillsIPFS", "type": "string" },
          { "name": "admissionDocIPFS", "type": "string" },
          { "name": "governmentIDIPFS", "type": "string" },
          { "name": "patientPhotoIPFS", "type": "string" }
        ]
      },
      {
        "name": "_patientGuardian",
        "type": "tuple",
        "components": [
          { "name": "guardian", "type": "address" },
          { "name": "guardianGovernmentID", "type": "string" },
          { "name": "guardianFullName", "type": "string" },
          { "name": "guardianMobileNumber", "type": "string" },
          { "name": "guardianResidentialAddress", "type": "string" }
        ]
      }
    ],
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "donate",
    "inputs": [{ "name": "campaignId", "type": "uint256" }],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "voteOnCampaign",
    "inputs": [
      { "name": "campaignId", "type": "uint256" },
      { "name": "support", "type": "bool" },
      { "name": "comment", "type": "string" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "appealCampaign",
    "inputs": [{ "name": "campaignId", "type": "uint256" }],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "getCampaign",
    "inputs": [{ "name": "id", "type": "uint256" }],
    "outputs": [
      { "name": "patient", "type": "address" },
      { "name": "amountNeededUSD", "type": "uint256" },
      { "name": "donatedAmount", "type": "uint256" },
      { "name": "status", "type": "uint8" },
      { "name": "healthYesVotes", "type": "uint256" },
      { "name": "healthNoVotes", "type": "uint256" },
      { "name": "feesDistributed", "type": "bool" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getCampaignDocuments",
    "inputs": [{ "name": "_campaignId", "type": "uint256" }],
    "outputs": [
      {
        "name": "filteredDocuments",
        "type": "tuple",
        "components": [
          { "name": "diagnosisReportIPFS", "type": "string" },
          { "name": "doctorsLetterIPFS", "type": "string" },
          { "name": "medicalBillsIPFS", "type": "string" },
          { "name": "admissionDocIPFS", "type": "string" },
          { "name": "governmentIDIPFS", "type": "string" },
          { "name": "patientPhotoIPFS", "type": "string" }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "s_campaignCount",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "s_campaigns",
    "inputs": [{ "name": "", "type": "uint256" }],
    "outputs": [
      { "name": "patient", "type": "address" },
      { "name": "guardian", "type": "address" },
      { "name": "AmountNeededUSD", "type": "uint256" },
      { "name": "duration", "type": "uint256" },
      { "name": "startTime", "type": "uint256" },
      { "name": "comment", "type": "string" },
      { "name": "status", "type": "uint8" },
      { "name": "votingEndTime", "type": "uint256" },
      { "name": "healthYesVotes", "type": "uint256" },
      { "name": "healthNoVotes", "type": "uint256" },
      { "name": "daoYesVotes", "type": "uint256" },
      { "name": "daoNoVotes", "type": "uint256" },
      { "name": "appealCount", "type": "uint256" },
      { "name": "donatedAmount", "type": "uint256" },
      { "name": "totalFeeCollected", "type": "uint256" },
      { "name": "amountReceivedUSD", "type": "uint256" },
      { "name": "accHealthRewardPerShare", "type": "uint256" },
      { "name": "accDaoRewardPerShare", "type": "uint256" },
      { "name": "healthParticipantCount", "type": "uint256" },
      { "name": "daoParticipantCount", "type": "uint256" },
      { "name": "healthVerifierCountAtStart", "type": "uint256" },
      { "name": "daoVerifierCountAtStart", "type": "uint256" },
      { "name": "feesDistributed", "type": "bool" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getVerifierBalance",
    "inputs": [{ "name": "verifier", "type": "address" }],
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "withdrawVerifierFees",
    "inputs": [{ "name": "withdrawAmount", "type": "uint256" }],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "event",
    "name": "CampaignCreated",
    "inputs": [
      { "name": "campaignId", "type": "uint256", "indexed": true },
      { "name": "patient", "type": "address", "indexed": true }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "DonationReceived",
    "inputs": [
      { "name": "campaignId", "type": "uint256", "indexed": true },
      { "name": "donor", "type": "address", "indexed": false },
      { "name": "amount", "type": "uint256", "indexed": false },
      { "name": "fee", "type": "uint256", "indexed": false }
    ],
    "anonymous": false
  }
];
