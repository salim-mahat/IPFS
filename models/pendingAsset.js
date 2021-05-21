var mongoose = require("mongoose");

const pendingAssetSchema = mongoose.Schema({
  status: {
        type: String,
        enum: ["Pending", "Success"],
        default: "Pending"
      },
  tokenID: {
    type: String,
    unique: true
  },
  address: {
    type: String, 
  },
  Toaddress:{
    type: String,
  },
  assetType: {
    type: String,
    enum: ["Mint", "Transfer"],
    // default: "Mint"
  },
  transaction_hash: {
    type: String,
  },
},{ timestamps: true });

module.exports = mongoose.model("PendingAsset", pendingAssetSchema);
