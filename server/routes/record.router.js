const Router = require("express").Router;
const router = new Router();
const recordController = require("../controllers/record.controller");
//const authMiddleware = require("../middlewares/auth.middleware");

router.get("/records", recordController.getRecords);

router.post("/record", recordController.createRecord);
router.get("/record/:id", recordController.getRecord);
router.put("/record/:id", recordController.editRecord);
router.delete("/record/:id", recordController.deleteRecord);
//console.log(router.stack);
module.exports = router;
