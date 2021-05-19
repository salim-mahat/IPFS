import React, { useState } from "react";
import clsx from "classnames";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  makeStyles,
  colors,
  Button,
} from "@material-ui/core";
import TransferOwnershipModal from "../../components/TransferOwnershipModal";
import { Link } from "react-router-dom";
import VideoThumbnail from "react-video-thumbnail";
import { Favorite, ShareOutlined, Home } from "@material-ui/icons";
const Constants = require("../constant/Constants");

var apiBaseUrl = Constants.getAPiUrl();
var imageBaseUrl = Constants.getimageUrl();

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
    // minWidth: 345,
    maxWidth: 275,
    minWidth: 275,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: colors.red[500],
  },
}));

export default function MintCard({ mint }) {
  const classes = useStyles();
  const [ownershipModalOpen, setOwnershipModalOpen] = useState(false);
  const imageurlfunction = (value) => {
    console.log(mint);
    window.open(`${imageBaseUrl}/${value}`);
  };

  return (
    <div>
      <Card className={clsx(classes.root, "m-2")}>
        {/* <Link to={`/mints/${mint.id}`}> */}
        <CardMedia
          className={classes.media}
          image={`${imageBaseUrl}/${mint.IPFSHash}`}
          onClick={() => {
            imageurlfunction(mint.IPFSHash);
          }}
          title="Asset image"
        />
        <div style={{ height: "150px" }}>
          <VideoThumbnail
            className={classes.media}
            videoUrl={`${imageBaseUrl}/${mint.IPFSHash}`}
            thumbnailHandler={(thumbnail) => console.log(thumbnail)}
            width={400}
            height={160}
          />
        </div>

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            <strong>Name: </strong>
            {mint.name}
          </Typography>

          <Typography variant="body2" color="textSecondary" component="p">
            <strong>Description: </strong>
            {mint.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Button
            variant="contained"
            onClick={() => {
              setOwnershipModalOpen(true);
            }}
            size="small"
            color="secondary"
          >
            Transfer
          </Button>
        </CardActions>
        {/* </Link> */}
      </Card>
      <TransferOwnershipModal
        modalOpen={ownershipModalOpen}
        setModalOpen={setOwnershipModalOpen}
        token={mint.tokenID}
      />
    </div>
  );
}
