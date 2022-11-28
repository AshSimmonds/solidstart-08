import { Match, Show, Switch } from "solid-js"
import { A } from "solid-start"
import Layout from "~/components/Layout"
import PageTitle from "~/components/PageTitle"
import { trpc } from "~/utils/trpc"



export default function SaberPage() {

    const satellites = trpc.saber.getSatellites.useQuery()

    console.log(`saber.tsx SaberPage() satellites: ${JSON.stringify(satellites, null, 4)}`)

    const weather = trpc.saber.getSpaceWeather.useQuery()

    console.log(`saber.tsx SaberPage() weather: ${JSON.stringify(weather, null, 4)}`)

    return (
        <Layout>
            <PageTitle>Saber Astronautics</PageTitle>
            <h1>Saber Astronautics</h1>

            <div>
                <a href="https://saberastro.com" target="_blank" class="btn btn-outline btn-warning" >saberastro.com</a> <a href="https://saberstaging.space" target="_blank" class="btn btn-outline btn-secondary" >API - saberstaging.space</a>
            </div>


            <h2 class="text-center mx-auto ">Global <span class="text-warning" >Space Operations</span> Provider</h2>

            <h3>Satellites</h3>
            <Switch
                fallback=
                {
                    <div class='text-center mx-auto alert alert-error'>errata unknown: {JSON.stringify(satellites, null, 4)}</div>
                }
            >
                <Match when={satellites.error}>
                    <div class="alert alert-error">Error: {satellites.error?.data?.httpStatus} | {satellites.error?.data?.code} at <code>{satellites.error?.data?.path}</code>
                        <Show when={satellites.error?.data?.httpStatus === 401}>
                            <A href="/profile" class="btn btn-secondary">Authenticate</A>
                        </Show>

                    </div>
                </Match>

                <Match when={satellites.isRefetching}>
                    <div class="alert alert-info">Re-fetching...</div>
                </Match>

                <Match when={satellites.isFetching}>
                    <div class="alert alert-warning">Fetching...</div>
                </Match>

                <Match when={satellites.data}>
                    <pre>
                        {JSON.stringify(satellites.data, null, 4)}
                    </pre>
                </Match>

            </Switch>






            <h3>Space weather</h3>
            <Switch
                fallback=
                {
                    <div class='text-center mx-auto alert alert-error'>errata unknown: {JSON.stringify(weather, null, 4)}</div>
                }
            >
                <Match when={weather.error}>
                    <div class="alert alert-error">Error: {weather.error?.data?.httpStatus} | {weather.error?.data?.code} at <code>{weather.error?.data?.path}</code>
                        <Show when={weather.error?.data?.httpStatus === 401}>
                            <A href="/profile" class="btn btn-secondary">Authenticate</A>
                        </Show>

                    </div>
                </Match>

                <Match when={weather.isRefetching}>
                    <div class="alert alert-info">Re-fetching...</div>
                </Match>

                <Match when={weather.isFetching}>
                    <div class="alert alert-warning">Fetching...</div>
                </Match>

                <Match when={weather.data}>
                    <pre>
                        {JSON.stringify(weather.data, null, 4)}
                    </pre>
                </Match>

            </Switch>




        </Layout>
    )
}
