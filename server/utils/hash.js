const bcrypt = require("bcrypt");

async function hashData(data) {
  let salt = await bcrypt.genSalt(10);
  let hashed = await bcrypt.hash(data, salt);
  return hashed;
}

module.exports = hashData;