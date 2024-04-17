import { TRPCError } from "@trpc/server";
import { z } from "zod";
import type { User }from '@prisma/client';
import { createTRPCRouter, publicProcedure } from "src/server/api/trpc";
import { UserInput } from "src/utils/validators";


export const profileRouter = createTRPCRouter({
    create: publicProcedure.input(UserInput).mutation(async ({ ctx, input }) => {
        
        return ctx.db.user.create({
            data: {
                email: input.email
            }
        })
    })
})