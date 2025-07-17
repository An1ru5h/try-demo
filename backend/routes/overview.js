const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    uptime: '99%',
    latency: '150ms',
    dbConnections: '50/100'
  });
});

module.exports = router;
