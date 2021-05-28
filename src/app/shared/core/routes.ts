export const ROUTES = {
  USER: {
    MAIN_ROUTE: 'user',
    DASHBOARD: 'dashboard',
    COURSE: 'course/course',
  },
  PREVIEW: {
    MAIN_ROUTE: 'preview',
    HOME: 'home',
    LOGIN: 'login',
    REGISTER: 'register',
    RECOVER_PASSWORD_ENTER_EMAIL: 'recover-password-enter-email',
    RECOVER_OR_CHANGE_PASSWORD: 'recover-or-change-password',
  },
  ADMIN: {
    MAIN_ROUTE: 'admin',
    DASHBOARD: 'dashboard',
    COURSE_LIST: 'course-list',
    COURSE: {
      CREATE: 'course-list/course',
      LIST: 'course-list',
      EDIT_COURSE: 'course-list/course',
    },
    USERS: 'users',
    QUIZ: {
      NEW: 'quiz-list/quiz',
      LIST: 'quiz-list',
    },
  },
};
