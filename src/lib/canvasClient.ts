import { CanvasClient } from '@uniformdev/canvas';

export const canvasClient = new CanvasClient({
  apiKey: process.env.UNIFORM_API_KEY,
  apiHost: process.env.UNIFORM_CLI_BASE_URL || 'https://uniform.app',
  projectId: process.env.UNIFORM_PROJECT_ID,
});
