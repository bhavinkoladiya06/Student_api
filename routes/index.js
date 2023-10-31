var express = require("express");
var router = express.Router();
var stdReslut=require('../controller/stdController')

/* GET home page. */


router.post("/students", stdReslut.createResult);
router.get("/students", stdReslut.getAllResult);
router.delete("/students/:id", stdReslut.deleteResult);
router.put("/students/:id", stdReslut.updateResult);
module.exports = router;
