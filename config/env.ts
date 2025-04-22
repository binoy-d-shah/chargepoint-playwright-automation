/**
 * Reads the API and UI base URLs from environment variables.
 * If not set, defaults to the local URLs for development.
 */
export const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3001";
export const UI_BASE_URL = process.env.UI_BASE_URL || "http://localhost:3000";