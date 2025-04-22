import { test, expect } from '@playwright/test';
import { deleteChargePoint, addChargePoint } from '../../utils/apiClient';
import { generateSerialNumber } from '../../utils/userGenerator';

/**
 * Test Suite for verifying the Delete Charge Point API behavior.
 * This suite contains tests for deleting charge points with various scenarios.
 */
test.describe('Delete Charge Point API Test Suite', () => {

    let validId: string;

    /**
     * Runs before each test to set up the environment by adding a new charge point.
     * A unique serial number is generated and used to add a new charge point.
     * The ID of the created charge point is saved for use in subsequent tests.
     * @param {Object} request - The Playwright request object used to send API requests.
     */
    test.beforeEach(async ({ request }) => {
        // Generate a unique serial number
        const serialNumber = generateSerialNumber('');
        // Send request
        const response = await addChargePoint(request, serialNumber);
        // Wait for response 
        const body = await response.json();
        // Get the valid ID
        validId = body.id;
    });

    /**
     * Test case for successfully deleting a valid charge point.
     * Verifies that the response status code is 204 (No Content).
     * @param {Object} request - The Playwright request object used to send API requests.
     */
    test('Delete valid charge point', async ({ request }) => {
        // Send DELETE request
        const response = await deleteChargePoint(request, validId);
        // Verify response code to be 204
        expect(response.status()).toBe(204);
    });

    /**
     * Test case for attempting to delete a charge point that has already been deleted.
     * Verifies that the response status code is 404 (Not Found).
     * @param {Object} request - The Playwright request object used to send API requests.
     */
    test('Delete already deleted charge point', async ({ request }) => {
        // Send DELETE request
        await deleteChargePoint(request, validId);
        // Delete already deleted charge point
        const response = await deleteChargePoint(request, validId);
        // Verify response code to be 404
        expect(response.status()).toBe(404);
    });

    /**
     * Test case for attempting to delete a charge point with an invalid serial number.
     * Verifies that the response status code is 400 (Bad Request).
     * @param {Object} request - The Playwright request object used to send API requests.
     */
    test('Delete with invalid serial number format', async ({ request }) => {
        // Send DELETE request
        const response = await deleteChargePoint(request, 'invalid-serial-number');
        // Verify response code to be 400
        expect(response.status()).toBe(400);
    });

    /**
     * Test case for attempting to delete a charge point with an empty serial number.
     * Verifies that the response status code is 404 (Not Found).
     * @param {Object} request - The Playwright request object used to send API requests.
     */
    test('Delete with empty serial number', async ({ request }) => {
        // Send DELETE request
        const response = await deleteChargePoint(request, '');
        // Verify response code to be 404
        expect(response.status()).toBe(404);
    });
});
