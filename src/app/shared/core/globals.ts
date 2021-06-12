import { environment } from '../../../environments/environment';

export const GLOBALS = {
  DATA_URL: {
    LOGIN: `${environment.BASE_URL}/api/auth/login`,
    LOGOUT: `${environment.BASE_URL}/api/auth/logout`,
    REGISTER: `${environment.BASE_URL}/api/auth/register`,
    CURRENT_USER: `${environment.BASE_URL}/api/users/current-user`,
    SEND_EMAIL_FOR_RECOVER_PASSWORD: `${environment.BASE_URL}/api/auth/send-reset-password-link`,
    RESET_PASSWORD: `${environment.BASE_URL}/api/auth/reset-password`,
    USER_LIST_WAITING_FOR_REGISTRATION: `${environment.BASE_URL}/api/admin/users/courses/registration-pending`,
    USER_LIST_WAITING_FOR_PAYMENT: `${environment.BASE_URL}/api/admin/users/courses/payment-pending`,
    USER_LIST: `${environment.BASE_URL}/api/admin/users/courses/stats`,
    COURSES_TABS: `${environment.BASE_URL}/api/users/{userId}/courses/tabs`,
    USER_DETAILS: `${environment.BASE_URL}/api/users/{id}/details`,
    COURSES: `${environment.BASE_URL}/api/courses`,
    ADMIN_COURSES: `${environment.BASE_URL}/api/admin/courses`,
    DELETE_COURSE: `${environment.BASE_URL}/api/admin/courses/{courseId}`,
    GET_ADMIN_COURSE_INFO: `${environment.BASE_URL}/api/admin/courses/{id}`,
    ADMIN_COURSE_SECTIONS: `${environment.BASE_URL}/api/admin/courses/{courseId}/sections-details`,
    ADMIN_DASHBOARD_STATS: `${environment.BASE_URL}/api/admin/dashboard/stats`,
    COURSE_DETAILS: `${environment.BASE_URL}/api/users/{userId}/courses/{courseId}`,
    APPROVE_COURSE: `${environment.BASE_URL}/api/admin/users/{userId}/courses/{courseId}/approve`,
    REJECT_COURSE_REGISTRATION: `${environment.BASE_URL}/api/admin/users/{userId}/courses/{courseId}/reject-registration`,
    REJECT_COURSE_REGISTRATION_PAYMENT: `${environment.BASE_URL}/api/admin/users/{userId}/courses/{courseId}/reject-payment`,
    REGISTER_COURSES: `${environment.BASE_URL}/api/users/{userId}/courses/{courseId}/register`,
    GET_QUIZ_SETTINGS: `${environment.BASE_URL}/api/admin/quizzes/{quizId}`,
    SAVE_QUIZ_SETTINGS: `${environment.BASE_URL}/api/admin/quizzes`,
    UPDATE_EXISTING_QUIZ_SETTINGS: `${environment.BASE_URL}/api/admin/quizzes/{quizId}/update`,
    ADD_QUIZ_QUESTION: `${environment.BASE_URL}/api/admin/quizzes/{quizId}/questions`,
    SAVE_QUIZ_QUESTION: `${environment.BASE_URL}/api/admin/quizzes/questions/{questionId}/update`,
    DELETE_QUIZ_QUESTION: `${environment.BASE_URL}/api/admin/quizzes/questions/{questionId}/delete
    `,
    GET_QUIZ_QUESTIONS: `${environment.BASE_URL}/api/admin/quizzes/{quizId}/questions/details`,
    GET_COURSE_INFO: `${environment.BASE_URL}/api/courses/{id}`,
    CREATE_SECTION: `${environment.BASE_URL}/api/admin/courses/{courseId}/sections`,
    UPDATE_SECTION_NAME: `${environment.BASE_URL}/api/admin/courses/sections/{sectionId}/update`,
    CREATE_SECTION_CONTENT: `${environment.BASE_URL}/api/admin/courses/sections/{sectionId}/contents`,
    UPDATE_SECTION_CONTENT: `${environment.BASE_URL}/api/admin/courses/sections/contents/{contentId}/update`,
    UPDATE_SECTION_CONTENT_NAME: `${environment.BASE_URL}/api/admin/courses/sections/contents/{contentId}/update-name`,
    CREATE_SECTION_CONTENT_RESOURCES: `${environment.BASE_URL}/api/admin/courses/sections/contents/{contentId}/resources`,
    DELETE_SECTION_CONTENT_RESOURCES: `${environment.BASE_URL}/api/admin/courses/sections/contents/resources/{resourceId}/delete`,
    ACTION_LIST_WAITING_FOR_REGISTRATION: `./assets/json/registration.json`,
    ACTION_LIST_WAITING_FOR_PAYMENT: `./assets/json/payment.json`,
  },
  DEFAULT_COURSE_IMG: `https://www.hospice.ro/wp-content/themes/hospice/img/social-default.jpg`,
  NOTIFICATIONS: {
    WARNING: 'WARNING',
    ERROR: 'ERROR',
    INFO: 'INFO',
    DURATION_IN_SECONDS: 10,
  },
  ROLES: {
    ADMIN: 'ROLE_ADMIN',
    USER: 'ROLE_USER',
  },
  TEXTAREA: {
    MAX_ROWS: 5,
    MIN_ROWS: 2,
  },
};
