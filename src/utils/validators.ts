import { z } from "zod";


export const audioInput = z.object({
    filename: z.string(),
    filePath: z.string()
});

export const UserInput = z.object({
  name: z.string().optional(),
  artistName: z.string().optional(),
  profileImage: z.string().optional(),
  email: z.string()
})
