import { Application } from "express";
import {all,update,add} from "../controller/user/user";
import { isAuthenticated  } from "../controller/auth/authenticated";


export default function routesConfig(app: Application) {   
    app.get('/wallets',
       [isAuthenticated,
        all]
    );

    app.patch('/wallet/update',
        [isAuthenticated,
        update]
    );

    app.post('/wallet/add',
        [isAuthenticated,
        add]
    );    
    
 }