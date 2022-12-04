import { useRouteData } from "solid-start"
import { createServerData$ } from "solid-start/server"
import Layout from "~/components/Layout"
import PageTitle from "~/components/PageTitle"

export const routeData = () => {
    return createServerData$(async () => {

        try {

            const theResponse = await fetch("http://localhost:3000/saber/space-cock_custom-scene_test-001.sc")

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

            <pre>
                {theLore()}
            </pre>

        </Layout>
    )
}
