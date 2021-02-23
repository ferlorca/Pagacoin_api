import { Request, Response } from "express";
import { handleError } from "./../error/handle-error";

export async function role(req: Request, res: Response) {
    try {
        return res.status(200).send({ role: res.locals.role });
    } catch (err) {
        return handleError(res, err);
    }
}



