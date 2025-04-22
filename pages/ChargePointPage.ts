import { Locator, Page, expect } from '@playwright/test';
import { UI_BASE_URL } from "../config/env";

/**
 * Page Object Model for interacting with the ChargePoint page.
 * Provides methods to navigate and interact with elements of the page.
 */
export class ChargePointPage {
    private page: Page;
    private serialList: Locator;
    private serialNumberInput: Locator;
    private deleteButtons: Locator;

    /**
     * Creates an instance of ChargePointPage.
     * 
     * @param {Page} page - The Playwright Page object representing the ChargePoint page.
     */
    constructor(page: Page) {
        this.page = page;
        this.serialList = page.locator('.list-text');
        this.serialNumberInput = page.locator('input[name=\'input-serial-number\']');
        this.deleteButtons = page.locator('.list-button');
    }

    addButton = () => this.page.locator('button.addButton')
    deleteButton = (serial: string) => this.page.locator(`text=${serial}`).locator('..').getByRole('button');

    /**
     * Navigates to the ChargePoint page using the base URL defined in the config.
     * 
     * @returns {Promise<void>} - A promise that resolves when the navigation is complete.
     */
    async navigate() {
        await this.page.goto(UI_BASE_URL);
    }

    /**
     * Fills the serial number input field and clicks the 'Add' button to add a new serial number.
     * 
     * @param {string} serial - The serial number to add to the page.
     * @returns {Promise<void>} - A promise that resolves when the action is complete.
     */
    async addSerialNumber(serial: string) {
        await this.serialNumberInput.fill(serial);
        await this.addButton().click();
    }

    /**
     * Verifies that a serial number is visible in the list.
     * 
     * @param {string} serial - The serial number to verify is in the list.
     * @returns {Promise<void>} - A promise that resolves when the verification is complete.
     */
    async verifySerialInList(serial: string) {
        await expect(this.page.locator(`text=${serial}`)).toBeVisible();
    }

    /**
     * Clicks the delete button associated with the given serial number.
     * 
     * @param {string} serial - The serial number to delete.
     * @returns {Promise<void>} - A promise that resolves when the deletion is complete.
     */
    async deleteSerial(serial: string) {
        await this.deleteButton(serial).click();
    }

    /**
     * Verifies that a serial number is not present in the list.
     * 
     * @param {string} serial - The serial number to verify is not in the list.
     * @returns {Promise<void>} - A promise that resolves when the verification is complete.
     */
    async verifySerialNotInList(serial: string) {
        await expect(this.page.locator(`text=${serial}`)).toHaveCount(0);
    }

    /**
     * Clears the serial number input field.
     * 
     * @returns {Promise<void>} - A promise that resolves when the input field is cleared.
     */
    async clearInputField() {
        await this.serialNumberInput.fill('');
    }

    /**
     * Checks if the 'Add' button is disabled.
     * 
     * @returns {Promise<void>} - A promise that resolves when the verification is complete.
     */
    async isAddButtonDisabled() {
        await expect(this.addButton()).toBeDisabled();
    }

    /**
     * Retrieves the total count of serial numbers in the list for a specific serial number.
     * 
     * @param {string} serial - The serial number to check the count for.
     * @returns {Promise<number>} - A promise that resolves to the count of the serial number in the list.
     */
    async getTotalSerialNumberCount(serial: string) {
        return await this.page.locator(`text=${serial}`).count();
    }

    /**
     * Deletes all serial number entries from the list.
     * 
     * @returns {Promise<void>} - A promise that resolves when all serial entries are deleted.
     */
    async deleteAllSerialEntries() {
        const count = await this.serialList.count();

        for (let i = 0; i < count; i++) {
            await this.deleteButtons.first().click();
        }
    }

    /**
     * Retrieves the total number of serial entries in the list.
     * 
     * @returns {Promise<number>} - A promise that resolves to the count of serial entries in the list.
     */
    async getSerialEntriesCount() {
        return this.serialList.count();
    }
}
