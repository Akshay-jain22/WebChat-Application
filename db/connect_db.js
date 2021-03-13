// ----------------------------------------
// import node modules
// ----------------------------------------
const mongoose = require("mongoose");


// ----------------------------------------
// connect database
// ----------------------------------------
mongoose
  .connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("Connected Successfully to Database!"));

mongoose.connection.on("error", (err) => {
  console.log("Database connection error:" + err);
});
