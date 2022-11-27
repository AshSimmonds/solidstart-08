import { t } from "../utils";
import authenticationRouter from "./authentication"
import exampleRouter from "./example";
import gruntifyRouter from "./gruntify"
import saberRouter from "./saber"

// export const appRouter = t.mergeRouters(exampleRouter, notesRouter, gruntifyRouter, authenticationRouter)

export const appRouter = t.router({
    authentication: authenticationRouter,
    example: exampleRouter,
    gruntify: gruntifyRouter,
    saber: saberRouter,
})

export type IAppRouter = typeof appRouter;
