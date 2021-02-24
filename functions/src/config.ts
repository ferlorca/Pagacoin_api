
const serviceAccount = require("./../pagacoin-key.json");

const API_KEY= process.env.FIREBASE_KEY;
const URL_LOGIN:string = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
const URL_SING_UP:string =`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

export default {    
    URL_LOGIN,
    URL_SING_UP,
    serviceAccount
} 