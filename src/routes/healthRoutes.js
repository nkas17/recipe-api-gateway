const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('good');
});

module.exports = router;
