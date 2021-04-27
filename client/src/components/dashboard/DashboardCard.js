import React from "react";
import classnames from "classnames";
import { Card } from "@material-ui/core";

export default function DashboardCard({ children, onCardClick }) {
  return onCardClick ? (
    <Card onClick={onCardClick} className={classnames("px-2 my-1", "pointer")}>
      {children}
    </Card>
  ) : (
    <Card className="px-2 my-1">{children}</Card>
  );
}
