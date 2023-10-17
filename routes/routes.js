const express = require("express");
const router = express.Router();
const {
  getallemp,
  getAllPvt,
  postemp,
  getemp,
  createEmp,
  createPvt,
} = require("../controllers/getall");

const {
  privateemp,
  createprivateemp,
} = require("../controllers/getempprivate");
const postmail = require("../controllers/mailservice");
const login = require("../controllers/login");
const register = require("../controllers/register");

router.route("/").get(getallemp).post(postemp);
router.route("/allpvt").get(getAllPvt);
router.route("/getmail").get(postmail);
router.route("/gets").get(privateemp).post(createprivateemp);
router.route("/login").post(login);
router.route("/register").post(register);
router.route("/:id").get(getemp);
router.route("/createEmp").post(createEmp);
router.route("/createPvt").post(createPvt);

module.exports = router;
