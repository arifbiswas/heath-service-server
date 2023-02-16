const admin = require("firebase-admin");
const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;
const { json } = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
// const stripe = require("stripe")(process.env.STRIPE_SECRET);
const connectDB = require("./src/config/db.config")

const appointmentRoutes = require("./src/routes/appointmentRoutes")

const blogRoutes = require("./src/routes/blogRoutes")
const ordersRoutes = require("./src/routes/orderRoutes")
const reviewRoutes = require("./src/routes/reviewRoutes")
const stripeRoutes = require("./src/routes/stripeRoutes")
const userRoutes = require("./src/routes/userRoutes")

// middleware for cors policy and accepting json fotmat
app.use(cors());
app.use(json());
connectDB()
// firebase admin old method

// const serviceAccount = require("./health-treatment-firebase-sdk.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  }),
});





async function verifyToken(req, res, next) {
 try {
   
  if (req?.headers?.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    // console.log(token);

    try {
      if (token) {
        const decodedUser = await admin.auth().verifyIdToken(token);
        // sending data to request

        req.decodedEmail = decodedUser.email;
        console.log(decodedUser.email)
        next();
      }
    } catch (error) {
      res.status(401).send("Unauthorized");
    }
  }
 } catch (error) {
  console.log(error)
 }
}

// main routes start------------------------

app.use("/appointments",appointmentRoutes)
app.use("/blogs",blogRoutes)
app.use("/orders",ordersRoutes)
app.use("/reviews",reviewRoutes)
app.use("/stripe",stripeRoutes)
app.use("/users",userRoutes)

// main routes end ---------------------

