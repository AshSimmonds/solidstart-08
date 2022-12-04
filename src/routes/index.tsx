import { type ParentComponent, Switch, Match, For } from "solid-js"
import { A, Title, useRouteData } from "solid-start"


import server$, { createServerData$ } from "solid-start/server"
import Layout from "~/components/Layout"


export const routeData = () => {
    return createServerData$(async () => {

        try {
            const resServer = await fetch("https://pokeapi.co/api/v2/pokemon/ditto")

            const dataServer = await resServer.json()

            const theCoolData = dataServer.abilities[0]

            console.log(`theCoolData: ${JSON.stringify(theCoolData, null, 4)}`)

            return theCoolData

        } catch (error) {
            console.error(`qwer: ${error}`)
        }
    })
}



const serverGday = server$(async (message: string) => {
    const theMediumIsNotTheMessage = `G'day from SERVER, ${message}`
    console.log(theMediumIsNotTheMessage)

    return theMediumIsNotTheMessage
})

const clientGday = (message: string) => {
    const theMediumIsNotTheMessage = `G'day from CLIENT, ${message}`
    console.log(theMediumIsNotTheMessage)

    return theMediumIsNotTheMessage
}


const buttonList = [
    {
        "buttonText": "About",
        "buttonLink": "/about",
        "colorClass": ""
    },
    {
        "buttonText": "Stuff",
        "buttonLink": "/asdf",
        "colorClass": "neutral"
    },
    {
        "buttonText": "Account",
        "buttonLink": "/account",
        "colorClass": "primary"
    },
    {
        "buttonText": "Typography",
        "buttonLink": "/typography",
        "colorClass": "secondary"
    },
    {
        "buttonText": "XCOM",
        "buttonLink": "/xcom",
        "colorClass": "accent"
    },
    {
        "buttonText": "Access",
        "buttonLink": "/access",
        "colorClass": "info"
    },
    {
        "buttonText": "Vercel",
        "buttonLink": "https://vercel.com/ashsimmonds/solidstart-05",
        "colorClass": "success"
    },
    {
        "buttonText": "Gruntify",
        "buttonLink": "/gruntify",
        "colorClass": "warning"
    },
    {
        "buttonText": "Xata",
        "buttonLink": "/xata",
        "colorClass": "error"
    },
    {
        "buttonText": "Blank",
        "buttonLink": "/blank",
        "colorClass": "disabled"
    },
    {
        "buttonText": "DRAKON",
        "buttonLink": "/drakon",
        "colorClass": "info"
    },
    {
        "buttonText": "Saber Astronautics",
        "buttonLink": "/saber",
        "colorClass": "warning"
    },
    {
        "buttonText": "Space Cock",
        "buttonLink": "/saber/spacecock",
        "colorClass": "warning"
    },
    {
        "buttonText": "XCOM",
        "buttonLink": "/xcom",
        "colorClass": "accent"
    },
    {
        "buttonText": "trpc.io",
        "buttonLink": "/trpc",
        "colorClass": "info"
    },
    {
        "buttonText": "XState",
        "buttonLink": "/xstate",
        "colorClass": "primary"
    },
    {
        "buttonText": "Zag",
        "buttonLink": "/zag",
        "colorClass": "warning"
    },
    {
        "buttonText": "F of XState",
        "buttonLink": "/f-of-xstate",
        "colorClass": "error"
    },
    {
        "buttonText": "Advent of Code 2022 | Day 3",
        "buttonLink": "/aoc2203",
        "colorClass": "accent"
    },
    {
        "buttonText": "SolidJS Suspense",
        "buttonLink": "/suspense",
        "colorClass": "secondary"
    },
    {
        "buttonText": "Modular Forms",
        "buttonLink": "/modular-forms",
        "colorClass": "primary"
    },
    {
        "buttonText": "Motion Animations",
        "buttonLink": "/motion",
        "colorClass": "warning"
    },
]



const Home: ParentComponent = () => {

    const clientMessage = clientGday('dude')
    const serverMessage = serverGday('sweet')

    const theTestServerData = useRouteData<typeof routeData>()

    return (
        // <Layout>
        <div class="flex flex-col items-center justify-center mx-auto p-4">

            <Title>Blue Dwarf dot Space | SolidStart beta | SolidJS with tRPC Zod Prisma Tailwind</Title>
            {/* <h1>SolidStart beta | SolidJS with tRPC Zod Prisma Tailwind</h1> */}

            <div class="bg-base-100 p-12">
                <img src={`/moonlogo_small.png`} alt="Blue Dwarf Space logo" class="mx-auto w-full sm:w-1/3 md:w-2/3" />
            </div>

            <pre>
                {JSON.stringify(theTestServerData(), null, 4)}
            </pre>

            <div class="w-full grid gap-8 grid-cols-2 mt-12 mb-8">
                <For each={buttonList}>
                    {(button) => (
                        <A href={button.buttonLink} class={`translucent btn btn-${button.colorClass} bg-opacity-20 text-2xl leading-5`}>{button.buttonText}</A>
                    )}
                </For>
            </div>
        </div>
        // </Layout>
    )
}


export default Home
