const Order = require("../modals/orderSchema");

const getALlUserAppointmentOrders = async (req , res)=>{
    try {
        const result = await Order.find({});
        res.send(result);
      } catch (error) {
        console.log(error)
      }
}
const getSigleUserAppointmentOrders = async(req,res)=>{
    try {
        const email = req.query.email;
        const query = { patientEmail: email };
        const userAppointments = await Order.find(query);
        res.send(userAppointments);
      } catch (error) {
        console.log(error)
      }
};
const getUserTodayOrdersAppointments = async (req , res)=>{
    try {
        const date = new Date(req.query.date);
        const query = { date: date.toLocaleDateString() };
        const userAppointments = await Order.find(query);
        res.send(userAppointments);
    } catch (error) {
        console.log(error)
      }
}
const getAppointmentById = async (req , res)=>{
    try {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const result = await Order.findOne(query);
        res.send(result);
      } catch (error) {
        console.log(error)
      }
}
const getUserappointmentsED = async (req,res)=>{
    try {
        const email = req.query.email;
        const date = req.query.date;
        const query = { patientEmail: email, date: date };
        const userSpecificAppointments = await Order.find(query);
        
        res.send(userSpecificAppointments);
      } catch (error) {
        console.log(error)
      }
}
 
const postOrderOnUser = async (req , res)=>{
    try {
        const order = req.body;
        const result = await Order.create(order);
        res.send(result);
      } catch (error) {
        console.log(error)
      }
};

const deleteUserAppointments = async (req , res)=>{
    try {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const result = await Order.deleteOne(query);
        res.send(result);
      } catch (error) {
        console.log(error)
      }
    
};

const updateAppointmentById = async (req ,res)=>{
    try {
        const id = req.params.id;
        const payment = req.body;
        const filter = { _id: ObjectId(id) };
        const updateDoc = {
          $set: {
            payment: payment,
          },
        };
        const result = await Order.updateOne(filter, updateDoc);
        res.send(result);
      } catch (error) {
        console.log(error)
      }
}



module.exports ={
    getALlUserAppointmentOrders,
    getSigleUserAppointmentOrders,
    getUserTodayOrdersAppointments,
    getAppointmentById,
    getUserappointmentsED,
    postOrderOnUser,
    deleteUserAppointments,
    updateAppointmentById
}