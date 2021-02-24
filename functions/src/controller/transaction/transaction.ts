import { Request, Response } from "express";
import * as admin from 'firebase-admin';
import { handleError } from "../error/handle-error";
import { MyTransactions, Transaction } from '../../models/Transaction';
import { updateWalletsByTransaction } from "../wallet/wallet";


export async function all(req: Request, res: Response) {
	try { 
        const { walledId } = req.body;	
        if (!walledId ) {
            return res.status(400).send({ message: 'Missing fields' })
        }
        let transactions = new MyTransactions();
        transactions.received = await getIncomingTransaction(walledId);
        transactions.delivered = await getOutcomingTransaction(walledId);
       
        return res.status(200).send({transactions})       
	} catch (err) {
		return handleError(res, err)
	}
}


export async function add(req: Request, res: Response) {
	try { 
        const { origin , destiny , amount } = req.body;

		if (!origin || !destiny || !amount) {
			return res.status(400).send({ message: 'Missing fields' })
        }        
        if(!await updateWalletsByTransaction(origin,destiny,parseFloat(amount))){
            return res.status(400).send({ message: 'The operation could not be performed' })
        }
        await admin.firestore()
            .collection("transaction").add({origin,destiny,amount,date:new Date()});
		return res.status(200).send(true)       
	} catch (err) {
		return handleError(res, err)
	}
}


export async function getOutcomingTransaction(walletId:string){
    try { 		
	    const snapshot = await admin.firestore().collection("transaction").where("origin","==",walletId).get();
    	const transactions:Array<Transaction> =  snapshot.docs.map((item:FirebaseFirestore.QueryDocumentSnapshot)=>Transaction.fromFirebaseDocument(item)); 
        return transactions;
    } catch (err) {
        console.error(err);
        throw err;
	}
}
export async function getIncomingTransaction(walletId:string){
    try { 		
        const snapshot = await admin.firestore().collection("transaction").where("destiny","==",walletId).get();
    	const transactions:Array<Transaction> =  snapshot.docs.map((item:FirebaseFirestore.QueryDocumentSnapshot)=>Transaction.fromFirebaseDocument(item)); 
        return transactions;       
	} catch (err) {
        console.error(err);
        throw err;
	}
}