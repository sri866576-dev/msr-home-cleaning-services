# MSR Deep Cleaning Services - Android App Build Guide

This project includes a fully configured Android WebView project inside the `android-app/` folder. This guide details how to build, customize, and deploy your custom Android app (.apk) file.

---

## Technical Features of the Android App

- **Ultra Lightweight:** Compiled APK size is less than 2 MB.
- **Swipe to Refresh:** Users can pull down from the top to refresh the page.
- **Horizontal Progress Bar:** A smooth loading bar indicates page load progress at the top.
- **Safe Deep-Linking / External URLs:** Prevents WebView crashes by redirecting phone calls (`tel:`), emails (`mailto:`), and WhatsApp chats (`wa.me`) directly to the native Android applications.
- **Always Up-to-Date:** The APK acts as a portal directly to your production site, meaning any text changes, pricing updates, or service changes you deploy to the website are instantly visible in the app without requiring an APK update.

---

## Compilation Steps (using Android Studio)

### Prerequisite
Download and install [Android Studio](https://developer.android.com/studio) (Giraffe or newer).

### Step 1: Open the Project
1. Open Android Studio.
2. Select **File > Open** (or **Open an Existing Project** from the Welcome screen).
3. Navigate to this project folder, select the `android-app` folder, and click **OK**.
4. Wait for Gradle to download dependencies and sync the project (this might take a couple of minutes on first load).

### Step 2: Configure the URL (Optional)
If your production website URL changes:
1. Open `app/src/main/java/com/msr/homecleaning/MainActivity.java`.
2. Locate line 15:
   ```java
   private static final String APP_URL = "https://msr-home-cleaning.pages.dev";
   ```
3. Replace `"https://msr-home-cleaning.pages.dev"` with your new custom domain (e.g. `"https://msrdeepcleaning.com"`).
4. Update the `<data android:host="..." />` inside `app/src/main/AndroidManifest.xml` if you want deep-linking to open link URLs in the app automatically.

### Step 3: Customize App Icon and Brand Color (Optional)
- **App Name:** Open `app/src/main/res/values/strings.xml` and modify the `<string name="app_name">MSR Deep Cleaning</string>` tag.
- **Brand Colors:** Open `app/src/main/res/values/colors.xml` and modify the hex values for `primary` and `primary_dark`.
- **App Icon:** Right-click the `app` module folder in the project sidebar and select **New > Image Asset**. Use the asset studio to load your logo file (`logoofmsr.png`) and generate launcher icons.

### Step 4: Build & Export the APK
#### For Testing/Development:
1. Go to **Build > Build Bundle(s) / APK(s) > Build APK(s)** in the top menu bar.
2. Once the build finishes, a notification will appear. Click **locate** to find the `app-debug.apk` file.

#### For Production Release:
1. Go to **Build > Generate Signed Bundle / APK...**.
2. Select **APK** and click **Next**.
3. Create a new Keystore path (save the password somewhere secure) or select your existing key.
4. Set the Build Type to **release** and click **Create**.
5. Once complete, locate the `app-release.apk` file.

---

## Step 5: Hosting the APK on the Website
Once you have generated your production APK (`app-release.apk`):
1. Rename the file to `msr-home-cleaning.apk`.
2. Move it to the `public/` directory of this web project, overwriting the placeholder file:
   `public/msr-home-cleaning.apk`
3. Commit and deploy the web project.
4. Users visiting your website can now download and install the real Android app immediately!
