const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/overview', require('./routes/overview'));
app.use('/api/integrations', require('./routes/integrations'));
app.use('/api/audit-logs', require('./routes/auditLogs'));
app.use('/api/ai-models', require('./routes/aiModels'));
app.use('/api/notifications', require('./routes/notifications'));

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Backend running at http://localhost:${PORT}`));