// import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import config from "./config";
import { routesConfig } from './routes/routes-config';

admin.initializeApp({
    credential: admin.credential.cert(config.serviceAccount),
    databaseURL: "https://pagacoin-70429.firebaseio.com",
});

const app = express();
app.use(cors({ origin: true }));
app.use(bodyParser.json());
routesConfig(app);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(3001,()=>{
    console.log("server is running on port 3001")
})
// export const api = functions.https.onRequest(app);
