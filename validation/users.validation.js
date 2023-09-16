const Joi = require("joi");

const usernameRole = {
  username: Joi.string().min(2).max(255).alphanum().trim().required(),
};
const isAdminRole = {
  isAdmin: Joi.boolean().required(),
};
const isManagerRole = {
  isManager: Joi.boolean().required(),
};
const profileImageRole = {
  profileImage: Joi.string().trim().min(1).max(16000),
};
const numberOfRightsRole = {
  numberOfRights: Joi.number().integer(),
};
const numberOfRightsInARowRole = {
  numberOfRightsInARow: Joi.number().integer(),
};

const signupSchema = Joi.object({
  ...usernameRole,
  ...isAdminRole,
  ...profileImageRole,
  ...isManagerRole,
  ...numberOfRightsRole,
  ...numberOfRightsInARowRole,
});
// const loginSchema = Joi.object({
//   ...emailRole,
//   ...passwordRole,
// });
// const forgotPasswordSchema = Joi.object({
//   ...emailRole,
// });
// const recoveryPasswordSchema = Joi.object({
//   ...passwordRole,
// });
// const recoveryPasswordValidateEmailSchema = Joi.object({
//   ...emailRole,
// });

const validateSignupSchema = (data) => {
  return signupSchema.validateAsync(data, { abortEarly: false });
};
// const validateLoginSchema = (data) => {
//   return loginSchema.validateAsync(data, { abortEarly: false });
// };
// const validateForgotPasswordSchema = (data) => {
//   return forgotPasswordSchema.validateAsync(data, { abortEarly: false });
// };
// const validateRecoveryPasswordSchema = (data) => {
//   return recoveryPasswordSchema.validateAsync(data, { abortEarly: false });
// };
// const validateRecoveryPasswordValidateEmailSchema = (data) => {
//   return recoveryPasswordValidateEmailSchema.validateAsync(data, {
//     abortEarly: false,
//   });
// };

module.exports = {
  validateSignupSchema,
  // validateLoginSchema,
  // validateForgotPasswordSchema,
  // validateRecoveryPasswordSchema,
  // validateRecoveryPasswordValidateEmailSchema,
};