async function run() {
  try {
  
    // to check that if there is any issue or not

    // const database = client.db("your-health-treatment");
    // const blogs = database.collection("blogs");
    // const reviews = database.collection("reviews");
    // const appointments = database.collection("appointments");
    // const orders = database.collection("orders");
    // const users = database.collection("users");

    // Get appointment
    // app.get("/appointments", async (req, res) => {
    //   try {
    //     const query = await appointments.find({});
    //     const result = await query.toArray();
    //     res.send(result);
    //   } catch (error) {
      //   console.log(error)
      // }
    // });

    // Get all users appointments
    // app.get("/userAppointments", async (req, res) => {
    //   try {
    //     const result = await orders.find({});
    //     res.send(result);
    //   } catch (error) {
      //   console.log(error)
      // }
    // });

    // Get an user total appointment
    // app.get("/userTotalAppointment", async (req, res) => {
    //   try {
    //     const email = req.query.email;
    //     const query = { patientEmail: email };
    //     const userAppointments = await orders.find(query);
    //     const result = await userAppointments.toArray();
    //     res.send(result);
    //   } catch (error) {
      //   console.log(error)
      // }
    // });

    //Get today's appointment
    // app.get("/todaysAppointment", async (req, res) => {
    //   try {
    //     const date = new Date(req.query.date);
    //     const query = { date: date.toLocaleDateString() };
    //     const userAppointments = await orders.find(query);
    //     const result = await userAppointments.toArray();
    //     res.send(result);
    //   } catch (error) {
      //   console.log(error)
      // }
    // });

    // Get all Patients //user
    // app.get("/patients", async (req, res) => {
    //   try {
    //     const query = await users.find({});
    //     const result = await query.toArray();
    //     res.send(result);
    //   } catch (error) {
      //   console.log(error)
      // }
    // });

    // delete a patient
    // app.delete("/patients/:id", async (req, res) => {
    //   try {
    //     const id = req.params.id;
    //     const query = { _id: ObjectId(id) };
    //     const result = await users.deleteOne(query);
    //     res.send(result);
    //   } catch (error) {
      //   console.log(error)
      // }
    // });

    // Get reviews
    // app.get("/reviews", async (req, res) => {
    //   try {
    //     const result = await reviews.find({});
    //     res.send(result);
    //   } catch (error) {
    //     console.log(error)
    //   }
    // });
    // test

    // Get blogs
    // app.get("/blogs", async (req, res) => {
    //   try {
    //     const query = await blogs.find({});
    //     const result = await query.toArray();
    //     res.send(result);
    //   } catch (error) {
      //   console.log(error)
      // }
    // });

    // Make an Order
    // app.post("/appointments", async (req, res) => {
    //   try {
    //     const order = req.body;
    //     const result = await orders.insertOne(order);
    //     res.send(result);
    //   } catch (error) {
      //   console.log(error)
      // }
    // });

    // post an user to database
    // app.post("/users", async (req, res) => {
    //   try {
    //     const user = req.body;
    //     const result = await users.insertOne(user);
    //     res.send(result);
    //   } catch (error) {
      //   console.log(error)
      // }
    // });

    // delete appointment
    // app.delete("/appointment/:id", async (req, res) => {
    //   try {
    //     const id = req.params.id;
    //     const query = { _id: ObjectId(id) };
    //     const result = await orders.deleteOne(query);
    //     res.send(result);
    //   } catch (error) {
      //   console.log(error)
      // }
    // });

    // Get userAppointments by email and date
    // app.get("/userappointmentsED", async (req, res) => {
    //   try {
    //     const email = req.query.email;
    //     const date = req.query.date;
    //     const query = { patientEmail: email, date: date };
    //     const userSpecificAppointments = await orders.find(query);
    //     const result = await userSpecificAppointments.toArray();
    //     res.send(result);
    //   } catch (error) {
      //   console.log(error)
      // }
    // });

    // make someone admin
    // app.put("/users/makeAdmin", verifyToken, async (req, res) => {
    //   try {
    //     const user = req.body;
    //     const requester = req.decodedEmail;
    //     // filtering the requester
    //     if (requester) {
    //       const requesterAccount = await users.findOne({ email: requester });
    //       if (requesterAccount.role === "admin") {
    //         const filter = { email: user.email };
    //         const updateDoc = { $set: { role: "admin" } };
    //         const result = await users.updateOne(filter, updateDoc);
    //         res.send(result);
    //       }
    //     } else {
    //       res
    //         .status(403)
    //         .json({ message: "you do not have access to make someone admin!" });
    //     }
    //   } catch (error) {
      //   console.log(error)
      // }
    // });

    // Get admin
    // app.get("/user/:email", async (req, res) => {
    //   try {
    //     const email = req.params.email;
    //     const query = { email: email };
    //     const user = await users.findOne(query);
    //     let isAdmin = false;
    //     if (user?.role === "admin") {
    //       isAdmin = true;
    //     }
    //     res.json({ admin: isAdmin });
    //   } catch (error) {
      //   console.log(error)
      // }
    // });

    // payment related routes
    // Get payment user info
    // app.get("/appointment/:id", async (req, res) => {
    //   try {
    //     const id = req.params.id;
    //     const query = { _id: ObjectId(id) };
    //     const result = await orders.findOne(query);
    //     res.send(result);
    //   } catch (error) {
      //   console.log(error)
      // }
    // });

    // payment post
    // app.post("/create-payment-intent", async (req, res) => {
    //   try {
    //     const price = req.body;
    //     const amount = parseInt(price.price) * 100;
    //     const paymentIntent = await stripe.paymentIntents.create({
    //       currency: "usd",
    //       amount: amount,
    //       automatic_payment_methods: {
    //         enabled: true,
    //       },
    //     });
    //     res.send({
    //       clientSecret: paymentIntent.client_secret,
    //     });
    //   } catch (error) {
      //   console.log(error)
      // }
    // });

    // update appointments orders info to database
    // app.put("/appointment/:id", async (req, res) => {
    //   try {
    //     const id = req.params.id;
    //     const payment = req.body;
    //     const filter = { _id: ObjectId(id) };
    //     const updateDoc = {
    //       $set: {
    //         payment: payment,
    //       },
    //     };
    //     const result = await orders.updateOne(filter, updateDoc);
    //     res.send(result);
    //   } catch (error) {
      //   console.log(error)
      // }
    // });
  } finally {
    // client.close();
  }
}


app.get("/", (req, res) => {
  res.send("This is a server!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
