const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./app/configs/dbConnect");   // your DB file
const notificationRoutes = require("./app/routes/sendemailroutes");

dotenv.config();

const app = express();

app.use(cors({
  origin: 'https://bala-119.github.io',
  credentials: true
}));
app.use(express.json());

// connect MongoDB
connectDB();

app.use("/v1/notification", notificationRoutes);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});