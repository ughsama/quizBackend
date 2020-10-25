const express = require("express");
const User = require("../models/user");
const Quiz = require("../models/quiz");
const router = express.Router();

// Fetch data //GET
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch {
    res.status(404);
    res.send({ error: "Something went wrong!" });
  }
});

router.get("/quizzes", async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.send(quizzes);
  } catch {
    res.status(404);
    res.send({ error: "Something went wrong!" });
  }
});

// Create data //POST

router.post("/users", async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    await user.save();
    res.send(user);
  } catch {
    res.status(404);
    res.send({ error: "Something went wrong!" });
  }

  console.log("single user created");
});

router.post("/quizzes", async (req, res) => {
  try {
    const quiz = new Quiz({
      name: req.body.name,
      _data: req.body._data,
    });
    await quiz.save();
    res.send(quiz);
  } catch {
    res.status(404);
    res.send({ error: "Something went wrong!" });
  }

  console.log("single quiz created");
});

// Find One //GET
router.get("/users/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    res.send(user);
  } catch {
    res.status(404);
    res.send({ error: "User doesn't exist!" });
  }
});

router.get("/quizzes/:name", async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ name: req.params.name });
    res.send(quiz);
  } catch {
    res.status(404);
    res.send({ error: "User doesn't exist!" });
  }
});

// Update data //PATCH

router.patch("/users/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });

    if (req.body.name) {
      user.name = req.body.name;
    }

    if (req.body.email) {
      user.email = req.body.email;
    }
    if (req.body.history) {
      user.history = req.body.history;
    }

    await user.save();
    res.send(user);
  } catch {
    res.status(404);
    res.send({ error: "User doesn't exist!" });
  }
});

router.patch("/quizzes/:name", async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ name: req.params.name });

    if (req.body.name) {
      quiz.name = req.body.name;
    }

    if (req.body._data) {
      quiz._data = req.body._data;
    }

    await quiz.save();
    res.send(quiz);
  } catch {
    res.status(404);
    res.send({ error: "Quiz doesn't exist!" });
  }
});

//Delete data //DELETE

router.delete("/users/:email", async (req, res) => {
  try {
    await User.deleteOne({ email: req.params.email });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "User doesn't exist!" });
  }
});

router.delete("/quizzes/:name", async (req, res) => {
  try {
    await Quiz.deleteOne({ name: req.params.name });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Quiz doesn't exist!" });
  }
});

//LOGIN USER

router.post("/users/login/", async (req, res) => {
  try {
    let email = req.body.email;
    const user = await User.findOne({ email: email });
    if (user.password == req.body.password) {
      res.send(user);
    } else {
      res.status(400);
      res.send({ error: "password incorrect" });
    }
  } catch {
    res.status(404);
    res.send({ error: "User doesn't exist!" });
  }
});

//SIGNUP USER

router.post("/users/signup/", async (req, res) => {
  try {
    let email = req.body.email;
    const user = await User.findOne({ email: email });
    if (user) {
      res.send({ error: "email already exists!", code: "exists" });
    } else {
      try {
        const user = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });
        await user.save();
        res.send(user);
      } catch {
        res.status(404);
        res.send({ error: "Something went wrong!" });
      }
    }
  } catch {
    res.status(404);
    res.send({ error: "User doesn't exist!" });
  }
});

//UPDATE USER HISTORY

router.patch("/users/updateHistory/", async (req, res) => {
  try {
    let obj = { name: req.body.name, score: req.body.score };
    const user = await User.findOneAndUpdate(
      { email: req.body.email },
      { $push: { history: obj } },
      { new: true },
      function (err, result) {
        if (err) {
          res.send({ error: "Error occured!" });
        } else {
          res.status(200);
          res.send(user);
        }
      }
    );
    // let newUser = user;
    // let newHistory = user.history.push(obj);
    // user.history = newHistory;
    // await user.save();
    // res.send(user);
  } catch {
    res.status(404);
    res.send({ error: "User doesn't exist!" });
  }
});

module.exports = router;
