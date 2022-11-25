import Layout from "~/components/Layout";
import PageTitle from "~/components/PageTitle";

export default function DrakonPage() {
    return (
        <Layout>
            <PageTitle>Drakon</PageTitle>
            <h1>Drakon</h1>

            From <a href="https://drakonhub.com/drakon" class="link-warning" target="_blank">https://drakonhub.com/drakon</a>.

            <h2>What is DRAKON?</h2>

            <div>
                DRAKON is a visual language from the aerospace industry for representing algorithms, processes, and procedures. The goal of DRAKON is to make procedures easy to comprehend.
            </div>

            <h2>Who uses DRAKON?</h2>

            <div>
                DRAKON was created to capture software requirements for spacecraft control systems. Gradually, DRAKON has gained recognition outside of aerospace. Developers and project managers use DRAKON to document software of different types.
            </div>

            <h2>What makes DRAKON powerful?</h2>

            <img src="https://drakonhub.com/static/about-flowchart.png" alt="DRAKON diagram" class="mx-auto w-full sm:w-1/3 md:w-2/3" />

        </Layout>
    )
}
