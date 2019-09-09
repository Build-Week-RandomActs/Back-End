//check authorization for receiving data from API
module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    next()
  } else {
    res.status(400).json({
      you: "shall not pass"
    })
  }
}