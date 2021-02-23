import { Request, Response } from "express";
import { handleError } from "./../error/handle-error";
import * as admin from 'firebase-admin';
import { UserRecord } from "firebase-functions/lib/providers/auth";


export default async function logout(req: Request, res: Response) {
    try {        
        const uid = res.locals.uid;
        await admin.auth().revokeRefreshTokens(uid);       
        const user:UserRecord= await admin.auth().getUser(uid);
        const timestamp = new Date(user.tokensValidAfterTime ?? "").getTime() / 1000;
        console.log('Tokens revoked at: ', timestamp);
        return res.status(200).send({message: "User Logout"});     
    } catch (err) {
        return handleError(res, err);
    }
}



