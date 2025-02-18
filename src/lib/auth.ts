import NextAuth from 'next-auth'
import credentials from 'next-auth/providers/credentials'
import github from 'next-auth/providers/github'

export const { auth, handlers, signIn } = NextAuth({
    providers: [
        github, 
        credentials({
            credentials: {
                email: { label: 'Email', type: 'email', required: true },
                password: { label: 'Password', type: 'password', required: true }
            },
            authorize: async (credentials) => {
                const { email, password } = credentials
                
                if(email === 'admin@admin.com' && password === 'admin'){
                    return {email, password};
                } else {
                    throw new Error('Email/Password Incorrect.')
                }
            }
        })
    ]
})