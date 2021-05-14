// var mongoose = require("mongoose");

// const assetSchema = mongoose.Schema({
//   UserId: {
//     type: mongoose.Types.ObjectId,
//     required: true,
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   externalURL: {
//     type: String,
//     required: true,
//   },
//   TokenID: {
//     type: String,
//   },
//   address: {
//     type: String,
//   },
//   price: {
//     type: Number,
//   },
//   IPFSHash: {
//     type: String,
//     required: true,
//   },
//   // status: {
//   //   type: String,
//   //   enum: ["CREATED", "ONSALE", "SOLD"],
//   //   default: "CREATED",
//   // },
//   attributes: {
//     type: Array,
//   },
// });

// module.exports = mongoose.model("Asset", assetSchema);


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
  TokenID: {
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
},{ timestamps: true });

module.exports = mongoose.model("Asset", assetSchema);
