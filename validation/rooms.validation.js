const Joi = require("joi");

const roomCodeRole = {
  roomCode: Joi.string().length(4).required(),
};

const isOpenRole = {
  isOpen: Joi.boolean().required(),
};

const isFullRole = {
  isFull: Joi.boolean().required(),
};

const numberOfPlayersRole = {
  numberOfPlayers: Joi.number().integer().required(),
};

const gameIdRole = {
  gameId: Joi.number().integer().required(),
};

const usersRole = {
  users: Joi.array().length(0),
};

const roomSchema = Joi.object({
  ...roomCodeRole,
  ...isOpenRole,
  ...gameIdRole,
  ...isFullRole,
  ...numberOfPlayersRole,
  ...usersRole,
});

const validateRoomSchema = (data) => {
  return roomSchema.validateAsync(data, { abortEarly: false });
};

module.exports = {
  validateRoomSchema,
};
