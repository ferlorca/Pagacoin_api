import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
// import { routesConfig } from './routes/routes-config';

admin.initializeApp(
    functions.config().firebase
);

const app = express();
app.use(cors({ origin: true }));
app.use(bodyParser.json());
// routesConfig(app);

app.listen(3001,()=>{
    console.log("server is running on port 3001")
})
//  export const api = functions.https.onRequest(app);
