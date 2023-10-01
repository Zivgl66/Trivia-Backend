const Joi = require("joi");

const usernameRole = {
  username: Joi.string().min(2).max(255).alphanum().trim().required(),
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
  ...profileImageRole,
  ...isManagerRole,
  ...numberOfRightsRole,
  ...numberOfRightsInARowRole,
});

const validateSignupSchema = (data) => {
  return signupSchema.validateAsync(data, { abortEarly: false });
};
const validateLoginSchema = (data) => {
  return loginSchema.validateAsync(data, { abortEarly: false });
};

module.exports = {
  validateSignupSchema,
  validateLoginSchema,
};
