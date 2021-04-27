import React from "react";
import { makeStyles, TextField, Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import axios from "axios";

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

function Register() {
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = React.useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const onRegisterClick = () => {
    axios.post("/api/user/", state).then((res) => {
      if (res.data.status === "success") {
        history.push("/login");
      }
    });
  };

  const onFieldChange = ({ target }) => {
    setState({
      ...state,
      [target.name]: target.value,
    });
  };

  return (
    <div className={classes.root}>
      <img src="/avatar.png" className={classes.avatar} alt="avatar" />
      <Typography variant="h5">Register</Typography>
      <div className={classes.form}>
        <TextField
          label="First Name"
          placeholder="First Name"
          variant="outlined"
          fullWidth
          name="firstname"
          value={state.firstname}
          onChange={onFieldChange}
        />
        <TextField
          label="Last Name"
          placeholder="Last Name"
          variant="outlined"
          fullWidth
          name="lastname"
          value={state.lastname}
          onChange={onFieldChange}
        />
        <TextField
          label="Email"
          placeholder="Email ID"
          type="email"
          variant="outlined"
          fullWidth
          name="email"
          value={state.email}
          onChange={onFieldChange}
        />
        <TextField
          label="Password"
          placeholder="Password"
          variant="outlined"
          type="password"
          fullWidth
          name="password"
          value={state.password}
          onChange={onFieldChange}
        />
        <Button fullWidth variant="contained" onClick={onRegisterClick}>
          Register
        </Button>
      </div>
    </div>
  );
}

export default React.memo(Register);
