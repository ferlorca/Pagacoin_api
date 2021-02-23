
const API_KEY= "AIzaSyCR0xXyzAdP-kojwcs4gjAFIKp7Kf1lTzY";
const URL_LOGIN:string = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
const URL_SING_UP:string =`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

export default {    
    URL_LOGIN,
    URL_SING_UP
} 