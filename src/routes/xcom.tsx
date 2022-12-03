import Layout from "~/components/Layout"
import PageTitle from "~/components/PageTitle"

export default function XComCentralPage() {
    return (
        <Layout>
            <PageTitle>Central</PageTitle>
            <h1>Central</h1>

            <a href="http://augmented-ui.com/docs" target="_blank" data-augmented-ui="all-hexangle-up border" class="p-8 mt-24">
                config
            </a>

            <div id="xcomblueleft" data-augmented-ui="tr-2-clip-y br-clip b-clip-x bl-2-clip-x l-clip-y border 
" class="styleme p-12 mt-12">

                XState POC: https://codesandbox.io/s/xstate-solid-example-dgpd7?file=/index.jsx

            </div>

            <div id="xcomgreenright" data-augmented-ui="" class="mt-8 pt-1 p-4">
                <h2 class="text-center">Announcement</h2>
                <p>Blue Dwarf Space Recombobulator is currently in beta testing. Please report any bugs or issues to mama xenomorph.</p>
            </div>

        </Layout >
    )
}
