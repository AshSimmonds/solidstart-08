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

            const theData = await theResponse.json()

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

            <h2>Mission Details</h2>

            <section id="xcomblueleft" data-augmented-ui="tr-2-clip-y br-clip b-clip-x bl-2-clip-x l-clip-y border 
" class="styleme pb-12 pt-0 pl-8 pr-8 mt-12">

                <h3>Operation: {theLore().Name}</h3>

                <div class="bg-accent">
                    asdf
                </div>

            </section>

            <h2>Source data</h2>
            <A href={theSource}>{theSource}</A>
            <pre>
                {JSON.stringify(theLore(), null, 4)}
            </pre>

        </Layout>
    )
}
