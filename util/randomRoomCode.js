//  Generate a random string with digits and chars (uppercase) depending on length.
const RandomRoomCode = (length) => {
  Math.round(Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))
    .toString(36)
    .slice(1)
    .toUpperCase();
};
module.exports = RandomRoomCode;
