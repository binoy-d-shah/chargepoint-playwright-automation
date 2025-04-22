import { test, expect } from '@playwright/test';
import { ChargePointPage } from '../../pages/ChargePointPage';
import { generateSerialNumber } from '../../utils/userGenerator';

/**
 * Charge Point Installation Form UI Test Suite.
 * This suite tests various functionalities related to the Charge Point Installation Form.
 * It covers adding, deleting, and validating serial numbers in the UI, including handling invalid inputs.
 */
test.describe('Charge Point Installation Form UI Tests', () => {

    let chargePointPage;

    /**
     * Before each test, initializes the ChargePointPage object and navigates to the installation form.
     * @param {Object} page - The Playwright page object used for UI interactions.
     */
    test.beforeEach(async ({ page }) => {
        chargePointPage = new ChargePointPage(page);
        await chargePointPage.navigate();
    });

    /**
     * Test case for adding a valid serial number and verifying it in the serial number list.
     * This test checks that a valid serial number can be added and appears in the UI.
     */
    test('Add valid serial number and verify in list', async () => {
        // Generate random serial number
        const serialNumber = generateSerialNumber('');
        // Add Serial Number
        await chargePointPage.addSerialNumber(serialNumber);
        // Verify serial number in the list
        await chargePointPage.verifySerialInList(serialNumber);
    });

    /**
     * Test case for adding multiple serial numbers and deleting one specifically.
     * This test checks that multiple serial numbers can be added, and a specific one can be deleted.
     */
    test('Add multiple serial numbers and delete one specifically', async () => {

        // Generate random serial numbers
        const serials = [generateSerialNumber(''), generateSerialNumber(''), generateSerialNumber('')];

        for (const serial of serials) {
            // Add Serial Number
            await chargePointPage.addSerialNumber(serial);
            // Verify serial number in the list
            await chargePointPage.verifySerialInList(serial);
        }

        // Delete serial number
        await chargePointPage.deleteSerial(serials[1]);
        // Verify that deleted serial number is not in the list
        await chargePointPage.verifySerialNotInList(serials[1]);
        // Verify rest serial numbers in the list
        await chargePointPage.verifySerialInList(serials[0]);
        await chargePointPage.verifySerialInList(serials[2]);
    });

    /**
     * Test case for attempting to add duplicate serial numbers.
     * This test ensures that only unique serial numbers are added to the list.
     */
    test('Attempt to add duplicate serial numbers', async () => {
        // Generate random serial number
        const serialNumber = generateSerialNumber('');
        // Add Serial Number
        await chargePointPage.addSerialNumber(serialNumber);
        // Add Same Serial Number
        await chargePointPage.addSerialNumber(serialNumber);
        // Verify that there should be only 1 serial number
        expect(await chargePointPage.getTotalSerialNumberCount(serialNumber)).toBe(1);
    });

    /**
     * Test case for deleting a serial number from the list.
     * This test ensures that a serial number can be deleted and is no longer present in the UI.
     */
    test('Delete serial number from list', async () => {
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
    });

    /**
     * Test case for attempting to submit an empty input field.
     * This test ensures that the "Add" button is disabled or shows an error when no serial number is entered.
     */
    test('Attempt to submit empty input', async () => {
        // Clear the field
        await chargePointPage.clearInputField();
        // Add empty serial number
        await chargePointPage.addButton().click();
        // Verify that when field is empty, add button is disabled or UI error is shown
        await chargePointPage.isAddButtonDisabled();
    });

    /**
     * Test case for adding a serial number with special characters.
     * This test ensures that serial numbers with invalid characters (e.g., symbols) cannot be added.
     */
    test('Add serial with special characters', async () => {
        // Generate random serial number
        const specialSerial = generateSerialNumber('symbols');
        // Add Serial Number
        await chargePointPage.addSerialNumber(specialSerial);
        // Verify serial number is not in the list due to error
        await chargePointPage.verifySerialNotInList(specialSerial);
    });

    /**
     * Test case for adding a serial number with a value that is too long.
     * This test ensures that serial numbers that exceed the maximum length are not accepted.
     */
    test('Add serial with too long value', async () => {
        // Generate random serial number
        const longSerialNumber = generateSerialNumber('long');
        // Add Serial Number
        await chargePointPage.addSerialNumber(longSerialNumber);
        // Verify serial number is not in the list due to error
        await chargePointPage.verifySerialNotInList(longSerialNumber);
    });

    /**
     * Test case for adding a serial number with a value that is too short.
     * This test ensures that serial numbers that are too short are not accepted.
     */
    test('Add serial with too short value', async () => {
        // Generate random serial number
        const shortSerialNumber = generateSerialNumber('short');
        // Add Serial Number
        await chargePointPage.addSerialNumber(shortSerialNumber);
        // Verify serial number is not in the list due to error
        await chargePointPage.verifySerialNotInList(shortSerialNumber);
    });

    /**
     * Test case for deleting all entries and verifying the list is empty.
     * This test ensures that all serial numbers can be deleted and the list is empty afterward.
     */
    test.skip('Delete all entries and verify that list is empty', async () => {

        // Generate random serial numbers
        const serials = [generateSerialNumber(''), generateSerialNumber('')];

        for (const serial of serials) {
            // Add Serial Number
            await chargePointPage.addSerialNumber(serial);
            // Verify serial number in the list
            await chargePointPage.verifySerialInList(serial);
        }

        // Delete all entries
        await chargePointPage.deleteAllSerialEntries();

        // Verify that list is empty
        expect(await chargePointPage.getTotalSerialNumberCount()).toBe(0);
    });

    /**
    * After each test, this hook is used to close the page.
    * It ensures that any open browser page is properly closed after each test is run.
    * 
    * @param {Object} page - The Playwright page object representing the open browser page.
    */
    test.afterEach(async ({ page }) => {
        // Close the page
        await page.close();
    });
});