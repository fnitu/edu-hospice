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
    RECOVER_PASSWORD_ENTER_EMAIL: 'recover-password-enter-email',
    RECOVER_OR_CHANGE_PASSWORD: 'recover-or-change-password',
  },
  ADMIN: {
    MAIN_ROUTE: 'admin',
    DASHBOARD: 'dashboard',
    COURSE_LIST: 'course-list',
    COURSE: {
      CREATE: 'course-list/new',
      LIST: 'course-list',
    },
    USERS: 'users',
    QUIZ: {
      NEW: 'new-quiz',
      LIST: 'quiz-list',
    },
  },
};
