// // Models
// const Asset = require('../models/asset');


// //function
// module.exports = {


//   //------------------------get uri string---------------------------


//   getURIstring: async (req, res, next) => {
//     try {
      
//       const { _id } = req.params;
//       const userData = await Asset.findOne({ _id });

//       if (!userData) {
//         return res.status(404).json({status:404, error:"No Data found"});
//       }

//       // json to uri
//       function jsonToURI(json){
//         return encodeURIComponent(JSON.stringify(json));
//       }

//       const data = ([{ name: userData.name, 
//                        description: userData.description,   
//                        externalURL:userData.externalURL,   
//                        UserId: userData.UserId, 
//                        IPFSHash: userData.IPFSHash,
//                        attributes: userData.attributes
//                       }])


//       const URI = jsonToURI(data)

//       // success message
//       return res.status(200).json({
//         status:200,
//         message: URI,
//       });
//     } catch (err) {
//       console.log("Error in Viewing User Data", err.error);
//       return res
//         .status(400)
//         .json({ status:400, error: `"Error in Viewing User Data" ${err.error}` });
//     }
//   },

  
        
// // get asset by address
// GetAssetsByaddress: async (req, res, next) => {
//   try {
//     // // logged in user
//     // const { id } = req.user
//     // given data
//     const { address } = req.params
//     // find given address 
//     const assetData = await Asset.find({ address })
//     // if addresses not found
//     if (!assetData) {
//       return res.status(404).json({ status: 404, message: "Asset Data Not Found" });
//     }

//     //success message
//     res.status(200).json({ status: 200, message: assetData })

//   } catch (err) {
//     console.log("Error in getting asset data");
//     return res
//       .status(400)
//       .json({ status: 400, error: `Error in getting asset data ${err.error}` })

//   }
// },



// // update address and TokenID
// updateAddressandTokenID: async (req, res, next) => {
//   try {
   
//        //given data
//     const { _id, address, TokenID } = req.body;
 
//     //asset data
//     const data = await Asset.findOne({ _id });

//     if(!data){
//       return res.status(404).json({status:404, error:"No Data found"});
//     }

//     data.address = address;
//     data.TokenID = TokenID;
//     await data.save();
//     //success message
//     res.status(200).json({status:200, message: "address and TokenID data updated successfully" });
//   } catch (err) {
//     console.log("Error in updating address and TokenID data", err.error);
//     return res
//       .status(400)
//       .json({ status:400, error: `Error in updating address and TokenID data ${err.error}` });
//   }
// },


// // transfer ownership
// TransferOwnership: async(req, res, next) => {
//   try{
//     const {  From, To, TokenID } = req.body;
//     //asset from data
//     const fromAssetData = await Asset.findOne({ TokenID:TokenID  });

//     if(!fromAssetData){
//       return res.status(404).json({status:404, error:"No Asset Data found"});
//     }

//     // // update dta in from sender
//     // fromAssetData.address = "";
//     // fromAssetData.IPFSHash = "";
//     // fromAssetData.downershipTransferedTo = To

//     // create new asset data from transfered ownership
//     const newAsset = await new Asset({
//       // UserId,
//       name: fromAssetData.name,
//       description: fromAssetData.description,
//       externalURL: fromAssetData.externalURL,
//       attributes: fromAssetData.attributes,
//       address: To, 
//       TokenID: TokenID,
//       IPFSHash: fromAssetData.IPFSHash
//     });

//     //save to database 
//     await newAsset.save();  

//     // update dta in from sender
//     fromAssetData.address = "";
//     fromAssetData.IPFSHash = "";
//     fromAssetData.TokenID = "";
//     // fromAssetData.ownershipTransferedTo = To
//     await fromAssetData.save();  

//     //success message
//     res.status(200).json({status:200, message: "Ownership Transfered Successfully" });

//   } catch (err){
//     console.log("Error in transfer ownership", err.error);
//     return res
//       .status(400)
//       .json({ status:400, error: `Error in transfer ownership ${err.error}` });

//   }

// }

// }







// // 22 Models
// const Asset = require('../models/asset');

