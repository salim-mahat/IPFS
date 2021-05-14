const { Router } = require("express");



//route instance
const router = Router();


    
//---------------------------asset controller-------------------------

const {
    getURIstring,
    GetAssetsByaddress,
    updateAddressandTokenID,
    TransferOwnership,
    OwnershipTransferedHistory
    } = require("../controller/assetController");




// authentication middelware
const { auth } = require("../middlewares/auth");



//-----------------------------user auth routes-----------------------------------------------
// get uri 
router.get("/getURI/:_id", auth, getURIstring);

// update address and tokenid
router.post("/updateAddressAndTokenID", auth, updateAddressandTokenID);

// get asset data
router.get("/GetAssetByWalletAddress/:address", auth, GetAssetsByaddress);

// update address and tokenid
router.post("/TransferOwnership", auth, TransferOwnership);

// get ownership transfered data
router.get("/GetOwnershipTransferedHistory/:address", auth, OwnershipTransferedHistory);





//exporting the user routes
module.exports = router;




