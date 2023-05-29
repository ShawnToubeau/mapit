import { createTRPCRouter, protectedProcedure } from "@server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const mapRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        ownerId: z.string(),
        name: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.prisma.eventMap.create({
          data: {
            ownerId: input.ownerId,
            name: input.name,
          },
        });

        return {
          result: {
            data: {
              status: 200,
              message: "successfully created map",
            },
          },
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "error creating map",
          cause: error,
        });
      }
    }),
  getByOwnerId: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        const maps = await ctx.prisma.eventMap.findMany({
          where: {
            ownerId: input.id,
          },
          include: {
            _count: {
              select: {
                events: true,
              },
            },
          },
        });

        return {
          result: {
            data: {
              status: 200,
              message: "successfully fetched maps",
              maps: maps,
            },
          },
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "error fetching maps",
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
        const map = await ctx.prisma.eventMap.findFirst({
          where: {
            id: input.id,
          },
          include: {
            events: true,
          },
        });

        return {
          result: {
            data: {
              status: 200,
              message: "successfully fetched map",
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              map: map,
            },
          },
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "error fetching map",
          cause: error,
        });
      }
    }),
  updateById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.prisma.eventMap.update({
          data: {
            name: input.name,
          },
          where: {
            id: input.id,
          },
        });

        return {
          result: {
            data: {
              status: 200,
              message: "successfully updated map",
            },
          },
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "error updating map",
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
        await ctx.prisma.eventMap.delete({
          where: {
            id: input.id,
          },
        });

        return {
          result: {
            data: {
              status: 200,
              message: "successfully deleted map",
            },
          },
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "error deleting map",
          cause: error,
        });
      }
    }),
});
