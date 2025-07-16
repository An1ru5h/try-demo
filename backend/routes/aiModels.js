const express = require('express');
const router = express.Router();

let models = [
  { name: 'Gemini 2.0 Flash', version: 'v1.2', status: 'Online', lastDeployed: '2025-06-20', type: 'LLM' },
  { name: 'Forecast Model', version: 'v1.0', status: 'Offline', lastDeployed: '2025-04-01', type: 'Time-Series' }
];

router.get('/', (req, res) => res.json(models));

router.post('/deploy', (req, res) => {
  const { modelName } = req.body;
  res.json({ message: `Model ${modelName} deployed (mock).` });
});

module.exports = router;
