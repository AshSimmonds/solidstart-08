import { For, Show } from "solid-js"
import { useRouteData } from "solid-start"
import { createServerData$ } from "solid-start/server"
import Layout from "~/components/Layout"
import PageTitle from "~/components/PageTitle"

export const routeData = () => {
    return createServerData$(async () => {

        try {
            const resServerTest = await fetch("http://localhost:3000/aoc/aoc2203-test.txt")
            const resServerOne = await fetch("http://localhost:3000/aoc/aoc2203.txt")
            const resServerTwo = await fetch("http://localhost:3000/aoc/aoc2203.txt")

            const theDataTest = await resServerTest.text()
            const theDataOne = await resServerOne.text()
            const theDataTwo = await resServerTwo.text()

            const rucksacksTest: any[] = []
            const rucksacksOne: any[] = []
            const rucksacksTwo: any[] = []

            let totalPriorityTest = 0

            theDataTest.split("\r\n").forEach((line) => {

                const compartmentOne = line.substring(0, line.length / 2)
                const compartmentTwo = line.substring(line.length / 2, line.length)

                const itemsInBothCompartments = compartmentOne.split("").filter((item) => compartmentTwo.includes(item))[0]

                
                let priority = 0

                if (itemsInBothCompartments === itemsInBothCompartments.toLowerCase()) {
                    priority = itemsInBothCompartments.charCodeAt(0) - 96
                } else {
                    priority = itemsInBothCompartments.charCodeAt(0) - 38
                }

                totalPriorityTest += priority

                rucksacksTest.push({
                    compartmentOne,
                    compartmentTwo,
                    itemsInBothCompartments,
                    priority
                })

            })

            const theResultTest = totalPriorityTest

            return { testData: theDataTest, testRucksacks: rucksacksTest, testResult: theResultTest, dataOne: theDataOne, dataTwo: theDataTwo }

        } catch (error) {
            console.error(`qwer: ${error}`)
        }
    })
}


export default function AdventOfCodePage() {

    const theLore = useRouteData<typeof routeData>()

    console.log(`CLIENT theLore: ${JSON.stringify(theLore(), null, 4)}`)

    return (
        <Layout>
            <PageTitle>Advent of Code 2022 | Day 03 | Rucksack Reorganization</PageTitle>
            <h1>Advent of Code | Day 03 | Rucksack Reorganization</h1>




            <h2 id="resources">Resources</h2>
            <p>
                <a href="https://adventofcode.com/2022/day/3" class="btn btn-info" target="_blank">Day 3</a>
            </p>
            <h3>Synopsis</h3>

            <h4>Rucksack Reorganization</h4>

            <ul>
                <li>each rucksack contains 2 <code>compartments</code></li>
                <li>total itinerary represented by random letters eg <code>dQw4w9WgXcQ</code></li>
                <li>lower case letters are worth 1-26 points</li>
                <li>upper case letters are worth 27-52 points</li>
                <li>need to get items which appear in both <code>compartments</code></li>
            </ul>


            <h3>Example data</h3>
            <pre>
                <Show when={theLore()?.testData}>
                    {theLore()?.testData}
                </Show>
            </pre>

            <h3>Example working out</h3>
            <pre>
                <Show when={theLore()?.testRucksacks}>
                    {JSON.stringify(theLore()?.testRucksacks, null, 4)}
                </Show>
            </pre>

            <h4>RESULT</h4>

            <div class="alert alert-success">
                <Show when={theLore()?.testRucksacks}>
                    {theLore()?.testResult}
                </Show>
            </div>
            <p>
                Full payload: <a href="/aoc/aoc2203.txt">aoc2203.txt</a>
            </p>



            <h2>Full data</h2>
            <pre>
                {JSON.stringify(theLore(), null, 4)}
            </pre>

        </Layout>
    )
}
