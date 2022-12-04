import Layout from "~/components/Layout"
import PageTitle from "~/components/PageTitle"
import { Component, createSignal, Show } from "solid-js";
import { Motion, Presence } from "@motionone/solid";

export default function MotionPage() {

    return (
        <Layout>
            <PageTitle>Motion One / Dev</PageTitle>
            <h1>Motion One / Dev</h1>

            <MotionDefault />

            <MotionRotate90 />

            <MotionRotate90Slow />

            <MotionClickToChangeBackground />

            <MotionKeyframes />

            <MotionExit />

        </Layout>
    )
}


const MotionDefault: Component = () => {
    return (
        <Motion.div
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 1, easing: "ease-in-out" }}
            class="bg-secondary p-4"
        >
            animate=opacity: [0, 1]
            transition=duration: 1, easing: "ease-in-out"
        </Motion.div>
    )
}


const MotionRotate90: Component = () => {
    return (
        <Motion.div
            animate={{ rotate: 90, backgroundColor: "yellow" }}
            transition={{ duration: 1, easing: "ease-in-out" }}
            class="bg-secondary p-4"
        >
            animate=rotate: 90, backgroundColor: "yellow"
            transition=duration: 1, easing: "ease-in-out"
        </Motion.div>
    )
}


const MotionRotate90Slow: Component = () => {
    return (
        <Motion.div
            animate={{ rotate: 90, backgroundColor: "yellow" }}
            transition={{
                duration: 1,
                rotate: { duration: 4 },
            }}
            class="bg-secondary p-4"
        >
            animate=rotate: 90, backgroundColor: "yellow"
            transition=duration: 1,
            rotate: duration: 4
        </Motion.div>
    )
}


const MotionClickToChangeBackground: Component = () => {
    const [bg, setBg] = createSignal("red")

    return (
        <Motion.button
            onClick={() => setBg("blue")}
            animate={{
                backgroundColor: bg(),
            }}
            transition={{
                duration: 3,
            }}
        >
            onClick=setBg("blue")
        </Motion.button>
    )
}


const MotionKeyframes: Component = () => {
    const [bg, setBg] = createSignal("red")

    return (
        <Motion animate={{ x: [0, 100, 50] }}
            transition={{ x: { offset: [0, .25, 1] } }}
            class="bg-secondary p-4"
        >
            animate=x: 0, 100, 50
            transition=x: offset: [0, 0.25, 1]
        </Motion>
    )
}



const MotionExit: Component = () => {
    const [toggle, setToggle] = createSignal(true)

    return (
        <div class="container mt-8">
            <Presence exitBeforeEnter>
                <Show when={toggle()}>
                    <Motion.div
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.6 }}
                        transition={{ duration: 0.3 }}
                        class="bg-secondary p-4"
                    >
                        initial=opacity: 0, scale: 0.6
                        animate=opacity: 1, scale: 1
                        exit=opacity: 0, scale: 0.6
                        transition=duration: 0.3
                    </Motion.div>
                </Show>
            </Presence>
            <button onClick={() => setToggle(!toggle())}>
                Toggle
            </button>
        </div>
    )
}
