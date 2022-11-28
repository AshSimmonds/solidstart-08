import { z } from "zod"
import { procedurePublic, procedureRegistered, router } from "../utils"
import { serverEnv } from "~/env/server"
import { TRPCError } from "@trpc/server"

const saberUsername = serverEnv.SABER_USERNAME
const saberPassword = serverEnv.SABER_PASSWORD

const saberApiUrl = 'https://saberdata.space/'
const saberApiLoginUrl = saberApiUrl + 'login'
const saberApiRefreshUrl = saberApiUrl + 'refresh'
const saberApiSatelliteUrl = saberApiUrl + 'tle'
const saberApiSpaceWeatherUrl = saberApiUrl + 'spwx'
const saberApiSpaceStomrUrl = saberApiSpaceWeatherUrl + 'status'

const saberApiAccessTokenExpiryDuration = 840000 // 14 minutes, actually 15 but it is refreshing to be early
let currentToken = ''
let refreshToken = ''
let currentTokenExpiry = 1690002013000

export default router({
    // login: procedureRegistered.query(() => {
    //     const token = _getToken()

    // }),

    // getTle: procedureRegistered.query(() => {
    getSatellites: procedureRegistered.query(() => {
        const satellites = _getTle()
        return satellites
    }),

})






// make procedure to get SABER_API_ACCESS_TOKEN and SABER_API_REFRESH_TOKEN using SABER_USERNAME and SABER_PASSWORD




async function _getToken() {

    console.log(`saber.ts _getToken() currentToken: ${currentToken}`)

    const rightMeow = Date.now()

    console.log(`saber.ts _getToken() rightMeow: ${rightMeow}`)

    if (currentToken) {
        if (rightMeow < currentTokenExpiry) {
            return currentToken
        } else {
            console.log(`saber.ts _getToken() token expired, refreshing...`)
            const refreshedToken = await _refreshToken()
            return refreshedToken
        }
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

        if (response.status > 299) {
            throw new Error(`_getToken response status: ${response.status}`)
        }

        const data = await response.json()

        const newToken = data.access_token

        // TODO: do some JWT verify magicks
        console.log(`SERVER saber.ts _getToken newToken: ${newToken}`)

        currentToken = newToken
        refreshToken = data.refresh_token
        currentTokenExpiry = rightMeow + saberApiAccessTokenExpiryDuration

        console.log(`SERVER saber.ts _getToken currentTokenExpiry: ${currentTokenExpiry}`)

        return newToken

    } catch (error) {
        console.log(`SERVER saber.ts _getToken error: ${error}`)

        return new TRPCError({
            code: "BAD_REQUEST",
            message: `SERVER saber.ts _getToken error: ${error}`,
        })
    }

}


async function _refreshToken() {

    // console.log(`SERVER saber.ts _refreshToken() currentToken: ${currentToken}`)
    // console.log(`SERVER saber.ts _refreshToken() currentTokenExpiry: ${currentTokenExpiry}`)
    // console.log(`SERVER saber.ts _refreshToken() Date.now(): ${Date.now()}`)
    // console.log(`SERVER saber.ts _refreshToken() Date.now() < currentTokenExpiry: ${Date.now() < currentTokenExpiry}`)

    try {

        const headersList = {
            "Accept": "*/*",
            "Authorization": `Bearer ${refreshToken}`
        }

        console.log(`SERVER saber.ts _refreshToken REFRESHING`)

        const response = await fetch(saberApiRefreshUrl, {
            method: "GET",
            headers: headersList
        })

        if (response.status > 299) {
            throw new Error(`SERVER saber.ts _refreshToken response status: ${response.status}`)
        }

        const data = await response.json()

        // console.log(`SERVER saber.ts _refreshToken data: ${data}`)

        const newToken = data.access_token
        // TODO: do some JWT verify magicks

        currentToken = newToken
        currentTokenExpiry = Date.now() + saberApiAccessTokenExpiryDuration

        return newToken


    } catch (error) {
        console.log(`SERVER saber.ts _refreshToken error: ${error}`)
        return new TRPCError({
            code: "BAD_REQUEST",
            message: `SERVER saber.ts _refreshToken error: ${error}`,
        })
    }

}









async function _getTle() {

    try {

        const token = await _getToken()

        // console.log(`SERVER saber.ts _getTle token: ${token}`)

        if (!token) {
            throw new Error(`saber.ts _getTle() - token not found`)
        }

        const headersList = {
            "Accept": "*/*",
            "Authorization": `Bearer ${token}`
        }

        const response = await fetch(saberApiSatelliteUrl, {
            method: "GET",
            headers: headersList
        })

        const data = await response.json()

        if (response.status > 299) {
            throw new Error(`saber.ts _getTle() response status: ${response.status}`)
        }

        console.log(`SERVER saber.ts _getTle() data: ${JSON.stringify(data, null, 4)}`)

        return data

    } catch (error) {
        console.log(`SERVER saber.ts _getTle() error: ${error}`)

        return new TRPCError({
            code: "BAD_REQUEST",
            cause: error,
            message: `SERVER saber.ts _getTle() error: ${error}`,
        })
    }

}



