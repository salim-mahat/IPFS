import axios from "axios";
import { setToken } from "../../utils/token";

export const SET_USER = "SET_USER";
export const SET_CURRENT_METAMASK_ID = "SET_CURRENT_METAMASK_ID";
export const SET_USERS_METAMASK_IDS = "SET_USERS_METAMASK_IDS";

export const loginUser = (user) => (dispatch) => {
  axios.post("/api/user/login", user).then((res) => {
    if (res.data.status === "success") {
      setToken(res.data.token);
      dispatch({
        type: SET_USER,
        payload: { user: res.data.user },
      });
    }
  });
};

export const setCurrentMetaMaskId = (id) => ({
  type: SET_CURRENT_METAMASK_ID,
  payload: id,
});

export const setUsersMetaMaskIds = (newAccounts) => ({
  type: SET_USERS_METAMASK_IDS,
  payload: newAccounts,
});

export const setUser = (user) => ({
  type: SET_USER,
  payload: { user },
});
