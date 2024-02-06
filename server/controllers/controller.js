const { Admin } = require("../models");

class Controller {
  static async registerAdmin(req, res, next) {
    try {
      const { email, password } = req.body;
      const payload = { email, password };
      const newAdmin = await Admin.create(payload);
      res.status(201).json({
        id: newAdmin.id,
        email: newAdmin.email,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controller;
