import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.funo.funo',
  appName: 'Funo',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
