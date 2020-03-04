import * as firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyB5Pfsze42XkOGv_XGEWzVWZT4S2RgJiYw",
    authDomain: "onlinefoodsorderapp.firebaseapp.com",
    databaseURL: "https://onlinefoodsorderapp.firebaseio.com",
    projectId: "onlinefoodsorderapp",
    storageBucket: "onlinefoodsorderapp.appspot.com",
    messagingSenderId: "567200953690",
    appId: "1:567200953690:web:ccbe2283fc903f9cb12f63",
    measurementId: "G-QPSGECLQ7Y"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
export const db = firebase.database()
export const auth = firebase.auth()
export const storage = firebase.storage()