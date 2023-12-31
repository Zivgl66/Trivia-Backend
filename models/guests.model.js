// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// /* create user schema */
// const guestSchema = new Schema({
//   username: { type: String, required: true },
//   profileImage: { type: String, required: true },
//   isManager: { type: Boolean, default: false, required: false },
//   numberOfRights: { type: Number, required: false },
//   numberOfRightsInARow: { type: Number, required: false },
// });

// //create collection
// //all the munipulation on the documents will be using this object
// const Guest = mongoose.model("Guests", guestSchema);

// //this function will create new user
// const insertGuest = (
//   username,
//   profileImage,
//   isManager,
//   numberOfRights,
//   numberOfRightsInARow
// ) => {
//   const guest = new Guest({
//     username,
//     profileImage,
//     isManager,
//     numberOfRights,
//     numberOfRightsInARow,
//   });
//   return guest.save();
// };

// // User collection methods:
// const selectUserByUsername = (username) => {
//   return Guest.findOne({ username: username });
// };

// const selectUserById = (id) => {
//   return Guest.findOne({ _id: id });
// };
// const updateProfileImage = (email, profileImage) => {
//   return Guest.updateOne({ email }, { profileImage });
// };

// const selectAllGuest = () => {
//   return Guest.find();
// };

// const deleteUserById = async (userId) => {
//   return await Guest.findByIdAndDelete(userId);
// };

// module.exports = {
//   insertGuest,
//   selectUserByUsername,
//   selectAllGuest,
//   deleteUserById,
//   selectUserById,
//   updateProfileImage,
// };
