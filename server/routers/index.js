const router = require("express").Router();
const adminController = require("../controllers/adminController");
const guestController = require("../controllers/guestController");
const roomController = require("../controllers/roomController");
const authentication = require("../middlewares/authentication");

router.get("room/all", roomController.readRooms);
router.get("/room/:id", roomController.readRoom);
router.post("/admin/login", adminController.loginAdmin);

router.use(authentication);

router.post("/admin/register", adminController.registerAdmin);
router.get("/admin/all", adminController.readAdmins);
router.get("/admin/:id", adminController.readAdmin);
router.post("/admin/delete", adminController.deleteAdmin);

router.post("/room/create", roomController.createRoom);
router.post("/room/:id/update", roomController.updateRoom);
router.get("/room/:id/delete", roomController.deleteRoom);

router.post("/guest/create", guestController.createGuest);
router.get("/guest/all", guestController.readGuests);
router.get("/guest/:id", guestController.readGuest);
router.post("/guest/:id/update", guestController.updateGuest);
router.get("/guest/:id/delete", guestController.deleteGuest);

module.exports = router;
