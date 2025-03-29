'use server'

import { signIn } from "@/lib/auth"
import { AuthError } from "next-auth"
import { UserCredentials } from "@/app/auth/login/page"
import { prisma } from "../../prisma/prisma"
import { ApiResponse } from "@/app/api/apiResponse"

export const login = async (user: UserCredentials) => {
    const { email, password } = user

    const userExists = await prisma.user.findFirst({
        where: {
            email
        }
    })

    if(!userExists || !userExists.password || !userExists.email) {
        throw new Error('User Not Found')
    }

    try {
        await signIn('credentials', {
            email: userExists.email,
            password,
            redirectTo: '/dashboard'
        })
 
    } catch (error) {
        if(error instanceof AuthError){
            switch (error.type) {
                case "CredentialsSignin":
                    throw new Error('Invalid Credentials')
                default:
                    throw new Error('Please confirm your email address')
            }
        }
        throw error;
    }

    const response: ApiResponse<any> = {
        success: true,
        data: userExists,
        statusCode: 200,
        timestamp: new Date().toISOString()
    }

    return response;
}