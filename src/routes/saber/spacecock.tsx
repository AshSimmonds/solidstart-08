import { A, useRouteData } from "solid-start"
import { createServerData$ } from "solid-start/server"
import Layout from "~/components/Layout"
import PageTitle from "~/components/PageTitle"

const theSourceFile = "saber/space-cock_custom-scene_test-001.sc"
const theSourceHost = "http://localhost:3000/"
const theSource = theSourceHost + theSourceFile

export const routeData = () => {
    return createServerData$(async () => {

        try {

            const theResponse = await fetch(theSource)

            const theData = await theResponse.text()

            console.log(`saber spacecock routeData theData: ${theData}`)

            return theData

        } catch (error) {
            console.error(`saber spacecock routeData error: ${JSON.stringify(error, null, 4)}`)
        }
    })
}


export default function SpaceCockPage() {

    const theLore = useRouteData<typeof routeData>()

    return (
        <Layout>
            <PageTitle>Space Cockpit | Saber Astronautics</PageTitle>
            <h1>Space Cockpit | Saber Astronautics</h1>

            <h2>Source data</h2>
            <A href={theSource}>{theSource}</A>
            <pre>
                {theLore()}
            </pre>

        </Layout>
    )
}
