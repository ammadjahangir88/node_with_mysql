const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mySqlPool = require("./config/db");

// configure dotenv
dotenv.config();

// create express app
const app = express();

// middlewares
app.use(morgan("dev"));
app.use(express.json());

//routes
app.use('/api/v1/product', require('./routes/productRoutes'));

app.get("/test", (req, resp) => {
  resp.status(200).json("Hello World Ammad");
});

//PORT
const PORT = process.env.PORT || 5000;

// conditionally Listen
mySqlPool.query("SELECT 1").then(() => {
  console.log("MySQL DB Connected");
  app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
  });
}).catch((err) => {
  console.log(err);
});
