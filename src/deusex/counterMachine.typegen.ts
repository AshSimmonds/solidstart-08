
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.toggleEnabledDisabled": { type: "done.invoke.toggleEnabledDisabled"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.toggleEnabledDisabled": { type: "error.platform.toggleEnabledDisabled"; data: unknown };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "toggleEnabledDisabledFunction": "done.invoke.toggleEnabledDisabled";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          "decrementCounter": "decrement";
"incrementCounter": "increment";
"setDisabled": "disable" | "xstate.init";
"setEnabled": "enable";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          
        };
        eventsCausingServices: {
          "toggleEnabledDisabledFunction": "disable" | "enable" | "xstate.init";
        };
        matchesStates: "disabled" | "enabled";
        tags: never;
      }
  