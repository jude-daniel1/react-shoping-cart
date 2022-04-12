const jwt = require("jsonwebtoken");

const getAuthToken = (user) => {
  const secretKey = "secretekeyjwt";
  const token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    secretKey
  );

  return token;
};

module.exports = { getAuthToken };
