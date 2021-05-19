var mongoose = require("mongoose");

const assetSchema = mongoose.Schema({
  UserId: {
    type: mongoose.Types.ObjectId,
    // required: true,
  },
  name: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  externalURL: {
    type: String,
    // required: true,
  },
  tokenID: {
    type: String,
  },
  address: {
    type: String,
  },
  price: {
    type: Number,
  },
  IPFSHash: {
    type: String,
    // required: true,
  },
  // status: {
  //   type: String,
  //   enum: ["CREATED", "ONSALE", "SOLD"],
  //   default: "CREATED",
  // },
  attributes: {
    type: Array,
  },
  ownershipTransferedTo: {
    type: String,
  },
  assetType: {
    type: String,
    enum: ["Mint", "Received"],
    // default: "Mint"
  },
},{ timestamps: true });

module.exports = mongoose.model("Asset", assetSchema);
