import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

import Layout from "../../Layout";
import MetamaskDialog from "./Metamask";

export default function Navigation() {
  const [open, setopen] = useState(false);
  const userData = useSelector((s) => s.userData);
  const handleClose = () => {
    setopen(false);
  };
  return (
    <Layout.NavigationBar logoSrc="/logo.png">
      {userData.isLoggedIn ? (
        <>
          <Button
            variant="outlined"
            style={{ borderColor: "#aaa" }}
            onClick={() => setopen(true)}
          >
            <img src="/wallet.png" alt="wallet" />
          </Button>
          <MetamaskDialog handleClose={handleClose} open={open} />
          <MetamaskDialog />
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </Layout.NavigationBar>
  );
}
