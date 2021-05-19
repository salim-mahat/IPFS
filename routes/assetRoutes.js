const { Router } = require("express");



//route instance
const router = Router();


    
//---------------------------asset controller-------------------------

const {
    getURIstring,
    GetAssetsByaddress,
    updateAddressandTokenID,
    TransferOwnership,
    OwnershipTransferedHistory,
    AssetMint,
    PendingAssetMint,
    GetPendingAssetData
    } = require("../controller/assetController");

      

// authentication middelware
const { auth } = require("../middlewares/auth");



//-----------------------------user auth routes-----------------------------------------------
// get uri  
router.get("/getURI/:_id", auth, getURIstring);

// update address and tokenid
router.post("/updateAddressAndTokenID", auth, updateAddressandTokenID);

// get asset data by wallet address from asset table
router.get("/GetAssetByWalletAddress/:address", auth, GetAssetsByaddress);

// update address and tokenid
router.post("/TransferOwnership", auth, TransferOwnership);

// get ownership transfered data
router.get("/GetOwnershipTransferedHistory/:address", auth, OwnershipTransferedHistory);

// mint sset
router.post("/MintAsset", auth, AssetMint);

// mint sset
router.post("/PendingMintAsset", auth, PendingAssetMint);

// get pending asset data by wallet address
router.get("/GetPendingAsset/:address", auth, GetPendingAssetData);




//exporting the user routes
module.exports = router;




