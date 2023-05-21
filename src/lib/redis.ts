import { env } from "@src/env.mjs";
import Redis from "ioredis";

export const RedisClient = new Redis(env.REDIS_URL);

RedisClient.ping()
  .then(() => {
    console.log("[REDIS] connected to server");
  })
  .catch(() => {
    console.error("[REDIS] unable to connect to server");
  });
