import { initTRPC, TRPCError } from "@trpc/server"
import { authenticator } from "../auth"
import type { IContext } from "./context"

export const t = initTRPC.context<IContext>().create()


const isRegistered = t.middleware(async ({ ctx, next }) => {
    const user = await authenticator.isAuthenticated(ctx.req)
    if (!user) {
        throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "401 | Yeah nah",
        })
    }
    return next({ ctx: { ...ctx, user } })
})


const isPremium = isRegistered

const isPower = isRegistered

const isAdmin = isRegistered



export const router = t.router

export const procedurePublic = t.procedure
export const procedureRegistered = t.procedure.use(isRegistered)
export const procedurePremium = t.procedure.use(isPremium)
export const procedurePower = t.procedure.use(isPower)
export const procedureAdmin = t.procedure.use(isAdmin)
