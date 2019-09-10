//inside this file should be register, login and token generate functions to the route /api/auth/
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const db = require("../database/dbConfig.js");
const secrets = require("../config/secrets");

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = db("users")
    .where({
      username
    })
    .first();
  try {
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = genToken(user);
      res.status(200).json({
        message: `Welcome ${user.username}`,
        token
      });
    } else {
      res.status(404).json({
        message: `Invalid credentials`
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.post("/register", (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;
  try {
    if (!user.username || !user.password || !user.email) {
      res.json({
        message: "All fields must be filled in"
      });
    } else {
      const newUser = db("users").insert(user);
      res.status(201).json({
        message: `Welcome aboard ${user.username}!`,
        newUser
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.get("/logout", async (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err)
        res.json({
          error: "Error logging you out"
        });
      else
        res.status(200).json({
          message: "Til next time"
        });
    });
  } else {
    res.status(200).json({
      message: "You were never logged in to begin with"
    });
  }
});
function genToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: "1h"
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
