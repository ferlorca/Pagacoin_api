import { Request, Response } from "express";
import { handleError } from "../error/handle-error";
import * as admin from 'firebase-admin';
import { Wallet } from "../../models/Wallet";

export async function all(req: Request, res: Response) {
    try {
        const { ownerId } = req.query;
        if (!ownerId) {
            return res.status(400).send({ message: 'Missing fields' })
        }
        const wallets = await getWallets(ownerId.toString())
        return res.status(200).send({ wallets })
    } catch (err) {
        return handleError(res, err)
    }
}

export async function add(req: Request, res: Response) {
    try {
        const { ownerId, balance , alias} = req.body;
        if (!ownerId || !balance || !alias) {
            return res.status(400).send({ message: 'Missing fields' })
        }
        let wallet: Wallet = Wallet.fromRequest({ ownerId: ownerId, ...req.body }); 

        const myWallets = await getWallets(ownerId);                
        if(myWallets.filter(item=>item.alias.toLowerCase() === wallet.alias.toLowerCase()).length > 0){
            return res.status(400).send({ message: 'Alias invalid' })
        }
        
        var wallerRef = await admin.firestore().collection("wallet").add(wallet.toJson());
        wallet.id = wallerRef.id;
        return res.status(200).send({ wallet })
    } catch (err) {
        return handleError(res, err)
    }
}

export async function update(req: Request, res: Response) {
    try {
        const { id, balance ,ownerId} = req.body;

        if (!id || !balance || !ownerId) {
            return res.status(400).send({ message: 'Missing fields' })
        }
        let wallet: Wallet = Wallet.fromRequest({ ...req.body });
        if(await updateWallet(wallet)){
            return res.status(200).send({ wallet })
        }
        return res.status(404).send({ message: 'An error has occurred' })
        
    } catch (err) {
        return handleError(res, err)
    }
}

export async function remove(req: Request, res: Response) {
    try {
        const { id } = req.query;
        if(!id)
            return res.status(404).send({ message: 'An error has occurred' })
        await admin.firestore().collection("wallet").doc(id.toString()).delete();
        return res.status(204).send({})
    } catch (err) {
        return handleError(res, err)
    }
}



export async function updateWalletsByTransaction(origin: string, destiny: string, amount: number) {
    try {
        var ref = admin.firestore().collection("wallet").doc(origin);
        const orgWalletSnopshot = await ref.get();
        if (orgWalletSnopshot.exists) {
            const destWalletSnopshot = await admin.firestore().collection("wallet").doc(destiny).get();
            if (destWalletSnopshot.exists) {
                const orgWallet = Wallet.fromFirebaseDocument(orgWalletSnopshot);
                const destWallet = Wallet.fromFirebaseDocument(destWalletSnopshot);
                orgWallet.balance -= amount;               
                if (orgWallet.balance >= 0) {
                    destWallet.balance += amount;
                    if (await updateWallet(orgWallet))
                        return await updateWallet(destWallet);
                }
            }
        }
        return false;
    } catch (err) {
        console.error(err);
        throw err;
    }
}


async function updateWallet(wallet: Wallet) {
    try {
        await admin.firestore().collection("wallet").doc(wallet.id).update(wallet.toJson());
        return true;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function getWallets(ownerId: string) {
    try {            
        const walletSnapshot = await admin.firestore()
            .collection("wallet").where("ownerId", "==", ownerId).get();
        let wallets: Array<Wallet> = [];
        if (walletSnapshot.size > 0) {
            wallets = walletSnapshot.docs.map((item: FirebaseFirestore.QueryDocumentSnapshot) => Wallet.fromFirebaseDocument(item));
        }
        return wallets;
    } catch (err) {
        console.error(err);
        throw err;
    }
}