// const PendingAsset = require('../models/pendingAsset');
 
// const AssetHistory = require('../models/aasetHistory');


// //function
// module.exports = {


//   //------------------------get uri string---------------------------


//   getURIstring: async (req, res, next) => {
//     try {
      
//       const { _id } = req.params;
//       const userData = await Asset.findOne({ _id });

//       if (!userData) {
//         return res.status(404).json({status:404, error:"No Data found"});
//       }

//       // json to uri
//       function jsonToURI(json){
//         return encodeURIComponent(JSON.stringify(json));
//       }

//       const data = ([{ name: userData.name, 
//                        description: userData.description,   
//                        externalURL:userData.externalURL,   
//                        UserId: userData.UserId, 
//                        IPFSHash: userData.IPFSHash,
//                        attributes: userData.attributes
//                       }])


//       const URI = jsonToURI(data)

//       // success message
//       return res.status(200).json({
//         status:200,
//         message: URI,
//       });
//     } catch (err) {
//       console.log("Error in Viewing User Data", err.error);
//       return res
//         .status(400)
//         .json({ status:400, error: `"Error in Viewing User Data" ${err.error}` });
//     }
//   },

  
        
// // get asset by address
// GetAssetsByaddress: async (req, res, next) => {
//   try {
//     // // logged in user
//     // const { id } = req.user
//     // given data
//     const { address } = req.params
//     // find given address 
//     const assetData = await Asset.find({ address })
//     // if addresses not found
//     if (!assetData) {
//       return res.status(404).json({ status: 404, message: "Asset Data Not Found" });
//     }

//     //success message
//     res.status(200).json({ status: 200, message: assetData })

//   } catch (err) {
//     console.log("Error in getting asset data");
//     return res
//       .status(400)
//       .json({ status: 400, error: `Error in getting asset data ${err.error}` })

//   }
// },



// // update address and TokenID
// updateAddressandTokenID: async (req, res, next) => {
//   try {
   
//        //given data
//     const { _id, address, TokenID } = req.body;
 
//     //asset data
//     const data = await Asset.findOne({ _id });

//     if(!data){
//       return res.status(404).json({status:404, error:"No Data found"});
//     }

//     data.address = address;
//     data.TokenID = TokenID;
//     await data.save();
//     //success message
//     res.status(200).json({status:200, message: "address and TokenID data updated successfully" });
//   } catch (err) {
//     console.log("Error in updating address and TokenID data", err.error);
//     return res
//       .status(400)
//       .json({ status:400, error: `Error in updating address and TokenID data ${err.error}` });
//   }
// },


// // transfer ownership
// TransferOwnership: async(req, res, next) => {
//   try{
//     const {  From, To, TokenID } = req.body;
//     //asset from data
//     const fromAssetData = await Asset.findOne({ tokenID:TokenID  });

//     if(!fromAssetData){
//       return res.status(404).json({status:404, error:"No Asset Data found"});
//     }

    
//     // save history to assetHistory

//     // create new asset data from transfered ownership
//     const newAssetHistory = await new AssetHistory({
//       UserId: req.user.id,
//       // name: fromAssetData.name,
//       // description: fromAssetData.description,
//       // externalURL: fromAssetData.externalURL,
//       // attributes: fromAssetData.attributes,
//       address: fromAssetData.address, 
//       tokenID: fromAssetData.tokenID,
//       // IPFSHash: fromAssetData.IPFSHash,
//       ownershipTransferedTo: To
//     });

//     // //save to owenership transfer history database 
//     // await newAssetHistory.save();  

//      const assetType = "Received"

//      // create new asset data from transfered ownership
//      const newAsset = await new Asset({
//       // UserId,
//       name: fromAssetData.name,
//       description: fromAssetData.description,
//       // externalURL: fromAssetData.externalURL,
//       attributes: fromAssetData.attributes,
//       address: To, 
//       tokenID: TokenID,
//       IPFSHash: fromAssetData.IPFSHash,
//       assetType: assetType
//     });

//     //save trnsfered data asset to database 
//     await newAsset.save();

//     //save to owenership transfer history asset history database 
//     await newAssetHistory.save();  

    

