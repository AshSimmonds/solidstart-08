import { Match, Show, Switch } from "solid-js"
import Layout from "~/components/Layout"
import PageTitle from "~/components/PageTitle"
import { trpc } from "~/utils/trpc"



export default function SaberPage() {

    const testObject = trpc.saber.getSatellites.useQuery()

    console.log(`saber.tsx SaberPage() testObject: ${JSON.stringify(testObject, null, 4)}`)

    return (
        <Layout>
            <PageTitle>Saber Astronautics</PageTitle>
            <h1>Saber Astronautics</h1>

            <div>
                <a href="https://saberastro.com" target="_blank" class="btn btn-outline btn-warning" >saberastro.com</a> <a href="https://saberstaging.space" target="_blank" class="btn btn-outline btn-secondary" >API - saberstaging.space</a>
            </div>


            <h2 class="text-center mx-auto ">Global <span class="text-warning" >Space Operations</span> Provider</h2>

            <Switch
                fallback=
                {
                    <div class='text-center mx-auto alert alert-error'>errata unknown: {JSON.stringify(testObject, null, 4)}</div>
                }
            >
                <Match when={testObject.error}>
                    <div class="alert alert-error">Error: {testObject.error?.data?.httpStatus} | {testObject.error?.data?.code} at <code>{testObject.error?.data?.path}</code></div>
                </Match>

                <Match when={testObject.isRefetching}>
                    <div class="alert alert-info">Re-fetching...</div>
                </Match>

                <Match when={testObject.isFetching}>
                    <div class="alert alert-warning">Fetching...</div>
                </Match>

                <Match when={testObject.data}>
                    <pre>
                        {JSON.stringify(testObject.data, null, 4)}
                    </pre>
                </Match>

            </Switch>

        </Layout>
    )
}
