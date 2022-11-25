import { A } from "solid-start";
import Layout from "~/components/Layout";
import PageTitle from "~/components/PageTitle";

export default function DrakonPage() {
    return (
        <Layout>
            <PageTitle>Drakon</PageTitle>
            <h1>Drakon</h1>

            <A href="/drakon/editor" class="btn btn-accent">/drakon/editor</A>

            <h2>What is DRAKON?</h2>

            <div class="alert alert-info mb-4">
                <a href="https://drakonhub.com/drakon" target="_blank">From: https://drakonhub.com/drakon</a>
            </div>

            <div>
                DRAKON is a visual language from the <span class="badge badge-ghost">aerospace industry</span> for representing algorithms, processes, and procedures. The goal of DRAKON is to make procedures easy to comprehend.
            </div>

            <h2>Who uses DRAKON?</h2>

            <div>
                DRAKON was created to capture software requirements for <span class="badge badge-ghost">spacecraft control systems</span>. Gradually, DRAKON has gained recognition outside of aerospace. Developers and project managers use DRAKON to <span class="badge badge-ghost">document software</span> of different types.
            </div>

            <h2>What makes DRAKON powerful?</h2>

            <img src="https://drakonhub.com/static/about-flowchart.png" alt="DRAKON diagram" class="mx-auto w-full sm:w-1/3 md:w-2/3" />

        </Layout>
    )
}
