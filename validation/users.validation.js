const Joi = require("joi");

const usernameRole = {
  username: Joi.string().min(2).max(255).alphanum().trim().required(),
};
const nameRole = {
  name: Joi.string().min(2).max(255).alphanum().trim().required(),
};

const passwordRole = {
  password: Joi.string()
    .regex(
      new RegExp(
        "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*() ]).{6,12}$"
      )
    )
    .required(),
};

const isAdminRole = {
  isAdmin: Joi.boolean().required(),
};

const profileImageRole = {
  profileImage: Joi.string().trim().min(1).max(16000),
};

const emailRole = {
  email: Joi.string().email().min(6).max(255).trim().required(),
};

const signupSchema = Joi.object({
  ...usernameRole,
  ...nameRole,
  ...emailRole,
  ...passwordRole,
  ...isAdminRole,
  ...profileImageRole,
});

const loginSchema = Joi.object({
  ...usernameRole,
  ...passwordRole,
});

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
const validateLoginSchema = (data) => {
  return loginSchema.validateAsync(data, { abortEarly: false });
};
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
  validateLoginSchema,
  // validateForgotPasswordSchema,
  // validateRecoveryPasswordSchema,
  // validateRecoveryPasswordValidateEmailSchema,
};
