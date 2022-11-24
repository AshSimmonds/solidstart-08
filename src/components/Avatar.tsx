import { Switch, Match } from "solid-js";
import { createServerData$ } from "solid-start/server";
import { authenticator } from "~/server/auth";

const userObjectPromise = () => {
    return createServerData$(async (_, { request }) => {
        const user = await authenticator.isAuthenticated(request)
        return user
    })
}


export default function Avatar() {
    const user = userObjectPromise()

    return (
        <Switch
            fallback={
                <>?</>
            }
        >
            <Match when={user.loading}>
                <>...</>
            </Match>

            <Match when={user()}>
                <><img src={user()?.avatar!} alt={user()?.displayName} /></>
            </Match>
        </Switch>
    )

}
