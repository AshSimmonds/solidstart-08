import { For, onCleanup, createEffect, createSignal } from "solid-js"
import { A, useRouteData } from "solid-start"
import { createServerData$ } from "solid-start/server"
import Layout from "~/components/Layout"
import PageTitle from "~/components/PageTitle"
import { Convert, SpaceCock } from "../../types/spacecock"

import { fetchDataMachineService } from "~/deusex/fetchDataMachine"




export const routeData = () => {

    return createServerData$(async () => {


        const [fetchDataState, setFetchDataState] = createSignal(fetchDataMachineService.initialState)

        fetchDataMachineService.onTransition((newState) => {
            setFetchDataState(newState)
        })

        createEffect(() => {
            console.log("saber spacecock.tsx | SpaceCockPage() createEffect(): ", fetchDataState())
        })




        // console.log(`createServerData spaceCockState: ${spaceCockState.value + ' | ' + new Date().toISOString()}`)

        try {

            fetchDataMachineService.send("FETCH")

            const theData = fetchDataState()?.context

            // console.log(`spacecock.tsx createServerData theData: ${JSON.stringify(theData, null, 4)}`)


            // let theResponse = await fetch(theSource)

            // const theData = await theResponse?.json()

            // console.log(`saber spacecock routeData theData: ${theData}`)

            // TODO: figure out why this errors out, error object is empty
            // without this "theData" object does not have types properly specced
            // https://app.quicktype.io/
            // const spaceCock = Convert.toSpaceCock(theData)

            // console.log(`saber spacecock routeData spaceCock: ${spaceCock}`)


            // console.log(`spacecock.tsx routeData theData: ${JSON.stringify(theData.data.Name, null, 4)}`)

            return theData

        } catch (error) {
            console.error(`saber spacecock routeData error: ${JSON.stringify(error, null, 4)}`)

            return new Error(`saber spacecock routeData error: ${error}`
            )
        }
    })
}






export default function SpaceCockPage() {




    const theLore: any = useRouteData<typeof routeData>()

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
                        <h3 class="mb-0">Operation: {theLore()?.data.Name}</h3>
                        {/* <h3>asdf{spaceCockState?.value}qwer</h3> */}
                        <span class="text-sm">ID: {theLore()?.data.Id}</span>
                        <hr />

                        <div class="alert alert-warning">Finite state machine status: {theLore()?.status} <button onclick={() => fetchDataMachineService.send('FETCH')} >refresh</button></div>

                        <div class="alert alert-info">Operation status: {theLore()?.data.Status}</div>

                        <div class="">
                            TODO: augment the data with some operational stuff the user can include.
                        </div>

                        <div class="mt-4 translucent bg-success bg-opacity-20 btn-block text-center opacity-80">
                            Simulation Time: {theLore()?.data.SimulationTime} <br />
                            Simulation Speed: {theLore()?.data.SimulationSpeed} <br />
                            Scenario End Time: {theLore()?.data.ScenarioEndTime} <br />
                        </div>

                        <h4>Source: {theLore()?.data.Source}</h4>

                        <h4>Active asset list index: {theLore()?.data.ActiveAssetListIndex}</h4>

                        <h4>Focused Satellite: {theLore()?.data.FocusedSat}</h4>

                        <h4>Focused Sensor: {theLore()?.data.FocusedSensor}</h4>

                        <h4>Asset Lists</h4>
                        <For each={theLore()?.data.AssetLists}>
                            {(theAssetList: any) => (
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

                                    <h6>Ground stations</h6>
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
                            <For each={theLore()?.data.UserSatData}>
                                {(theSat) => (
                                    <div>{JSON.stringify(theSat, null, 4)}</div>
                                )}
                            </For>
                        </div>


                        <h4>User Sensor data</h4>
                        <div class="grid grid-cols-4">
                            <For each={theLore()?.data.UserSensorData}>
                                {(theSensor) => (
                                    <div>{JSON.stringify(theSensor, null, 4)}</div>
                                )}
                            </For>
                        </div>

                        <h4>Focused Satellite: {theLore()?.data.FocusedSat}</h4>

                        <h4>Focused Sensor: {theLore()?.data.FocusedSensor}</h4>

                        <h4>Visuals</h4>
                        <For each={theLore()?.data.Visuals}>
                            {(theVisual: any) => (
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


            <h2 >Bugs</h2>
            <section id="xcomgreenright" data-augmented-ui="" class="mt-8 pt-1 p-12">
                <ul>
                    <li>invalid UDL credentials</li>
                    <li>focused cam controls - roll should be Q and E, zoom should be R and F</li>
                    <li>free cam controls - most keys wonky, right button is not for drag</li>
                    <li>ground station search filter text invisible</li>
                    <li>state machine of sat visibility a bit janky</li>
                    <li>sensor tasking (tracking overpasses) - cannot deselect overpass</li>
                    <li>show sat stuff like altitude/speed sometimes works sometimes not</li>
                </ul>


            </section>



            <h2>Source data</h2>
            <A href={theLore()?.sourceUrl}>{theLore()?.sourceUrl}</A>
            <pre>
                {JSON.stringify(theLore(), null, 4)}
            </pre>

        </Layout >
    )
}
