import React, { useState, useEffect } from "react";
import { Container, Divider, Paper, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import DashboardCard from "../../components/dashboard/DashboardCard";
import DashboardNumbers from "../../components/dashboard/DashboardNumbers";
import DashboardActions from "../../components/dashboard/DashboardActions";
import CreateMintModal from "../../components/CreateMintModal";
import TransferOwnershipModal from "../../components/TransferOwnershipModal";
import TransactionTable from "../../components/TransactionTable";
import { transactions } from "../../dummyData";
import Web3 from "web3";

export default function Home() {
  const [ownershipModalOpen, setOwnershipModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const history = useHistory();
  useEffect(() => {
    // Update the document title using the browser API
    load();
  }, []);

  const onCardClick = () => {
    history.push("/mints");
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

  return (
    <div className="home-wrapper py-2">
      <Container maxWidth="lg">
        <div className="card-wrapper mb-2">
          <DashboardCard onCardClick={onCardClick}>
            <DashboardNumbers
              title="Mint"
              buttonText="Mint Asset"
              helperText="Total mint count"
              count="1043"
            />
          </DashboardCard>
          <DashboardCard>
            <DashboardNumbers
              title="Transfers"
              buttonText="Create transfer"
              helperText="Total Transfer till data"
              count="203"
            />
          </DashboardCard>
          <DashboardCard>
            <DashboardActions
              onButtonClick={() => {
                setModalOpen(true);
              }}
              onTransferOwnership={onCardClick}
            />
          </DashboardCard>
        </div>
        <div className="transactions-section pb-2">
          <Paper>
            <Typography variant="h5" className="px-2 py-1">
              Transfers
            </Typography>
            <Divider />
            <TransactionTable transactions={transactions} />
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
