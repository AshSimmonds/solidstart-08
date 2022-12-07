// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.fetchData.fetching:invocation[0]": {
      type: "done.invoke.fetchData.fetching:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.fetchData.fetching:invocation[0]": {
      type: "error.platform.fetchData.fetching:invocation[0]";
      data: unknown;
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    fetchDataFromUrl: "done.invoke.fetchData.fetching:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    setData: "done.invoke.fetchData.fetching:invocation[0]";
    setError: "error.platform.fetchData.fetching:invocation[0]";
    setFetching: "FETCH";
    setIdle:
      | "CANCEL"
      | "done.invoke.fetchData.fetching:invocation[0]"
      | "error.platform.fetchData.fetching:invocation[0]"
      | "xstate.init";
  };
  eventsCausingServices: {
    fetchDataFromUrl: "FETCH";
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates: "fetching" | "idle";
  tags: never;
}
