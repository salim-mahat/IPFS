import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProfileContent from "../components/ProfileContent";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentMetaMaskId,
  setUsersMetaMaskIds,
} from "../redux/actions/user";
import axios from "axios";
import { getMints } from "../redux/actions/mints";
let isMetamaskListnerAdded = false;

const NavigationBar = ({ logoSrc, children }) => {
  const user = useSelector((s) => s.userData.user);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("Connect to meta-mask");
  useEffect(() => {
    // Update the document title using the browser API
    if (user) {
      connectNow();
    }
  }, []);

  const updateAccount = (account) => {
    const msg =
      "Do you wish to add this account to your profile ID: " + account;

    const conformation = window.confirm(msg);
    if (!conformation) return Promise.reject("Connection cancelled");

    const metamaskAccounts = [...user.metamaskAccounts, account];
    return axios
      .patch("/api/user/current/", {
        metamaskAccounts,
      })
      .then((res) => {
        console.log("Resp arrived");
        if (res.data.status === "success") {
          dispatch(setUsersMetaMaskIds(res.data.user.metamaskAccounts));
          dispatch(setCurrentMetaMaskId(account));
        }
      });
  };

  const checkIfAccountExistInProfile = (account) => {
    const doesInclude = user.metamaskAccounts?.includes(account);
    if (doesInclude) {
      setStatus("Connected");
      dispatch(setCurrentMetaMaskId(account));
      return true;
    }
    return false;
  };

  const connectNow = async () => {
    if (!window.ethereum?.isMetaMask) {
      setStatus("You have not installed Meta-Mask");
      return;
    }
    if (user.currentMetaMaskId) {
      setStatus("You are connected to Meta-Mask");
      return;
    }

    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    if (checkIfAccountExistInProfile(account)) return;

    setStatus("Adding new meta-mask account to your porfile");

    updateAccount(account)
      .then(() => setStatus("Connected"))
      .catch((err) => {
        setStatus(err);
      });
  };
  return (
    <div className="nav-wrapper">
      <Link to="/">
        <div className="logo-wrapper">
          <img src={logoSrc} alt="logo" />
        </div>
      </Link>
      <div className="nav-items">{children}</div>
    </div>
  );
};

const Body = (props) => {
  const userData = useSelector((s) => s.userData);

  return (
    <div className="body-wrapper">
      {userData.isLoggedIn && (
        <div className="profile-wrapper">
          <ProfileContent />
        </div>
      )}
      {props.children}
    </div>
  );
};

function Layout(props) {
  return <div className="layout">{props.children}</div>;
}

Layout.Body = Body;
Layout.NavigationBar = NavigationBar;

export default Layout;
