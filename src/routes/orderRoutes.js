const express = require("express");
const { getALlUserAppointmentOrders, getSigleUserAppointmentOrders, getUserTodayOrdersAppointments, getAppointmentById, getUserappointmentsED, postOrderOnUser, deleteUserAppointments, updateAppointmentById } = require("../controllers/orderController");
const router = express.Router();

router.get("/allAppointmentOrders",getALlUserAppointmentOrders)
router.get("/uersAppointmentOrders",getSigleUserAppointmentOrders)
router.get("/todayUserOrder",getUserTodayOrdersAppointments)
router.get("/:id",getAppointmentById)
router.get("/ed",getUserappointmentsED)
router.post("/",postOrderOnUser)
router.delete("/:id",deleteUserAppointments)
router.put("/:id",updateAppointmentById)


module.exports = router;