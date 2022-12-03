import Layout from "~/components/Layout"
import PageTitle from "~/components/PageTitle"

export default function SuspensePage() {
    return (
        <Layout>
            <PageTitle>Sunspense</PageTitle>
            <h1>Suspense</h1>

            <a href="https://www.youtube.com/watch?v=uZnXwuhYZBc" target="_blank" id="xcomblueleft" data-augmented-ui="tr-2-clip-y br-clip b-clip-x bl-2-clip-x l-clip-y border 
" class="styleme pb-12 pt-4 p-8 mt-4 btn btn-info btn-outline">Explainer: uZnXwuhYZBc</a>

            <a href="https://www.solidjs.com/tutorial/async_suspense" target="_blank" id="xcomgreenright" data-augmented-ui="" class="mt-8 pt-1 p-8 " >solidjs.com / help</a>

            <div id="xcomblueleft" data-augmented-ui="tr-2-clip-y br-clip b-clip-x bl-2-clip-x l-clip-y border 
" class="styleme p-12 mt-12">
                Basically put a <code>{`<Suspense>`}</code> boundary around the component that is loading data and then use <code>{`<Suspense.Fallback>`}</code> to show a loading indicator while the data is loading.
            </div>
        </Layout>
    )
}
