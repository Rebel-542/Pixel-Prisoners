# **App Name**: Guardian Angel

## Core Features:

- Trusted Contacts: Allow users to add trusted contacts by name and phone number.
- Real-Time Location Sharing: Real-time location sharing with selected trusted contacts. The user will choose a predefined duration, or share indefinitely until canceled manually. Contacts will be notified immediately once sharing starts and the service will stop automatically after the set duration, or upon manual cancelation.
- SOS Alert: Ability to send an immediate SOS signal to all trusted contacts with current location if the user feels threatened. App will generate and SMS message including a map URL link to their location.
- Safe Route Suggestion: Implement an AI powered "Safe Route Suggestion Tool", where the LLM suggests well-lit, populated routes using open source map APIs (ex: Google Maps, Mapbox). App presents route choice as overlay to the map, allowing users to visualize suggested route.
- Panic Shake Activation: If user shakes the phone hard (e.g., 3 times), automatically trigger SOS even without unlocking the phone.
- Secret Voice Recording on SOS: Once SOS is triggered, start recording voice silently and upload to Firebase for evidence.
- Silent Photo Capture: When SOS is triggered, take a background photo from front/rear camera without flash for extra evidence.
- Fake Call / Emergency Call: App can simulate an incoming call to help the user escape uncomfortable situations.

## Style Guidelines:

- Primary color: Calm blue (#4285F4) for trust and security.
- Secondary color: Soft gray (#E0E0E0) for neutral backgrounds.
- Accent color: Alert orange (#FF5722) for the SOS button.
- Clear and readable sans-serif fonts for easy information access.
- Simple, recognizable icons for navigation and features.
- Clean, intuitive layout for quick access to essential functions.
- Subtle animations to guide the user and provide feedback.