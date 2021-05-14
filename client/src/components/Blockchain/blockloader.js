import { Typography } from "@material-ui/core";
import React, { Fragment, Component, useState, useRef, useEffect } from "react";
import "./loader.scss";
// import { injectIntl } from 'react-intl';

const BlockChainLoader = ({ intl, match, proccessName }) => {
  const [name, setName] = useState("Creating A Hash");
  const [sealname, setsealname] = useState(true);
  const [fourthname, setfourthname] = useState(true);
  const [textname, settextname] = useState("Creating A Hash");
  const secondfunction = () => {
    if (name == "Creating A Hash") {
      setTimeout(function () {
        console.log("11");
        setName("Creating a Transaction Block");
      }, 1000);
    }
  };
  console.log(proccessName);
  const thirdfunction = () => {
    if (name == "Creating a Transaction Block") {
      setTimeout(function () {
        console.log("12");
        setName("Sealing it Blockchain.....");
        setsealname(false);
      }, 1000);
    }
  };
  const fourthfunction = () => {
    if (name == "Sealing it Blockchain.....") {
      setTimeout(function () {
        console.log("13");
        setName("nischal");
        setfourthname(false);
      }, 1000);
    }
  };

  const fifthfunction = () => {
    if (name == "Blockchain Tx ID 0x21298473924ABFD2334 Created") {
      setTimeout(function () {
        console.log("13");
        setName("No of Added");
        setfourthname(false);
      }, 1000);
    }
  };

  const changetext = (value) => {
    setInterval(function () {
      settextname(value);
    }, 500);
  };

  console.log(textname);
  return (
    <div className="displayloader">
      <div className="loader" style={{ marginTop: "50%" }}>
        <div className="box"></div>
        <div className="box"></div>
      </div>
      <Typography
        variant="h5"
        style={{ color: "white", marginTop: "70%", marginLeft: "45%" }}
      >
        {proccessName}...
      </Typography>
      {/* {name == "Creating A Hash" &&
                <>
                    <h1 style={{ color: "white", marginTop: "70%", marginLeft: "45%" }}>{name}</h1>
                    {secondfunction()}

                    
                </>
            }
            {name == "Creating a Transaction Block" &&
                <div style={{ marginTop: "70%", marginLeft: "40%" }}>
                    <h1 style={{ color: "white" }}>{name}</h1>
                    {sealname &&
                        thirdfunction()
                    }


                </div>
            }
            {name == "Sealing it Blockchain....." &&
                <div style={{ marginTop: "70%", marginLeft: "42%" }}>
                    <h1 style={{ color: "white" }}>{name}</h1>
                    {fourthname &&
                        fourthfunction()
                    }

                </div>
            }
            {name == "nischal" &&
                <div style={{ marginTop: "70%", marginLeft: "30%" }}>
                    <h1 style={{ color: "white" }}>Blockchain Tx ID 0x21298473924ABFD2334 Created</h1>

                    {fifthfunction()}


                </div>
            } */}
    </div>
  );
};
export default BlockChainLoader;
