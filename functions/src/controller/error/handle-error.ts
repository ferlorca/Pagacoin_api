import { Response } from "express";
import * as admin from 'firebase-admin';
import {ErrorApp} from "../../models/Error"

export async function handleError(res: Response, error: any) {
    try{       
        const err:ErrorApp =  ErrorApp.fromObject(error);
        await admin.firestore().collection("logs").add({message:err.message,code:err.code,createDate:err.createDate,stacktrace:err.stacktrace});
        return res.status(500).send({ message: `An error occurred :( \n  We will try to solve it as quickly as possible. ` });
    }catch(e){
        return res.status(500).send({message:e.message ?? "An Error ocurred", code:"500", stacktrace:e.stack ?? ""});
    }    
}