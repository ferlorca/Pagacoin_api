import { Application } from "express";
import {all,update,add,get} from "../controller/user/user";
import { isAuthenticated  } from "../controller/auth/authenticated";


export default function routesConfig(app: Application) {   
    app.get('/user/all',
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
    app.get('/user',
        [isAuthenticated,
        get]
    );
    
    
 }