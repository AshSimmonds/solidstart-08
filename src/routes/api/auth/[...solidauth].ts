import { type User } from "@prisma/client"
import { authenticator } from "~/server/auth"
import { createSolidAuthHandler } from '@solid-auth/core'

const handler = createSolidAuthHandler<User>(authenticator)

export const POST = handler
export const GET = handler
