# Association App

Application for my Cryptography course. Simple associations app made in Expo for mobile devices.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npm run start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Building the App locally

1. Login to EAS 

   ```bash
   eas login
   ```

2. Run the follwing command

   ```bash
   eas build --platform android --profile preview --local
   ```

Output of this command will create a .apk file on the root of the project

