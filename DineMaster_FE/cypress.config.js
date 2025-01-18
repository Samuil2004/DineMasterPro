import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || "http://localhost:5173", // Default URL for tests
    setupNodeEvents(on, config) {
      // Implement node event listeners here
    },
    video: true, // Enable video recording
  },
});
