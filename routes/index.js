const mainRoutes = require("./mainRoutes");

const constructor = app => {
  app.use("/", mainRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructor;
