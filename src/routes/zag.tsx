import Layout from "~/components/Layout"
import PageTitle from "~/components/PageTitle"
import { createMemo } from "solid-js"
import * as toggle from "@zag-js/toggle"
import { useMachine, normalizeProps } from "@zag-js/solid"

export default function ZagPage() {
    const [state, send] = useMachine(toggle.machine({
        id: "1"
    }))

    const api = createMemo(() => toggle.connect(state, send, normalizeProps))

    return (
        <Layout>
            <PageTitle>zag | zagjs.com</PageTitle>
            <h1>zag</h1>

            <h2>https://zagjs.com</h2>

            <div class="text-center mx-auto ">

                <h3>toggle</h3>
                <button {...api().buttonProps}>
                    {api().isPressed ? "On" : "Off"}
                </button>

            </div>
        </Layout>
    )
}
