import { defineConfig } from '@trigger.dev/sdk/v3';
import { TRIGGER_PROJECT_ID } from './config';

export default defineConfig({
  project: TRIGGER_PROJECT_ID,
  runtime: 'node',
  logLevel: 'info',
  maxDuration: 120,
  retries: {
    enabledInDev: true,
    default: {
      maxAttempts: 3,
      minTimeoutInMs: 1000,
      maxTimeoutInMs: 10000,
      factor: 2,
      randomize: true,
    },
  },
  dirs: ['./trigger'],
});
