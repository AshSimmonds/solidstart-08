import { createScriptLoader } from "@solid-primitives/script-loader"
import { A } from "solid-start"
import Layout from "~/components/Layout"
import PageTitle from "~/components/PageTitle"
import DrakonEditor from "~/components/DrakonEditor"

const drakonEditorJsObject = createScriptLoader({
    src: "/drakonwidget_v0-9-11.js",
})

console.log(`drakonEditor: ${JSON.stringify(drakonEditorJsObject, null, 4)}`)
console.log(`DrakonEditor: ${JSON.stringify(DrakonEditor, null, 4)}`)

export default function DrakonPage() {
    return (
        <Layout>
            <PageTitle>Drakon editor</PageTitle>
            <h1>Drakon Editor</h1>

            <A href="/drakon/" class="btn btn-accent">/drakon/</A>

            <h2>TODO: complete this</h2>

            <div>
                Too complex to get working straight up, bigger flowcharts to fry...
            </div>

        </Layout>
    )
}
