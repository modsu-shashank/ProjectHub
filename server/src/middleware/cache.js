// Simple in-memory cache implementation
const cache = new Map();
const DEFAULT_EXPIRY = 5 * 60 * 1000; // 5 minutes

const cacheMiddleware = (duration = DEFAULT_EXPIRY) => {
  return (req, res, next) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    const key = req.originalUrl;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
      const { data, expiry } = cachedResponse;
      if (expiry > Date.now()) {
        return res.json(data);
      }
      cache.delete(key);
    }

    // Override res.json to cache the response
    const originalJson = res.json;
    res.json = function(data) {
      cache.set(key, {
        data,
        expiry: Date.now() + duration
      });
      return originalJson.call(this, data);
    };

    next();
  };
};

// Clear cache entries for specific routes
const clearCache = (route) => {
  if (route) {
    for (const key of cache.keys()) {
      if (key.includes(route)) {
        cache.delete(key);
      }
    }
  } else {
    cache.clear();
  }
};

module.exports = {
  cacheMiddleware,
  clearCache
};
