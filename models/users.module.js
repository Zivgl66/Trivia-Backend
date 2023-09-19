const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* create user schema */
const usersSchema = new Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profileImage: { type: String, required: true },
  isAdmin: { type: Boolean, default: true, required: false },
});

//create collection
//all the munipulation on the documents will be using this object
const Users = mongoose.model("Users", usersSchema);

//this function will create new user
const insertUser = (username, name, email, password, profileImage, isAdmin) => {
  const user = new Users({
    username,
    name,
    email,
    password,
    profileImage,
    isAdmin,
  });
  return user.save();
};

// User collection methods:
const selectUserByUsername = (username) => {
  return Users.findOne({ username: username });
};

const selectUserById = (id) => {
  return Users.findOne({ _id: id });
};
const updateProfileImage = (email, profileImage) => {
  return Users.updateOne({ email }, { profileImage });
};

const selectAllUsers = () => {
  return Users.find();
};
const selectUserByEmail = (email) => {
  return Users.find({ email });
};

const deleteUserById = async (userId) => {
  return await Users.findByIdAndDelete(userId);
};

module.exports = {
  insertUser,
  selectUserByEmail,
  selectUserByUsername,
  selectAllUsers,
  deleteUserById,
  selectUserById,
  updateProfileImage,
};
