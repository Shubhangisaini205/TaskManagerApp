require("dotenv").config();
const express = require("express");
const cors = require("cors");
// const { dbConnect } = require("./configs/dbConnect");
const userRoutes = require("./routes/user.routes");
const taskRoutes = require("./routes/task.routes");
const authRoutes = require("./routes/auth.routes");
const passport = require("./configs/passport");
const establishDatabaseConnection = require("./configs/dbConnect");

const server = express();
const PORT = process.env.PORT || 8080;

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));


server.use(passport.initialize());

server.get("/", (req, res) => res.status(200).send("API is running"));
server.use(`/api/users`, establishDatabaseConnection, userRoutes);
server.use(`/api/tasks`, establishDatabaseConnection, taskRoutes);
server.use(`/auth`, establishDatabaseConnection, authRoutes);

server.listen(PORT, async () => {
  // await dbConnect()
  console.log(`server started on port ${PORT}`);
});
