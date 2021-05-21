import React from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

export default function TransactionTable({ transactions = [] }) {
  console.log("data", transactions);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Token ID</TableCell>
            <TableCell align="center">From</TableCell>
            <TableCell align="center">To</TableCell>
            <TableCell align="center">Date/Time</TableCell>
            {/* <TableCell align="right">Action</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((row) => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">
                {row.tokenID}
              </TableCell>
              <TableCell align="right" style={{ color: "gray" }}>
                {row.address}
              </TableCell>
              <TableCell align="right" style={{ color: "gray" }}>
                {row.ownershipTransferedTo}
              </TableCell>
              <TableCell align="right">{row.createdAt}</TableCell>
              {/* <TableCell align="right">
                <Button>View</Button>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
