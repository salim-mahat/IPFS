import React, { useEffect } from "react";
import { Container, Divider, Paper, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import MintCard from "../../components/mints/MintCard";
import { getMints } from "../../redux/actions/mints";

export default function Mints() {
  const mints = useSelector((s) => Object.values(s.mintData.mints));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMints());
  }, []);

  return (
    <div className="home-wrapper py-2">
      <Container maxWidth="lg">
        <Paper>
          <div className="transactions-section pb-2 flex flex-col">
            <Typography variant="h5" className="px-2 py-1">
              MINTS
            </Typography>
            <Divider />
            <div className="flex flex-wrap">
              {mints.map((mint) => (
                <MintCard key={mint.id} mint={mint} />
              ))}
            </div>
          </div>
        </Paper>
      </Container>
    </div>
  );
}
