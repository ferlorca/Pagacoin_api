import { Application } from "express";
import {all,add} from "../controller/transaction/transaction";
import { isAuthenticated  } from "../controller/auth/authenticated";


export default function routesConfig(app: Application) {   
    app.get('/transactions',
       [isAuthenticated,
        all]
    );

    app.post('/transaction',
        [isAuthenticated,
        add]
    );    
    
 }