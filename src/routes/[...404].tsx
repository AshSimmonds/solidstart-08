import { A } from "solid-start"
import Layout from "~/components/Layout"
import PageTitle from "~/components/PageTitle"
import "../styles/Cyberpunk.module.css"

export default function NotFound() {
    return (
        <Layout>
            <div class="text-center mx-auto">
                <PageTitle>Lost in space</PageTitle>
                <h1 class="mt-12">
                    <button class="text-2xl p-8"><A href="/" >404 | Not Found</A></button>
                </h1>
            </div>
        </Layout>
    )
}
