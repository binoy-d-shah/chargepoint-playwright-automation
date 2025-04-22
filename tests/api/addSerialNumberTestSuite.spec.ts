import { test, expect, request } from '@playwright/test';
import { addChargePoint, addChargePointWithoutBody, addChargePointWithoutHeaders } from '../../utils/apiClient';
import { generateSerialNumber } from '../../utils/userGenerator';

/**
 * Test Suite for validating the 'Add Charge Point' API endpoint.
 */
test.describe('Add Charge Point API Test Suite', () => {

  /**
   * Test Case: Add a valid charge point.
   * Verifies successful creation of a charge point with a valid serial number.
   */
  test('Add valid charge point', async ({ request }) => {

    // Generate a unique serial number
    const serialNumber = generateSerialNumber('');
    // Send request
    const response = await addChargePoint(request, serialNumber);
    // Verify response code to be 201
    expect(response.status()).toBe(201);
    const body = await response.json();
    // Verify if body has ID property
    expect(body).toHaveProperty('id');
    //Verify if serialNumber is same as passed in request
    expect(body.serialNumber).toBe(serialNumber);
  });

  /**
   * Test Case: Attempt to add a duplicate serial number.
   * Expects a 400 Bad Request or similar error code if duplicates are not allowed.
   */
  test('Attempt to add a duplicate serial number.', async ({ request }) => {

    // Generate a unique serial number
    const serialNumber = generateSerialNumber('');

    // Send request first time with unique serial number
    await addChargePoint(request, serialNumber);
    // Send request second time with same serial number
    const response = await addChargePoint(request, serialNumber);
    // Expect it to be failed with an error
    expect(response.status()).toBe(400);
  });

  /**
   * Test Case: Send an empty serial number.
   * API should reject the request with a 400 Bad Request.
   */
  test('Send an empty serial number', async ({ request }) => {
    // Send request with empty serial number
    const response = await addChargePoint(request, generateSerialNumber('empty'));
    // Expect it to be failed with an error
    expect(response.status()).toBe(400);
  });

  /**
   * Test Case: Omit the serialNumber field entirely.
   * Expects the API to return a 400 due to missing required field.
   */
  test('Omit the serialNumber field entirely', async ({ request }) => {
    // Send request with empty body
    const response = await addChargePointWithoutBody(request);
    // Expect it to be failed with an error
    expect(response.status()).toBe(400);
  });

  /**
   * Test Case: Use a serial number that is too short (e.g., 1 character).
   * API should validate and reject the input with 400 status.
   */
  test('Invalid serial number (too short)', async ({ request }) => {
    // Send request with single character serial number
    const response = await addChargePoint(request, generateSerialNumber('short'));
    // Expect it to be failed with an error
    expect(response.status()).toBe(400);
  });

  /**
   * Test Case: Use a serial number that exceeds the maximum allowed length i.e. more than 256 characters.
   * API should return 400 Bad Request for overly long input.
   */
  test('Invalid serial number (too long)', async ({ request }) => {
    // Send request with 258 characters serial number
    const response = await addChargePoint(request, generateSerialNumber('long'));
    // Expect it to be failed with an error
    expect(response.status()).toBe(400);
  });

  /**
   * Test Case: Send request without required headers like 'Content-Type'.
   * Should return a 400 or fail due to malformed request.
   */
  test('Send request without headers', async ({ request }) => {
    // Generate a unique serial number
    const serialNumber = generateSerialNumber('');
    // Send request without headers
    const response = await addChargePointWithoutHeaders(request, serialNumber);
    // Expect it to be failed with an error
    expect(response.status()).toBe(400);
  });

  /**
   * Test Case: Use special characters only as the serial number.
   * Should fail validation and return a 400.
   */
  test('Send request with special characters only', async ({ request }) => {
    // Send request with special characters only
    const response = await addChargePoint(request, generateSerialNumber('symbols'));
    // Expect it to be failed with an error
    expect(response.status()).toBe(400);
  });

});
