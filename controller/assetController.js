// // Models
// const Asset = require('../models/asset');




// //function
// module.exports = {


//   //------------------------get uri string---------------------------


//   getURIstring: async (req, res, next) => {
//     try {

//       const { _id } = req.body;
//       const userData = await Asset.findOne({ _id });

//       if (!userData) {
//         return res.status(404).json({status:404, error:"No Data found"});
//       }
//       // success message
//       return res.status(200).json({
//         status:200,
//         message: [userData],
//       });
//     } catch (err) {
//       console.log("Error in Viewing User Data", err.error);
//       return res
//         .status(400)
//         .json({ status:400, error: `"Error in Viewing User Data" ${err.error}` });
//     }
//   },

  
        
        



// }





// Models
const Asset = require('../models/asset');




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
                       assetLink: userData.assetLink,
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

  
        
        



}