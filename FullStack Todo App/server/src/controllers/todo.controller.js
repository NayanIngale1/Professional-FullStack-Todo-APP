const Todo = require("../models/todo.model");
const express = require("express");

const router = express.Router();

// Get all product
router.get("/", async (req, res) => {
  try {
    const data = await Todo.find().lean().exec();

    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

// get one product by id
router.get("/:id", async (req, res) => {
  try {
    const data = await Todo.findById(req.params.id).lean().exec();
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

// Update one by id
router.patch("/:id", async (req, res) => {
  try {
    const data = await Todo.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    })
      .lean()
      .exec();
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

// Delete one by Id
router.delete("/:id", async (req, res) => {
  try {
    const data = await Todo.findByIdAndRemove(req.params.id).lean().exec();
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

// get all by username
router.get("/user/:user", async (req, res) => {
  try {
    const data = await Todo.find({ username: req.params.user }).lean().exec();
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

// //get all by subcategory
// router.get("/sub/:subcategory", async (req, res) => {
//   try {
//     const data = await Todo.find({ sub_category: req.params.subcategory })
//       .lean()
//       .exec();
//     return res.status(200).send(data);
//   } catch (error) {
//     return res.status(500).send({ error: error.message });
//   }
// });

// // get all by tag
// router.get("/tag/:tag", async (req, res) => {
//   try {
//     const data = await Todo.find({ tag: req.params.tag }).lean().exec();
//     return res.status(200).send(data);
//   } catch (error) {
//     return res.status(500).send({ error: error.message });
//   }
// });

// post one by on
router.post("/post", async (req, res) => {
  try {
    const data = await Todo.create(req.body);
    res.status(201).send({ data, status: "success" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

module.exports = router;
