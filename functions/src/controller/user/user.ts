import { Request, Response } from "express";
import { handleError } from "../error/handle-error";
import * as admin from 'firebase-admin';
import {User} from "./../../models/User";


export async function all(req: Request, res: Response) {
	try { 
	 const userSnapshot =  await admin.firestore()
        .collection("user")
        .get();
        let users:Array<User> =[];
        if(userSnapshot.size > 0){
            users = userSnapshot.docs.map((item:FirebaseFirestore.QueryDocumentSnapshot)=>User.fromFirebaseDocument(item));
        }
		return res.status(200).send({users})       
	} catch (err) {
		return handleError(res, err)
	}
}

export async function update(req: Request, res: Response) {
	try { 
		const { id ,email } = req.body	
		if (!id || !email ) {
			return res.status(400).send({ message: 'Missing fields' })
		}
		const user:User =User.fromRequest({...req.body});
		
		await updateUser(user);
      
		return res.status(200).send({user})       
	} catch (err) {
		return handleError(res, err)
	}
}

export async function add(req: Request, res: Response) {
	try { 
		const { email } = req.body	
		if (!email ) {
			return res.status(400).send({ message: 'Missing fields' })
		}
		let user:User =User.fromRequest({...req.body});		
		user = await addUser(user);
      
		return res.status(200).send({user})       
	} catch (err) {
		return handleError(res, err)
	}
}

export async function updateUser(user:User) {
	try {
		await admin.firestore()
        .collection("user")
        .doc(user.id).update({name:user.name,email:user.email,phone:user.phone,wallets:user.wallets});
      
	} catch (err) {
		console.error(err);
		throw err;
	}
}

export async function addUser(user:User) {
	try {        
        var userRef = admin.firestore().collection("user");
		if(user.id !== "" ){
			await userRef.doc(user.id).create(user.toJson());
			return new User(user.id,user.email,user.name,user.phone,user.wallets)
		}else{
			const userSnapshot= await userRef.add(user.toJson());
			return new User(userSnapshot.id,user.email,user.name,user.phone,user.wallets)
		}
	} catch (err) {
		console.error(err);
        throw err;
    }
}