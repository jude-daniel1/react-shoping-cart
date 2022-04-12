const bcrypt = require("bcrypt");
const Joi = require("joi");
const router = require("express").Router();
const User = require("../models/user");
const { getAuthToken } = require("../utils/getAuthToken");

router.post("/", async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().max(6).max(200).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const insValid = await bcrypt.compare(req.body.password, user.password);
  if (!insValid) return res.status(400).send("Invalid email or password ...");
  const token = getAuthToken(user);
  res.status(200).json({ token });
});

module.exports = router;
