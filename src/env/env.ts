import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    RESAS_API_KEY: z.string(),
  },
  client: {
    NEXT_PUBLIC_RESAS_API_KEY: z.string(),
  },
  runtimeEnv: {
    RESAS_API_KEY: process.env.RESAS_API_KEY,
    NEXT_PUBLIC_RESAS_API_KEY: process.env.NEXT_PUBLIC_RESAS_API_KEY,
  },
});
