const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const configRoutes = require("./routes");
const cors = require("cors");

app.use(cors()); // Use this after the variable declaration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


configRoutes(app);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
