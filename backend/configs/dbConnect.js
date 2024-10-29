const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGOURI;

mongoose.set("strictQuery", true);

const establishDatabaseConnection = async (req, res, next) => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`Database Connected`);
    next();
  } catch (error) {
    console.error(error.message || error);
    return res.send({
      message: "database connection failed",
      statusCode: 500,
      error: error.message || error,
    });
  }
};

module.exports = establishDatabaseConnection;
