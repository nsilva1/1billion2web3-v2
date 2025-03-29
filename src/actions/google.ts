'use server'

import { signIn } from "@/lib/auth"
import { AuthError } from "next-auth"

export const googleSignIn = async () => {
    try {
        
        return await signIn('google', {
            redirectTo: '/dashboard'
        })
    } catch (error) {
        if(error instanceof AuthError){
            throw new Error('Error Signing In')
        }
        throw error
        
    }
}