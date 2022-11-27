import { type ParentComponent, Switch, Match, Show } from "solid-js"
import { A, Title, useRouteData } from "solid-start"
import { createServerData$ } from "solid-start/server"
import Layout from "~/components/Layout"
import PageTitle from "~/components/PageTitle"
import { trpc } from "~/utils/trpc"

const testAirtablePermitId = 'recbr6s0W3tRpfUSw'
const testXataPermitId = 'rec_cdmqgqdheior0kfh2cgg'

const parameterObject = {
    "permitId": testXataPermitId,
}

// export const routeData = () => createServerData$(trpc.gruntify.getOne.useQuery(() => parameterObject))

export default function XataPage() {
    // const res = trpc.hello.useQuery(() => ({ name: "from tRPC" }))

    const theData = trpc.gruntify.getOneFullRow.useQuery(() => parameterObject)

    const gruntifyData = trpc.gruntify.getOneGruntify.useQuery(() => parameterObject)

    console.log(`gruntifyData: ${gruntifyData}`)

    return (
        <Layout>
            <PageTitle>Xata.io test</PageTitle>

            <h1>Xata.io</h1>

            <h2>Gruntify stuff</h2>

            <p>
                This is the bog standard building inspection form schema.
            </p>

            <Show when={gruntifyData} fallback="sans data">
                <pre>{JSON.stringify(gruntifyData, null, 4)}</pre>
            </Show>

            <h2>Full source</h2>
            <p>
                ...of the Airtable record, for now.
            </p>

            <pre>{JSON.stringify(theData, null, 4)}</pre>


        </Layout>
    )
}


// async function gruntifyData() {

//     const theData = useRouteData<typeof routeData>()

//     try {

//         const gruntifyStartPosition = await theData.data.gruntify.indexOf('{')
//         const gruntifyEndPosition = await theData.data.gruntify.lastIndexOf('}') + 1

//         const gruntifyString = await theData.data.gruntify.substring(gruntifyStartPosition, gruntifyEndPosition)

//         console.log(`gruntifyString: ${gruntifyString}`)

//         const gruntifyJson = jsonifyGruntifiedSource(gruntifyString)

//         console.log(`gruntifyJson: ${JSON.stringify(gruntifyJson)}`)


//         return undefined


//     }
//     catch (error) {
//         console.log(`error: ${error}`)
//         return error
//     }
// }




// function jsonifyGruntifiedSource(gruntifiedSource: string) {
//     return gruntifiedSource.substring(gruntifiedSource.indexOf('{'), gruntifiedSource.lastIndexOf('}') + 1)
// }
