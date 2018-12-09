const dbConnection = require("./mongoConnection");

/* Reference to the collection*/
const getCollectionFn = collection => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection();
      _col = await db.collection(collection);
    }

    return _col;
  };
};

module.exports = {
  cues: getCollectionFn("Vimeo-Cues")
};
