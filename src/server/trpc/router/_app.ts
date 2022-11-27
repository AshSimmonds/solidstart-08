import { t } from "../utils";
import exampleRouter from "./example";
import gruntifyRouter from "./gruntify"
import authenticationRouter from "./authentication"

// export const appRouter = t.mergeRouters(exampleRouter, notesRouter, gruntifyRouter, authenticationRouter)

export const appRouter = t.router({
    example: exampleRouter,
    gruntify: gruntifyRouter,
    authentication: authenticationRouter,
})

export type IAppRouter = typeof appRouter;
