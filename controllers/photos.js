const myPhoto = require("../models/photos");

exports.postPhoto = (req, res, next) => {
  const photo = req.file;

  const newPhoto = new myPhoto({
    photo: photo,
  });

  newPhoto
    .save()
    .then(res.status(201).json({ msg: "uploded", newPhoto }))
    .catch((err) => console.log(err));
};
