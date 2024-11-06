const buildEnvVars = {
  API_KEY: process.env.VITE_API_KEY,
  AUTH_DOMAIN: process.env.VITE_AUTH_DOMAIN,
  NODE_ENV: process.env.VITE_NODE_ENV,
  PROJECT_ID: process.env.VITE_PROJECT_ID,
  STORAGE_BACKET: process.env.VITE_STORAGE_BACKET,
  MESS_SEND_ID: process.env.VITE_MESS_SEND_ID,
  APP_ID: process.env.VITE_APP_ID,
  MEASUR_ID: process.env.VITE_MEASUR_ID,
};

export const getBuildEnvVar = (envName: keyof typeof buildEnvVars): string => {
  return buildEnvVars[envName] as string;
};
