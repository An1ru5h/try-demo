const express = require('express');
const router = express.Router();

let integrations = [
  { id: 'salesforce', name: 'Salesforce CRM', status: 'Connected' },
  { id: 'github', name: 'GitHub', status: 'Not Configured' },
  { id: 'okta', name: 'Okta SSO', status: 'Configured' },
  { id: 'jira', name: 'Jira Project Management', status: 'Not Configured' },
  { id: 'google_analytics', name: 'Google Analytics', status: 'Connected' },
  { id: 'slack', name: 'Slack Notifications', status: 'Not Configured' },
];

router.get('/', (req, res) => res.json(integrations));

router.post('/connect/:id', (req, res) => {
  const { id } = req.params;
  integrations = integrations.map(i => i.id === id ? { ...i, status: 'Connected' } : i);
  res.json({ message: `${id} connected successfully.` });
});

module.exports = router;
