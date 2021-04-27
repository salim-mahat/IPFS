import React from "react";
import { CardContent, Typography } from "@material-ui/core";

export default function NumbersCard({ title, count, helperText }) {
  return (
    <CardContent>
      <Typography
        variant="h5"
        className="text-center"
        style={{ textTransform: "uppercase" }}
        gutterBottom
      >
        {title}
      </Typography>
      <div className="flex-center mt-3 mb-2">
        <div className="circle flex-center" style={{ height: 200, width: 200 }}>
          <h1>{count}</h1>
        </div>
      </div>
      <Typography
        variant="subtitle2"
        className="text-center"
        color="textSecondary"
        style={{ textTransform: "capitalize" }}
      >
        {helperText}
      </Typography>
    </CardContent>
  );
}
