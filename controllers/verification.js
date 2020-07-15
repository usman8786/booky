// var nodemailer = require("nodemailer");
// const verificationsController = {};
// const Verification = require("../models/verification");
// const Users = require("../models/users.model");
// var jwt = require("jsonwebtoken");

// verificationsController.sendVerificationCode = async (req, res) => {
//   try {
//     const body = req.body;
//     const email = body.email;
//     const verifiedUser = await Users.findOne({
//       email: email,
//       verified: true,
//     });
//     if (verifiedUser) {
//       userId = verifiedUser._id;
//       existedEmail = verifiedUser.email;
//       await saveVerificationCode(userId, existedEmail, res);
//     } else if (!verifiedUser) {
//       try {
//         const user = new Users(body);
//         const newUser = await user.save();
//         userId = newUser._id;
//         existedEmail = newUser.email;
//         await saveVerificationCode(userId, existedEmail, res);
//       } catch (err) {
//         console.log("err", err);
//         if (err.name == "MongoError" && err.code == 11000) {
//           const user = await Users.findOne({ email: email });
//           userId = user._id;
//           existedEmail = user.email;
//           await saveVerificationCode(userId, existedEmail, res);
//         }
//       }
//     }
//   } catch (err) {
//     res.status(500).send({
//       message: err,
//     });
//   }
// };

// async function saveVerificationCode(userId, email, res) {
//   try {
//     const token = jwt.sign({}, "SecretjwtKey", { expiresIn: "1d" });
//     var random6DigitCode = Math.floor(100000 + Math.random() * 900000);

//     var body = {
//       token: token,
//       verificationCode: random6DigitCode,
//       userId: userId,
//     };
//     const verificationCode = new Verification(body);
//     const code = await Verification.findOneAndDelete({
//       userId: userId,
//     });
//     if (code) {
//       const newCode = await verificationCode.save();
//       await sendMessage(newCode.verificationCode, email, userId, res);
//     } else if (!code) {
//       const new1Code = await verificationCode.save();
//       await sendMessage(new1Code.verificationCode, email, userId, res);
//     }
//   } catch (error) {
//     res.status(500).send({
//       message: error,
//     });
//   }
// }
// verificationsController.verifyCode = async (req, res) => {
//   try {
//     const userId = req.body.userId;
//     const verificationCode = req.body.verificationCode;
//     const verify = await Verification.findOne({
//       userId: userId,
//       verificationCode: verificationCode,
//     });

//     if (verify) {
//       const id = verify.userId;
//       const token = verify.token;
//       const codeId = verify._id;
//       const decoded = jwt.verify(token, "SecretjwtKey", async function (
//         err,
//         decoded
//       ) {
//         if (err) {
//           res.status(500).send({
//             message: "Code has been expired",
//           });
//         } else if (decoded) {
//           try {
//             const user = await Users.findById(id);
//             if (!user.verified) {
//               const verifiedUser = await Users.updateOne(
//                 {
//                   _id: id,
//                 },
//                 {
//                   $set: { verified: true },
//                 },
//                 {
//                   upsert: true,
//                   runValidators: true,
//                 }
//               );
//             }

//             const del = await Verification.findOneAndDelete({
//               _id: codeId,
//             });

//             res.send({
//               message: "Logged in successfully",
//               user: user,
//             });
//           } catch (error) {
//             res.status(500).send({
//               message: error,
//             });
//           }
//         }
//       });
//     } else if (!verify) {
//       res.status(404).send({
//         message: "Invalid code",
//       });
//     }
//   } catch (error) {
//     res.status(500).send({
//       message: error,
//     });
//   }
// };
// function sendMessage(code, email, userId, res) {
//   /*                        NATIONAL/INTERNATIONAL                       */
//   /*                           thumb-crowd.com                           */
//   var to = email;
//   var msg = `${code} is your verification code for eBusiness.`;

//   var transporter = nodemailer.createTransport({
//     service: "gmail.com",
//     auth: {
//       user: "ebusiness.auth.verify@gmail.com",
//       pass: "ebusiness@56",
//     },
//   });
//   var mailOptions = {
//     from: "ebusiness.auth.verify@gmail.com",
//     to: to,
//     subject: "Verification Email",
//     text: msg,
//   };
//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log(error);
//       res.status(500).send({
//         message: "Email not sent",
//         error: error,
//       });
//     } else {
//       res.status(200).send({
//         message:
//           "Verification code has been sent to your email, Please check your email.",
//         info: info,
//         id: userId,
//       });
//     }
//   });
// }

// verificationsController.resend = async (req, res) => {
//   try {
//     userId = req.body.id;
//     email = req.body.email;
//     await saveVerificationCode(userId, email, res);
//   } catch (error) {
//     res.status(500).send({
//       message: error,
//     });
//   }
// };
// module.exports = verificationsController;
