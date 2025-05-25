const apiUrl = import.meta.env.VITE_API_BASE_URL;
const baseRoute="/api";

const backendHost=apiUrl+baseRoute;

export const USER_LOGIN=backendHost+"/auth/initiate-login";
export const VERIFY_OTP=backendHost+"/auth/verify-otp";
export const GET_ALL_USERS=backendHost+"/users";
export const REGISTER_USER=backendHost+"/users/register";
export const REGISTER_USER_BY_ADMIN=backendHost+"/users/registerByAdmin";
export const GET_USER_BY_ROLE=backendHost+"/users/by-role";
export const GET_ALL_EVENTS_BY_FILTER=backendHost+"/events";
export const GET_ALL_EVENTS=backendHost+"/events/all";
export const EVENT_DETAIL=backendHost+"/events/search";
export const ADD_EVENT=backendHost+"/events";
export const UPDATE_EVENT=backendHost+"/events";
export const DELETE_EVENT=backendHost+"/events";
export const UPCOMMING_EVENTS=backendHost+"/events/upcoming";
export const GET_ATTENDANCE_OF_THE_EVENT=backendHost+"/attendance/events";
export const PUT_ATTENDANCE_OF_THE_EVENT=backendHost+"/attendance/events";
export const GET_PROFILE_DETAILS=backendHost+"/users/me";
export const GET_ATTENDANCE_OF_MY_EVENTS=backendHost+"/attendance/myevents";
export const GET_MY_HOSTING_EVENTS=backendHost+"/events/myhosting";