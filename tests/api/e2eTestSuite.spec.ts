import { test, expect, request } from '@playwright/test';
import { deleteChargePoint, addChargePoint, getAllChargePoints } from '../../utils/apiClient';
import { generateSerialNumber } from '../../utils/userGenerator';

/**
 * End-to-End (E2E) Test Suite for verifying the full flow of adding, retrieving, and deleting charge points.
 * This suite simulates a complete lifecycle of a charge point, including validation of the ID at each step.
 */
test.describe('E2E Test Suite', () => {

    /**
     * End-to-End flow for adding, retrieving, deleting, and verifying the deletion of a charge point.
     * The full process is performed to ensure the charge point is added and removed correctly.
     * Verifies that the charge point ID is no longer available after deletion.
     * @param {Object} request - The Playwright request object used to send API requests.
     */
    test('Add - Get - Delete - Get - Full E2E Flow', async ({ request }) => {

        // Generate a unique serial number
        const serialNumber = generateSerialNumber('');
        // Send request
        let response = await addChargePoint(request, serialNumber);
        // Wait for response 
        expect(response.status()).toBe(201);
        // Get all chargepoints
        response = await getAllChargePoints(request);
        // Get the valid ID
        let body = await response.json();
        let validId = body.find((cp: { serialNumber: string }) => cp.serialNumber === serialNumber)?.id;

        // Send DELETE request
        response = await deleteChargePoint(request, validId);
        // Verify response code to be 204
        expect(response.status()).toBe(204);

        // Get all chargepoints
        response = await getAllChargePoints(request);
        // Get the valid ID
        body = await response.json();
        validId = body.find((cp: { serialNumber: string }) => cp.serialNumber === serialNumber)?.id;
        // verify that ID value is not available
        expect(validId).toBeUndefined();

    });
});
