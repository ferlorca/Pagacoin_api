import { Application } from "express";
import { config ,logs} from "../controller/config/config";

export default function routesConfig(app: Application) {
    app.post('/logs', [        
        logs,
    ]
    );
    app.post('/config', [
        config,
    ]
    );
}
