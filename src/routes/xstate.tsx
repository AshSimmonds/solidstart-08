import { createEffect, createSignal } from "solid-js"
// import { State, AnyEventObject, ResolveTypegenMeta, BaseActionObject, ServiceMap } from "xstate"
import Layout from "~/components/Layout"
import PageTitle from "~/components/PageTitle"
// import { counterMachine } from "~/deusex/counterMachine"
import { counterMachineService } from "~/deusex/counterMachine"

export default function XStatePage() {

    const [interactions, setInteractions] = createSignal(0)

    const [counterState, setCounterState] = createSignal(counterMachineService.initialState)

    counterMachineService.onTransition((newState) => {
        setCounterState(newState)

        setInteractions(interactions => interactions + 1)
    })

    createEffect(() => {
        console.log("xstate.tsx | XStatePage() createEffect(): ", counterState())
    })


    return (
        <Layout>
            <PageTitle>xstate</PageTitle>
            <h1>xstate</h1>

            <div class="text-center mx-auto ">

                <h2>interactions: {interactions()}</h2>


                <div >
                    <p>
                        Counter: <span class="badge text-xl">{counterState().context.count}</span>
                    </p>
                    <button onclick={() => counterMachineService.send("decrement")} class="btn btn-circle text-xl">-</button>
                    <button onclick={() => counterMachineService.send("increment")} class="btn btn-circle text-xl">+</button>

                    <p>
                        State.value: <span class="badge text-xl ">{counterState().value.toString()}</span>
                    </p>

                    <button onclick={() => counterMachineService.send("disable")} class="btn btn-warning" >Disable</button>
                    <button onclick={() => counterMachineService.send("enable")} class="btn btn-success">Enable</button>

                </div>

            </div>

            <div class="">
                <pre>{JSON.stringify(counterState(), null, 4)}</pre>
            </div>

        </Layout>
    )
}




