import { assign, createMachine, interpret } from 'xstate';


export const counterMachine =
    /** @xstate-layout N4IgpgJg5mDOIC5QGMD2BXAdgFzAJwDoxMBDAIwBtIBiAS02TzAFtjsBtABgF1FQAHVLFrZaqTHxAAPRAFoAjABYCAdkWKArADYVADhXzOATgDMKjQBoQATzmH5BXfKcqtAJi1GNJ+W40Bffys0LFxCYnIqCGoIMEYWNi5eJBBBYVFxSRkEWQ0VEwItLQ1OTg0NeQ03eSMrWxz7R2d5Vw8vHz9A4IwcfCJSShoIWlhIsCTJNJExCRTst04CTi0TIpU3I3yVt106uR2tR0VjI1Kiqt0TLpAQ3sJh0cHoiMGJlKmM2dBs3MUCssU1SUij0qzcexyByOJzOxR2V2umFQsXgKVuYUmQmmmTmcncDnOpXKlWqtRschKDk2nD8Jl0WicmwR3VCfReUUx6RmWTkdIKul0JXUAp2RkUu3JkOKBG0fnKPh8hhMASCNx6YQIDzGEE52K+0l5l0cgs4wt0ovFENkil8BCMp3kJiMAqFCMCQA */
    createMachine({
        context: {
            count: 0,
            incrementCount: 0,
            decrementCount: 0,
            disabledCount: 0,
            enabledCount: 0,
        },
        tsTypes: {} as import("./counterMachine.typegen").Typegen0,
        predictableActionArguments: true,
        id: "counter",
        initial: "disabled",
        states: {
            enabled: {
                entry: "setEnabled",
                invoke: {
                    src: "toggleEnabledDisabledFunction",
                    id: "toggleEnabledDisabled",
                },
                on: {
                    increment: {
                        actions: "incrementCounter",
                    },
                    decrement: {
                        actions: "decrementCounter",
                    },
                    disable: {
                        target: "disabled",
                    },
                },
            },
            disabled: {
                entry: "setDisabled",
                invoke: {
                    src: "toggleEnabledDisabledFunction",
                    id: "toggleEnabledDisabled",
                },
                on: {
                    enable: {
                        target: "enabled",
                    },
                },
            },
        },
    }, {
        actions: {
            incrementCounter: (context, event) => {
                console.log(`counterMachine.ts incrementCounter event: ${JSON.stringify(event)} `);

                console.log(`counterMachine.ts incrementCounter context: ${JSON.stringify(context)} `);
    
                context.count++;
                context.incrementCount++;
            },
            decrementCounter: (context, event) => {
                console.log(`counterMachine.ts decrementCounter event: ${JSON.stringify(event)} `);

                console.log(`counterMachine.ts decrementCounter context: ${JSON.stringify(context)} `);

                context.count--;
                context.decrementCount++;
            },
            setDisabled: (context, event) => {
                console.log(`counterMachine.ts setDisabled event: ${JSON.stringify(event)} `);

                console.log(`counterMachine.ts setDisabled context: ${JSON.stringify(context)} `);

                context.disabledCount++;
            },
            setEnabled: (context, event) => {
                console.log(`counterMachine.ts setEnabled event: ${JSON.stringify(event)} `);

                console.log(`counterMachine.ts setEnabled context: ${JSON.stringify(context)} `);

                context.enabledCount++;
            },
        },
        services: {
            toggleEnabledDisabledFunction: (context, event) => (sendBack) => {
                console.log(`counterMachine.ts toggleEnabledDisabledFunction event: ${JSON.stringify(event)} `);

                console.log(`counterMachine.ts toggleEnabledDisabledFunction context: ${JSON.stringify(context)} `);

            },
        },
    })


export const counterMachineService = interpret(counterMachine).start()
