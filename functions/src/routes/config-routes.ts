import { Application } from "express";
import { isAuthenticated } from "../controller/auth/authenticated";
import {logs} from "../controller/config/config";

export default function routesConfig(app: Application) {
    app.get('/logs',  
    [isAuthenticated,      
    logs,
    ]);
}
