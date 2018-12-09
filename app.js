const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const static = express.static(__dirname + "/public");

const configRoutes = require("./routes");
const cors = require("cors");
const exphbs = require("express-handlebars");
app.use(cors()); // Use this after the variable declaration
app.use(bodyParser.json());

app.use("/", static); //this is a static asset that needs to be referenced with the css file

app.use(bodyParser.urlencoded({ extended: true }));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
configRoutes(app);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
