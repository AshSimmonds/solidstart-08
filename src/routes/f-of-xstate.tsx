import { mapStates } from "@simplystated/f-of-xstate"
import { mapTransitions } from "@simplystated/f-of-xstate/dist/state-mappers"
// import { useMachine } from "@zag-js/solid"
import { assign, createMachine } from "xstate"
import Layout from "~/components/Layout"
import PageTitle from "~/components/PageTitle"
// import { interpret } from 'xstate'
import useMachine from "~/deusex/useMachine"


const masterMachine = createMachine({
    id: 'masterMachine',
    predictableActionArguments: true,
    // tsTypes: {} as import("./f-of-xstate.typegen").Typegen0,
    initial: 'red',
    states: {
        red: {
            after: {
                2000: 'green'
            }
        },
        green: {
            after: {
                2000: 'yellow'
            }
        },
        yellow: {
            after: {
                2000: 'red'
            }
        }
    }
})


const slaveMachine = createMachine(
    mapStates(
        masterMachine,
        mapTransitions((transition) => ({
            ...transition,
            actions: transition.actions.concat([
                assign({
                    events: ({ events }) =>
                        events.concat(
                            `[${new Date().toISOString() + ': ' + transition.target[0]
                            }] `
                        )
                })
            ])
        }))
    )
).withContext({
    events: []
});





export default function FofXstatePage() {

    const [state, send] = useMachine(slaveMachine)

    return (
        <Layout>
            <PageTitle>f of xstate</PageTitle>
            <h1>f of xstate</h1>

            <p>
                Uses a masterMachine in XState which changes state between traffic light colours every 2 seconds.
            </p>
            <p>
                A secondary slaveMachine watches the masterMachine to map the transitions and logs them.
            </p>
            <p class="text-xs">
                This works as is, but source code will show errors, not sure why yet.
            </p>

            <div class="text-center mx-auto mt-12">
                <div class={`btn btn-outline btn-xl`} style={{ color: state.value }}>
                    {state.value}
                </div>

                <div class="border-2 border-secondary w-16 mx-auto p-2 mt-12 bg-slate-900">
                    <ul class="steps steps-vertical">
                        <li class={`step ${state.value === 'red' ? 'step-error' : ''}`} data-content=''></li>
                        <li class={`step ${state.value === 'yellow' ? 'step-warning' : ''}`} data-content=''></li>
                        <li class={`step ${state.value === 'green' ? 'step-success' : ''}`} data-content=''></li>
                    </ul>
                </div>

                <div id="xcomblueleft" data-augmented-ui="tr-2-clip-y br-clip b-clip-x bl-2-clip-x l-clip-y border 
" class="styleme p-4 mt-12 w-2/3 mx-auto">
                    <h4>MEMENTO SIMULATOR</h4>
                    <ul class="steps steps-horizontal">
                        <li class="step step-primary">Do this</li>
                        <li class={`step ${state.value !== 'green' ? 'step-primary' : ''}`}>Then that</li>
                        <li class={`step ${state.value === 'red' ? 'step-primary' : ''}`}>Doneski</li>
                    </ul>
                </div>
            </div>



            <h2 style={{ color: state.value }}>Event log</h2>
            <pre class="mt-12">
                <ul>
                    {state.context.events.map((event) => (
                        <li>{event}</li>
                    ))}
                </ul>
            </pre>


        </Layout>
    )
}
