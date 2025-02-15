import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const secretKey = 'naza'
const encodedKey = new TextEncoder().encode(secretKey)

type SessionPayload = {
    userId: string;
    expiresAt: Date
}

export const encrypt = async (payload: SessionPayload) => {
    return new SignJWT(payload).setProtectedHeader({alg:'HS256'}).setIssuedAt().setExpirationTime('2d').sign(encodedKey);
}

export const decrypt = async (session: string | undefined = '') => {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256']
        });
        return payload;
    } catch (error: any) {
        throw new Error(error)
    }
}