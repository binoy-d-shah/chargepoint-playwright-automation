import { test, expect, request } from '@playwright/test';
import { ChargePointPage } from '../../pages/ChargePointPage';
import { getAllChargePoints } from '../../utils/apiClient';
import { generateSerialNumber } from '../../utils/userGenerator';

/**
 * UI + API Integration Test Suite for Charge Point functionality.
 * This suite tests the integration between the UI (via Playwright) and the API (via GET requests)
 * for adding and deleting charge points, and verifying the changes in the API.
 */
test.describe('UI + API Integration - Charge Point Tests', () => {

    let chargePointPage;

    /**
     * Before each test, initializes the ChargePointPage object and navigates to the charge points page.
     * @param {Object} page - The Playwright page object used for UI interactions.
     */
    test.beforeEach(async ({ page }) => {
        chargePointPage = new ChargePointPage(page);
        await chargePointPage.navigate();
    });

    /**
     * Test case for adding a valid serial number via the UI and verifying it using the GET API.
     * This test ensures that a charge point can be added through the UI and the corresponding data
     * can be verified through an API GET request.
     * @param {Object} request - The Playwright request object used to send API requests.
     */
    test('Add valid serial number and verify it using GET API', async ( {request} ) => {
        // Generate random serial number
        const serialNumber = generateSerialNumber('');
        // Add Serial Number
        await chargePointPage.addSerialNumber(serialNumber);
        // Verify serial number in the list
        await chargePointPage.verifySerialInList(serialNumber);

        // Get all chargepoints
        let response = await getAllChargePoints(request);
        // Get the valid ID
        let body = await response.json();
        let validId = body.find((cp: { serialNumber: string }) => cp.serialNumber === serialNumber)?.id;

        // Verify that ID value is available
        expect(validId).toBeDefined();
    });

    /**
     * Test case for adding and deleting a valid serial number via the UI, and verifying it using the GET API.
     * This test ensures that a charge point can be added, deleted, and the deletion is reflected both
     * in the UI and the API.
     * @param {Object} request - The Playwright request object used to send API requests.
     */
    test('Add and delete valid serial number and verify it using GET API', async ( {request} ) => {
        // Generate random serial number
        const serialNumber = generateSerialNumber('');
        // Add Serial Number
        await chargePointPage.addSerialNumber(serialNumber);
        // Verify serial number in the list
        await chargePointPage.verifySerialInList(serialNumber);
        // Delete serial number
        await chargePointPage.deleteSerial(serialNumber);
        // Verify serial number is not in the list
        await chargePointPage.verifySerialNotInList(serialNumber);

        // Get all chargepoints
        let response = await getAllChargePoints(request);
        // Get the valid ID
        let body = await response.json();
        let validId = body.find((cp: { serialNumber: string }) => cp.serialNumber === serialNumber)?.id;

        // Verify that ID value is available
        expect(validId).toBeUndefined();
    });
});
