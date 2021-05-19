import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useSelector, useDispatch } from "react-redux";
import BlockLoader from "./Blockchain/blockloader";
import axios from "axios";
import { getMints } from "../redux/actions/mints";
const Constants = require("./constant/Constants");
var apiBaseUrl = Constants.getAPiUrl();
export default function TransferOwnershipModal({
  modalOpen,
  setModalOpen,
  token,
}) {
  const dispatch = useDispatch();
  const [toAddress, setToAddress] = useState("");
  const [blockloader, setblockloader] = React.useState(false);
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
    //setblockloader(true);
    try {
      const account = await getCurrentAccount();
      console.log(user.currentMetaMaskId);
      console.log(token);
      console.log(account);
      const coolNumber = await window.contract.methods
        .transferFrom(user.currentMetaMaskId, toAddress, token)
        .send({ from: account })
        .on("transactionHash", function (hash) {
          axios
            .post(`${apiBaseUrl}/api/assets/PendingMintAsset`, {
              tokenID: token,
              address: user.currentMetaMaskId,
              transaction_hash: hash,
              assetType: "Transfer",
              ToAddress: toAddress.toLowerCase(),
            })
            .then((res) => {
              console.log("save pending transaction", res.data);
            });
        });
      const event = subscribeLogEvent(window.contract, "Transfer");
      if (event != null) {
        const transferOwnershipResponse = await axios.post(
          `${apiBaseUrl}/api/assets/TransferOwnership`,
          {
            From: user.currentMetaMaskId.toLowerCase(),
            To: toAddress.toLowerCase(),
            TokenID: token,
          }
        );
        console.log(transferOwnershipResponse);
        //dispatch(getMints(user.currentMetaMaskId));
        window.location = "/";
        setModalOpen(false);
        //setblockloader(false);
      }
    } catch (error) {
      setblockloader(false);
      setModalOpen(false);
      setTimeout(() => {
        alert(error.message);
      }, 500);
      console.log("error occured", error);
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
        {blockloader && <BlockLoader proccessName="Transfering Asset" />}
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
