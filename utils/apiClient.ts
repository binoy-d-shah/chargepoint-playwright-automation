import { APIRequestContext } from '@playwright/test';
import { API_BASE_URL } from "../config/env";

/**
 * Sends a POST request to add a new charge point with the provided serial number.
 * 
 * @param {APIRequestContext} request - The API request context provided by Playwright.
 * @param {string} serialNumber - The serial number of the charge point to be added.
 * 
 * @returns {Promise<Response>} - The response object from the API.
 */
export async function addChargePoint(request: APIRequestContext, serialNumber: string) {
  return await request.post(API_BASE_URL + '/charge-point', {
    data: { serialNumber },
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

/**
 * Sends a POST request to add a new charge point without a request body.
 * 
 * @param {APIRequestContext} request - The API request context provided by Playwright.
 * 
 * @returns {Promise<Response>} - The response object from the API.
 */
export async function addChargePointWithoutBody(request: APIRequestContext) {
  return await request.post(API_BASE_URL + '/charge-point', {
    data: {},
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

/**
 * Sends a POST request to add a new charge point without any custom headers.
 * 
 * @param {APIRequestContext} request - The API request context provided by Playwright.
 * @param {string} serialNumber - The serial number of the charge point to be added.
 * 
 * @returns {Promise<Response>} - The response object from the API.
 */
export async function addChargePointWithoutHeaders(request: APIRequestContext, serialNumber: string) {
  return await request.post(API_BASE_URL + '/charge-point', {
    data: { serialNumber },
  });
}

/**
 * Sends a DELETE request to remove a charge point by its ID.
 * 
 * @param {APIRequestContext} request - The API request context provided by Playwright.
 * @param {string} id - The ID of the charge point to be deleted.
 * 
 * @returns {Promise<Response>} - The response object from the API.
 */
export async function deleteChargePoint(request: APIRequestContext, id: string) {
  return request.delete(API_BASE_URL + `/charge-point/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

/**
 * Sends a GET request to retrieve all charge points.
 * 
 * @param {APIRequestContext} request - The API request context provided by Playwright.
 * 
 * @returns {Promise<Response>} - The response object from the API.
 */
export async function getAllChargePoints(request: APIRequestContext) {
  return await request.get(API_BASE_URL + '/charge-point', {
    headers: {
      'Accept': 'application/json'
    }
  });
}
