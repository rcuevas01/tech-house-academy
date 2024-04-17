import { TRPCError } from "@trpc/server";
import { z } from "zod";
import type { AudioFile }from '@prisma/client';
import { createTRPCRouter, publicProcedure } from "src/server/api/trpc";
import {  audioInput } from "src/utils/validators";

export const audioRouter = createTRPCRouter({
    create: publicProcedure.input(audioInput).mutation(async ({ ctx, input }) => {
        
        return ctx.db.audioFile.create({
            data: {
                filename: input.filename,
                filePath: input.filePath
            }
        })
    })


})









