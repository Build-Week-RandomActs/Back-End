//inside this file should be register, login and token generate functions to the route /api/auth/
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users/users-model.js");
const secrets = require("../config/secrets.js");

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;

  if (!user.username || !user.password || !user.email) {
    res.status(401).json({ message: "Please fill in all fields" });
  } else {
    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json({ message: "could not register user" });
      });
  }
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = genToken(user);
        res.status(200).json({ message: `Welcome, ${user.username}!`, token });
      } else {
        res.status(401).json({ message: "invalid credentials" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "trouble logging in" });
    });
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
    expiresIn: "1d"
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
