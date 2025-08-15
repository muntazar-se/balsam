const express = require("express");
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
const userRoute = require("./routers/userRoute");
const adminRoute = require("./routers/adminRoute");
const doctorRoute = require("./routers/doctorsRoute");
const path = require("path");

app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/doctor", doctorRoute);
console.log("hello");


if (process.env.NODE_ENV === "production") {
 
  app.use("/", express.static("client/build"));


  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
  });
}

const port = process.env.PORT || 5800;

app.listen(port, () => console.log(`Server is running on port ${port}`));



