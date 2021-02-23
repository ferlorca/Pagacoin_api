import { Request, Response } from "express";
import { handleError } from "./../error/handle-error";
import * as admin from 'firebase-admin';
import axios from "axios";
import config from "./../../config";


export default async function signin(req: Request, res: Response) {
    try {
        if (!req.body.email)
            return res.status(400).send({ message: 'Bad request you need to complete all the parameters.' });
        if (!req.body.password)
            return res.status(400).send({ message: 'Bad request you need to complete all the parameters.' });


        req.body["returnSecureToken"] =true;
        
        const { data } = await axios.post(config.URL_LOGIN, req.body);
        const decodedUser: admin.auth.DecodedIdToken = await admin.auth().verifyIdToken(data.idToken);
        return res.status(200).send({ expiresIn: data.expiresIn, token: data.idToken, email: decodedUser.email,role: decodedUser.role });
    } catch (err) {
        return handleError(res, err);
    }
}