//     // update dta in from sender
//     fromAssetData.address = "";
//     fromAssetData.IPFSHash = "";
//     fromAssetData.tokenID = "";
//     // fromAssetData.ownershipTransferedTo = To
//     // save data to asset database
//     await fromAssetData.save();  

//     //success message
//     res.status(200).json({status:200, message: "Ownership Transfered Successfully" });

//   } catch (err){
//     console.log("Error in transfer ownership", err.error);
//     return res
//       .status(400)
//       .json({ status:400, error: `Error in transfer ownership ${err.error}` });

//   }

// },



// // get OwnershipTransferedHistory
// OwnershipTransferedHistory: async (req, res, next) => {
//   try {
//     // // logged in user
//     // const { id } = req.user
//     // given data
//     const { address } = req.params
//     // find given address 
//     const pendingAssetData = await AssetHistory.find({ address })
//     // if addresses not found
//     if (!pendingAssetData) {
//       return res.status(404).json({ status: 404, message: "Ownership Transfered Data Not Found" });
//     }

//     //success message
//     res.status(200).json({ status: 200, message: pendingAssetData })

//   } catch (err) {
//     console.log("Error in getting ownership transfered data");
//     return res
//       .status(400)
//       .json({ status: 400, error: `Error in getting ownership transfered data ${err.error}` })

//   }
// },




// // asset mint
// AssetMint: async(req, res, next) => {
//   try{
//     const {  name, description, IPFSHash, attributes, tokenID, address } = req.body;
    
//     const assetType = "Mint"

//     // find pending asset in pending asset table
//     const pendingAssetData = await PendingAsset.findOne({ tokenID })

//    // if found asset delete data
//     if (pendingAssetData) {

//       await PendingAsset.deleteOne({ _id: pendingAssetData._id });
      
//     }

//      // create new asset data from transfered ownership
//      const newAsset = await new Asset({
//       UserId: req.user.id,
//       name: name,
//       description: description,
//       IPFSHash: IPFSHash,
//       attributes: attributes,
//       tokenID: tokenID,
//       address: address, 
//       assetType: assetType
//     });

//     //save trnsfered data asset to database 
//     await newAsset.save();

//     //success message
//     res.status(200).json({ status:"success", message: "Asset Minted" });

//   } catch (err){
//     console.log("Error in asset mint", err.error);
//     return res
//       .status(400)
//       .json({ status:400, error: `Error in asset mint ${err.error}` });

//   }

// },



// // mint pending asset
// PendingAssetMint: async(req, res, next) => {
//   try{
//     const {  tokenID, address, transaction_hash } = req.body;

//     const assetData = await PendingAsset.findOne({ tokenID })
//     // if addresses not found
//     if (assetData) {
//       return res.status(404).json({ status: 404, message: "Asset tokenID Data Already Exist" });
//     }
    
//      // create new asset data from transfered ownership
//      const newPendingAsset = await new PendingAsset({
//       tokenID: tokenID,
//       address: address, 
//       transaction_hash: transaction_hash
//     });

//     //save trnsfered data asset to database 
//     await newPendingAsset.save();

//     //success message
//     res.status(200).json({ status:"success", message: "Asset Minted in Pending Table" });

//   } catch (err){
//     console.log("Error in asset mint in pending table", err.error);
//     return res
//       .status(400)
//       .json({ status:400, error: `Error in asset mint in pending table ${err.error}` });

//   }

// },


// // get pending asset data by wallet address
// GetPendingAssetData: async (req, res, next) => {
//   try {
//     // // logged in user
//     // const { id } = req.user
//     // given data
//     const { address } = req.params
//     // find given address 
//     const pendingAssetData = await PendingAsset.find({ address })
//     // if addresses not found
//     if (!pendingAssetData) {
//       return res.status(404).json({ status: 404, message: "No Any Pending Asset Data Found" });
//     }

//     //success message
//     res.status(200).json({ status: 200, message: pendingAssetData })

//   } catch (err) {
//     console.log("Error in getting ownership transfered data");
//     return res
//       .status(400)
//       .json({ status: 400, error: `Error in getting ownership transfered data ${err.error}` })

