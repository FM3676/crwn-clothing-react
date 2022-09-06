export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

const INITIAL_STATE = {
  currentUser: null,
};

export const userReducer = (state = INITIAL_STATE, action) => {
  // without useReducer hooks, we give the initial velue in argument
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        currentUser: payload,
      };
    default:
      return state; // Return current state, we may get the type not belongs to this reducer, so just return the current state, and the React knows that this doesn't need to be rerender.
  }
};
