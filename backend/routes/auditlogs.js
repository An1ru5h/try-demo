const express = require('express');
const router = express.Router();

const logs = [
  {
    timestamp: '2025-07-09 10:30:00',
    user: 'admin@yourstartup.com',
    action: 'Updated Funding Data',
    status: 'Success',
    details: 'Changed Series A amount to $12M'
  },
  {
    timestamp: '2025-07-08 17:00:05',
    user: 'user@yourstartup.com',
    action: 'Ran Market Research',
    status: 'Failed',
    details: 'Query exceeded rate limit'
  }
];

router.get('/', (req, res) => res.json(logs));

module.exports = router;
