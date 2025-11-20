import { API_ENDPOINTS, API_TOKENS } from '../constants';
import { GenerationPayload, ValidationResponse, GenerationResponse } from '../types';

/**
 * Validates the personnel data payload.
 */
export const validateData = async (payload: GenerationPayload): Promise<ValidationResponse> => {
  try {
    const response = await fetch(API_ENDPOINTS.VALIDATE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKENS.BEARER}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return data as ValidationResponse;
  } catch (error) {
    console.error('Validation API Error:', error);
    return {
      success: false,
      message: 'Network or Server Error',
      data: [(error as Error).message],
    };
  }
};

/**
 * Generates the CEV (VDS) based on owner and device info.
 */
export const generateCev = async (payload: GenerationPayload): Promise<GenerationResponse> => {
  try {
    const response = await fetch(API_ENDPOINTS.GENERATE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKENS.BEARER}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return data as GenerationResponse;
  } catch (error) {
    console.error('Generation API Error:', error);
    return {
      success: false,
      message: 'Network or Server Error',
      data: { error: true, cev: '' },
    };
  }
};