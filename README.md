# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Prerequisites

Before running the application, ensure you have Node.js and npm (or yarn) installed.

## Environment Setup

This application requires Firebase and Google Gemini API keys to function correctly.

1.  **Create a Firebase Project:**
    If you don't have one already, create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/).

2.  **Get Firebase Configuration:**
    *   In your Firebase project, go to Project settings (click the gear icon).
    *   Under the "General" tab, scroll down to "Your apps".
    *   If you haven't registered an app, click on the Web icon (`</>`) to add a web app.
    *   After registering your app, Firebase will provide a configuration object. It looks like this:
        ```javascript
        const firebaseConfig = {
          apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXX",
          authDomain: "your-project-id.firebaseapp.com",
          projectId: "your-project-id",
          storageBucket: "your-project-id.appspot.com",
          messagingSenderId: "123456789012",
          appId: "1:123456789012:web:abcdef1234567890abcdef"
        };
        ```
    *   You will need these values for the next step.

3.  **Create and Configure `.env.local` file:**
    *   In the root directory of this project, create a file named `.env.local`. If you already have an `.env` file with these variables, ensure they are correct.
    *   Copy the content from the `.env.example` file (or the content below) into `.env.local` and replace the placeholder values with your actual Firebase project credentials and your Google Gemini API key.

    ```env
    # Firebase App configuration - Replace with your project's credentials
    NEXT_PUBLIC_FIREBASE_API_KEY="YOUR_API_KEY"
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
    NEXT_PUBLIC_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
    NEXT_PUBLIC_FIREBASE_APP_ID="YOUR_APP_ID"

    # Google Gemini API Key for Genkit AI features (server-side)
    # Get your key from Google AI Studio: https://aistudio.google.com/
    GOOGLE_API_KEY="YOUR_GEMINI_API_KEY"
    ```

    **IMPORTANT:**
    *   `NEXT_PUBLIC_` prefixed variables are exposed to the browser.
    *   `GOOGLE_API_KEY` is used for server-side Genkit AI features.

4.  **Enable Firebase Authentication:**
    *   In the Firebase console, go to "Authentication" (under Build).
    *   Go to the "Sign-in method" tab.
    *   Enable "Email/Password" as a sign-in provider. You might need to enable other providers if you plan to use them.

5.  **Restart Your Development Server:**
    If your development server was running, you **MUST** restart it for the new environment variables to take effect. Stop the server (Ctrl+C or Cmd+C) and run `npm run dev` again.

    This step is crucial. Next.js loads environment variables at build time and during server startup.

## Running the Development Server

After setting up the environment variables:

```bash
npm install
npm run dev
```

This will start the Next.js development server, usually on `http://localhost:9002`.

## Genkit Development

To run Genkit flows locally for development and testing:

```bash
npm run genkit:dev
```

Or to watch for changes:

```bash
npm run genkit:watch
```
Genkit UI will be available at `http://localhost:4000`.

## Building for Production

```bash
npm run build
npm run start
```

This will build the application for production and start the Next.js production server. Ensure your production environment also has the necessary environment variables set.