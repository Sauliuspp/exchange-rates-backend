const redis = require('redis');

let redisClient;

const DEFAULT_TTL = 60 * 5;

(async () => {
    redisClient = await redis.createClient({
        url: process.env.REDIS_URL,
    })
        .on('error', err => console.log('Redis client error', err))
        .connect();
})();


const set = async (key, value, ttl = DEFAULT_TTL) => redisClient.set(key, value, { EX: ttl });

const get = async (key) => redisClient.get(key);

module.exports = { set, get };
