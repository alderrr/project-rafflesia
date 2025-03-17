const { signToken, verifyToken } = require("../helpers/jwt");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { ObjectId } = require("mongodb");

class adminController {
  static async registerAdmin(req, res, next) {
    try {
      const { username, password } = req.body;
      if (!username) {
        throw new Error("Username required");
      }
      if (!password) {
        throw new Error("Password required");
      }
      const foundAdmin = await req.db
        .collection("admins")
        .findOne({ username });
      if (foundAdmin) {
        throw new Error("Username already registered");
      }
      const newAdmin = {
        username: username,
        password: hashPassword(password),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await req.db.collection("admins").insertOne(newAdmin);
      res.status(201).json({
        message: `Admin ${newAdmin.username} registered successfully`,
      });
    } catch (error) {
      next(error);
    }
  }
  static async loginAdmin(req, res, next) {
    try {
      const { username, password } = req.body;
      if (!username) {
        throw new Error("Username required");
      }
      if (!password) {
        throw new Error("Password required");
      }
      const foundAdmin = await req.db
        .collection("admins")
        .findOne({ username });
      if (!foundAdmin) {
        throw new Error("Invalid Username/Password");
      }
      const passwordMatch = comparePassword(password, foundAdmin.password);
      if (!passwordMatch) {
        throw new Error("Invalid Username/Password");
      }
      const access_token = signToken({
        username: foundAdmin.username,
      });
      res.status(200).json({ access_token: access_token });
    } catch (error) {
      next(error);
    }
  }
  static async getAdmins(req, res, next) {
    try {
      const allAdmin = await req.db
        .collection("admins")
        .find({}, { projection: { password: 0 } })
        .toArray();
      res.status(200).json({ admins: allAdmin });
    } catch (error) {
      next(error);
    }
  }
  static async getAdmin(req, res, next) {
    try {
      const _id = req.params.id;
      const foundAdmin = await req.db
        .collection("admins")
        .findOne({ _id: new ObjectId(_id) }, { projection: { password: 0 } });
      if (!foundAdmin) {
        throw new Error("Admin not found");
      }
      res.status(200).json({ admin: foundAdmin });
    } catch (error) {
      next(error);
    }
  }

  static async deleteAdmin(req, res, next) {
    try {
      const { username, password } = req.body;
      if (!username) {
        throw new Error("Username required");
      }
      if (!password) {
        throw new Error("Password required");
      }
      const foundAdmin = await req.db
        .collection("admins")
        .findOne({ username });
      if (!foundAdmin) {
        throw new Error("Admin not found");
      }
      const passwordMatch = comparePassword(password, foundAdmin.password);
      if (!passwordMatch) {
        throw new Error("Invalid Username/Password");
      }
      await req.db.collection("admins").deleteOne({ username });
      res
        .status(200)
        .json({ message: `Admin ${username} deleted successfully` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = adminController;
