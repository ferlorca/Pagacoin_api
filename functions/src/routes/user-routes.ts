import { Application } from "express";
import {all,update,add} from "../controller/user/user";
import { isAuthenticated  } from "../controller/auth/authenticated";


export default function routesConfig(app: Application) {   
    app.get('/users',
       [isAuthenticated,
        all]
    );

    app.patch('/user/update',
        [isAuthenticated,
        update]
    );

    app.post('/user/add',
        [isAuthenticated,
        add]
    );
    
 }