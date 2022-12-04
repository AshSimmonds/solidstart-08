import { mount, StartClient } from "solid-start/entry-client"
import { client, queryClient, trpc } from "./utils/trpc"
import 'solid-devtools'

mount(
    () => (
        <trpc.Provider client={client} queryClient={queryClient}>
            <StartClient />
        </trpc.Provider>
    ),
    document
)
