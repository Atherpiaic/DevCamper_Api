const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");
const color = require("colors");
// const logger = require("./middleware/logger");
const morgan = require("morgan");
const errorHandler = require("./middleware/error");
//Fileupload
const fileupload = require("express-fileupload");

// load env vars
dotenv.config({ path: "./config/config.env" });
connectDB();
const app = express();

// Route Files
const bootcamps = require("./routes/bootcamps");
const Courses = require("./routes/Courses");
const auth = require("./routes/auth");
const users = require("./routes/users");
const reviews = require("./routes/reviews");

// File uploading
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  console.log("deve rn---" + ` ${process.env.GEOCODER_API_KEY} `);
  app.use(morgan("dev"));
}

// app.use(logger);
// Mounts Route
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/Courses", Courses);
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/reviews", reviews);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode one port ${PORT} with goe ${process.env.GEOCODER_PROVIDER} and ${process.env.GEOCODER_API_KEY} `
      .gray.underline.bold
  )
);

//Handle unhandled promise rejeection
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error:  ${err.message}`);
  //close server & exit process
  server.close(() => process.exit(1));
});
