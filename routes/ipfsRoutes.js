const { Router } = require("express");

//route instance
const router = Router();


// ipfs controller function
const {
        UploadFiles,
        downloadFile
      } = require("../controller/ipfscontroller");


      
// authentication middelware
const { auth } = require("../middlewares/auth");


// upload file and get ipfs hash
router.post("/UploadFiles", auth, UploadFiles);

// download file using ipfs hash
router.get("/downloadFile/:hash", auth, downloadFile);




//exporting the user routes
module.exports = router;




