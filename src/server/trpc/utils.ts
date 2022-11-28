import { initTRPC, TRPCError } from "@trpc/server"
import { authenticator } from "../auth"
import type { IContext } from "./context"

export const t = initTRPC.context<IContext>().create()


const isRegistered = t.middleware(async ({ ctx, next }) => {

    console.log("SERVER | trpc/utils.ts | isRegistered | ABOUT TO CHECK")

    const user = await authenticator.isAuthenticated(ctx.req)

    console.log("SERVER | trpc/utils.ts | isRegistered | CHECKED ASYNC")

    console.log("SERVER | trpc/utils.ts | isRegistered | user:", user)

    if (!user) {

        console.log("SERVER | trpc/utils.ts | isRegistered | NOT REGISTERED")

        throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "401 | Yeah nah",
        })
    }

    console.log("SERVER | trpc/utils.ts | isRegistered | REGISTERED")
    
    return next({ ctx: { ...ctx, user } })
})

// TODO: do proper checks for various levels once role-based-auth is implemented
const isPremium = isRegistered

const isPower = isRegistered

const isAdmin = isRegistered



export const router = t.router

export const procedurePublic = t.procedure
export const procedureRegistered = t.procedure.use(isRegistered)
export const procedurePremium = t.procedure.use(isPremium)
export const procedurePower = t.procedure.use(isPower)
export const procedureAdmin = t.procedure.use(isAdmin)
