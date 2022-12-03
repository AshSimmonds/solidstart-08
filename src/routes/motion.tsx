import Layout from "~/components/Layout"
import PageTitle from "~/components/PageTitle"
import { Component } from "solid-js";
import { Motion } from "@motionone/solid";

export default function MotionPage() {
    return (
        <Layout>
            <PageTitle>Motion One / Dev</PageTitle>
            <h1>Motion One / Dev</h1>

            <div class="text-center mx-auto ">
                <MotionDefault />
            </div>
        </Layout>
    )
}


const MotionDefault: Component = () => {
    return (
        <Motion
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 1, easing: "ease-in-out" }}
        >
            asdf
        </Motion>
    )
}
