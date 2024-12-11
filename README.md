# Rnative

React Native application designed as part of a crash course on building responsive user interfaces and experiences.
The app was created following [Adrian Hajdin's crash course](https://www.youtube.com/watch?v=ZBCUegTZF7M)
and inspired by the corresponding [GitHub repository](https://github.com/adrianhajdin/aora).

## Technologies Used

- **Frontend Framework**: React Native
- **Styling**: NativeWind/Tailwind
- **Database**: Appwrite

## Getting started

### Prerequisites

Ensure you have the following installed on your development environment:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- npm or yarn package manager
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AshitomW/RNative.git
   ```

2. Navigate to the project directory:

   ```bash
   cd
   ```

3. Install dependencies:

   ```bash
   npm install

   ```

4. Create config.json for appwrite configuration in lib/

```
{
  "endpoint": "",
  "platform": "",
  "projectId": "",
  "databaseId": "",
  "userCollectionId": "",
  "videosCollectionId": "",
  "storageId": ""
}

```

### Running Application

Start the development server using Expo:

```bash
expo start
```

This will launch the Expo Developer Tools in your browser. Use a physical device or an emulator to run the application:

- **On a Physical Device**: Install the Expo Go app from the App Store (iOS) or Google Play Store (Android). Scan the QR code shown in Expo Developer Tools to run the app.
- **On an Emulator**: Follow the instructions in Expo Developer Tools to set up an iOS simulator or Android emulator.

## Acknowledgements

- Special thanks to [Adrian Hajdin](https://github.com/adrianhajdin) for the tutorial and resources.
