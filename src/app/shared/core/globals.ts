const BASE_URL = 'https://edu-hospice-api.herokuapp.com/api';

export const GLOBALS = {
  DATA_URL: {
    LOGIN: `${BASE_URL}/auth/login`,
    LOGOUT: `${BASE_URL}/auth/logout`,
    CURRENT_USER: `${BASE_URL}/users/current-user`,
    SEND_EMAIL_FOR_RECOVER_PASSWORD: `${BASE_URL}/auth/send-reset-password-link`,
    RESET_PASSWORD: `${BASE_URL}/auth/reset-password`,
  },
  NOTIFICATIONS: {
    WARNING: 'WARNING',
    ERROR: 'ERROR',
    INFO: 'INFO',
    DURATION_IN_SECONDS: 10,
  },
};

export const USER_DETAILS = (id: number) => `${BASE_URL}/users/${id}/details`;
