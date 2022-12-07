import { assign, createMachine, interpret } from 'xstate';

const theSourceFile = "saber/space-cock_custom-scene_test-001.sc"
const theSourceHost = "http://localhost:3000/"
const theSource = theSourceHost + theSourceFile

// const theUrl = "https://jsonplaceholder.typicode.com/todos/1"

export const fetchDataMachine = createMachine({
    context: {
        data: {},
        error: {},
        status: 'idle',
        sourceUrl: theSource,
    },
    tsTypes: {} as import("./fetchDataMachine.typegen").Typegen0,
    predictableActionArguments: true,
    id: "fetchData",
    initial: "idle",
    states: {
        idle: {
            entry: "setIdle",
            on: {
                FETCH: "fetching",
            },
        },
        fetching: {
            entry: "setFetching",
            invoke: {
                src: "fetchDataFromUrl",
                onDone: {
                    target: "idle",
                    actions: "setData",
                },
                onError: {
                    target: "idle",
                    actions: "setError",
                },
            },
            on: {
                CANCEL: "idle",
            },
        },
    },
}, {
    actions: {
        setData: (context, event) => {
            // console.log(`fetchDataMachine.ts setData event: ${JSON.stringify(event)} `);

            console.log(`fetchDataMachine.ts setData context.status: ${JSON.stringify(context.status)} `);

            context.data = event.data as {};

        },
        setError: (context, event) => {
            // console.error(`fetchDataMachine.ts setError event: ${JSON.stringify(event)} `);

            console.error(`fetchDataMachine.ts setError context.status: ${JSON.stringify(context.status)} `);

            context.error = event.data as {};
        },
        setIdle: (context, event) => {
            // console.log(`fetchDataMachine.ts setIdle event: ${JSON.stringify(event)} `);

            console.log(`fetchDataMachine.ts setIdle context.status: ${JSON.stringify(context.status)} `);

            context.status = 'idle';

            console.log(`fetchDataMachine.ts setIdle context.status: ${JSON.stringify(context.status)} `);
        },
        setFetching: (context, event) => {
            // console.log(`fetchDataMachine.ts setFetching event: ${JSON.stringify(event)} `);

            console.log(`fetchDataMachine.ts setFetching context.status: ${JSON.stringify(context.status)} `);

            context.status = 'asdffetching';
        },
    },
    services: {
        fetchDataFromUrl: () => {
            return fetch(theSource)
                .then(response => response.json())
        }
    },
})


export const fetchDataMachineService = interpret(fetchDataMachine).start()

// setInterval(() => {
//     fetchDataMachineService.send('FETCH')
// }, 5000)
