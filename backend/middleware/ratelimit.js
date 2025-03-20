const { RateLimiterRedis } = require("rate-limiter-flexible");
const Redis = require("ioredis");
const session = require("express-session");
const dotenv = require("dotenv");
const RedisStore = require("connect-redis").default;
dotenv.config();
// Initialize Redis client
const redisClient = new Redis({
  host: process.env.REDIS_HOST || "localhost", // Use environment variable or fallback to localhost

  port: 6379,
});

// Create rate limiter
const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient, // Use Redis store
  keyPrefix: "rateLimiter",
  points: 5, // 5 requests
  duration: 60, // per 60 seconds
});

// Rate limiting middleware
const rateLimitMiddleware = (req, res, next) => {
  rateLimiter
    .consume(req.ip) // Use IP address as the key
    .then(() => {
      next(); // Allow the request to proceed
    })
    .catch(() => {
      res.status(429).send("Too many requests, please try again later.");
    });
};

module.exports = rateLimitMiddleware;
