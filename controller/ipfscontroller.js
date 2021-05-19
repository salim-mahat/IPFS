// const uploadFile = require("../utils/ipfs");


// //function
// module.exports = {
// // upload file 
// UploadFiles: async (req, res, next) => {
//     try {

//         const fields = await uploadFile(req)
        
//         // res.locals.fields = fields
// 		// next()
//       //success message
//       res.status(200).json({ status:"success", message: fields })
  
//     } catch (err) {
//       console.log("Error in uploading files");
//       return res
//         .status(400)
//         .json({ status: 400, error: `Error in uploading files ${err.error}` })
  
//     }
//   },





// }


const uploadFile = require("../utils/ipfs");
const ipfsIP_Address = process.env.ipfsIP_Address
const request = require("request");

//function
module.exports = {
// upload file 
UploadFiles: async (req, res, next) => {
    try {

        const fields = await uploadFile(req)
        
        // res.locals.fields = fields
		// next()
      //success message
      res.status(200).json({ status:"success", message:"Hash Created", data:fields })
  
    } catch (err) {
      console.log("Error in uploading files");
      return res
        .status(400)
        .json({ status: 400, error: `Error in uploading files ${err.error}` })
  
    }
},


// download file
downloadFile: async (req, res, next) => {
  try {

    // console.log("\Download " + " transaction: ");

		const hash = req.params.hash;
		// console.log("username " + username);
		// console.log("hash " + hash);

		res.setHeader("content-disposition", "attachment; filename=ttt.docx");         
		request("http://52.14.165.133:8080/ipfs/"+hash).pipe(res);

    //  request("http://34.72.65.255:8080/ipfs/"+hash).pipe(res);
		
    // //success message
    // res.status(200).json({ status:"success", message:"downloades successfully" })

  } catch (err) {
    console.log("Error in download files");
    return res
      .status(400)
      .json({ status: 400, error: `Error in download files ${err.error}` })

  }
},




}


