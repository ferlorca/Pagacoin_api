import { Request, Response } from "express";
import { handleError } from "./../error/handle-error";
import axios from "axios";
import config from "./../../config";
// import * as admin from 'firebase-admin';

import {grantRole} from "./authenticated";
import Role from "./../../models/Enums/Role";

export async function signup(req: Request, res: Response) {
    try {
        if (!req.body.email)
            return res.status(400).send({ message: 'Bad request you need to complete all the parameters.' });
        if (!req.body.password)
            return res.status(400).send({ message: 'Bad request you need to complete all the parameters.' });
        const { data } = await axios.post(config.URL_SING_UP, req.body);
        await grantRole(req.body.email,Role.USER);
     
        return res.status(200).send({ expiresIn: data.expiresIn, token: data.idToken, role:[Role.USER] ,email:req.body.email});
    } catch (err) {
        return handleError(res, err);
    }
}

