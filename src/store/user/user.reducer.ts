import { AnyAction } from "redux";
import { UserData } from "./../../utils/firebase/firebase.utils";
import {
  signInFailed,
  signInSuccess,
  signOutFailed,
  signOutSuccess,
  signUpFailed,
} from "./user.action";
import { USER_ACTION_TYPES } from "./user.types";

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
};

const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userReducer = (state = INITIAL_STATE, action: AnyAction) => {
  // without useReducer hooks, we give the initial velue in argument

  if (signInSuccess.match(action)) {
    return { currentUser: action.payload };
  }
  if (signOutSuccess.match(action)) {
    return { ...state, currentUser: null };
  }
  if (
    signInFailed.match(action) ||
    signUpFailed.match(action) ||
    signOutFailed.match(action)
  ) {
    return { ...state, error: action.payload };
  }

  return state;
  // switch (type) {
  //   case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
  //     return {
  //       currentUser: payload,
  //     };

  //   case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
  //     return { ...state, currentUser: null };

  //   case USER_ACTION_TYPES.SIGN_IN_FAILED:
  //   case USER_ACTION_TYPES.SIGN_UP_FAILED:
  //   case USER_ACTION_TYPES.SIGN_OUT_FAILED:
  //     return { ...state, error: payload };

  //   default:
  //     return state; // Return current state, we may get the type not belongs to this reducer, so just return the current state, and the React knows that this doesn't need to be rerender.
  // }
};
