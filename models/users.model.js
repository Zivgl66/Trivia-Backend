const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* create user schema */
const usersSchema = new Schema({
  username: { type: String, required: true },
  profileImage: { type: String, required: true },
  isAdmin: { type: Boolean, default: false, required: false },
  isManager: { type: Boolean, default: false, required: false },
  numberOfRights: { type: Number, required: false },
  numberOfRightsInARow: { type: Number, required: false },
});

//create collection
//all the munipulation on the documents will be using this object
const Users = mongoose.model("Users", usersSchema);

//this function will create new user
const insertUser = (
  username,
  profileImage,
  isAdmin,
  isManager,
  numberOfRights,
  numberOfRightsInARow
) => {
  const user = new Users({
    username,
    profileImage,
    isAdmin,
    isManager,
    numberOfRights,
    numberOfRightsInARow,
  });
  return user.save();
};

// User collection methods:
const selectUserById = (id) => {
  return Users.findOne({ _id: id });
};
const updateProfileImage = (email, profileImage) => {
  return Users.updateOne({ email }, { profileImage });
};

const selectAllUsers = () => {
  return Users.find();
};

const deleteUserById = async (userId) => {
  return await Users.findByIdAndDelete(userId);
};

module.exports = {
  insertUser,
  selectAllUsers,
  deleteUserById,
  selectUserById,
  updateProfileImage,
};
