import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "../components/text.css";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(srNo, hash, token, type) {
  return { srNo, hash, token, type };
}

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function PendingTranscationsModal({
  modalOpen,
  setModalOpen,
  pendingTransactions,
}) {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    let transactions = [];
    console.log("pending transactions", pendingTransactions);
    pendingTransactions.forEach((element, index) => {
      transactions.push(
        createData(
          index + 1,
          element.transaction_hash,
          element.tokenID,
          element.assetType
        )
      );
    });
    setRows(transactions);
  }, [pendingTransactions]);
  const classes = useStyles();
  return (
    <div>
      <Dialog
        onClose={() => setModalOpen(false)}
        aria-labelledby="customized-dialog-title"
        open={modalOpen}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={() => setModalOpen(false)}
        >
          Pending Transactions
        </DialogTitle>
        <DialogContent dividers>
          {rows.length === 0 ? (
            <Typography>No Pending Transactions</Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Sr no.</TableCell>
                    <TableCell align="center">Transaction Hash</TableCell>
                    <TableCell align="center">Token ID</TableCell>
                    <TableCell align="center">Transaction Type</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.srNo}>
                      <TableCell component="th" scope="row">
                        {row.srNo}
                      </TableCell>
                      <TableCell align="center">{row.hash}</TableCell>
                      <TableCell align="center">{row.token}</TableCell>
                      <TableCell align="center">{row.type}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
