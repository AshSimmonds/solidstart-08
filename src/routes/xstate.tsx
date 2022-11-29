import { createEffect } from "solid-js"
import { State, AnyEventObject, ResolveTypegenMeta, BaseActionObject, ServiceMap } from "xstate"
import Layout from "~/components/Layout"
import PageTitle from "~/components/PageTitle"
import { counterMachine } from "~/deusex/counter"
import { counterMachineService } from "~/deusex/counter"
import { Typegen0 } from "~/deusex/counter.typegen"

// let counterState: State<{ count: number }, AnyEventObject, any, { value: any; context: { count: number } }, ResolveTypegenMeta<Typegen0, AnyEventObject, BaseActionObject, ServiceMap>>


export default function XStatePage() {

    // const [state, send] = useMachine(counterMachine)

    // const counterState = counterMachineService

    let counterState:any

    counterMachineService.onTransition((newState) => {
        // console.log(`newState`, newState)
        counterState = newState
    })

    createEffect(() => {
        console.log("off", counterState.context.count)
    })


    return (
        <Layout>
            <PageTitle>xstate</PageTitle>
            <h1>xstate</h1>

            <div class="text-center mx-auto ">

                <div >
                    <p>
                        Counter: <span class="badge text-xl">{counterState.context.count}</span>
                    </p>
                    <button onclick={() => counterMachineService.send("decrement")} class="btn btn-circle text-xl">-</button>
                    <button onclick={() => counterMachineService.send("increment")} class="btn btn-circle text-xl">+</button>

                    <p>
                        State.value: <span class="badge text-xl ">{counterState.context.count}</span>
                    </p>

                    <button onclick={() => counterMachineService.send("disable")} class="btn btn-warning" >Disable</button>
                    <button onclick={() => counterMachineService.send("enable")} class="btn btn-success">Enable</button>

                </div>

            </div>

            <div class="">
                <pre>{JSON.stringify(counterState, null, 4)}</pre>
            </div>

        </Layout>
    )
}
