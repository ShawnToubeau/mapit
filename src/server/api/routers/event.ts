import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@server/api/trpc";
import { TRPCError } from "@trpc/server";

export const eventRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        parentMapId: z.string(),
        name: z.string(),
        startTime: z.date(),
        endTime: z.date(),
        description: z.string(),
        latitude: z.number(),
        longitude: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.prisma.event.create({
          data: {
            mapId: input.parentMapId,
            name: input.name,
            startTime: input.startTime,
            endTime: input.endTime,
            description: input.description,
            latitude: input.latitude,
            longitude: input.longitude,
          },
        });

        return {
          result: {
            data: {
              status: 200,
              message: "successfully created event",
            },
          },
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "error creating event",
          cause: error,
        });
      }
    }),
  getById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        const event = await ctx.prisma.event.findFirst({
          where: {
            id: input.id,
          },
        });

        return {
          result: {
            data: {
              status: 200,
              message: "successfully fetched event",
              event: event,
            },
          },
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "error fetching event",
          cause: error,
        });
      }
    }),
    getByMapId: protectedProcedure
    .input(
      z.object({
        mapId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        const events = await ctx.prisma.event.findMany({
          where: {
            mapId: input.mapId,
          },
        });

        return {
          result: {
            data: {
              status: 200,
              message: "successfully fetched events",
              events: events,
            },
          },
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "error fetching events",
          cause: error,
        });
      }
    }),
  updateById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        startTime: z.date(),
        endTime: z.date(),
        description: z.string(),
        latitude: z.number(),
        longitude: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.prisma.event.update({
          data: {
            name: input.name,
            startTime: input.startTime,
            endTime: input.endTime,
            description: input.description,
            latitude: input.latitude,
            longitude: input.longitude,
          },
          where: {
            id: input.id,
          },
        });

        return {
          result: {
            data: {
              status: 200,
              message: "successfully updated event",
            },
          },
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "error updating event",
          cause: error,
        });
      }
    }),
  deleteById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.prisma.event.delete({
          where: {
            id: input.id,
          },
        });

        return {
          result: {
            data: {
              status: 200,
              message: "successfully deleted event",
            },
          },
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "error deleting event",
          cause: error,
        });
      }
    }),
});
