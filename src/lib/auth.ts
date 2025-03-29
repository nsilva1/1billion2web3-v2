import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '../../prisma/prisma'
import credentials from 'next-auth/providers/credentials'
import github from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import bcrypt from 'bcryptjs'
// import authConfig from './auth.config'

export const { auth, handlers, signIn } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: 'jwt' },
    // ...authConfig
    providers: [
        github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }), 
        credentials({
            // credentials: {
            //     email: { label: 'Email', type: 'email', required: true },
            //     password: { label: 'Password', type: 'password', required: true }
            // },
            authorize: async (credentials) => {
                const { email, password } = credentials
                
                const user = await prisma.user.findFirst({
                    where: {
                        email: email as string
                    }
                })

                if (!user || !user.password || !user.email) {
                    return null
                }

                const isPasswordValid = await bcrypt.compare(password as string, user.password)

                if (isPasswordValid) {
                    return user;
                }

                return null;
            }
        })
    ]
})

export const googleLogin = async () => {
    try {
        await signIn('google', {
            redirectTo: '/dashboard'
        })
    } catch (error) {
        throw error
    }
}