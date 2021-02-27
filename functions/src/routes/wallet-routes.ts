import { Application } from "express";
import { all,update,add,remove} from "../controller/wallet/wallet";
import { isAuthenticated  } from "../controller/auth/authenticated";


export default function routesConfig(app: Application) {   
    app.get('/wallet/all',
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

    app.delete('/wallet/delete',
        [isAuthenticated,
        remove]
    );    
    
 }