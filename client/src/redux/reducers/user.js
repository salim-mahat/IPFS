import {
  SET_CURRENT_METAMASK_ID,
  SET_USER,
  SET_USERS_METAMASK_IDS,
} from "../actions/user";

const initialState = { isLoaded: false, user: null, isLoggedIn: false };

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      if (action.payload.user) {
        return {
          isLoaded: true,
          user: action.payload.user,
          isLoggedIn: true,
        };
      }
      return {
        isLoaded: true,
        user: null,
        isLoggedIn: false,
      };

    case SET_USERS_METAMASK_IDS:
      return {
        ...state,
        user: {
          ...state.user,
          metamaskAccounts: action.payload,
        },
      };

    case SET_CURRENT_METAMASK_ID:
      return {
        ...state,
        user: {
          ...state.user,
          currentMetaMaskId: action.payload,
        },
      };

    default:
      return state;
  }
};

export default userReducer;
