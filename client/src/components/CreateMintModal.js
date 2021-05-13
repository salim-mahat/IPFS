import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
  Dialog,
  Input,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import axios from "axios";

import { createMint } from "../redux/actions/mints";
import BlockLoader from "./Blockchain/blockloader";
const Constants = require("./constant/Constants");

var apiBaseUrl = Constants.getAPiUrl();

export default function CreateMintModal({ modalOpen, setModalOpen }) {
  const user = useSelector((s) => s.userData.user);
  useEffect(() => {
    // Update the document title using the browser API
    console.log(user.currentMetaMaskId);
  }, []);
  const [token, setToken] = useState("");
  const [state, setstate] = useState({
    name: "",
    externalURL: "",
    description: "",
    attrName: "",
    attrValue: "",
    attributes: [],
    file: null,
  });
  const [blockloader, setblockloader] = React.useState(false);
  const dispatch = useDispatch();

  const onTextFieldChange = ({ target }) => {
    setstate({ ...state, [target.name]: target.value });
  };

  const onFileChange = ({ target }) => {
    setstate({ ...state, file: target.files[0] });
  };

  function jsonToURI(json) {
    return encodeURIComponent(JSON.stringify(json));
  }

  const addAttribute = () => {
    setstate({
      ...state,
      attributes: [
        ...state.attributes,
        { attrName: state.attrName, attrValue: state.attrValue },
      ],
      attrName: "",
      attrValue: "",
    });
  };

  const createNewMint = async () => {
    setblockloader(true);
    const mintData = { ...state };
    delete mintData.attrName;
    delete mintData.attrValue;
    // dispatch(createMint(mintData));
    const formData = new FormData();
    for (const key in mintData) {
      formData.append(key, mintData[key]);
    }
    console.log(state);

    const res = await axios.post(`${apiBaseUrl}/api/asset/`, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (res.data.status === "success") {
      var token = await createMintToken(res.data.mint);
      setToken(token);
      const eventResult = subscribeLogEvent(window.contract, "Transfer");
      console.log("eventResult", eventResult);
      if (eventResult != null) {
        console.log(res.data.mint._id);
        const updateAddressRes = await axios.post(
          `${apiBaseUrl}/updateAddressAndTokenID/`,
          {
            _id: res.data.mint._id,
            address: user.currentMetaMaskId,
            TokenID: token,
          }
        );
        console.log(updateAddressRes);
      }
    }
    setModalOpen(false);
    setblockloader(false);
  };

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

  async function createMintToken(jsonData) {
    const token = Date.now();
    const account = await getCurrentAccount();
    const uri = jsonToURI(jsonData);
    console.log(uri);
    const coolNumber = await window.contract.methods
      .mintToken(user.currentMetaMaskId, token, uri)
      .send({ from: account });
    return token;
  }

  async function getCurrentAccount() {
    const accounts = await window.web3.eth.getAccounts();
    //  alert(accounts[0]);
    return accounts[0];
  }

  if (!user) return null;

  return (
    <>
      <Dialog
        maxWidth="lg"
        fullWidth
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        {blockloader && <BlockLoader />}

        <Paper>
          <Typography variant="h5" className="px-2 py-1">
            Mint Asset
          </Typography>
          <Divider />
          <div className="flex-center p-2">
            <div className="flex flex-col flex-1">
              <TextField
                className="mb-1"
                label="Name"
                name="name"
                placeholder="Name"
                variant="outlined"
                onChange={onTextFieldChange}
                value={state.name}
              />
              <TextField
                className="mb-1"
                label="Description"
                placeholder="Description"
                name="description"
                variant="outlined"
                onChange={onTextFieldChange}
                value={state.description}
              />
              <TextField
                className="mb-1"
                label="External URL"
                placeholder="External URL"
                name="externalURL"
                variant="outlined"
                onChange={onTextFieldChange}
                value={state.externalURL}
              />
              <Input
                className="mb-1"
                label="Image"
                variant="outlined"
                type="file"
                name="file"
                onChange={onFileChange}
              />
            </div>
            <div className="d-flex flex-col flex-1">
              <div>
                <div className="flex flex-center mb-1">
                  <TextField
                    label="Attribute Name"
                    placeholder="Extra attribute name"
                    variant="outlined"
                    name="attrName"
                    onChange={onTextFieldChange}
                    value={state.attrName}
                  />
                  <TextField
                    className="ml-1"
                    label="Attribute Value"
                    placeholder="Extra attribute value"
                    name="attrValue"
                    variant="outlined"
                    onChange={onTextFieldChange}
                    value={state.attrValue}
                  />
                  <Button
                    className="ml-1"
                    size="small"
                    variant="outlined"
                    onClick={addAttribute}
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-col">
                  {state.attributes.map((attr) => (
                    <div className="flex px-1" key={attr.attrName}>
                      <div className="flex flex-1">
                        <Typography
                          className="px-2"
                          style={{ fontWeight: 600, fontSize: "1em" }}
                          variant="body1"
                        >
                          {attr.attrName}:
                        </Typography>
                      </div>
                      <div className="flex flex-1">
                        <Typography
                          className="px-2"
                          style={{ fontWeight: 600, fontSize: "1em" }}
                          variant="body1"
                        >
                          {attr.attrValue}
                        </Typography>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-center pb-2">
            <Button size="large" variant="contained" onClick={createNewMint}>
              Create
            </Button>
          </div>
        </Paper>
      </Dialog>
    </>
  );
}
