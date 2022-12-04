import { A } from "solid-start"
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

            <section id="xcomblueleft" data-augmented-ui="tr-2-clip-y br-clip-y b-clip-x bl-2-clip-x l-clip-y border 
" class="styleme pb-12 pt-0 pl-0 pr-8 mt-12">
                <div class="flex">
                    <div class="flex-none text-4xl mt-2">
                        🌐
                    </div>
                    <div class="flex-1 w-64 ...">
                        <h4>Operation: Portent</h4>
                        Wanaka, New Zealand, -44.699 169.149
                        <hr />
                        <div class="">
                            We've been picking up some odd transmissions lately... some nut calling himself "Commander Straker" has been all over the news ranting about shadow operatives.
                        </div>

                        <div class="mt-4 translucent bg-success bg-opacity-20 btn-block text-center opacity-80">
                            ENGINEER: §200, Wissenshafter: 2, Ayy: 1
                        </div>

                        <A href="" class="btn btn-primary btn-outline mt-4">Accept</A>
                        <A href="" class="btn btn-warning btn-outline mt-4">Decline</A>
                    </div>
                </div>
            </section>

            <section id="xcomgreenright" data-augmented-ui="" class="mt-8 pt-1 p-4">
                <h2 class="text-center">Announcement</h2>
                <p>Blue Dwarf Space Recombobulator is currently in beta testing. Please report any bugs or issues to mama xenomorph.</p>
            </section>

        </Layout >
    )
}
