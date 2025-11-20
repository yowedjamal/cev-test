import { PersonPayload, GenerationPayload } from './types';

export const API_ENDPOINTS = {
  VALIDATE: 'https://ecev-api.qcdigitalhub.com/api/v1/validate-data/1',
  GENERATE: 'https://ecev-api.qcdigitalhub.com/api/v1/generate-cev/1',
};

export const API_TOKENS = {
  BEARER: '5srGcUhtDklvBlJ5KZEbbgWvb4psFLtxVmOW5lnMZ3mLtHBWDqueJxcLrKHqEEkm'
};

export const DEFAULT_VALIDATION_PAYLOAD: PersonPayload = {
  "nomDeFamille": "GANI",
  "prenom": "John",
  "numeroIdentificationPersonnel": "123456",
  "nationalite": "Française",
  "dateDeNaissance": "1990-01-01",
  "lieuDeNaissance": "Paris",
  "autoriteDeDelivrance": "Préfecture de police de Paris",
  "dateExpiration": "2025-01-01",
  "numeroDeCarte": "1234567890",
  "sexe": "M",
  "profession": "Ingénieur",
  "numeroProfessionnel": null,
  "groupeSanguin": "A+"
};

export const DEFAULT_GENERATION_PAYLOAD: GenerationPayload = {
  "owner": {
    "nationalId": "123456",
    "fullName": "John GANI",
    "department": "IT",
    "structure": "HQ",
    "contact": "+33123456789"
  },
  "device": {
    "deviceType": "Laptop",
    "brand": "Dell",
    "model": "XPS 13",
    "serialnumber": "SN123456789",
    "imei": null,
    "processor": "i7",
    "ram": "16 GB",
    "disk": "512 GB",
    "warrantyMonths": 24,
    "purchaseDate": "2020-01-01",
    "source": "Store"
  }
};