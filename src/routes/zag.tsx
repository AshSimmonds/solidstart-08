import Layout from "~/components/Layout"
import PageTitle from "~/components/PageTitle"
import * as toggle from "@zag-js/toggle"
import { useMachine, normalizeProps } from "@zag-js/solid"
import * as tabs from "@zag-js/tabs"
import { createMemo, createUniqueId, For } from "solid-js"

const tabsData = [
    { value: "item-1", label: "Item one", content: "Item one content" },
    { value: "item-2", label: "Item two", content: "Item two content" },
    { value: "item-3", label: "Item three", content: "Item three content" },
]

export default function ZagPage() {
    const [toggleState, toggleSend] = useMachine(toggle.machine({
        id: createUniqueId()
    }))

    const toggleApi = createMemo(() => toggle.connect(toggleState, toggleSend, normalizeProps))

    const [tabsState, tabsSend] = useMachine(tabs.machine({ id: createUniqueId(), value: "item-1" }))

    const tabsApi = createMemo(() => tabs.connect(tabsState, tabsSend, normalizeProps))

    return (
        <Layout>
            <PageTitle>zag</PageTitle>
            <h1>zag</h1>

            <div class="text-center mx-auto ">


                <h3>toggle</h3>
                <button {...toggleApi().buttonProps}>
                    {toggleApi().isPressed ? "On" : "Off"}
                </button>


                <h3>tabs</h3>
                <div {...tabsApi().rootProps}>
                    <div {...tabsApi().triggerGroupProps}>
                        <For each={tabsData}>
                            {(item) => (
                                <button {...tabsApi().getTriggerProps({ value: item.value })}>
                                    {item.label}
                                </button>
                            )}
                        </For>
                    </div>
                    <For each={tabsData}>
                        {(item) => (
                            <div {...tabsApi().getContentProps({ value: item.value })}>
                                <p>{item.content}</p>
                            </div>
                        )}
                    </For>
                </div>



            </div>
        </Layout>
    )
}
