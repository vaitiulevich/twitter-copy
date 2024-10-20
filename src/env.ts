const buildEnvVars = {
  API_KEY: import.meta.env.VITE_API_KEY,
  AUTH_DOMAIN: import.meta.env.VITE_AUTH_DOMAIN,
  NODE_ENV: import.meta.env.VITE_NODE_ENV,
  PROJECT_ID: import.meta.env.VITE_PROJECT_ID,
  STORAGE_BACKET: import.meta.env.VITE_STORAGE_BACKET,
  MESS_SEND_ID: import.meta.env.VITE_MESS_SEND_ID,
  APP_ID: import.meta.env.VITE_APP_ID,
  MEASUR_ID: import.meta.env.VITE_MEASUR_ID,
};

export const getBuildEnvVar = (envName: keyof typeof buildEnvVars): string => {
  return buildEnvVars[envName] as string;
};
