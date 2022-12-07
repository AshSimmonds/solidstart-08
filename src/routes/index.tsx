import { type ParentComponent, Switch, Match, For, createSignal } from "solid-js"
import { A, createRouteData, refetchRouteData, Title, useRouteData } from "solid-start"
import { assign, createMachine, interpret } from 'xstate'

import server$, { createServerData$ } from "solid-start/server"
import { createResource } from "solid-js"
import Layout from "~/components/Layout"


const homeDataMachine =
    /** @xstate-layout N4IgpgJg5mDOIC5QAsD2BbMARAhgFxwDoBLCAGzAGIAxAUQBUBhACQG0AGAXUVAAdVYxPMVQA7HiAAeiACwBGAMyEAbHOUBWAOwAmABwL1ATi26ANCACeiALSGVuzbqcLtcx-PW6Avl-NpMuASEAGZgeADGyMSiUJQQYmAkogBuqADWiaERyIE4HNxIIPyCwmIS0ggKCnbq1Q4ytdqaBnLq5lYIMuyEmjKGqmqOrp4yPn4Y2PhEWZHRsWAATguoC4S8ZPjBK+ghYZG5+RLFQiLihRVVNXW9jc3qre2Ihtoqjp6e2oa6TW5jIP6TIIzKIxSiMACCADlGLQADKHQrHUpnUAXaqEWpfG4uO4PSyIOQyGQqdiadRGL6EhS6dQ+XwgUSoCBwCQA3JHAQnMrnWSEdjfGQKLpqQz8uTaGSPBC2XQqZS6djsQwGbTadRK7z0tlTEjkMAckqncqIZQKbraZSadgyXTPS3quRSxSaQiimQaGl9dSq75-bVAvYgqAGrkoqSIb18gVC9gisUSqW6OR8gyaRwKOQK9XKOleIA */
    createMachine({
        context: {
            data: {},
            updates: 0,
            updated: new Date(),
            idleCount: 0,
            fetchCount: 0,
        },
        predictableActionArguments: true,
        id: "homeData",
        initial: "idle",
        states: {
            idle: {
                entry: ["idleEntry"],
                on: {
                    FETCH: {
                        target: "fetching",
                    },
                },
            },
            fetching: {
                entry: ["fetchingEntry"],
                invoke: {
                    src: "fetchDataFunction",
                    id: "fetchData",
                    onDone: [
                        {
                            target: "idle",
                        },
                    ],
                    onError: [
                        {
                            target: "idle",
                        },
                    ],
                },
                on: {
                    CANCEL: {
                        target: "idle",
                    },
                },
            },
        },
    }, {
        actions: {
            idleEntry: (context, event) => {
                context.idleCount++
                context.updates++
                context.updated = new Date()
                // console.log(`index.tsx | homeDataMachine | idleEntry | context.updated: `, context.updated)
            },
            fetchingEntry: (context, event) => {
                context.fetchCount++
                context.updates++
                context.updated = new Date()
                // console.log(`index.tsx | homeDataMachine | fetchingEntry | context.updated: `, context.updated)
            },
        },
        services: {
            fetchDataFunction: (context, event) => async (sendBack) => {
                const randomNumber = Math.round(Math.random() * 260) + 1
                const theUrl = `https://pokeapi.co/api/v2/ability/${randomNumber}`

                console.log(`\nindex.tsx fetchDataFunction() theUrl: ${theUrl}`)

                const thePokemon = await fetch(theUrl)

                context.data = await thePokemon.json()

                // console.log(`index.tsx fetchDataFunction() context.data: ${JSON.stringify(context.data, null, 4)}`)

                // console.log(`index.tsx | homeDataMachine | fetchDataFunction | context.updated: `, context.updated, `\n\n`)

            },
        },
    })


const homeDataMachineService = interpret(homeDataMachine).start()

// homeDataMachineService.send("FETCH")


export const routeData = () => {
    // return createServerData$(async () => {
    const [homeDataMachineState, setHomeDataMachineState] = createSignal(homeDataMachineService.initialState)

    const theRouteData =
        createRouteData(async () => {

            try {
                // const theResponse = await getPokemon()

                // const theRaw = await theResponse.json()

                // const theData = theRaw.abilities[0]

                // const theDataMachine = homeDataMachineService.machine





                homeDataMachineService.send("FETCH")



                homeDataMachineService.onTransition((newState) => {
                    // console.log(`index.tsx routeData homeDataMachineService.onTransition() CURRENT: ${homeDataMachineState().value}`)


                    setHomeDataMachineState(newState)


                    // console.log(`index.tsx routeData homeDataMachineService.onTransition() STATE UPDATED: ${newState.value}`)

                    // console.log(`index.tsx | routeData | homeDataMachineService.onTransition | homeDataMachineState.context.updated: `, homeDataMachineState().context.updated)

                })









                console.log(`index.tsx | routeData | homeDataMachineState().context.data: `, homeDataMachineState().context.data)

                return homeDataMachineState()

            } catch (error) {
                console.error(`ERROR: index.tsx routeData: ${error}`)
            }
        })

    return theRouteData
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




const Home: ParentComponent = () => {

    const clientMessage = clientGday('dude')
    const serverMessage = serverGday('sweet')

    // const [machineEvents, setMachineEvents] = createSignal(0)

    // const [machineUpdated, setMachineUpdated] = createSignal(new Date())

    const theTestData = useRouteData<typeof routeData>()


    return (
        // <Layout>
        <div class="flex flex-col items-center justify-center mx-auto p-4">

            <Title>Blue Dwarf dot Space | SolidStart beta | SolidJS with tRPC Zod Prisma Tailwind</Title>
            {/* <h1>SolidStart beta | SolidJS with tRPC Zod Prisma Tailwind</h1> */}

            <div class="bg-base-100 p-12">
                <img src={`/moonlogo_small.png`} alt="Blue Dwarf Space logo" class="mx-auto w-full sm:w-1/3 md:w-2/3" />
            </div>

            <div class="alert alert-info">Updated: <code>{theTestData()?.context.updated.toLocaleDateString('en-AU', {
                day: '2-digit',
                month: 'short',
                year: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            })}</code>

                <button class="btn btn-primary" onClick={() => {
                    refetchRouteData()
                }}>refetchRouteData()</button>

            </div>
            <pre>
                {JSON.stringify(theTestData()?.context.data, null, 4)}
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

