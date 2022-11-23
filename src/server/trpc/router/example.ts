import { z } from "zod";
import { procedurePublic, router, procedureRegistered } from "../utils";

export default router({
    hello: procedurePublic.input(z.object({ name: z.string() })).query(({ input }) => {
        return `Hello ${input.name}`;
    }),
    random: procedurePublic
        .input(z.object({ num: z.number() }))
        .mutation(({ input }) => {
            return Math.floor(Math.random() * 100) / input.num;
        }),
    secret: procedureRegistered.query(({ ctx }) => {
        return `This is top secret - ${ctx.user.displayName}`;
    }),
});
