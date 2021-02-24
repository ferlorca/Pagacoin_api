import { Request, Response } from "express";
import { handleError } from "../error/handle-error";
import * as admin from 'firebase-admin';
import { Wallet } from "../../models/Wallet";
import { User } from "../../models/User";
import { updateUser } from "../user/user";


export async function all(req: Request, res: Response) {
	try { 
        const { uid } = req.body;	
        if (!uid ) {
            return res.status(400).send({ message: 'Missing fields' })
        }
        const walletSnapshot =  await admin.firestore()
        .collection("wallet").where("ownerid","==",uid).get();
        let wallets:Array<Wallet> =[];
        if(walletSnapshot.size > 0){
            wallets = walletSnapshot.docs.map((item:FirebaseFirestore.QueryDocumentSnapshot)=>Wallet.fromFirebaseDocument(item));
        }
        return res.status(200).send({wallets})       
	} catch (err) {
		return handleError(res, err)
	}
}


export async function add(req: Request, res: Response) {
	try { 
        const { user , balance } = req.body;
        const newUser= User.fromRequest(user);
		if (!newUser.id || !balance) {
			return res.status(400).send({ message: 'Missing fields' })
        }
        let wallet:Wallet =Wallet.fromRequest({ownerid:newUser.id,...req.body});	        
        	
        var wallerRef = await admin.firestore().collection("wallet").add(wallet.toJson());
        wallet.id = wallerRef.id;
        newUser.wallets.push(wallet.id);
        await updateUser(User.fromRequest(user));

		return res.status(200).send({wallet})       
	} catch (err) {
		return handleError(res, err)
	}
}



export async function update(req: Request, res: Response) {
	try { 
        const { id , balance } = req.body;

		if (!id || !balance) {
			return res.status(400).send({ message: 'Missing fields' })
        }

		let wallet:Wallet =Wallet.fromRequest({...req.body});		
        await admin.firestore().collection("wallet").doc(id).update(wallet.toJson());
              
		return res.status(200).send({wallet})       
	} catch (err) {
		return handleError(res, err)
	}
}
