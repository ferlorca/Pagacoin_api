import { Request, Response } from "express";
import { handleError } from "../error/handle-error";
import { ErrorApp} from "../../models/Error";
import * as admin from 'firebase-admin';
const LOG="logs";

export async function logs(req: Request, res: Response) {
	try {      
        const snapshot  = await admin.firestore().collection(LOG).orderBy("createDate","desc").limit(50).get();  
        const errors:Array<ErrorApp> = snapshot.docs.map(item=> ErrorApp.fromFirebaseDocument(item));
        return res.status(200).send({errors});
	} catch (err) {
		return handleError(res, err)
	}
}