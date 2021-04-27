import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";

import { setUser } from "../redux/actions/user";
import { removeToken, getToken } from "../utils/token";

export default function UserResolver(props) {
  const userData = useSelector((s) => s.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getToken();
    if (token) {
      Axios.get("/api/user/current", {
        headers: {
          authorization: token,
        },
      })
        .then((res) => {
          dispatch(setUser(res.data));
        })
        .catch((err) => {
          removeToken();
          dispatch(setUser(null));
        });
    } else {
      dispatch(setUser(null));
    }
    // eslint-disable-next-line
  }, []);

  return userData.isLoaded ? props.children : null;
}
