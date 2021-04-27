import React from "react";
import { makeStyles, TextField, Button, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";

import { loginUser } from "../redux/actions/user";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  form: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
    "& > *": {
      margin: "8px 0",
    },
  },
  avatar: {
    maxHeight: "220px",
    marginTop: -200,
  },
});

function LoginPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    email: "",
    password: "",
  });

  const onLoginClick = () => {
    dispatch(loginUser(state));
  };

  return (
    <div className={classes.root}>
      <img src="/avatar.png" className={classes.avatar} alt="avatar" />
      <Typography variant="h5">Login</Typography>
      <div className={classes.form}>
        <TextField
          label="Email"
          placeholder="Email ID"
          type="email"
          variant="outlined"
          error={false}
          fullWidth
          onChange={(e) => {
            setState({ ...state, email: e.target.value });
          }}
        />
        <TextField
          label="Password"
          placeholder="Password"
          variant="outlined"
          type="password"
          error={false}
          fullWidth
          onChange={(e) => {
            setState({ ...state, password: e.target.value });
          }}
        />
        <Button fullWidth variant="contained" onClick={onLoginClick}>
          Login
        </Button>
      </div>
    </div>
  );
}

export default React.memo(LoginPage);
