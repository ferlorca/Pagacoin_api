import { Request, Response } from "express";
import * as admin from 'firebase-admin';


export async function isAuthenticated(req: Request, res: Response, next: Function) {
    const { authorization } = req.headers

    if (!authorization)
        return res.status(401).send({ message: 'Unauthorized' });

    if (!authorization.startsWith('Bearer'))
        return res.status(401).send({ message: 'Unauthorized' });

    const split = authorization.split('Bearer ')
    if (split.length !== 2)
        return res.status(401).send({ message: 'Unauthorized' });

    const token = split[1]

    try {
        const decodedToken: admin.auth.DecodedIdToken = await admin.auth().verifyIdToken(token);
        if(!decodedToken.role ) 
            decodedToken.role = (await admin.auth().getUser(decodedToken.uid)).customClaims?.role;
        res.locals = { ...res.locals, uid: decodedToken.uid, role: decodedToken.role, email: decodedToken.email }
        return next();
    }
    catch (err) {
        console.error(`${err.code} -  ${err.message}`)
        return res.status(401).send({ message: 'Unauthorized' });
    }
}


export async function grantRole(email: string , roleParams: string): Promise<void> {
    try {
        const user = await admin.auth().getUserByEmail(email);
        if (user.customClaims && (user.customClaims as any).role && (user.customClaims as any).role === roleParams) {
            return;
        }        
        const role:string = roleParams;
        return admin.auth().setCustomUserClaims(user.uid, {role})
    } catch (e) {
        return e;
    }
}
