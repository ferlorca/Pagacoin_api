import { Request, Response } from "express";

export function isAuthorized(opts: { hasRole: Array<'admin' | 'user'>, allowSameUser?: boolean }) {
   return (req: Request, res: Response, next: Function) => {
       const { role, uid } = res.locals
       const { id } = req.params

    //    if (email === 'fernando.g.lorca@gmail.com')
            // return next();

       if (opts.allowSameUser && id && uid === id)
           return next();

       if (!role)
           return res.status(403).send();

       if (opts.hasRole.includes(role))
           return next();

       return res.status(403).send();
   }
}