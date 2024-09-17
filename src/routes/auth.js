const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/login', (req, res) => {
  // Here you would typically validate the user credentials
  // For this example, we're just creating a token for any request
  const user = { id: 1, username: req.body.username };

  const accessToken = jwt.sign(user, process.env.JWT_SECRET);
  res.json({ accessToken: accessToken });
});

module.exports = router;