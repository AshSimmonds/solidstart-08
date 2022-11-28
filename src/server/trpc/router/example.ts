import { z } from "zod"
import { procedurePublic, router, procedureRegistered } from "../utils"

export default router({
    hello: procedurePublic
        .input(z.object({ name: z.string() }))
        .query(({ input }) => {
            console.log(`SERVER | g'day ${input.name}`)
            return `Hello ${input.name}`
        }),

    random: procedurePublic
        .input(z.object({ num: z.number() }))
        .mutation(({ input }) => {
            console.log(`SERVER | random number: ${input.num}`)
            return Math.floor(Math.random() * 100) / input.num
        }),

    secret: procedureRegistered.query(({ ctx }) => {
        console.log(`SERVER | secret: ${ctx.user}`)
        return `This is top secret - @${ctx.user.displayName}`
    }),
})
