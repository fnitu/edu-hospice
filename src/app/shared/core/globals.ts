import {B} from '@angular/cdk/keycodes';

export const BASE_URL = 'https://edu-hospice-api.herokuapp.com';

export const GLOBALS = {
  DATA_URL: {
    LOGIN: `${BASE_URL}/api/auth/login`,
    LOGOUT: `${BASE_URL}/api/auth/logout`,
    CURRENT_USER: `${BASE_URL}/api/users/current-user`,
    SEND_EMAIL_FOR_RECOVER_PASSWORD: `${BASE_URL}/api/auth/send-reset-password-link`,
    RESET_PASSWORD: `${BASE_URL}/api/auth/reset-password`,
    USER_LIST_WAITING_FOR_REGISTRATION: `${BASE_URL}/api/admin/users/courses/registration-pending`,
    USER_LIST_WAITING_FOR_PAYMENT: `${BASE_URL}/api/admin/users/courses/payment-pending`,
    USER_LIST: `${BASE_URL}/api/admin/users/courses`,
    COURSES_TABS: `${BASE_URL}/api/users/{userId}/courses/tabs`,
    DEFAULT_COURSE_IMG: `https://www.hospice.ro/wp-content/themes/hospice/img/social-default.jpg`,
    USER_DETAILS_URL: `${BASE_URL}/api/users/{id}/details`
  },
  NOTIFICATIONS: {
    WARNING: 'WARNING',
    ERROR: 'ERROR',
    INFO: 'INFO',
    DURATION_IN_SECONDS: 10
  }
};
