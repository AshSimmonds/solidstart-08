import Layout from "~/components/Layout"
import PageTitle from "~/components/PageTitle"
import * as toggle from "@zag-js/toggle"
import { useMachine, normalizeProps } from "@zag-js/solid"
import * as tabs from "@zag-js/tabs"
import { createMemo, createUniqueId, For } from "solid-js"
import "../styles/Zag.module.css"

const tabsData = [
    { value: "item-1", label: "Item one", content: `Item one ${<span>asdf</span>} content` },
    { value: "item-2", label: "Item two", content: "Item two content" },
    { value: "item-3", label: "Item three", content: `Item three  content` },
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
                <button {...toggleApi().buttonProps} class={`btn btn-outline btn-${toggleApi().isPressed ? "success" : "error"} `}>
                    {toggleApi().isPressed ? "ON" : "OFF"}
                </button>


                <h3>tabs</h3>
                <div {...tabsApi().rootProps} class="grid ">

                    <div {...tabsApi().indicatorProps} class="tab tab-lifted tab-active" />

                    <div {...tabsApi().triggerGroupProps} class="tabs">
                        <For each={tabsData}>
                            {(item) => (
                                <button {...tabsApi().getTriggerProps({ value: item.value })} class="tab tab-lifted">
                                    {item.label}
                                </button>
                            )}
                        </For>
                    </div>
                    <For each={tabsData}>
                        {(item) => (
                            <div {...tabsApi().getContentProps({ value: item.value })} class="border-2 border-primary border-opacity-20">
                                <p>{item.content}</p>
                            </div>
                        )}
                    </For>
                </div>


            </div>
        </Layout>
    )
}
