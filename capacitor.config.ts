import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.maintenance',
  appName: 'maintenanceApp',
  webDir: 'www/browser/browser', // 👈 MUST match your build output
  bundledWebRuntime: false
};

export default config;

