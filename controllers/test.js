const Test = require("../models/test");

exports.getTest = (req, res, next) => {
  res.status(200).json({
    post: [{ title: "test", content: "checkig cors" }],
  });
};
