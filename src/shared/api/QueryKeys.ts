const QUERYKEYS = {
  AUTH: {
    LOGIN: ["useLogin"],
    LOGOUT: ["useLogout"],
    REGISTER: ["useRegistration"],
    REFRESH: ["useRefreshToken"],
  },
  USER: {
    ME: ["useMe"],
  },
  CATEGORIES: {
    ALL: ["useCategories"],
  },
  LEAVE_REQUESTS: {
    STATS: ["useRequestStats"],
    DETAIL: ["useLeaveRequest"],
    ALL: ["useLeaveRequests"],
    CREATE: ["useCreateLeaveRequest"],
    UPDATE: ["useUpdateLeaveRequest"],
    DELETE: ["useDeleteLeaveRequest"],
    ACTION: ["useActionLeaveRequests"],
  },
} as const;

export default QUERYKEYS;