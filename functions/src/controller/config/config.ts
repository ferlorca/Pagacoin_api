import { Request, Response } from "express";
import { handleError } from "../error/handle-error";
import { ErrorApp} from "../../models/Error";
import * as admin from 'firebase-admin';

const CONFIG="config";
const LOG="logs";


async function configPokemonFromFirestore(){
    try{
        const doc = await admin.firestore().collection(CONFIG).doc("pokemonConfig").get();	
        const data = doc.data();
        return {amountPerPage:data?.amountPerPage,count:data?.count};  
    }catch(e){
        throw e;
    }     
}  

export async function config(req: Request, res: Response) {
	try {        
        const data = await configPokemonFromFirestore();       
        return res.status(200).send({...data});
	} catch (err) {
		return handleError(res, err)
	}
}


export async function logs(req: Request, res: Response) {
	try {      
        const snapshot  = await admin.firestore().collection(LOG).orderBy("createDate","desc").limit(50).get();  
        const errors:Array<ErrorApp> = snapshot.docs.map(item=> ErrorApp.fromFirebaseDocument(item));
        return res.status(200).send({errors});
	} catch (err) {
		return handleError(res, err)
	}
}