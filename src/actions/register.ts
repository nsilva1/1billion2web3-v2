'use server'

import { prisma } from "../../prisma/prisma"
import bcrypt from "bcryptjs"
import { NewUser } from "@/app/auth/register/page"
import { ApiResponse } from "@/app/api/apiResponse"

export const register = async (user: NewUser) => {

    const { name, email, walletAddress, password } = user
     
    try {
        
    const hashedPassword = await bcrypt.hash(password, 10)

    // check if user exists
    const userExists = await prisma.user.findFirst({
        where: {
            email
        }
    })

    if(userExists) {
        throw new Error('User Already Exists')
    }

    const newUser = await prisma.user.create({
        data: {
            name,
            email: email.toLowerCase(),
            walletAddress,
            password: hashedPassword
        }
    })

    const response: ApiResponse<any> = {
        success: true,
        data: newUser,
        statusCode: 201,
        timestamp: new Date().toISOString()
    }

    return response
    } catch (error) {
        throw new Error('Error Registering User')
    }

    
}