const Router = require("express").Router;
const router = new Router();
const record = require("./record.router");

router.use(record);

//console.log(router);
module.exports = router;
