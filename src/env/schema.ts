import { z } from "zod"

export const serverScheme = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    ENABLE_VC_BUILD: z.string().default("1").transform((v) => parseInt(v)),
    DATABASE_URL: z.string(),
    SITE_URL: z.string(),
    DISCORD_CLIENT_ID: z.string(),
    DISCORD_CLIENT_SECRET: z.string(),
    AIRTABLE_API_KEY: z.string(),
    AIRTABLE_BASE_ID: z.string(),
    XATA_API_KEY: z.string(),
    SABER_USERNAME: z.string(),
    SABER_PASSWORD: z.string(),
    AUTH0_SECRET: z.string(),
    AUTH0_BASE_URL: z.string(),
    AUTH0_ISSUER_BASE_URL: z.string(),
    AUTH0_CLIENT_ID: z.string(),
    AUTH0_CLIENT_SECRET: z.string(),
})

export const clientScheme = z.object({
    MODE: z.enum(['development', 'production', 'test']).default('development'),
    VITE_SESSION_SECRET: z.string(),
})
