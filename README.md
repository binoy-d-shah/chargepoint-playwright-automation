# chargepoint-playwright-automation
Playwright automation suite for testing the Charge Point Installation App. Covers both the Web UI and REST API to validate scenarios like adding, listing, and removing charge points using serial numbers.

This project contains automated test suites for UI, API, and integrated UI + API testing of the [Magento Demo Store](https://magento.softwaretestingboard.com/).

The project is implemented using [Playwright](https://playwright.dev/) with **TypeScript** to provide robust and reliable end-to-end testing coverage.

---

## 📁 Repository Structure

```
magento-automation/
├── tests/ui            # Charge Point UI tests
├── tests/api           # API tests using Playwright request context
├── tests/api-ui-combio # Hybrid tests combining UI and API steps
├── utils/              # Reusable functions and helpers
├── config/env.ts       # Static test data and payloads
├── playwright.config.ts
└── README.md
```

---

## 🚀 Tech Stack

- [Playwright](https://playwright.dev/)
- TypeScript
- Faker.js (`@faker-js/faker`) for generating random test data

---

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/binoy-d-shah/chargepoint-playwright-automation.git
cd chargepoint-playwright-automation

# Install dependencies
npm install
```

---

## ▶️ Running Tests

### Run All UI Tests

```bash
npx playwright test tests/ui
```

### Run All API Tests

```bash
npx playwright test tests/api
```

### Run Combined UI + API Tests

```bash
npx playwright test tests/api-ui-combo
```

### Run Tests in Parallel

```bash
npx playwright test --workers=4
```

---

## 📊 Reporting

After tests complete, an HTML report is generated:

```bash
npx playwright show-report
```

---

## 📌 Notes

- All test data is generated dynamically using `@faker-js/faker`
- Page Object Model and reusable helper functions are used for clean code architecture
- Tests are optimized for parallel execution

---

## 🔐 Environment Variables

This project uses a `.env` file to manage configurable values such as base URLs, credentials, and tokens securely.

### Example `.env` file:

```env
API_BASE_URL=http://localhost:3001
UI_BASE_URL=http://localhost:3000
```

### 📦 How to Use

- Create a `.env` file in the project root.
- Variables from `.env` will be automatically loaded at runtime using `dotenv`.

### 🌐 Passing Environment Variables from CLI

You can override any variable from the command line when running tests:

```bash
API_BASE_URL=https://staging.example.com npx playwright test
```

This allows you to switch environments or credentials dynamically without modifying the code.

---

## 👤 Author

**Binoy Shah**  
[GitHub](https://github.com/binoy-d-shah)

---

Happy Testing! 🧪✨
