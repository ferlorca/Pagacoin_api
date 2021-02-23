import { Application } from "express";
import {logs} from "../controller/config/config";

export default function routesConfig(app: Application) {
    app.post('/logs', [        
        logs,
    ]);
}
