const mongoose = require("mongoose");

module.exports = async (req, res, next) => {
  try {
    // Check if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      const error = new Error("Invalid Parameter");
      error.status = 404;
      throw error;
    }
    next();
  } catch (error) {
    next(error);
  }
};
