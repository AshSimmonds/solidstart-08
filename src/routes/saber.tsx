import { Match, Show, Switch } from "solid-js"
import Layout from "~/components/Layout"
import PageTitle from "~/components/PageTitle"
import { trpc } from "~/utils/trpc"



export default function SaberPage() {

    // const theData = trpc.gruntify.getOneFullRow.useQuery(() => parameterObject)

    const testObject = trpc.saber.getTle.useQuery()


    return (
        <Layout>
            <PageTitle>Saber Astronautics</PageTitle>
            <h1>Saber Astronautics</h1>

            <div>
                <a href="https://saberastro.com" target="_blank" class="btn btn-outline btn-warning" >saberastro.com</a> <a href="https://saberstaging.space" target="_blank" class="btn btn-outline btn-secondary" >API - saberstaging.space</a>
            </div>


            <h2 class="text-center mx-auto ">Global <span class="text-warning" >Space Operations</span> Provider</h2>

            <Switch fallback="sans data">

                <Match when={testObject.isRefetching}>
                    <div class="text-center mx-auto">Re-fetching...</div>
                </Match>

                <Match when={testObject.isFetching}>
                    <div class="text-center mx-auto">Fetching...</div>
                </Match>

                <Match when={testObject.data}>
                    <pre>
                        {typeof(testObject.data) === 'string' ? JSON.stringify(JSON.parse(testObject.data), null, 4) : null}
                    </pre>
                </Match>

            </Switch>

        </Layout>
    )
}
