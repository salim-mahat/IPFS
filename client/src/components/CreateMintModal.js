import React, { useState } from "react";
import {
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
  Dialog,
  Input,
} from "@material-ui/core";
import { useDispatch } from "react-redux";

import { createMint } from "../redux/actions/mints";

export default function CreateMintModal({ modalOpen, setModalOpen }) {
  const [state, setstate] = useState({
    name: "",
    externalURL: "",
    description: "",
    attrName: "",
    attrValue: "",
    attributes: [],
    file: null,
  });
  const dispatch = useDispatch();

  const onTextFieldChange = ({ target }) => {
    setstate({ ...state, [target.name]: target.value });
  };

  const onFileChange = ({ target }) => {
    setstate({ ...state, file: target.files[0] });
  };

  const addAttribute = () => {
    setstate({
      ...state,
      attributes: [
        ...state.attributes,
        { attrName: state.attrName, attrValue: state.attrValue },
      ],
      attrName: "",
      attrValue: "",
    });
  };

  const createNewMint = () => {
    const mintData = { ...state };
    delete mintData.attrName;
    delete mintData.attrValue;
    dispatch(createMint(mintData));
  };

  return (
    <Dialog
      maxWidth="lg"
      fullWidth
      open={modalOpen}
      onClose={() => setModalOpen(false)}
    >
      <Paper>
        <Typography variant="h5" className="px-2 py-1">
          Mint Asset
        </Typography>
        <Divider />
        <div className="flex-center p-2">
          <div className="flex flex-col flex-1">
            <TextField
              className="mb-1"
              label="Name"
              name="name"
              placeholder="Name"
              variant="outlined"
              onChange={onTextFieldChange}
              value={state.name}
            />
            <TextField
              className="mb-1"
              label="Description"
              placeholder="Description"
              name="description"
              variant="outlined"
              onChange={onTextFieldChange}
              value={state.description}
            />
            <TextField
              className="mb-1"
              label="External URL"
              placeholder="External URL"
              name="externalURL"
              variant="outlined"
              onChange={onTextFieldChange}
              value={state.externalURL}
            />
            <Input
              className="mb-1"
              label="Image"
              variant="outlined"
              type="file"
              name="file"
              onChange={onFileChange}
            />
          </div>
          <div className="d-flex flex-col flex-1">
            <div>
              <div className="flex flex-center mb-1">
                <TextField
                  label="Attribute Name"
                  placeholder="Extra attribute name"
                  variant="outlined"
                  name="attrName"
                  onChange={onTextFieldChange}
                  value={state.attrName}
                />
                <TextField
                  className="ml-1"
                  label="Attribute Value"
                  placeholder="Extra attribute value"
                  name="attrValue"
                  variant="outlined"
                  onChange={onTextFieldChange}
                  value={state.attrValue}
                />
                <Button
                  className="ml-1"
                  size="small"
                  variant="outlined"
                  onClick={addAttribute}
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-col">
                {state.attributes.map((attr) => (
                  <div className="flex px-1" key={attr.attrName}>
                    <div className="flex flex-1">
                      <Typography
                        className="px-2"
                        style={{ fontWeight: 600, fontSize: "1em" }}
                        variant="body1"
                      >
                        {attr.attrName}:
                      </Typography>
                    </div>
                    <div className="flex flex-1">
                      <Typography
                        className="px-2"
                        style={{ fontWeight: 600, fontSize: "1em" }}
                        variant="body1"
                      >
                        {attr.attrValue}
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-center pb-2">
          <Button size="large" variant="contained" onClick={createNewMint}>
            Create
          </Button>
        </div>
      </Paper>
    </Dialog>
  );
}
