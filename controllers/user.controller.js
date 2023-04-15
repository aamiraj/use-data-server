const { body, validationResult } = require("express-validator");
const dbconnect = require("../utils/dbConnect");
const randomNumberGenerator = require("../utils/randomNumberGenerator");
const data = dbconnect.dataCollection();

const getAllUsers = (req, res, next) => {
  const limit = req.query.limit;
  if (limit) {
    const limitedData = data.slice(0, limit);
    res.status(200).send({ status: true, data: limitedData });
    return;
  }
  res.status(200).send({ status: true, data: data });
};

const getAUser = (req, res, next) => {
  const id = req.params.id;
  const result = data.find((user) => user._id === id);
  res.status(200).send({ status: true, data: result });
};

const getARandomUser = (req, res, next) => {
  const id = randomNumberGenerator(1, data.length, 10).toString();
  const result = data.find((user) => user._id === id);
  res.status(200).send({ status: true, data: result });
};

const saveAUser = (req, res, next) => {
  const userData = req.body;

  if (userData) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).send({
        status: false,
        errors: errors,
      });
      return;
    }

    const userDataWithId = { _id: (data.length + 1).toString(), ...userData };
    data.push(userDataWithId);
    dbconnect.addToData(data);
    res.status(201).send({
      status: true,
      data: { savedUser: 1, message: "User is added." },
    });
  } else {
    res.status(200).send({
      status: false,
      data: { savedUser: 0, message: "Request body does not contain user." },
    });
  }
};

const updateAUser = (req, res, next) => {
  const updateData = req.body;
  const id = req.params.id;
  const userData = data.find((user) => user._id === id);
  const remainingUsers = data.filter((user) => user._id !== id);

  if (userData) {
    for (key1 of Object.keys(userData)) {
      for ([key2, value] of Object.entries(updateData)) {
        if (key1 === key2) {
          userData[key1.toString()] = value;
        }
      }
    }
  } else {
    res
      .status(200)
      .send({ status: false, messege: "No user found with this id." });
    return;
  }

  remainingUsers.push(userData);
  dbconnect.addToData(remainingUsers);

  res.status(200).send({
    status: true,
    messege: "Successfully updated user.",
    data: userData,
  });
};

const updateMultipleUsers = (req, res, next) => {
  const multipleUsersData = req.body;

  for (let updateData of multipleUsersData) {
    const id = updateData._id;
    const userData = data.find((u) => u._id === id);

    if (userData) {
      for (key1 of Object.keys(userData)) {
        for ([key2, value] of Object.entries(updateData)) {
          if (key1 === key2) {
            userData[key1.toString()] = value;
          }
        }
      }
    }
  }

  dbconnect.addToData(data);

  res.status(200).send({ status: true, data: data, messege: "Multiple users updated successfully." });
};

const deleteAUser = (req, res, next) => {
  const id = req.params.id;
  const userData = data.find((user) => user._id === id);

  if (userData) {
    const remainingUsers = data.filter((user) => user._id !== id);
    dbconnect.addToData(remainingUsers);
    res.status(200).send({
      status: true,
      message: "User deleted successfully.",
      deletedCount: 1,
    });
  } else {
    res
      .status(200)
      .send({ status: false, messege: "No user found with this id." });
  }
};

const validate = (method) => {
  switch (method) {
    case "saveAUser": {
      return [
        body("photoUrl", "'photoUrl' is missing.").exists().notEmpty(),
        body("name", "'name' is missing.").exists().notEmpty(),
        body("gender", "'gender' is missing.")
          .exists()
          .isIn(["male", "female"]),
        body("contact", "'contact' is missing.").exists().notEmpty(),
        body("address", "'address' is missing.").exists().notEmpty(),
      ];
    }
    default:
      return;
  }
};

module.exports = {
  getAllUsers,
  getAUser,
  getARandomUser,
  saveAUser,
  updateAUser,
  updateMultipleUsers,
  deleteAUser,
  validate,
};
