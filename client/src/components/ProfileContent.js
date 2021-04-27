import React from "react";
import classnames from "classnames";
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";

export default function ProfileContent() {
  const user = useSelector((s) => s.userData.user);

  if (!user) return null;

  return (
    <div className="d-flex flex-col sticky">
      <div className="avatar">
        <img src="/avatar.png" alt="user avatar" />
      </div>
      <div className="d-flex f-col profile-info">
        <Typography className="text-center" variant="h5">
          {user.firstname + " " + user.lastname}
        </Typography>
        <Typography className="text-center" variant="body2">
          {user.email}
        </Typography>
        <Typography className="text-center pt-3" variant="h5">
          ACCOUNTS
        </Typography>

        {user.metamaskAccounts.length
          ? user.metamaskAccounts.map((acc) => (
              <Typography
                className={classnames("account w-100", {
                  "active-account": user.currentMetaMaskId === acc,
                })}
                variant="body1"
              >
                {`${acc.slice(0, 4)}...${acc.slice(
                  acc.length - 6,
                  acc.length
                )}`}
              </Typography>
            ))
          : null}
        {!user.currentMetaMaskId && (
          <Typography className="text-center" component="div" variant="caption">
            *Not connected to any account
          </Typography>
        )}
      </div>
    </div>
  );
}
