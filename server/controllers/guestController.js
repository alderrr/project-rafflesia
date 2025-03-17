const { ObjectId } = require("mongodb");

class guestController {
  static async createGuest(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  static async readGuests(req, res, next) {
    try {
      const allGuest = await req.db.collection("guests").find().toArray();
      res.status(200).json({ rooms: allGuest });
    } catch (error) {
      next(error);
    }
  }
  static async readGuest(req, res, next) {
    try {
      const _id = req.params._id;
      const foundGuest = await req.db
        .collection("guests")
        .findOne({ _id: new ObjectId(_id) });
      if (!foundGuest) {
        throw new Error("Guest not found");
      }
      res.status(200).json({ room: foundGuest });
    } catch (error) {
      next(error);
    }
  }
  static async updateGuest(req, res, next) {
    try {
      const _id = req.params._id;
      const { name, idcard, dob } = req.body;
      const foundGuest = await req.db
        .collection("guests")
        .findOne({ _id: new ObjectId(_id) });
      if (!foundGuest) {
        throw new Error("Guest not found");
      }
      const updatedGuest = {
        name: name,
        idcard: idcard,
        dob: dob,
        updatedAt: new Date(),
      };
      await req.db
        .collection("guests")
        .updateOne({ _id: new ObjectId(_id) }, { $set: updatedGuest });
      res.status(200).json({ message: `Guest ${_id} updated successfully` });
    } catch (error) {
      next(error);
    }
  }
  static async deleteGuest(req, res, next) {
    try {
      const _id = req.params._id;
      const foundGuest = await req.db
        .collection("guests")
        .findOne({ _id: new ObjectId(_id) });
      if (!foundGuest) {
        throw new Error("Guest not found");
      }
      await req.db.collection("guests").deleteOne({ _id: new ObjectId(_id) });
      res.status(200).json({ message: `Guest ${_id} deleted successfully` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = guestController;
