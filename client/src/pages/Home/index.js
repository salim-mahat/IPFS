import React, { useState } from "react";
import { Container, Divider, Paper, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import DashboardCard from "../../components/dashboard/DashboardCard";
import DashboardNumbers from "../../components/dashboard/DashboardNumbers";
import DashboardActions from "../../components/dashboard/DashboardActions";
import CreateMintModal from "../../components/CreateMintModal";
import TransactionTable from "../../components/TransactionTable";
import { transactions } from "../../dummyData";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const history = useHistory();

  const onCardClick = () => {
    history.push("/mints");
  };

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
      </Container>
    </div>
  );
}
