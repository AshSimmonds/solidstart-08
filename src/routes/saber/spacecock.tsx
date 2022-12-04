import { For } from "solid-js"
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

            <section id="xcomblueleft" data-augmented-ui="tr-2-clip-y br-clip-y b-clip-x bl-2-clip-x l-clip-y border 
" class="styleme pb-12 pt-0 pl-0 pr-8 mt-12">
                <div class="flex">
                    <div class="flex-none text-4xl mt-2">
                        🌐
                    </div>
                    <div class="flex-1 w-64 ...">
                        <h3 class="mb-0">Operation: {theLore()?.Name}</h3>
                        <span class="text-sm">ID: {theLore()?.Id}</span>
                        <hr />

                        <div class="alert alert-info">Status: {theLore()?.Status}</div>

                        <div class="">
                            TODO: augment the data with some operational stuff the user can include.
                        </div>

                        <div class="mt-4 translucent bg-success bg-opacity-20 btn-block text-center opacity-80">
                            Simulation Time: {theLore()?.SimulationTime} <br />
                            Simulation Speed: {theLore()?.SimulationSpeed} <br />
                            Scenario End Time: {theLore()?.ScenarioEndTime} <br />
                        </div>

                        <h4>Source: {theLore()?.Source}</h4>

                        <h4>Active asset list index: {theLore()?.ActiveAssetListIndex}</h4>

                        <h4>Focused Satellite: {theLore()?.FocusedSensor}</h4>

                        <h4>Focused Sensor: {theLore()?.ActiveSat}</h4>

                        <h4>Asset Lists</h4>
                        <For each={theLore()?.AssetLists}>
                            {(theAssetList) => (
                                <div class="">
                                    <h5>{theAssetList?.Name}</h5>
                                    <h6>Satellites</h6>
                                    <div class="grid grid-cols-4">
                                        <For each={theAssetList?.Sats}>
                                            {(theSat) => (
                                                <div>{theSat?.toString()}</div>
                                            )}
                                        </For>
                                    </div>
                                    Hidden:
                                    <div class="grid grid-cols-4">
                                        <For each={theAssetList?.HiddenSatIds}>
                                            {(theHiddenSat) => (
                                                <div>{theHiddenSat?.toString()}</div>
                                            )}
                                        </For>
                                    </div>

                                    <h6>Sensors</h6>
                                    <div class="grid grid-cols-4">
                                        <For each={theAssetList?.Sensors}>
                                            {(theSensor) => (
                                                <div>{theSensor?.toString()}</div>
                                            )}
                                        </For>
                                    </div>
                                    Hidden:
                                    <div class="grid grid-cols-4">
                                        <For each={theAssetList?.HiddenSensorIds}>
                                            {(theHiddenSensor) => (
                                                <div>{theHiddenSensor?.toString()}</div>
                                            )}
                                        </For>
                                    </div>
                                </div>
                            )}
                        </For>



                        <h4>User Satellite data</h4>
                        <div class="grid grid-cols-4">
                            <For each={theLore()?.UserSatData}>
                                {(theSat) => (
                                    <div>{JSON.stringify(theSat, null, 4)}</div>
                                )}
                            </For>
                        </div>


                        <h4>User Sensor data</h4>
                        <div class="grid grid-cols-4">
                            <For each={theLore()?.UserSensorData}>
                                {(theSensor) => (
                                    <div>{JSON.stringify(theSensor, null, 4)}</div>
                                )}
                            </For>
                        </div>

                        <h4>Focused Satellite: {theLore()?.FocusedSat}</h4>

                        <h4>Focused Sensor: {theLore()?.FocusedSensor}</h4>

                        <h4>Visuals</h4>
                        <For each={theLore()?.Visuals}>
                            {(theVisual) => (
                                <div class="">
                                    Tool type: {theVisual?.ToolType} <br />
                                    Involved scene objects:
                                    <div class="grid grid-cols-4">
                                        <For each={theVisual?.InvolvedSceneObjectIds}>
                                            {(theInvolvedSceneObject) => (
                                                <div>{theInvolvedSceneObject?.toString()}</div>
                                            )}
                                        </For>
                                    </div>
                                </div>
                            )}
                        </For>






                    </div>
                </div>
            </section >

            <h2>Source data</h2>
            <A href={theSource}>{theSource}</A>
            <pre>
                {JSON.stringify(theLore(), null, 4)}
            </pre>

        </Layout >
    )
}
