# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Copy and configure environment variables**

   - Tạo file `.env` ở thư mục gốc nếu dự án có sử dụng biến môi trường (xem ví dụ `.env.example` nếu có).
   - Đảm bảo bạn đã cấu hình Firebase (file `firebase/config.ts`) với thông tin dự án của bạn.

3. **Start the app**

   ```bash
   npx expo start
   ```

   Trong output, bạn sẽ thấy các lựa chọn để mở app trên:

   - [development build](https://docs.expo.dev/develop/development-builds/introduction/)
   - [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
   - [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
   - [Expo Go](https://expo.dev/go) (một số tính năng native có thể không hoạt động trên Expo Go)

4. **Build app (tùy chọn)**

   Để build app cho thiết bị thật hoặc xuất bản, dùng [EAS Build](https://docs.expo.dev/build/introduction/):

   ```bash
   npx expo install eas-cli
   npx eas build
   ```

   > Đảm bảo bạn đã đăng nhập tài khoản Expo và cấu hình `eas.json` nếu cần.

5. **Cấu hình bổ sung**

   - **Firebase:** Đảm bảo đã cấu hình đúng file `firebase/config.ts` với thông tin dự án Firebase của bạn.
   - **Push Notification:** Nếu dùng notification, hãy cấp quyền notification trên thiết bị hoặc máy ảo.
   - **Tamagui:** Đã cấu hình `tamagui.config.ts` và bọc app với `TamaguiProvider` trong `_layout.tsx`.

## Get a fresh project

Khi bạn muốn bắt đầu lại từ đầu:

```bash
npm run reset-project
```

Lệnh này sẽ di chuyển starter code vào thư mục **app-example** và tạo thư mục **app** trống để bạn phát triển.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
