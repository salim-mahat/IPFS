import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useSelector } from "react-redux";
import axios from "axios";
const Constants = require("./constant/Constants");
var apiBaseUrl = Constants.getAPiUrl();
export default function TransferOwnershipModal({
  modalOpen,
  setModalOpen,
  token,
}) {
  const [toAddress, setToAddress] = useState("");

  const subscribeLogEvent = (contract, eventName) => {
    const subscribedEvents = {};
    console.log("subscribe event called");
    const eventJsonInterface = window.web3.utils._.find(
      contract._jsonInterface,
      (o) => o.name === eventName && o.type === "event"
    );
    console.log(eventJsonInterface);

    const subscription = window.web3.eth.subscribe(
      "logs",
      {
        address: contract.options.address,
        topics: [eventJsonInterface.signature],
      },
      (error, result) => {
        if (!error) {
          const eventObj = window.web3.eth.abi.decodeLog(
            eventJsonInterface.inputs,
            result.data,
            result.topics.slice(1)
          );
          console.log(`news ${eventName}!`, eventObj);
        } else {
          console.log(error);
        }
      }
    );
    subscribedEvents[eventName] = subscription;
    return subscribedEvents;
  };

  const user = useSelector((s) => s.userData.user);

  async function transferOwnershipWeb3() {
    const account = await getCurrentAccount();
    console.log(user.currentMetaMaskId);
    console.log(token);
    console.log(account);
    const coolNumber = await window.contract.methods
      .transferFrom(user.currentMetaMaskId, toAddress, token)
      .send({ from: account });
    const event = subscribeLogEvent(window.contract, "Transfer");
    if (event != null) {
      const transferOwnershipResponse = await axios.post(
        `${apiBaseUrl}/TransferOwnership`,
        {
          From: user.currentMetaMaskId,
          To: toAddress,
          TokenID: token,
        }
      );
      console.log(transferOwnershipResponse);
      setModalOpen(false);
    }
  }
  async function getCurrentAccount() {
    const accounts = await window.web3.eth.getAccounts();
    //  alert(accounts[0]);
    return accounts[0];
  }
  const onSubmit = (e) => {
    e.preventDefault();
    transferOwnershipWeb3();
  };
  return (
    <div>
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Transfer Asset</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To transfer an asset, please enter receiver's address.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Transfer To"
            fullWidth
            onChange={(e) => setToAddress(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={onSubmit} color="primary">
            Transfer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
