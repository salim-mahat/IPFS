import React, { useEffect } from "react";
import {
  Container,
  Divider,
  Paper,
  makeStyles,
  Typography,
  Box,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Favorite, ShareOutlined, Home } from "@material-ui/icons";
import MintCard from "../../components/mints/MintCard";
import { getMints } from "../../redux/actions/mints";

const useStyles = makeStyles((theme) => ({
  address: {
    flexGrow: 1,
  },
}));

export default function Mints() {
  const classes = useStyles();
  const user = useSelector((s) => s.userData.user);
  const mints = useSelector((s) => Object.values(s.mintData.mints));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMints(user.currentMetaMaskId));
  }, []);

  return (
    <div className="home-wrapper py-2">
      <Container maxWidth="lg">
        <Paper>
          <div className="transactions-section pb-2 flex flex-col">
            <div style={{ width: "100%" }}>
              <Box display="flex">
                <Box flexGrow={1}>
                  <Typography variant="h5" className="px-2 py-1">
                    MINTED ASSET
                    {/* <center><Home/></center> */}
                  </Typography>
                </Box>

                <Typography variant="subtitle1" className="px-2 py-1">
                  {user.currentMetaMaskId}
                </Typography>
              </Box>
            </div>

            {/* <Home /> */}

            <Divider />
            <div className="flex flex-wrap">
              {mints.map((mint, index) => (
                <>
                  <MintCard key={mint.id} mint={mint} />
                  {/* <br/>
                <Divider/> */}
                </>
              ))}
            </div>
          </div>
        </Paper>
      </Container>
    </div>
  );
}
