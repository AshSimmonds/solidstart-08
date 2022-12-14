import { z } from "zod"
import { procedurePublic, procedureRegistered, router } from "../utils"
import { serverEnv } from "~/env/server"

const overseasPayloadPermitTable = "overseas_payload_permit"

const defaultAirtableRecordId = "recbr6s0W3tRpfUSw"
const defaultXataRecordId = "rec_cdmqgqdheior0kfh2cgg"

const airtableBaseId = serverEnv.AIRTABLE_BASE_ID
const airtableApiKey = serverEnv.AIRTABLE_API_KEY
const airtableBaseUrl = "https://api.airtable.com/v0/" + airtableBaseId + "/"
const defaultAirtableFetchUrl = airtableBaseUrl + overseasPayloadPermitTable

const xataApiKey = serverEnv.XATA_API_KEY
const xataBaseUrl = "https://bluedwarf-hannvl.us-east-1.xata.sh/db/recombobulator:main/tables/"
const defaultXataFetchUrl = xataBaseUrl + overseasPayloadPermitTable + "/"

const useAirtableNotXata = false


let defaultFetchUrl = useAirtableNotXata ? defaultAirtableFetchUrl : defaultXataFetchUrl
let defaultApiKey = useAirtableNotXata ? airtableApiKey : xataApiKey



export default router({
    asdf: procedurePublic.input(z.object({ name: z.string() })).query(({ input }) => {
        return `gday ${input.name}`
    }),
    qwer: procedurePublic
        .input(z.object({ num: z.number() }))
        .mutation(({ input }) => {
            return Math.floor(Math.random() * 100) / input.num
        }),





    getOneFullRow: procedurePublic
        .input(z.object({
            permitId: z.string()
        }))
        .query(({ ctx, input }) => {

            const rowObject = _fetchFromAirtable(input.permitId)
                .then((rowObject: any) => {

                    return rowObject
                })
                .catch((error: any) => {
                    console.log(`getOneFullRow error: ${error}`)
                })

            return rowObject
        }),

    getOneGruntify: procedurePublic
        .input(z.object({
            permitId: z.string()
        }))
        .query(async ({ ctx, input }) => {

            return await _fetchFromAirtable(input.permitId)
                .then((rowObject: any) => {

                    console.log(`getOneGruntify rowObject: ${typeof (rowObject)}`)

                    const gruntifyString = rowObject.gruntify

                    const gruntifyStartPosition = gruntifyString.indexOf('{')
                    const gruntifyEndPosition = gruntifyString.lastIndexOf('}') + 1

                    const gruntifyJson = JSON.parse(gruntifyString.substring(gruntifyStartPosition, gruntifyEndPosition))

                    console.log(`getOneGruntify gruntifyJson: ${typeof (gruntifyJson)}`)


                    return gruntifyJson
                })
                .catch((error: any) => {
                    console.log(`getOneGruntify error: ${error}`)
                })

            // console.log(`rowObject: ${JSON.stringify(rowObject.data.gruntify)}`)

            // const gruntifyObject = rowObject ? rowObject.data.gruntify : null

            // console.log(`getOneGruntify gruntifyData: ${gruntifyData}`)

            // return 'gruntifyData'
        }),


})






async function _fetchFromAirtable(permitId: string | undefined = undefined) {

    let filterFormula = ''
    // if (permitId && useAirtableNotXata) {
    if (useAirtableNotXata) {
        // filterFormula = encodeURI(`?filterByFormula={user_id}="${userId ? userId : 'asdf'}"`)
        // filterFormula = encodeURI(`?filterByFormula={record_id}="${permitId}"`)
        filterFormula = encodeURI(`?filterByFormula={record_id}="${defaultAirtableRecordId}"`)
    }

    // if (permitId && !useAirtableNotXata) {
    if (!useAirtableNotXata) {
        // filterFormula = encodeURI(`?filterByFormula={user_id}="${userId ? userId : 'asdf'}"`)
        // filterFormula = "data/" + permitId
        filterFormula = "data/" + defaultXataRecordId
    }

    const fetchUrl = defaultFetchUrl + filterFormula

    console.log(`fetchUrl: ${fetchUrl}`)

    const fetchResult = await fetch(fetchUrl, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + defaultApiKey,
            "Content-Type": "application/json"
        }
    }).then(airtableResult => airtableResult.json())
        .then(async airtableJson => {

            // console.log(`_fetchFromAirtable airtableJson: ${JSON.stringify(airtableJson, null, 4)}`)

            if (useAirtableNotXata) {

                return airtableJson.records[0].fields

            } else {
                return airtableJson
            }
        }).catch((error: Error) => {
            console.error(`gruntify.ts _fetchFromAirtable error: ${error}`)
            return error
        })






    // Airtable doesn't return false booleans, so it comes through as undefined, real fucking helpful
    // if (!fetchResult.records[0].fields.MISSING_FIELD) {
    //     fetchResult.records[0].fields.MISSING_FIELD = false
    // }

    // console.log(`fetchFromAirtable fetchResult: ${JSON.stringify(fetchResult, null, 4)}`)

    return fetchResult
}

