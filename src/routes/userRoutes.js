const express = require("express");
const { getALlPatients, getAdminUser, postPatientOnUser, deletePatientById, makeAdminUser } = require("../controllers/userController");
const router = express.Router();

router.get("/",getALlPatients)
router.get("/admin",getAdminUser)
router.post("/patient",postPatientOnUser)
router.delete("/:id",deletePatientById)
router.put("/makeAdmin",makeAdminUser)

module.exports = router;