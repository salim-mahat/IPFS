const { Router } = require("express");



//route instance
const router = Router();


    
//---------------------------asset controller-------------------------

const {
    getURIstring,
    } = require("../controller/assetController");




// authentication middelware
const { auth } = require("../middlewares/auth");



//-----------------------------user auth routes-----------------------------------------------
// user signup
router.get("/getURI/:_id", auth, getURIstring);



//exporting the user routes
module.exports = router;




