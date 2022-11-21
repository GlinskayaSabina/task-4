const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/models");

const generateJwt = (id, email) => {
  return jwt.sign({ id, email }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};
class UserController {
  async registration(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("incorrect email or password"));
    }
    const condidate = await User.findOne({ where: { email } });
    if (condidate) {
      return next(ApiError.badRequest("user already registered"));
    }
    const hashPassword = await bcrypt.hash(password, 7);
    const user = await User.create({ email, password: hashPassword });
    const token = generateJwt(user.id, user.email);
    return res.json({ token });
  }
  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.badRequest("User not found, please register"));
    }
    let compairPassword = bcrypt.compareSync(password, user.password);
    if (!compairPassword) {
      return next(ApiError.badRequest("Invalid password"));
    }
    const token = generateJwt(user.id, user.email);
    return res.json({ token });
  }
  async check(req, res) {
    const token = generateJwt(req.user.id, req.user.email);
    return res.json({ token });
  }
}

module.exports = new UserController();
