import PageTitle from "~/components/PageTitle"
import { createServerData$ } from "solid-start/server"
import { authenticator } from "~/server/auth"
import { useRouteData } from "solid-start"
import { Match, Switch } from "solid-js"
import Layout from "~/components/Layout"

export const routeData = () => {
    return createServerData$(async (_, { request }) => {
        const user = await authenticator.isAuthenticated(request)
        return user
    })
}

export default function ProtectedPage() {
    const user = useRouteData<typeof routeData>();

    return (
        <Layout>
            <PageTitle>Protected page</PageTitle>
            <h1>Protected page - minimum code needed</h1>

            <Switch
                fallback={
                    <h2>401 | unauthorised</h2>
                }
            >
                <Match when={user.loading}>
                    <h2>Loading...</h2>
                </Match>
                <Match when={user()}>
                    <h2>Should only be able to see this page if logged in.</h2>

                    <pre>{JSON.stringify(user(), null, 4)}</pre>
                </Match>
            </Switch>

        </Layout>
    )
}
