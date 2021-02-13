const BASE_URL = 'https://edu-hospice-api.herokuapp.com/api';

export const GLOBALS = {
  DATA_URL: {
    LOGIN: `${BASE_URL}/auth/login`,
    LOGOUT: `${BASE_URL}/auth/logout`,
    USER_DETAILS: `${BASE_URL}/users/current-user`,
    SEND_EMAIL_FOR_RECOVER_PASSWORD: `${BASE_URL}/auth/send-reset-password-link`,
    RESET_PASSWORD: `${BASE_URL}/auth/reset-password`,
    USER_LIST_WAITING_FOR_REGISTRATION: `${BASE_URL}/admin/users/courses/registration-pending`,
    USER_LIST_WAITING_FOR_PAYMENT: `${BASE_URL}/admin/users/courses/payment-pending`,
    USER_LIST: `${BASE_URL}/admin/users/courses`
  },
  NOTIFICATIONS: {
    WARNING: 'WARNING',
    ERROR: 'ERROR',
    INFO: 'INFO',
    DURATION_IN_SECONDS: 10
  }
};
