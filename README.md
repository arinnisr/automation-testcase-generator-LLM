# automation-testcase-generator-LLM

This project is an Express.js application with Selenium integration, developed for study and experimentation purposes.

## Prerequisites
- Node.js and npm installed
- Google Chrome browser installed

## Installation & Setup

1. Install project dependencies:
    ```bash
    npm install
    ```

2. Add your GROQ API key to a `.env` file:
    ```env
    GROQ_API_KEY=your_api_key_here
    ```

3. Specify the model you want to use in the `.env` file:
    ```env
    GROQ_MODEL=your_preferred_model
    ```

4. Install Selenium with the required Chrome driver version:
    ```bash
    npx selenium-standalone install --drivers.chrome.version=139.0.7258.154
    ```

5. Start the application:
    ```bash
    npm start
    ```

6. Open your browser and navigate to:
    ```text
    http://0.0.0.0:3000
    ```

## Notes
- Ensure that your Chrome version matches the driver version (`139.0.7258.154`).
- If you run into driver compatibility issues, update Chrome or adjust the Chrome driver version in the Selenium installation step.

