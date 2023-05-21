import { createTRPCRouter, protectedProcedure } from "@server/api/trpc";
import { RedisGeocodeEmptyResultValue } from "@src/constants";
import { RedisClient } from "@src/lib/redis";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const redisSchema = z.object({
  lat: z.string(),
  lon: z.string(),
});
type RedisSchema = z.infer<typeof redisSchema>;

export const geocodeRouter = createTRPCRouter({
  searchAddress: protectedProcedure
    .input(
      z.object({
        addressString: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      // check cache first
      const cache = await RedisClient.get(input.addressString);
      if (cache) {
        // previous lookups for this address didn't yield any results
        if (cache === RedisGeocodeEmptyResultValue) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "no geocode result found",
          });
        }

        // try to parse
        const parsedCache = redisSchema.safeParse(JSON.parse(cache));
        if (!parsedCache.success) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "error parsing address coordinates from redis",
            cause: parsedCache.error,
          });
        }

        return {
          result: {
            data: {
              status: 200,
              message: "successfully geocoded address",
              lat: parsedCache.data.lat,
              lon: parsedCache.data.lon,
            },
          },
        };
      }

      const geocodeReq = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${input.addressString}&format=json&limit=1`
      );
      try {
        // body is expected to be 'any'
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const body = await geocodeReq.json();
        const schema = z.array(
          z.object({
            place_id: z.number(),
            licence: z.string(),
            osm_type: z.string(),
            osm_id: z.number(),
            boundingbox: z.array(z.string()),
            lat: z.string(),
            lon: z.string(),
            display_name: z.string(),
            class: z.string(),
            type: z.string(),
            importance: z.number(),
          })
        );
        const parsed = schema.safeParse(body);

        if (!parsed.success) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "error geocoding address",
            cause: parsed.error,
          });
        }

        const first = parsed.data[0];
        if (!first) {
          // store empty result in redis
          await RedisClient.hset(input.addressString, {});

          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "no geocode result found",
          });
        }

        // store good result in redis
        const newCacheValue: RedisSchema = {
          lat: first.lat,
          lon: first.lon,
        };
        await RedisClient.set(
          input.addressString,
          JSON.stringify(newCacheValue)
        );

        return {
          result: {
            data: {
              status: 200,
              message: "successfully geocoded address",
              lat: first.lat,
              lon: first.lon,
            },
          },
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "error parsing geocode response body",
          cause: error,
        });
      }
    }),
});
