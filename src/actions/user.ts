'use server'

import { NewUser } from "@/app/auth/register/page"
import { prisma } from "../../prisma/prisma"
import { ApiResponse } from "@/app/api/apiResponse"

export const updateUserProgress = async (moduleNumber: number, email: string) => {
    const user = await prisma.user.findFirst({
        where: {
            email
        }
    })

    if(!user) {
        const newResponse: ApiResponse<any> = {
            success: false,
            data: null,
            statusCode: 404,
            error: 'User Not Found',
            timestamp: new Date().toISOString()
        }

        return newResponse
    }

    const updatedUser = await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            progress: moduleNumber
        }
    })

    const response: ApiResponse<any> = {
        success: true,
        data: updatedUser,
        statusCode: 200,
        timestamp: new Date().toISOString()
    }

    return response;
}

export const getUserProgress = async (email: string) => {
    const user = await prisma.user.findFirst({
        where: {
            email
        }
    })

    if(!user) {
        // const newResponse: ApiResponse<any> = {
        //     success: false,
        //     data: null,
        //     statusCode: 404,
        //     error: 'User Not Found',
        //     timestamp: new Date().toISOString()
        // }

        // return newResponse
        throw new Error('User Not Found')
    }

    return user.progress
}

export const requestCertificate = async (email: string) => {
    const user = await prisma.user.findFirst({
        where: {
            email
        }
    })

    if(!user) {
        const newResponse: ApiResponse<any> = {
            success: false,
            data: null,
            statusCode: 404,
            error: 'User Not Found',
            timestamp: new Date().toISOString()
        }

        return newResponse
    }

    if(user.certificateRequested) {
        const newResponse: ApiResponse<any> = {
            success: false,
            data: null,
            statusCode: 400,
            error: 'Certificate Already Requested',
            timestamp: new Date().toISOString()
        }

        return newResponse
    }

    if(user.progress < 9) {
        const newResponse: ApiResponse<any> = {
            success: false,
            data: null,
            statusCode: 400,
            error: 'User has not completed all modules',
            timestamp: new Date().toISOString()
        }

        return newResponse
    }

    const updatedUser = await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            certificateRequested: true
        }
    })

    const response: ApiResponse<any> = {
        success: true,
        data: updatedUser,
        statusCode: 200,
        timestamp: new Date().toISOString()
    }

    return response;
}