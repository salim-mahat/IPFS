import React from "react";
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
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Favorite, ShareOutlined } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    minWidth: 345,
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

  return (
    <Card className={clsx(classes.root, "m-2")}>
      <Link to={`/mints/${mint.id}`}>
        <CardMedia
          className={classes.media}
          image={mint.assetLink}
          title="Asset image"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {mint.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <Favorite />
          </IconButton>
          <IconButton aria-label="share">
            <ShareOutlined />
          </IconButton>
        </CardActions>
      </Link>
    </Card>
  );
}
