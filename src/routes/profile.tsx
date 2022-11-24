import PageTitle from "~/components/PageTitle"
import { Match, Switch } from "solid-js"
import Layout from "~/components/Layout"
import { userObjectPromise } from "~/components/Avatar"
import { authClient } from "~/utils/auth"
import "../styles/Cyberpunk.module.css"

export default function ProfilePage() {
    const user = userObjectPromise()

    return (
        <Layout>
            <PageTitle>Profile</PageTitle>
            <h1>Profile</h1>

            <Switch
                fallback={
                    <>
                        <h2>Login</h2>
                        <button
                            onClick={() =>
                                authClient.login("discord", {
                                    successRedirect: "/",
                                    failureRedirect: "/",
                                })
                            }
                            class=""
                        >
                            Discord
                        </button>
                    </>
                }
            >
                <Match when={user.loading}>
                    <h2>Loading...</h2>
                </Match>
                <Match when={user()}>
                    <h2>Should only be able to see this page if logged in.</h2>

                    <pre>{JSON.stringify(user(), null, 4)}</pre>

                    <button
                        onClick={() =>
                            authClient.logout({
                                redirectTo: "/",
                            })
                        }
                        class=""
                    >
                        Logout
                    </button>
                </Match>
            </Switch>

        </Layout>
    )
}
