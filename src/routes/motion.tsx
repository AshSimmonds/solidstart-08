import Layout from "~/components/Layout"
import PageTitle from "~/components/PageTitle"
import { Component, createSignal } from "solid-js";
import { Motion } from "@motionone/solid";

export default function MotionPage() {

    return (
        <Layout>
            <PageTitle>Motion One / Dev</PageTitle>
            <h1>Motion One / Dev</h1>

            <MotionDefault />

            <MotionRotate90 />

            <MotionRotate90Slow />

            <MotionClickToChangeBackground />


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
