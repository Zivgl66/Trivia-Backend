//  Generate a random string with digits and chars (uppercase) depending on length.
const randomRoomCode = (length) => {
  return Math.round(
    Math.pow(36, length + 1) - Math.random() * Math.pow(36, length)
  )
    .toString(36)
    .slice(1)
    .toUpperCase();
};

// Generate a unique room code
const getRandomCode = async (rooms) => {
  let randomCode = "";
  let found = {};
  while (found) {
    randomCode = randomRoomCode(4);
    found = await rooms.findOne({ roomCode: randomCode });
  }
  return randomCode;
};

module.exports = getRandomCode;
