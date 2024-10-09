
import { z } from "zod";

export const winnerSchema = z.object({

  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  mugColour: z.string(),
  image: z.string(),
})