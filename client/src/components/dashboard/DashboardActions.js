import React from "react";
import { Button, CardContent, Typography } from "@material-ui/core";

export default function DashboardActions({
  onButtonClick,
  onTransferOwnership,
  showPendingTransactions,
}) {
  return (
    <CardContent>
      <Typography
        variant="h5"
        className="text-center pt-1"
        style={{ textTransform: "uppercase" }}
        gutterBottom
      >
        Actions
      </Typography>
      <div className="flex flex-col flex-1">
        <Button
          onClick={onButtonClick}
          name="mint"
          className="my-1 p-2 box-btn"
        >
          Mint Asset
        </Button>
        <Button
          className="my-1 p-2 box-btn"
          onClick={onTransferOwnership}
          name="transaction"
        >
          Transfer Ownership
        </Button>
        <Button
          className="my-1 p-2 box-btn"
          onClick={showPendingTransactions}
          name="transaction"
        >
          Pending Transactions
        </Button>
      </div>
    </CardContent>
  );
}
