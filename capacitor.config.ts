import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.myexpenses.app',
  appName: 'myexpense',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      lSplashScreen: {
        launchShowDuration: 3000,          // Duration in ms (e.g. 3000 = 3 seconds)
        launchAutoHide: true,              // Hide automatically after duration
        showSpinner: false,                // Optional: show/hide spinner
        backgroundColor: "#264653",        // Background color (HEX format)
        androidScaleType: "CENTER_CROP",   // Options: FIT_CENTER, CENTER_CROP, etc.
        splashFullScreen: false,           // Full screen or not
        splashImmersive: false             // Hide system UI (e.g. nav/status bar)
      }
    }
  }
};

export default config;
