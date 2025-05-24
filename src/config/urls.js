const apiUrl = import.meta.env.VITE_API_BASE_URL;
const baseRoute="/api";

const backendHost=apiUrl+baseRoute;

export const USER_LOGIN=backendHost+"/auth/initiate-login";
export const VERIFY_OTP=backendHost+"/auth/verify-otp";
export const GET_ALL_USERS=backendHost+"/users";
export const REGISTER_USER_BY_ADMIN=backendHost+"/users/registerByAdmin";
export const GET_USER_BY_ROLE=backendHost+"/users/by-role";
export const GET_ALL_EVENTS=backendHost+"/events/all";
export const ADD_EVENT=backendHost+"/events";
export const UPDATE_EVENT=backendHost+"/events";
export const DELETE_EVENT=backendHost+"/events";