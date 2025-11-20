export interface PersonPayload {
  nomDeFamille: string;
  prenom: string;
  numeroIdentificationPersonnel: string;
  nationalite: string;
  dateDeNaissance: string;
  lieuDeNaissance: string;
  autoriteDeDelivrance: string;
  dateExpiration: string;
  numeroDeCarte: string;
  sexe: string;
  profession: string;
  numeroProfessionnel: string | null;
  groupeSanguin: string;
}

export interface OwnerInfo {
  nationalId: string;
  fullName: string;
  department: string;
  structure: string;
  contact: string;
}

export interface DeviceInfo {
  deviceType: string;
  brand: string;
  model: string;
  serialnumber: string;
  imei: string | null;
  processor: string;
  ram: string;
  disk: string;
  warrantyMonths: number;
  purchaseDate: string;
  source: string;
}

export interface GenerationPayload {
  owner: OwnerInfo;
  device: DeviceInfo;
}

// API Response Types

export interface ValidationResponse {
  success: boolean;
  message: string;
  data?: string[]; // For errors, this is an array of strings
  status?: number;
}

export interface GenerationResponseData {
  error: boolean;
  cev: string; // The Base64 image string
}

export interface GenerationResponse {
  success: boolean;
  message?: string;
  data: GenerationResponseData | unknown; // Can be error array or success object
}
