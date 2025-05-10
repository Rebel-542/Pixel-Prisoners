
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Check if the essential API key is provided
if (!firebaseConfig.apiKey || firebaseConfig.apiKey === "YOUR_API_KEY") {
  console.error(
    `
====================================================================================================
Firebase Initialization Error: NEXT_PUBLIC_FIREBASE_API_KEY is missing, invalid, or still a placeholder.
----------------------------------------------------------------------------------------------------
The application received an 'auth/invalid-api-key' error from Firebase,
or the API key in your environment variables is still the placeholder "YOUR_API_KEY".

Please check the following:
1. Environment File: Ensure you have a .env.local file in the root of your project.
   If you only have a .env file, ensure it's correctly formatted and contains the necessary Firebase variables.
2. API Key Variable: Inside this file, make sure NEXT_PUBLIC_FIREBASE_API_KEY is set to your *actual* Firebase API key.
   Example: NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCXXXXXXXXXXXXXXXXXXXXXXX (This is just an example format)
   Ensure all NEXT_PUBLIC_FIREBASE_* variables are correctly set.
3. Placeholder Values: Double-check that you have replaced "YOUR_API_KEY" and other "YOUR_..." placeholders with your actual credentials.
4. Restart Server: If you've recently added or changed these variables, you MUST restart your Next.js development server.
   Stop the server (Ctrl+C or Cmd+C) and run 'npm run dev' (or your usual dev script) again.
5. Correct Value: Verify that the API key value itself is correct and doesn't contain typos.
   You can get your API key from your Firebase project settings on the Firebase console.

The application will not function correctly with Firebase services until this is resolved.
Firebase will attempt to initialize, but operations requiring authentication or other Firebase services will fail.
Refer to the README.md for detailed setup instructions.
====================================================================================================
`
  );
}


// Initialize Firebase
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth: Auth = getAuth(app);

export { app, auth };

