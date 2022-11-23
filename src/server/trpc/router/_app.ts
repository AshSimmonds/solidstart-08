import { t } from "../utils";
import exampleRouter from "./example";
import gluntifyRouter from "./gluntify"
import authenticationRouter from "./authentication"

// export const appRouter = t.mergeRouters(exampleRouter, notesRouter, gluntifyRouter, authenticationRouter)

export const appRouter = t.router({
    example: exampleRouter,
    gluntify: gluntifyRouter,
    authentication: authenticationRouter,
})

export type IAppRouter = typeof appRouter;
