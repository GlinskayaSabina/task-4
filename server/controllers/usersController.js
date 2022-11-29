const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/models");

const generateJwt = (id, email, status) => {
  return jwt.sign({ id, email, status }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};
class UserController {
  async registration(req, res, next) {
    const { email, password, name, status, registration_date } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("incorrect email or password"));
    }
    const condidate = await User.findOne({ where: { email } });
    if (condidate) {
      return next(ApiError.badRequest("user already registered"));
    }
    const hashPassword = await bcrypt.hash(password, 7);
    const user = await User.create({
      email,
      password: hashPassword,
      name,
      status,
      registration_date: new Date(),
    });
    const token = generateJwt(user.id, user.email, user.status);
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

    if (user.status === "blocked") {
      return next(ApiError.badRequest("Your account was blocked"));
    }
    user.last_login_date = new Date();
    user.save();
    const token = generateJwt(user.id, user.email);
    return res.json({ token });
  }
  async check(req, res) {
    const token = generateJwt(req.user.id, req.user.email, req.user.status);
    return res.json({ token });
  }

  async home(req, res) {
    const users = await User.findAll();
    return res.json(users);
  }
  async delete(req, res) {
    const { ids } = req.body;
    const { id } = req.user;

    const users = await User.destroy({
      where: {
        id: [ids],
      },
    });

    if (ids.includes(id)) {
      return res.status(301).json({
        instruction: "logout",
        redirect: "/",
      });
    }

    return res.json(users);
  }
  async block(req, res) {
    const { ids, status } = req.body;
    const { id } = req.user;

    await User.update(
      {
        status: status,
      },
      {
        where: {
          id: ids,
        },
      }
    );

    if (ids.includes(id) && status === "blocked") {
      return res.status(301).json({
        instruction: "logout",
        redirect: "/",
      });
    }

    return res.json(true);
  }
}

module.exports = new UserController();
