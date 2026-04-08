const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./app/configs/dbConnect");   // your DB file
const notificationRoutes = require("./app/routes/sendemailroutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// connect MongoDB
connectDB();

app.use("/v1/notification", notificationRoutes);

app.listen(process.env.PORT, () => {
    console.log(`server running on ${process.env.PORT}`);
});