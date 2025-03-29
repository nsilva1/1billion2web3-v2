import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import Facebook from "next-auth/providers/facebook";
import Twitter from "next-auth/providers/twitter";
import Spotify from "next-auth/providers/spotify";
import Twitch from "next-auth/providers/twitch";
import Discord from "next-auth/providers/discord";
import Slack from "next-auth/providers/slack";
import Apple from "next-auth/providers/apple";
import type { NextAuthConfig } from "next-auth";

export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
        Facebook({}),
        Twitter({}),
        Spotify({}),
        Twitch({}),
        Discord({}),
        Slack({}),
        Apple({}),
        Credentials({})
    ]
} satisfies NextAuthConfig;