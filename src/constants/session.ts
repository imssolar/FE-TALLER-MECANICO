export const SESSION_CONFIG = {
  TOKEN_DURATION: 900,
  WARNING_BEFORE: 60,
  WARNING_TIME: 840,
} as const;

export const STORAGE_KEYS = {
  TOKEN: "token",
  USER_NAME: "userName",
  SESSION_START: "sessionStartTime",
} as const;