//   }
// },


// }





// 22 Models
const Asset = require('../models/asset');

const PendingAsset = require('../models/pendingAsset');
 
const AssetHistory = require('../models/aasetHistory');


//function
module.exports = {


  //------------------------get uri string---------------------------


  getURIstring: async (req, res, next) => {
    try {
      
      const { _id } = req.params;
      const userData = await Asset.findOne({ _id });

      if (!userData) {
        return res.status(404).json({status:404, error:"No Data found"});
      }

      // json to uri
      function jsonToURI(json){
        return encodeURIComponent(JSON.stringify(json));
      }

      const data = ([{ name: userData.name, 
                       description: userData.description,   
                       externalURL:userData.externalURL,   
                       UserId: userData.UserId, 
                       IPFSHash: userData.IPFSHash,
                       attributes: userData.attributes
                      }])


      const URI = jsonToURI(data)

      // success message
      return res.status(200).json({
        status:200,
        message: URI,
      });
    } catch (err) {
      console.log("Error in Viewing User Data", err.error);
      return res
        .status(400)
        .json({ status:400, error: `"Error in Viewing User Data" ${err.error}` });
    }
  },

  
        
// get asset by address
GetAssetsByaddress: async (req, res, next) => {
  try {
    // // logged in user
    // const { id } = req.user
    // given data
    const { address } = req.params
    // find given address 
    const assetData = await Asset.find({ address })
    // if addresses not found
    if (!assetData) {
      return res.status(404).json({ status: 404, message: "Asset Data Not Found" });
    }

    //success message
    res.status(200).json({ status: 200, message: assetData })

  } catch (err) {
    console.log("Error in getting asset data");
    return res
      .status(400)
      .json({ status: 400, error: `Error in getting asset data ${err.error}` })

  }
},



// update address and TokenID
updateAddressandTokenID: async (req, res, next) => {
  try {
   
       //given data
    const { _id, address, TokenID } = req.body;
 
    //asset data
    const data = await Asset.findOne({ _id });

    if(!data){
      return res.status(404).json({status:404, error:"No Data found"});
    }

    data.address = address;
    data.TokenID = TokenID;
    await data.save();
    //success message
    res.status(200).json({status:200, message: "address and TokenID data updated successfully" });
  } catch (err) {
    console.log("Error in updating address and TokenID data", err.error);
    return res
      .status(400)
      .json({ status:400, error: `Error in updating address and TokenID data ${err.error}` });
  }
},


// transfer ownership
TransferOwnership: async(req, res, next) => {
  try{
    const {  From, To, TokenID } = req.body;
    //asset from data
    const fromAssetData = await Asset.findOne({ tokenID:TokenID  });

    if(!fromAssetData){
      return res.status(404).json({status:404, error:"No Asset Data found"});
    }


    // find pending asset in pending asset table
    const pendingAssetData = await PendingAsset.findOne({ tokenID:TokenID })

   // if found asset delete data
    if (pendingAssetData) {

      await PendingAsset.deleteOne({ _id: pendingAssetData._id });
      
    }

    
    // save history to assetHistory

    // create new asset data from transfered ownership
    const newAssetHistory = await new AssetHistory({
      UserId: req.user.id,
      // name: fromAssetData.name,
      // description: fromAssetData.description,
      // externalURL: fromAssetData.externalURL,
      // attributes: fromAssetData.attributes,
      address: fromAssetData.address, 
      tokenID: fromAssetData.tokenID,
      // IPFSHash: fromAssetData.IPFSHash,
      ownershipTransferedTo: To
    });

    // //save to owenership transfer history database 
    // await newAssetHistory.save();  

     const assetType = "Received"

     // create new asset data from transfered ownership
     const newAsset = await new Asset({
      // UserId,
      name: fromAssetData.name,
      description: fromAssetData.description,
      // externalURL: fromAssetData.externalURL,
      attributes: fromAssetData.attributes,
      address: To, 
      tokenID: TokenID,
      IPFSHash: fromAssetData.IPFSHash,
      assetType: assetType
    });

    //save trnsfered data asset to database 
    await newAsset.save();

    //save to owenership transfer history asset history database 
    await newAssetHistory.save();  

    

    // update dta in from sender
    fromAssetData.address = "";
    fromAssetData.IPFSHash = "";
    fromAssetData.tokenID = "";
    // fromAssetData.ownershipTransferedTo = To
    // save data to asset database
    await fromAssetData.save();  

    //success message
    res.status(200).json({status:200, message: "Ownership Transfered Successfully" });

  } catch (err){
    console.log("Error in transfer ownership", err.error);
    return res
      .status(400)
      .json({ status:400, error: `Error in transfer ownership ${err.error}` });

  }

},



// get OwnershipTransferedHistory
OwnershipTransferedHistory: async (req, res, next) => {
  try {
    // // logged in user
    // const { id } = req.user
    // given data
    const { address } = req.params
    // find given address 
    const pendingAssetData = await AssetHistory.find({ address })
    // if addresses not found
    if (!pendingAssetData) {
      return res.status(404).json({ status: 404, message: "Ownership Transfered Data Not Found" });
    }

    //success message
    res.status(200).json({ status: 200, message: pendingAssetData })

  } catch (err) {
    console.log("Error in getting ownership transfered data");
    return res
      .status(400)
      .json({ status: 400, error: `Error in getting ownership transfered data ${err.error}` })

  }
},




// asset mint
AssetMint: async(req, res, next) => {
  try{
    const {  name, description, IPFSHash, attributes, tokenID, address } = req.body;
    
    const assetType = "Mint"

    // find pending asset in pending asset table
    const pendingAssetData = await PendingAsset.findOne({ tokenID })

   // if found asset delete data
    if (pendingAssetData) {

      await PendingAsset.deleteOne({ _id: pendingAssetData._id });
      
    }

     // create new asset data from transfered ownership
     const newAsset = await new Asset({
      UserId: req.user.id,
      name: name,
      description: description,
      IPFSHash: IPFSHash,
      attributes: attributes,
      tokenID: tokenID,
      address: address, 
      assetType: assetType
    });

    //save trnsfered data asset to database 
    await newAsset.save();

    //success message
    res.status(200).json({ status:"success", message: "Asset Minted" });

  } catch (err){
    console.log("Error in asset mint", err.error);
    return res
      .status(400)
      .json({ status:400, error: `Error in asset mint ${err.error}` });

  }

},



// mint pending asset
PendingAssetMint: async(req, res, next) => {
  try{
    const {  tokenID, address, transaction_hash, assetType, Toaddress } = req.body;

    const assetData = await PendingAsset.findOne({ tokenID })
    // if addresses not found
    if (assetData) {
      return res.status(404).json({ status: 404, message: "Asset tokenID Data Already Exist" });
    }
    
     // create new asset data from transfered ownership
     const newPendingAsset = await new PendingAsset({
      tokenID: tokenID,
      address: address, 
      transaction_hash: transaction_hash,
      assetType: assetType,
      Toaddress:Toaddress
    });

    //save trnsfered data asset to database 
    await newPendingAsset.save();

    //success message
    res.status(200).json({ status:"success", message: "Asset Minted in Pending Table" });

  } catch (err){
    console.log("Error in asset mint in pending table", err.error);
    return res
      .status(400)
      .json({ status:400, error: `Error in asset mint in pending table ${err.error}` });

  }

},


// get pending asset data by wallet address
GetPendingAssetData: async (req, res, next) => {
  try {
    // // logged in user
    // const { id } = req.user
    // given data
    const { address } = req.params
    // find given address 
    const pendingAssetData = await PendingAsset.find({ address })
    // if addresses not found
    if (!pendingAssetData) {
      return res.status(404).json({ status: 404, message: "No Any Pending Asset Data Found" });
    }

    //success message
    res.status(200).json({ status: 200, message: pendingAssetData })

  } catch (err) {
    console.log("Error in getting ownership transfered data");
    return res
      .status(400)
      .json({ status: 400, error: `Error in getting ownership transfered data ${err.error}` })

  }
},


}