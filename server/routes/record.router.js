const Router = require("express").Router;
const router = new Router();
const recordController = require("../controllers/record.controller");

const multer = require("multer");
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

let upload = multer({ storage: storage }).single("file");

router.get("/records", recordController.getRecords);

router.post("/record", upload, recordController.createRecord);
router.get("/record/:id", recordController.getRecord);
router.put("/record/:id", recordController.editRecord);
router.delete("/record/:id", recordController.deleteRecord);
//console.log(router.stack);
module.exports = router;
