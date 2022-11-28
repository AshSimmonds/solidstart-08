import { Show } from "solid-js"
import Layout from "~/components/Layout"
import PageTitle from "~/components/PageTitle"
import { trpc } from "~/utils/trpc"


export default function TrpcPage() {

    try {

        const testTrpcHello = trpc.example.hello.useQuery(() => ({ name: "from tRPC" }))

        console.log(`trpc.tsx | testTrpcHello: ${JSON.stringify(testTrpcHello, null, 4)}`)

        const testTrpcSecret = trpc.example.secret.useQuery(undefined,
            {
                retry: 0 // do not require if set in `src\utils\trpc.ts - QueryClient({ defaultOptions...`
            }
        )

        console.log(`trpc.tsx | testTrpcSecret: ${JSON.stringify(testTrpcSecret, null, 4)}`)

        return (
            <Layout>
                <PageTitle>trpc.io</PageTitle>
                <h1>trpc.io</h1>

                <h2>testing stuff</h2>

                <div>
                    <h3>PUBLIC <code>{`trpc.example.hello.useQuery(() => ({ name: "from tRPC" }))`}</code></h3>

                    <div class="alert alert-info">{testTrpcHello.data}</div>

                    Full object:
                    <pre>{JSON.stringify(testTrpcHello, null, 4)}</pre>
                </div>

                <div>
                    <h3>PROTECTED <code>{`trpc.example.secret.useQuery()`}</code></h3>

                    <Show when={testTrpcSecret.data} >
                        <div class="alert alert-info">{testTrpcSecret.data}</div>
                    </Show>
                    <Show when={!testTrpcSecret.data} >
                        <div class="alert alert-warning">Not logged in</div>
                    </Show>

                    Full object:
                    <pre>{JSON.stringify(testTrpcSecret, null, 4)}</pre>
                </div>

            </Layout>
        )

    } catch (error) {
        console.error(`trpc.tsx | error: ${error}`)
    }

}
