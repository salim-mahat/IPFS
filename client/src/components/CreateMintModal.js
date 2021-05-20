import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import {
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
  Dialog,
  Input,
  Box,
  CircularProgress,
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
    externalURL: "URL",
    description: "",
    attrName: "",
    attrValue: "",
    attributes: [],
    IPFSHash: "",
    address: "",
  });
  const [fileResponse, setfileResponse] = useState(null);
  const [isFileUploading, setIsFileUploading] = useState(false);
  const [blockloader, setblockloader] = React.useState(false);
  const dispatch = useDispatch();

  const onTextFieldChange = ({ target }) => {
    setstate({ ...state, [target.name]: target.value });
  };

  const onFileChange = ({ target }) => {
    uploadFile(target.files[0]);
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

  async function uploadFile(asset) {
    setIsFileUploading(true);
    const mintData = { ...state };
    delete mintData.attrName;
    delete mintData.attrValue;
    // dispatch(createMint(mintData));
    const assetFormData = new FormData();
    assetFormData.append("file", asset);

    const res = await axios.post(
      `${apiBaseUrl}/api/ipfs/UploadFiles`,
      assetFormData,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
    if (res.data.status == "success") {
      setfileResponse(res.data);
    }
    setIsFileUploading(false);
  }

  const createNewMint = async () => {
    //setblockloader(true);
    if (fileResponse.status === "success") {
      console.log(fileResponse.data.hash);
      setModalOpen(false);
      var token = await createMintToken({
        ...state,
        IPFSHash: fileResponse.data.hash,
      });
      if (token) {
        setToken(token);
        const eventResult = subscribeLogEvent(window.contract, "Transfer");
        console.log("eventResult", eventResult);
        if (eventResult) {
          const updateAddressRes = await axios.post(
            `${apiBaseUrl}/api/assets/MintAsset`,
            {
              ...state,
              IPFSHash: fileResponse.data.hash,
              address: user.currentMetaMaskId,
              tokenID: token,
            }
          );
        }
      } else {
        alert("Something went wrong");
      }
    }
    setModalOpen(false);
    //setblockloader(false);
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
    try {
      const account = await getCurrentAccount();
      const uri = jsonToURI(jsonData);
      console.log(jsonData);
      console.log(uri);
      const coolNumber = await window.contract.methods
        .mintToken(user.currentMetaMaskId, token, uri)
        .send({ from: account })
        .on("transactionHash", function (hash) {
          axios
            .post(`${apiBaseUrl}/api/assets/PendingMintAsset`, {
              tokenID: token,
              address: user.currentMetaMaskId,
              transaction_hash: hash,
              assetType: "Mint",
            })
            .then((res) => {
              console.log("save pending transaction", fileResponse);
            });
        });
      return token;
    } catch (error) {
      console.log("error occoured", error);
      return null;
    }
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
        {blockloader && <BlockLoader proccessName="Minting Asset" />}

        <Paper>
          <div style={{ width: "100%" }}>
            <Box display="flex">
              <Box flexGrow={1}>
                <Typography variant="h5" className="px-2 py-1">
                  Mint Asset
                  {/* <center><Home/></center> */}
                </Typography>
              </Box>

              <CloseIcon
                style={{ padding: "10px" }}
                onClick={() => setModalOpen(false)}
              />
            </Box>
          </div>
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
              {/* <TextField
                className="mb-1"
                label="External URL"
                placeholder="External URL"
                name="externalURL"
                variant="outlined"
                onChange={onTextFieldChange}
                value={state.externalURL}
              /> */}
              <Input
                className="mb-1"
                label="Image"
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
            {isFileUploading ? (
              <CircularProgress />
            ) : (
              <Button
                disabled={
                  !fileResponse ||
                  state.title === "" ||
                  state.description === ""
                }
                size="large"
                variant="contained"
                onClick={createNewMint}
              >
                Create
              </Button>
            )}
          </div>
        </Paper>
      </Dialog>
    </>
  );
}
