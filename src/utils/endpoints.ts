const LOGIN: string = "users/login";

const REGISTER: string = "users/signup";

const GET_CHECK_IN_DATA = "checkin/details";

const GET_DASHBOARD_DATA = "dashboard/details";

const FORGET_PASSWORD_REQUEST_OTP = "users/request-otp";

const RESET_NEW_PASSWORD = "users/set-new-password";

const OTP_VERIFY = "users/verify-otp";

const Post_Check_IN_DATA = "checkin/add-remove-checkin";

const Book_Coaching_Session = "sessions/book-coaching-session";

const Post_Referal_Data = "referals/create";

const Post_Support_Data = "support/create";


export {
  LOGIN,
  REGISTER,
  FORGET_PASSWORD_REQUEST_OTP,
  RESET_NEW_PASSWORD,
  OTP_VERIFY,
  GET_DASHBOARD_DATA,
  GET_CHECK_IN_DATA,
  Post_Check_IN_DATA,
  Book_Coaching_Session,
  Post_Referal_Data,
  Post_Support_Data,
};

const endpoints = {
  LOGIN: "users/login",
  REGISTER: "users/signup",
  FORGET_PASSWORD_REQUEST_OTP: "users/request-otp",
  RESET_NEW_PASSWORD: "users/set-new-password",
  GET_DASHBOARD_DATA: "dashboard/details",
  GET_CHECK_IN_DATA: "checkin/details",
  OTP_VERIFY: "users/verify-otp",
  POST_CHECK_IN_DATA: "checkin/add-remove-checkin",
  BOOK_COACHING_SESSION: "sessions/book-coaching-session",
  POST_REFERAL_DATA: "referals/create",
  POST_SUPPORT_DATA: "support/create",
};

export default endpoints;


