import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDYblCVGPZJbA9JS22C7kBHnwFKsXktEuE",
    authDomain: "cinematic-villa-11501.firebaseapp.com",
    projectId: "cinematic-villa-11501",
    storageBucket: "cinematic-villa-11501.appspot.com",
    messagingSenderId: "992621791234",
    appId: "1:992621791234:web:59daaa85a025e4100cff1b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }; 
