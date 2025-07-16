const express = require('express');
const router = express.Router();

let settings = {
  email: true,
  slack: false,
  inApp: true
};

router.get('/', (req, res) => res.json(settings));

router.post('/update', (req, res) => {
  const { setting, value } = req.body;
  if (settings.hasOwnProperty(setting)) {
    settings[setting] = value;
    res.json({ message: `${setting} updated.` });
  } else {
    res.status(400).json({ error: 'Invalid setting' });
  }
});

module.exports = router;
