var mongoose = require("mongoose");

const assetHistorySchema = mongoose.Schema({
  UserId: {
    type: mongoose.Types.ObjectId,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  externalURL: {
    type: String,
  },
  TokenID: {
    type: String,
  },
  address: {
    type: String,
  },
  IPFSHash: {
    type: String,
  },
  attributes: {
    type: Array,
  },
  ownershipTransferedTo: {
    type: String,
  },
});

module.exports = mongoose.model("AssetHistory", assetHistorySchema);
