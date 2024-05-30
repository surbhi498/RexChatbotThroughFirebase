// const functions = require("firebase-functions");
// const admin = require("firebase-admin");
// const logger = functions;
// exports.addMessages = functions.https.onRequest((req, res) => {
//   try {
//     logger.log("Recieved RequestData", req);
//     // validate data request
//     if (!req.userid || !req.text) {
//       logger.log("Required Fields are missing");
//       throw new functions.https.HttpsError(
//           "Invalid Request",
//           "Required Fields are missing",
//       );
//     }
//     // add message to database
//     const {userid, text} = req;
//     // construct message data
//     const message = {
//       userid,
//       text,
//       timestamp: admin.firestore.FieldValue.serverTimestamp(),
//     };
//     admin
//         .firestore()
//         .collection("chats")
//         .doc(userid)
//         .collection("messages")
//         .add(message)
//         .then(() => {
//           functions.logger.log("Message Added Successfully");
//           res.status(200).send("Message Added Successfully");
//         })
//         .catch((error) => {
//           functions.logger.log("Error Adding Message", error);
//           res.status(500).send("Error Adding Message: " + error.message);
//         });
//   } catch (error) {
//     functions.logger.log("Error Adding Message", error);
//     res.status(500).send("Error Adding Message: " + error.message);
//   }
// });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
exports.addMessages = functions.https.onRequest((req, res) => {
  try {
    functions.logger.log("Received Request Data", req.body);

    // Validate data request
    if (!req.body.userid || !req.body.text) {
      functions.logger.log("Required Fields are missing");
      throw new functions.https.HttpsError(
          "invalid-argument",
          "Required Fields are missing",
      );
    }

    // Add message to database
    const {userid, text} = req.body;

    // Construct message data
    const message = {
      userid,
      text,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    };

    admin
        .firestore()
        .collection("chats")
        .doc(userid)
        .collection("messages")
        .add(message)
        .then(() => {
          functions.logger.log("Message Added Successfully");
          res.status(200).send("Message Added Successfully");
        })
        .catch((error) => {
          functions.logger.log("Error Adding Message", error);
          res.status(500).send("Error Adding Message: " + error.message);
        });
  } catch (error) {
    functions.logger.log("Error Adding Message", error);
    res.status(500).send("Error Adding Message: " + error.message);
  }
});
