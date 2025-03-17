const { signToken, verifyToken } = require("../helpers/jwt");

const authentication = async (req, res, next) => {
  try {
    let access_token = req.headers.authorization;
    if (!access_token) {
      throw new Error("Invalid token");
    }
    access_token = access_token.split(" ")[1];
    const verified = verifyToken(access_token);
    const foundAdmin = await req.db
      .collection("admins")
      .findOne({ username: verified.username });
    if (!foundAdmin) {
      throw new Error("Invalid token");
    }
    req.user = {
      _id: foundAdmin._id,
      username: foundAdmin.username,
    };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
