const validator = require("validator");

function validateUserSingUp(req) {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    throw new Error("Missing required fields");
  } else if (!validator.isEmail(email)) {
    throw new Error("Invalid email address");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }

  return true;
}

module.exports = {
  validateUserSingUp
};
