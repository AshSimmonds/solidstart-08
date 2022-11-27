import { z } from "zod"
import { procedurePublic, procedureRegistered, router } from "../utils"
import { serverEnv } from "~/env/server"

const saberUsername = serverEnv.SABER_USERNAME
const saberPassword = serverEnv.SABER_PASSWORD

const saberApiUrl = 'https://saberdata.space/'
const saberApiLoginUrl = saberApiUrl + 'login'
const saberApiRefreshUrl = saberApiUrl + 'refresh'
const saberApiTleUrl = saberApiUrl + 'tle'
const saberApiSpaceWeatherUrl = saberApiUrl + 'spwx'
const saberApiSpaceStomrUrl = saberApiSpaceWeatherUrl + 'status'

let currentToken = ''



export default router({
    // login: procedureRegistered.query(() => {
    //     const token = _getToken()

    // }),

    // getTle: procedureRegistered.query(() => {
    getTle: procedureRegistered.query(() => {
        const tle = _getTle()
        return tle
    }),

})






// make procedure to get SABER_API_ACCESS_TOKEN and SABER_API_REFRESH_TOKEN using SABER_USERNAME and SABER_PASSWORD




async function _getToken() {

    if (currentToken) {
        return currentToken
    }

    try {

        const headersList = {
            "Accept": "*/*",
            "Content-Type": "application/x-www-form-urlencoded"
        }

        const bodyContent = `username=${serverEnv.SABER_USERNAME}&password=${serverEnv.SABER_PASSWORD}`

        console.log(`####################################`)
        console.log(`######                    ##########`)
        console.log(`SERVER saber.ts _getToken LOGGING IN`)
        console.log(`######                    ##########`)
        console.log(`####################################`)

        const response = await fetch(saberApiLoginUrl, {
            method: "POST",
            body: bodyContent,
            headers: headersList
        })

        if (response.status !== 200) {
            throw new Error(`_getToken response status: ${response.status}`)
        }

        const data = await response.json()

        console.log(`SERVER saber.ts _getToken data: ${data}`)

        const newToken = data.access_token

        // TODO: do some JWT verify magicks
        console.log(`SERVER saber.ts _getToken newToken: ${newToken}`)

        currentToken = newToken

        return newToken

    } catch (error) {
        console.log(`SERVER saber.ts _getToken error: ${error}`)

        return new Error(`SERVER saber.ts _getToken error: ${error}`)
    }

}







async function _getTle() {

    try {

        const token = await _getToken()

        console.log (`SERVER saber.ts _getTle token: ${token}`)

        if (!token) {
            return
        }

        const headersList = {
            "Accept": "*/*",
            "Authorization": `Bearer ${token}`
        }

        const response = await fetch(saberApiTleUrl, {
            method: "GET",
            headers: headersList
        })

        const data = await response.text()

        console.log(`SERVER saber.ts _getTle data: ${data}`)

        return data

    } catch (error) {
        console.log(`SERVER saber.ts _getTle error: ${error}`)

        return new Error(`SERVER saber.ts _getTle error: ${error}`)
    }

}



