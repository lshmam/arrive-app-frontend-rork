# How to Share Your Expo App with Clients

You can share your app using **Expo Go** in two main ways. 

## Option 1: Development Tunnel (Quickest)
This creates a temporary link. Your computer must remain **on** and the server **running** for the link to work.

1.  **Start the tunnel:**
    ```bash
    npx expo start --tunnel
    ```
2.  **Share:**
    - Copy the `exp://...` link shown in the terminal.
    - Share it with your clients.
    - They can click it (Android) or scan the QR code (iOS) using the **Expo Go** app.

> **Note:** Since you have `@expo/ngrok` installed, this should work immediately.

## Option 2: EAS Update (Persistent)
This creates a link that works even when your computer is off.

### 1. View Your Latest Update
**[Click here to view your app on Expo Dashboard](https://expo.dev/projects/77aab01f-b03e-405f-b1a1-5618b78c8692/updates)**

- Click on the latest update in the list.
- You will see a **QR Code** and an **"Open in Expo Go"** button.
- Share this URL with your clients.

### 2. How to Publish Changes
When you make changes to your code, run this command to update the live link:

```bash
eas update --branch preview --message "Your message here" --platform android --platform ios
```
*Note: We suggest using `--platform android --platform ios` to avoid errors with the web version specific to this project.*

### Important for iOS Users
On iOS, clicking an `exp://` link directly might not always work from some apps (like Slack/Messenger) due to deep linking restrictions.
- **Best Practice:** Send them the **QR Code** image (screenshot it).
- Tell them to open the **System Camera** app to scan it, which prompts to open Expo Go.
