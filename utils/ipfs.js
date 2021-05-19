// const fs = require("fs");
// const path = require("path");
// const request = require("request");
// const IncomingForm = require("formidable").IncomingForm;

// function getErrorMessage(err) {
// 	//print and return error
// 	console.log(err);
// 	var error = {};
// 	var message;
// 	if (err.message) {
// 		message = err.message;
// 	}
// 	if (err.endorsements) {
// 		message = err.endorsements[0].message;
// 	}
// 	error = { status: 0, message: message };
// 	return error;
// }

// async function uploadFile(req) {
// 	return new Promise(function (resolve, reject) {
// 		var form = new IncomingForm();
// 		form.parse(req, async function (_err, fields, files) {
// 			var path = files.file.path;
// 			const options = {
// 				method: "POST",
// 				uri: "http://" + "67.205.174.98" + ":5001/api/v0/add",
// 				headers: {
// 					"Content-Type": "multipart/form-data",
// 				},
// 				formData: {
// 					file: fs.createReadStream(path),
// 				},
// 			};
// 			let result = await doRequest(options);
// 			if (result) {
// 				result = JSON.parse(result);
// 				if (!result.Hash) {
// 					reject("File Upload Error");
// 				} else {
// 					fields.hash = result.Hash;
// 					resolve(fields);
// 				}
// 			} else {
// 				reject("File Upload Error");
// 			}
// 		});
// 	});
// }

// async function doRequest(options) {
// 	return new Promise(function (resolve, reject) {
// 		request(options, function (error, res, body) {
// 			if (!error && res.statusCode === 200) {
// 				resolve(body);
// 			} else {
// 				reject(error);
// 			}
// 		});
// 	});
// }

// async function upload_file(req, res, next) {
// 	try {

// 		const fields = await uploadFile(req)

// 		res.locals.fields = fields
// 		next()

// 		// Submit the specified transaction.
// 		// console.log("\nSubmit " + " transaction with arguments: ", fields);
		
// 		// res.send({
// 		// 	status: 200,
// 		// 	hash: fields.hash,
// 		// });

// 	} catch (err) {
// 		const error = getErrorMessage(err);
// 		res.send(error);
// 	}
// };

// module.exports = upload_file;







const fs = require("fs");
const path = require("path");
const request = require("request");
const IncomingForm = require("formidable").IncomingForm;
const ipfsIP_Address = process.env.ipfsIP_Address

// "67.205.174.98"

// function getErrorMessage(err) {
// 	//print and return error
// 	console.log(err);
// 	var error = {};
// 	var message;
// 	if (err.message) {
// 		message = err.message;
// 	}
// 	if (err.endorsements) {
// 		message = err.endorsements[0].message;
// 	}
// 	error = { status: 0, message: message };
// 	return error;
// }

async function uploadFile(req) {
	return new Promise(function (resolve, reject) {
		var form = new IncomingForm();
		form.parse(req, async function (_err, fields, files) {
			var path = files.file.path;
			const options = {
				method: "POST",
				uri: "http://" + ipfsIP_Address + ":5001/api/v0/add",
				headers: {
					"Content-Type": "multipart/form-data",
				},
				formData: {
					file: fs.createReadStream(path),
				},
			};
			let result = await doRequest(options);
			if (result) {
				result = JSON.parse(result);
				if (!result.Hash) {
					reject("File Upload Error");
				} else {
					fields.hash = result.Hash;
					resolve(fields);
				}
			} else {
				reject("File Upload Error");
			}
		});
	});
}

async function doRequest(options) {
	return new Promise(function (resolve, reject) {
		request(options, function (error, res, body) {
			if (!error && res.statusCode === 200) {
				resolve(body);
			} else {
				reject(error);
			}
		});
	});
}


module.exports = uploadFile;
