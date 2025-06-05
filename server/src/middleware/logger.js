const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Create a write stream for access logs
const accessLogStream = fs.createWriteStream(
  path.join(logsDir, 'access.log'),
  { flags: 'a' }
);

// Custom token for request body
morgan.token('body', (req) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    // Remove sensitive data
    const body = { ...req.body };
    delete body.password;
    return JSON.stringify(body);
  }
  return '';
});

// Development logger
const developmentLogger = morgan('dev');

// Production logger
const productionLogger = morgan(
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :body',
  { stream: accessLogStream }
);

// Export loggers based on environment
module.exports = process.env.NODE_ENV === 'production'
  ? productionLogger
  : developmentLogger;
