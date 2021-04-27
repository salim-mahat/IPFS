import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import axios from "axios";

import {
  setCurrentMetaMaskId,
  setUsersMetaMaskIds,
} from "../../redux/actions/user";

let isMetamaskListnerAdded = false;

function MetamaskDialog({ handleClose, handleOpen, open }) {
  const user = useSelector((s) => s.userData.user);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("Connect to meta-mask");

  useEffect(() => {
    if (user.currentMetaMaskId) return setStatus("Connected");
    setStatus("Not connected");
  }, [user.currentMetaMaskId]);

  useEffect(() => {
    if (!window.ethereum?.isMetaMask) {
      return;
    }

    if (isMetamaskListnerAdded) return;
    window.ethereum.on("accountsChanged", function ([account]) {
      if (user.currentMetaMaskId !== account) {
        if (checkIfAccountExistInProfile(account)) {
          // This function will also dispatch action to update in redux
          return;
        }
        updateAccount(account)
          .then(() => {
            alert("New account added to your profile");
          })
          .catch((err) => {
            alert(err);
          });
      }
    });
    isMetamaskListnerAdded = true;
    // eslint-disable-next-line
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

  const disconnect = () => {
    dispatch(setCurrentMetaMaskId(null));
  };

  return (
    <Dialog
      open={open || false}
      onClose={handleClose}
      fullWidth
      keepMounted={false}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Meta-Mask</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {status}
        </DialogContentText>
        {user.currentMetaMaskId && (
          <DialogContentText id="alert-dialog-description">
            ID: {user.currentMetaMaskId}
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          disabled={!Boolean(user.currentMetaMaskId)}
          onClick={disconnect}
          color="primary"
          autoFocus
        >
          Disconnect
        </Button>
        <Button
          disabled={Boolean(user.currentMetaMaskId)}
          onClick={connectNow}
          color="primary"
          autoFocus
        >
          Connect
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default MetamaskDialog;
