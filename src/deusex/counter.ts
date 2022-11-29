import { assign, createMachine, interpret } from 'xstate';


export const counterMachine =
    /** @xstate-layout N4IgpgJg5mDOIC5QGMD2BXAdgFzAJwDoxMBDAIwBtIBiAS02TzAFtjsBtABgF1FQAHVLFrZaqTHxAAPRAFoAjJwBMBAOzyAzPIAc2+eo3aAbKqUAaEAE85qzgQCcnR7s0AWVUYCsRpQF9fFmhYuITE5FQQ1BBgjCxsXLxIIILCouKSMgiyrhr2BEqOnJyenvKeSvKOrhbWWbYOTpwuGu5ePv6BGDj4RKSUNBC0sOFgCZIpImISSZmypgTarnoaRo46Je41chXaBF72ZYqqpraeHSBB3YSDw-2RYf1jSRNp06Czrk17qvYV8q7ubQrcxWbY6PaeA6lTjHJSnfwBECYVDReBJS4hcZCSbpGZyJaqfKFYqlcqVTjVUFZT6uPb2VSlbRwpSueyueRGc4YnoPCJY1JTDLbdT5CrqJYUjz2bRbLI6FQcjz6H6qbSkzmI7nXIYjCD8nFvaTCjQEf5GVxw+y5TwaTwA2WyLSeNT6GlKbRW3LaVQI3xAA */
    createMachine({
        context: {
            count: 0,
            incrementCount: 0,
            decrementCount: 0,
            disabledCount: 0,
            enabledCount: 0,
        },
        tsTypes: {} as import("./counter.typegen").Typegen0,
        predictableActionArguments: true,
        id: "counter",
        initial: "disabled",
        states: {
            enabled: {
                entry: "setEnabled",
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
                context.count++;
                context.incrementCount++;
                console.log(`event: ${JSON.stringify(event)} context: ${JSON.stringify(context)}`);
            },
            decrementCounter: (context, event) => {
                context.count--;
                context.decrementCount++;
                console.log(`event: ${JSON.stringify(event)} context: ${JSON.stringify(context)}`);
            },
            setDisabled: (context, event) => {
                context.disabledCount++;
                console.log(`event: ${JSON.stringify(event)} context: ${JSON.stringify(context)}`);
            },
            setEnabled: (context, event) => {
                context.enabledCount++;
                console.log(`event: ${JSON.stringify(event)} context: ${JSON.stringify(context)}`);
            },
        }
    })


export const counterMachineService = interpret(counterMachine).start()
