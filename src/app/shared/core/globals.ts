import { environment } from "../../../environments/environment";

export const GLOBALS = {
    DATA_URL: {
        LOGIN: `${environment.BASE_URL}/api/auth/login`,
        LOGOUT: `${environment.BASE_URL}/api/auth/logout`,
        CURRENT_USER: `${environment.BASE_URL}/api/users/current-user`,
        SEND_EMAIL_FOR_RECOVER_PASSWORD: `${environment.BASE_URL}/api/auth/send-reset-password-link`,
        RESET_PASSWORD: `${environment.BASE_URL}/api/auth/reset-password`,
        USER_LIST_WAITING_FOR_REGISTRATION: `${environment.BASE_URL}/api/admin/users/courses/registration-pending`,
        USER_LIST_WAITING_FOR_PAYMENT: `${environment.BASE_URL}/api/admin/users/courses/payment-pending`,
        USER_LIST: `${environment.BASE_URL}/api/admin/users/courses`,
        COURSES_TABS: `${environment.BASE_URL}/api/users/{userId}/courses/tabs`,
        USER_DETAILS: `${environment.BASE_URL}/api/users/{id}/details`,
        COURSES: `${environment.BASE_URL}/api/courses`
    },
    DEFAULT_COURSE_IMG: `https://www.hospice.ro/wp-content/themes/hospice/img/social-default.jpg`,
    NOTIFICATIONS: {
        WARNING: 'WARNING',
        ERROR: 'ERROR',
        INFO: 'INFO',
        DURATION_IN_SECONDS: 10
    }
};
