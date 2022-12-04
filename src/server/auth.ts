import { type User } from "@prisma/client"
import { DiscordStrategy } from '@solid-auth/socials'
// import { Auth0Strategy } from "@solid-auth/auth0"
import { Authenticator } from '@solid-auth/core'
import { serverEnv } from "~/env/server"
import { sessionStorage } from "~/utils/auth"
import { prisma } from "./db/client"


export const authenticator = new Authenticator<User>(sessionStorage).use(
    new DiscordStrategy(
        {
            clientID: serverEnv.DISCORD_CLIENT_ID,
            clientSecret: serverEnv.DISCORD_CLIENT_SECRET,
            callbackURL: serverEnv.SITE_URL + "/api/auth/discord/callback",
        },
        async ({ profile }) => {
            let user = await prisma.user.findUnique({
                where: {
                    id: profile.id,
                },
            })
            if (!user) {
                user = await prisma.user.create({
                    data: {
                        id: profile.id,
                        displayName: profile.__json.username,
                        avatar: profile.photos[0].value,
                    },
                })
            }
            return user
        }
    ),
    // new Auth0Strategy(
    //     {
    //         domain: serverEnv.AUTH0_ISSUER_BASE_URL,
    //         clientID: serverEnv.AUTH0_CLIENT_ID,
    //         clientSecret: serverEnv.AUTH0_CLIENT_SECRET,
    //         callbackURL: serverEnv.SITE_URL + "/api/auth/callback",
    //     },
    //     async ({ profile }) => {

    //         console.log(`auth.ts authenticator() profile: ${JSON.stringify(profile, null, 4)}`)

    //         // return User.findOrCreate({ email: profile.emails[0].value })

    //         let user = await prisma.user.findUnique({
    //             where: {
    //                 id: 'profile.user_id',
    //             },
    //         })
    //         if (!user) {
    //             user = await prisma.user.create({
    //                 data: {
    //                     id: 'profile.user_id',
    //                     displayName: 'profile.nickname',
    //                     avatar: 'profile.picture',
    //                 },
    //             })
    //         }
    //         return user
    //     }
    // ),
)
