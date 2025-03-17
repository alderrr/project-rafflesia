const { ObjectId } = require("mongodb");

class roomController {
  static async createRoom(req, res, next) {
    try {
      const { name, floor, ac, price } = req.body;
      if (!name || !floor || !ac || !price) {
        throw new Error("All fields are required");
      }
      const newRoom = {
        name: name,
        floor: floor,
        ac: ac,
        price: price,
        occupied: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const result = await req.db.collection("rooms").insertOne(newRoom);
      res.status(201).json({
        message: `Room ${result.name} created successfully`,
        roomId: result.insertedId,
      });
    } catch (error) {
      next(error);
    }
  }
  static async readRooms(req, res, next) {
    try {
      const allRoom = await req.db.collection("rooms").find().toArray();
      res.status(200).json({ rooms: allRoom });
    } catch (error) {
      next(error);
    }
  }
  static async readRoom(req, res, next) {
    try {
      const _id = req.params._id;
      const foundRoom = await req.db
        .collection("rooms")
        .findOne({ _id: new ObjectId(_id) });
      if (!foundRoom) {
        throw new Error("Room not found");
      }
      res.status(200).json({ room: foundRoom });
    } catch (error) {
      next(error);
    }
  }
  static async updateRoom(req, res, next) {
    try {
      const _id = req.params._id;
      const { name, floor, ac, price, occupied } = req.body;
      const foundRoom = await req.db
        .collection("rooms")
        .findOne({ _id: new ObjectId(_id) });
      if (!foundRoom) {
        throw new Error("Room not found");
      }
      const updatedRoom = {
        name: name,
        floor: floor,
        ac: ac,
        price: price,
        occupied: occupied,
        updatedAt: new Date(),
      };
      await req.db
        .collection("rooms")
        .updateOne({ _id: new ObjectId(_id) }, { $set: updatedRoom });
      res.status(200).json({
        message: `Room ${_id} updated successfully`,
      });
    } catch (error) {
      next(error);
    }
  }
  static async deleteRoom(req, res, next) {
    try {
      const _id = req.params._id;
      const foundRoom = await req.db
        .collection("rooms")
        .findOne({ _id: new ObjectId(_id) });
      if (!foundRoom) {
        throw new Error("Room not found");
      }
      await req.db.collection("rooms").deleteOne({ _id: new ObjectId(_id) });
      res.status(200).json({ message: `Room ${_id} deleted successfully` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = roomController;
