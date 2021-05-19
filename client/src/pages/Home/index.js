import React, { useState, useEffect } from "react";
import { Container, Divider, Paper, Typography, Box } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import DashboardCard from "../../components/dashboard/DashboardCard";
import DashboardNumbers from "../../components/dashboard/DashboardNumbers";
import DashboardActions from "../../components/dashboard/DashboardActions";
import CreateMintModal from "../../components/CreateMintModal";
import TransferOwnershipModal from "../../components/TransferOwnershipModal";
import TransactionTable from "../../components/TransactionTable";
import { transactions } from "../../dummyData";
import Web3 from "web3";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getMints } from "../../redux/actions/mints";
const Constants = require("../../components/constant/Constants");
var apiBaseUrl = Constants.getAPiUrl();

export default function Home() {
  const user = useSelector((s) => s.userData.user);
  const mints = useSelector((s) => Object.values(s.mintData.mints));
  const [ownershipModalOpen, setOwnershipModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [transferHistory, setTransferHistory] = useState([]);
  const [pendingTransactions, setPendingTransactions] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    // Update the document title using the browser API
    load();
    dispatch(getMints(user.currentMetaMaskId));
    //getTokens();
    fetchTransactionHistory();
    checkUnfinishedTransactions();
  }, [user.currentMetaMaskId]);

  const onCardClick = (assetType, title) => {
    history.push({
      pathname: "/mints",
      state: {
        assetType: assetType,
        title: title,
      },
    });
  };

  async function loadContract() {
    return await new window.web3.eth.Contract(
      [
        {
          inputs: [],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "approved",
              type: "address",
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "Approval",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "operator",
              type: "address",
            },
            {
              indexed: false,
              internalType: "bool",
              name: "approved",
              type: "bool",
            },
          ],
          name: "ApprovalForAll",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "approve",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "uri",
              type: "string",
            },
          ],
          name: "mintToken",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "safeTransferFrom",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
            {
              internalType: "bytes",
              name: "_data",
              type: "bytes",
            },
          ],
          name: "safeTransferFrom",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "bool",
              name: "approved",
              type: "bool",
            },
          ],
          name: "setApprovalForAll",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "Transfer",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "transferFrom",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
          ],
          name: "balanceOf",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "getApproved",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              internalType: "address",
              name: "operator",
              type: "address",
            },
          ],
          name: "isApprovedForAll",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "name",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "ownerOf",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "symbol",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "tokenURI",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      "0x7b201a9c9aa658c5e308b03a423af4057c75d570"
    );
  }

  async function fetchTransactionHistory() {
    let response = await axios.get(
      `api/assets/GetOwnershipTransferedHistory/${user.currentMetaMaskId}`
    );
    if (response) {
      setTransferHistory(response.data.message ?? []);
      console.log("TH", transferHistory);
    }
  }

  const showPendingTransactions = () => {
    let transactionHashes = [];
    pendingTransactions.forEach((element) => {
      transactionHashes.push(element.transaction_hash);
    });
    console.log(transactionHashes);
    alert(transactionHashes);
  };
  function updateStatus(status) {
    const statusEl = document.getElementById("status");
    //statusEl.innerHTML = status;
    console.log(status);
  }

  async function load() {
    await loadWeb3();
    window.contract = await loadContract();
    // var ProteumNFT  = await window.contract.methods.
    updateStatus("Ready!");
    //alert("load contract called");
  }

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
    }
  }
  async function getCurrentAccount() {
    const accounts = await window.web3.eth.getAccounts();
    //  alert(accounts[0]);
    return accounts[0];
  }

  async function checkUnfinishedTransactions() {
    const response = await axios.get(
      `${apiBaseUrl}/api/assets/GetPendingAsset/${user.currentMetaMaskId}`
    );
    const backedUpData = response.data.message;
    setPendingTransactions(backedUpData);
    console.log(backedUpData);
    if (backedUpData) {
      for (const index in backedUpData) {
        console.log(index);
        console.log("transaction hash", backedUpData[index].transactionHash);
        if (backedUpData[index].address === user.currentMetaMaskId) {
          let status = await window.web3.eth.getTransactionReceipt(
            backedUpData[index].transaction_hash
          );
          console.log("status", status);
          if (status) {
            const uriObject = await getTokenURI(backedUpData[index].tokenID);
            console.log(uriObject);
            if (backedUpData[index].assetType == "Mint") {
              const res = await axios.post(
                `${apiBaseUrl}/api/assets/MintAsset`,
                {
                  ...uriObject,
                  address: user.currentMetaMaskId,
                  tokenID: backedUpData[index].tokenID,
                }
              );
            } else {
              const transferOwnershipResponse = await axios.post(
                `${apiBaseUrl}/api/assets/TransferOwnership`,
                {
                  From: user.currentMetaMaskId.toLowerCase(),
                  To: backedUpData[index].ToAddress,
                  TokenID: backedUpData[index].tokenID,
                }
              );
            }
            backedUpData.shift();
          } else {
            console.log("Process is still pending");
          }
        }
      }
    }
  }
  async function getTokens() {
    const account = await getCurrentAccount();
    const tokenCount = await window.contract.methods
      .balanceOf(user.currentMetaMaskId)
      .call();
    console.log("tokenCOunt", tokenCount);
  }
  async function getTokenURI(token) {
    const tokenURI = await window.contract.methods.tokenURI(token).call();
    return JSON.parse(decodeURIComponent(tokenURI));
  }

  return (
    <div className="home-wrapper py-2">
      <Container maxWidth="lg">
        <div className="card-wrapper mb-2">
          <DashboardCard
            onCardClick={() => onCardClick("Mint", "Minted Assets")}
          >
            <DashboardNumbers
              title="Mint"
              buttonText="Mint Asset"
              helperText="Total mint count"
              count={
                mints.filter((mint) => {
                  return mint.assetType === "Mint";
                }).length
              }
            />
          </DashboardCard>
          <DashboardCard
            onCardClick={() => onCardClick("Received", "Purchased Assets")}
          >
            <DashboardNumbers
              title="Purchased"
              buttonText="Create transfer"
              helperText="Total Transfer till data"
              count={
                mints.filter((mint) => {
                  return mint.assetType === "Received";
                }).length
              }
            />
          </DashboardCard>
          <DashboardCard>
            <DashboardActions
              onButtonClick={() => {
                setModalOpen(true);
              }}
              onTransferOwnership={() => onCardClick("Mint", "Minted Assets")}
              showPendingTransactions={() => showPendingTransactions()}
            />
          </DashboardCard>
        </div>
        <div className="transactions-section pb-2">
          <Paper>
            <div style={{ width: "100%" }}>
              <Box display="flex">
                <Box flexGrow={1}>
                  <Typography variant="h5" className="px-2 py-1">
                    Transfers
                    {/* <center><Home/></center> */}
                  </Typography>
                </Box>

                <Typography variant="subtitle1" className="px-2 py-1">
                  Count : {transferHistory.length}
                </Typography>
              </Box>
            </div>
            <Divider />
            <TransactionTable transactions={transferHistory ?? []} />
          </Paper>
        </div>
        <CreateMintModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
        <TransferOwnershipModal
          modalOpen={ownershipModalOpen}
          setModalOpen={setOwnershipModalOpen}
        />
      </Container>
    </div>
  );
}
