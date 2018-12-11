const mainRoutes = require("./mainRoutes");

//constructor method to initialize routes
const constructor = app => {
  app.use("/", mainRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructor;
