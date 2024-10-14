import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    RESAS_API_KEY: z.string(),
  },
  client: {},
  runtimeEnv: {
    RESAS_API_KEY: process.env.RESAS_API_KEY,
  },
});
