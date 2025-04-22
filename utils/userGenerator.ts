import { faker } from '@faker-js/faker';

;

/**
 * Generates a serial number based on the provided condition.
 * 
 * The function allows for different types of serial numbers based on the `condition`:
 * - `'empty'`: Returns an empty string.
 * - `'short'`: Returns a single uppercase alphanumeric character.
 * - `'long'`: Returns a string with 258 uppercase alphanumeric characters.
 * - `'symbols'`: Returns a string with 8 uppercase symbols.
 * - `default`: Returns an 8-character uppercase alphanumeric serial number prefixed with `SN-`.
 * 
 * @param {string} condition - The condition to determine the type of serial number to generate. 
 *   Valid values are `'empty'`, `'short'`, `'long'`, `'symbols'`, or any other string to return the default format.
 * 
 * @returns {string} - The generated serial number based on the condition.
 *   - `'empty'`: `""`
 *   - `'short'`: A single uppercase alphanumeric character.
 *   - `'long'`: A string with 258 uppercase alphanumeric characters.
 *   - `'symbols'`: A string with 8 uppercase symbols.
 *   - `default`: A string like `"SN-XXXXXXX"`, where `XXXXXXX` is a random 8-character uppercase alphanumeric string.
 */
export function generateSerialNumber(condition): string {

    switch (condition) {

        case 'empty': {
            return '';
        }

        case 'short': {
            return faker.string.alphanumeric(1).toUpperCase();
        }

        case 'long': {
            return faker.string.alphanumeric(258).toUpperCase();
        }

        case 'symbols': {
            return faker.string.symbol(8).toUpperCase();
        }

        default: {
            // Generate 8-character alphanumeric serial number
            const serial = faker.string.alphanumeric(8).toUpperCase();
            return `SN-${serial}`;
        }
    }
};